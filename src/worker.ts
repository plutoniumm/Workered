// RPC for Workers
class WPC {
  init: boolean = false;
  funcs = [];
  constructor() {
    self.onmessage = (e) => {
      if (!this.init) {
        this.init = true;
        self.postMessage('ready');
      }

      const { func, params, id } = e.data;
      // @ts-ignore
      const result = this.funcs[func](...params);

      self.postMessage({ id, result });
    };
  }
  // register a function to be able to call it from the main thread
  register (name: string, fn: Function) {
    // @ts-ignore
    this.funcs[name] = fn;
  }
}

export default WPC;