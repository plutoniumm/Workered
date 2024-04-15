## Workered

# DO NOT CONFUSE WITH [WORKERD](https://github.com/cloudflare/workerd) by CLOUDFLARE

Call in the client with
```js
import { Thread } from "workered";
const w = new Thread( "worker.ts" );

// (<func>, param[])
w.run( "fib", [ 10 ] ).then( res =>
  console.log("Fibonacci of 10 is", res)
);
```

And in the worker file
```js
import { Host } from "workered";
function fib (n: number): number {/*Calculate Fibonacci*/};
async function todo (msg: string): Promise<string> {/*Do something*/};

new Host()
  .register("fib", fib)
  .register("todo", todo);
```

### Notes
- Params must be `string | number | boolean`