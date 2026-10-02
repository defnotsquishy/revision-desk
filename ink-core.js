// Document-relative ink: independent of screen size, zoom and device pixels.
(() => {
  'use strict';
  const colors={Black:'#202124',Blue:'#1565c0',Red:'#c62828',Green:'#23713e',Purple:'#783aa3',Yellow:'#e6b800'};
  const point=p=>Array.isArray(p)&&p.length===2&&p.every(n=>Number.isFinite(n)&&n>=0&&n<=1);
  function valid(stroke){return stroke&&['pen','highlight'].includes(stroke.tool)&&Object.values(colors).includes(stroke.color)&&[1,2,4,8].includes(stroke.width)&&Array.isArray(stroke.points)&&stroke.points.length>0&&stroke.points.length<=4000&&stroke.points.every(point);}
  function validPages(pages,count){return pages&&typeof pages==='object'&&!Array.isArray(pages)&&Object.keys(pages).length<=count&&Object.entries(pages).every(([n,p])=>/^\d+$/.test(n)&&Number(n)>=1&&Number(n)<=count&&Array.isArray(p.strokes)&&p.strokes.length<=500&&p.strokes.every(valid)&&typeof p.notes==='string'&&p.notes.length<=10000);}
  function draw(ctx,stroke,w,h){
    ctx.save();ctx.strokeStyle=stroke.color;ctx.fillStyle=stroke.color;ctx.globalAlpha=stroke.tool==='highlight'?.28:1;
    ctx.lineWidth=stroke.width*(stroke.tool==='highlight'?6:1)*w/595;ctx.lineCap='round';ctx.lineJoin='round';
    const pts=stroke.points;
    if(pts.length===1){ctx.beginPath();ctx.arc(pts[0][0]*w,pts[0][1]*h,ctx.lineWidth/2,0,Math.PI*2);ctx.fill();}
    else{ctx.beginPath();pts.forEach((p,i)=>ctx[i?'lineTo':'moveTo'](p[0]*w,p[1]*h));ctx.stroke();}ctx.restore();
  }
  function distance(p,a,b){const x=b[0]-a[0],y=b[1]-a[1],t=Math.max(0,Math.min(1,((p[0]-a[0])*x+(p[1]-a[1])*y)/(x*x+y*y||1)));return Math.hypot(p[0]-a[0]-t*x,p[1]-a[1]-t*y);}
  function hit(stroke,p,ratio){const pts=stroke.points.map(v=>[v[0],v[1]*ratio]),q=[p[0],p[1]*ratio],radius=.012+stroke.width*(stroke.tool==='highlight'?6:1)/1190;return pts.some((a,i)=>distance(q,a,pts[Math.max(0,i-1)])<=radius);}
  window.RevisionInk={colors,valid,validPages,draw,hit};
})();
