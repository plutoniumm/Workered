(()=>{var a=(r=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(r,{get:(e,s)=>(typeof require<"u"?require:e)[s]}):r)(function(r){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+r+'" is not supported')});var w=(r,e)=>()=>(e||r((e={exports:{}}).exports,e),e.exports);var h=w((l,n)=>{(function(r){if(typeof n=="object"&&typeof n.exports=="object"){var e=r(a,l);e!==void 0&&(n.exports=e)}else typeof define=="function"&&define.amd&&define(["require","exports"],r)})(function(r,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});class s{constructor(t){if(this.worker=null,typeof t=="string"&&(this.worker=new Worker(t,{type:"module"})),!this.worker)throw new Error("Invalid worker")}run(t,i=[]){if(typeof t!="string"){this.worker.postMessage(t);return}let d=Math.random().toString(36).substr(2,9);for(let o=0;o<i.length;o++)if(!["string","number","boolean"].includes(typeof i[o]))throw console.warn("param",i[o]),new Error("Invalid param type");return this.worker.postMessage({func:t,params:i,id:d}),new Promise((o,c)=>{let f=u=>{u.data.id===d&&(this.worker.removeEventListener("message",f),o(u.data.result))};this.worker.addEventListener("message",f)})}}e.default=s})});h();})();
