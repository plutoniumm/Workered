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

import { Host } from "./src";
new Host()
  .register("fib", fib)
  .register("text", text);