function fib (n: number): number {
  if (n <= 1) {
    return 1;
  }
  return fib(n - 1) + fib(n - 2);
};

import WPC from "./src/worker.ts";
new WPC()
  .register("fib", fib)