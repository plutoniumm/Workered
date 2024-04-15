export default class WPC {
  init: boolean = false;
  funcs = [];
  constructor() {
    self.onmessage = async (e) => {
      if (!this.init) {
        this.init = true;
        self.postMessage('ready');
      }

      const { func, params, id } = e.data;
      const exec = this.funcs[func];
      const type = exec[Symbol.toStringTag];

      let result;
      if (type === 'AsyncFunction') {
        // @ts-ignore
        result = await exec(...params);
      } else {
        // @ts-ignore
        result = exec(...params);
      }
      self.postMessage({ id, result });
    };
  }
  // register a function to be able to call it from the main thread
  register (name: string, fn: Function) {
    // @ts-ignore
    this.funcs[name] = fn;

    return this;
  }
};