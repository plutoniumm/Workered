## WPC
Worker Procedure Call

### Usage
Call it with
```js
// CLIENT SIDE
const wpc = new WPClient( "worker.ts", (msgEvt)=>{
  console.log("Some onmessage callback", msgEvt.data );
} );
// param = string | number | boolean;
// (wpc://<func>, param[])
wpc.post( "wpc://fib", [ 10 ] );
```

And in the worker file
```js
// WORKER SIDE
function fib (n: number): number {/*Calculate Fibonacci*/};

import WPC from "./src/worker.ts";
new WPC()
  .register("fib", fib)
```

If the msg post is not of form `wpc://<func>` it will be passed as a normal function as is and `params` will be ignored.

###
- Can this be insecure? Yes, i dont care.
- Can this be slow? Yes, i dont care.
- Is it fun? Yes, i care.