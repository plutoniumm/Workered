## Workered

Call it with
```js
import {  } from "workered";
// CLIENT SIDE
const w = new ?( "worker.ts" );

// (<func>, param[])
w.run( "fib", [ 10 ] ).then( res =>
  console.log("Fibonacci of 10 is", res)
);
```

And in the worker file
```js
import {  } from "workered";
// WORKER SIDE
function fib (n: number): number {/*Calculate Fibonacci*/};
async function todo (msg: string): Promise<string> {/*Do something*/};

new WPC()
  .register("fib", fib)
  .register("todo", todo);
```

### Notes
- Params must be `string | number | boolean`