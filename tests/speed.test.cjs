const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
function setup(){
 const node={textContent:'',setAttribute(){}};
 const listeners={}; let tick;
 const context={document:{hidden:false,getElementById:()=>node,addEventListener:(name,fn)=>listeners[name]=fn},performance:{now:()=>100},window:{},setInterval:fn=>{tick=fn;}};
 vm.runInNewContext(fs.readFileSync('ec-speed.js','utf8'),context);
 return {node,context,tick:()=>tick()};
}
test('no sample is not represented as a measured zero',()=>{assert.equal(setup().node.textContent,'—')});
test('uses completed work and actual elapsed time',()=>{const s=setup();s.context.window.elementarySpeed.record(2500,2000);assert.equal(s.node.textContent,'1,250')});
test('does not invent minimum throughput',()=>{const s=setup();s.context.window.elementarySpeed.record(30,1000);assert.equal(s.node.textContent,'30')});
test('rejects invalid counts and times',()=>{const s=setup();for(const v of [[-1,1000],[1,0],[NaN,100],[1,Infinity],[1.5,1000]])s.context.window.elementarySpeed.record(...v);assert.equal(s.node.textContent,'—')});
test('expires a stale result',()=>{const s=setup();s.context.window.elementarySpeed.record(1000,1000);s.context.performance.now=()=>6000;s.tick();assert.equal(s.node.textContent,'—')});
test('clears sample when page is hidden',()=>{const s=setup();s.context.window.elementarySpeed.record(1000,1000);s.context.document.hidden=true;s.tick();assert.equal(s.node.textContent,'—')});
