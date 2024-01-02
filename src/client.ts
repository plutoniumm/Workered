type CB = (e: MessageEvent) => void;

class WPClient {
  worker: Worker | null = null;
  constructor(worker: Worker | string, cb: CB) {
    if (typeof worker === "string") {
      this.worker = new Worker(worker, { type: "module" });
    }
    if (!this.worker) throw new Error("Invalid worker");

    if (!cb) cb = (e: MessageEvent) => {
      console.log(e.data);
    };
    this.worker.onmessage = cb;
  }

  post (msg: any, params: any[]) {
    // validating func wpc://funcName
    if (typeof msg !== "string" || !msg.startsWith("wpc://")) {
      // if not wpc pass as is
      (this.worker as Worker).postMessage(msg);
      return;
    }

    const func = msg.replace("wpc://", "");
    const id = Math.random().toString(36).substr(2, 9);

    // handle string -> other type in registered function. not worker code
    for (let i = 0; i < params.length; i++) {
      if (!["string", "number", "boolean"].includes(typeof params[i])) {
        console.warn("param", params[i]);
        throw new Error("Invalid param type");
      }
    }

    (this.worker as Worker).postMessage({
      func, params, id
    });
  }
};