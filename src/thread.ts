export default class WPC {
  worker: Worker | null = null;
  constructor(worker: Worker | string) {
    if (typeof worker === "string") {
      this.worker = new Worker(worker, { type: "module" });
    }
    if (!this.worker) throw new Error("Invalid worker");
  }

  run (func: any, params: any[] = []) {
    if (typeof func !== "string") {
      // if not wpc pass as is
      (this.worker as Worker).postMessage(func);
      return;
    }

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

    // resolve promise when worker sends back response with same id
    return new Promise((resolve, _) => {
      const handler = (e: MessageEvent) => {
        if (e.data.id === id) {
          (this.worker as Worker).removeEventListener("message", handler);
          resolve(e.data.result);
        }
      };
      (this.worker as Worker).addEventListener("message", handler);
    });
  }
};