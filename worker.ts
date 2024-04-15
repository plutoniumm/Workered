function fib (n: number): number {
  if (n <= 1) {
    return 1;
  }
  return fib(n - 1) + fib(n - 2);
};

async function text () {
  const res = await fetch("/readme.md")
    .then(res => res.text());

  return res.split("\n")[0];
}

import WPC from "./src/worker.ts";
new WPC()
  .register("fib", fib)
  .register("text", text);