class WPClient {
  worker: Worker | null = null;
  constructor(worker: Worker | string) {
    if (typeof worker === "string") {
      this.worker = new Worker(worker, { type: "module" });
    }
    if (!this.worker) throw new Error("Invalid worker");

    this.worker.onmessage = (e) => {
      console.log(e.data);
    };
  }

  post (msg: string, params: any[]) {
    // validating func wpc://funcName
    if (!msg.startsWith("wpc://")) throw new Error("Invalid func name");

    const func = msg.replace("wpc://", "");
    const id = Math.random().toString(36).substr(2, 9);

    // handle string -> other type in registered function. not worker code
    for (let i = 0; i < params.length; i++) {
      if (typeof params[i] !== "string") {
        throw new Error("Invalid param type");
      }
    }

    (this.worker as Worker).postMessage({
      func, params, id
    });
  }
};

export default WPClient;