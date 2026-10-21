/* Gemeinsamer Kern für Vorschau (index.html) und Werkstatt (werkstatt.html):
   Schriftliste, Buchstabenmaske und die aufgeblasene Höhenkarte. Die Vorschau färbt sie ein,
   die Werkstatt macht daraus das STL. So stimmen Vorschau und Druckteil überein. */
(function(g){
"use strict";
const TL={};

/* Schriften, die sich als Einzelbuchstaben gut drucken lassen: dicke, gleichmässige Striche,
   keine Haarlinien, keine verbundene Schreibschrift. Alle unter SIL Open Font License 1.1. */
TL.FONTS=[
  {id:"baloo",   name:"Baloo",     family:"Baloo 2",   weight:800,note:"Rund und weich"},
  {id:"fredoka", name:"Fredoka",   family:"Fredoka",   weight:700,note:"Freundlich, geometrisch"},
  {id:"nunito",  name:"Nunito",    family:"Nunito",    weight:900,note:"Ruhig und breit"},
  {id:"sniglet", name:"Sniglet",   family:"Sniglet",   weight:800,note:"Verspielt"},
  {id:"titan",   name:"Titan One", family:"Titan One", weight:400,note:"Kräftig und kompakt"}
];
TL.getFont=id=>TL.FONTS.find(f=>f.id===id)||TL.FONTS[0];
TL.fontStr=(f,px)=>`${f.weight} ${px}px "${f.family}", system-ui, sans-serif`;
TL.loadFont=f=>(document.fonts?document.fonts.load(TL.fontStr(f,100),"ABCÄ").catch(()=>{}):Promise.resolve());

TL.COLORS=[["Kreide","#efece6"],["Sand","#d8c3a0"],["Senf","#e3c04a"],["Mohn","#d8392b"],["Terrakotta","#b8573a"],["Rosé","#e9a6a0"],
 ["Pflaume","#6b2d4f"],["Flieder","#b9a6e8"],["Fjord","#3d6fb6"],["Tinte","#1c2b52"],["Eis","#a9d6ee"],["Minze","#7fd1b5"],
 ["Salbei","#8da38a"],["Tanne","#1f5a45"],["Graphit","#34383f"],["Stein","#9aa0a8"],["Espresso","#4a2f22"],["Ocker","#c98a1d"]];
TL.MATS=[["satin","Satin"],["samt","Samt"],["marmor","Marmor"],["terrazzo","Terrazzo"],["streifen","Streifen"],["perl","Perlmutt"]];

const clamp=(v,a,b)=>Math.min(b,Math.max(a,v));
const sstep=(a,b,x)=>{const t=clamp((x-a)/(b-a),0,1);return t*t*(3-2*t)};
function rng(a){return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
TL.clamp=clamp;TL.sstep=sstep;TL.rng=rng;

function dt1d(f,n,d,v,z){let k=0;v[0]=0;z[0]=-1e20;z[1]=1e20;
  for(let q=1;q<n;q++){let s=((f[q]+q*q)-(f[v[k]]+v[k]*v[k]))/(2*q-2*v[k]);
    while(s<=z[k]){k--;s=((f[q]+q*q)-(f[v[k]]+v[k]*v[k]))/(2*q-2*v[k])}
    k++;v[k]=q;z[k]=s;z[k+1]=1e20}
  k=0;for(let q=0;q<n;q++){while(z[k+1]<q)k++;d[q]=(q-v[k])*(q-v[k])+f[v[k]]}}
TL.edt=function(inside,w,h){
  const gr=new Float64Array(w*h);for(let i=0;i<w*h;i++)gr[i]=inside[i]?1e20:0;
  const n=Math.max(w,h),f=new Float64Array(n),d=new Float64Array(n),v=new Int32Array(n),z=new Float64Array(n+1);
  for(let x=0;x<w;x++){for(let y=0;y<h;y++)f[y]=gr[y*w+x];dt1d(f,h,d,v,z);for(let y=0;y<h;y++)gr[y*w+x]=d[y]}
  for(let y=0;y<h;y++){for(let x=0;x<w;x++)f[x]=gr[y*w+x];dt1d(f,w,d,v,z);for(let x=0;x<w;x++)gr[y*w+x]=Math.sqrt(d[x])}
  return gr};
TL.blur=function(a,w,h,r){const t=new Float32Array(w*h);
  for(let y=0;y<h;y++){let s=0,c=0;const o=y*w;for(let x=0;x<=r&&x<w;x++){s+=a[o+x];c++}
    for(let x=0;x<w;x++){t[o+x]=s/c;const add=x+r+1,rem=x-r;if(add<w){s+=a[o+add];c++}if(rem>=0){s-=a[o+rem];c--}}}
  for(let x=0;x<w;x++){let s=0,c=0;for(let y=0;y<=r&&y<h;y++){s+=t[y*w+x];c++}
    for(let y=0;y<h;y++){a[y*w+x]=s/c;const add=y+r+1,rem=y-r;if(add<h){s+=t[add*w+x];c++}if(rem>=0){s-=t[rem*w+x];c--}}}};
TL.valueNoise=function(w,h,cell,seed){const r=rng(seed),gw=Math.ceil(w/cell)+3,gh=Math.ceil(h/cell)+3,gr=new Float32Array(gw*gh);
  for(let i=0;i<gr.length;i++)gr[i]=r();
  const out=new Float32Array(w*h);
  for(let y=0;y<h;y++){const gy=y/cell,iy=gy|0,fy=gy-iy,sy=fy*fy*(3-2*fy);
    for(let x=0;x<w;x++){const gx=x/cell,ix=gx|0,fx=gx-ix,sx=fx*fx*(3-2*fx);
      const a=gr[iy*gw+ix],b=gr[iy*gw+ix+1],c=gr[(iy+1)*gw+ix],d=gr[(iy+1)*gw+ix+1];
      const top=a+(b-a)*sx;out[y*w+x]=top+((c+(d-c)*sx)-top)*sy}}
  return out};

/* ---------- Buchstabe -> Maske -> Höhenkarte ---------- */
const mctx=document.createElement("canvas").getContext("2d");
TL.BASE_CAP=210;                       /* Höhe des Grossbuchstabens in Pixel bei qs = 1 */
const capCache=new Map();
TL.capRatio=function(font){
  if(capCache.has(font.id))return capCache.get(font.id);
  mctx.font=TL.fontStr(font,200);
  const r=mctx.measureText("H").actualBoundingBoxAscent/200;
  if(!document.fonts||document.fonts.check(TL.fontStr(font,200)))capCache.set(font.id,r);
  return r};
/* Alle Masse hängen an der Grossbuchstabenhöhe, damit jede Schrift gleich gross wirkt. */
TL.params=function(font,qs){
  const CAP=TL.BASE_CAP*qs,SW=Math.round(CAP*.157);
  return{CAP,SW,FS:Math.round(CAP/TL.capRatio(font)),PAD:Math.round(CAP*.143)+Math.round(SW/2),
    R:CAP*.164,br:Math.max(2,Math.round(CAP*.0229)),y0:Math.round(CAP*1.30),h:Math.ceil(CAP*1.80)}};
const bwCache=new Map();
TL.baseWidth=function(ch,font){const key=font.id+ch;
  if(!bwCache.has(key)){const p=TL.params(font,1);mctx.font=TL.fontStr(font,p.FS);
    bwCache.set(key,{w:Math.ceil(mctx.measureText(ch).width)+p.PAD*2,pad:p.PAD})}
  return bwCache.get(key)};

TL.glyph=function(ch,font,qs){
  const P=TL.params(font,qs);
  mctx.font=TL.fontStr(font,P.FS);
  const w=Math.ceil(mctx.measureText(ch).width)+P.PAD*2,h=P.h,N=w*h;
  const cv=document.createElement("canvas");cv.width=w;cv.height=h;
  const c=cv.getContext("2d",{willReadFrequently:true});
  c.font=TL.fontStr(font,P.FS);c.textAlign="center";c.textBaseline="alphabetic";c.lineJoin="round";c.lineWidth=P.SW;
  c.fillStyle=c.strokeStyle="#000";
  c.fillText(ch,w/2,P.y0);
  const Af=new Uint8ClampedArray(N);{const fd=c.getImageData(0,0,w,h).data;for(let i=0;i<N;i++)Af[i]=fd[i*4+3]}
  c.strokeText(ch,w/2,P.y0);
  const D=c.getImageData(0,0,w,h).data,A=new Uint8ClampedArray(N),inside=new Uint8Array(N);
  /* Innenöffnungen (A, B, O, R …) bleiben offen: nur die Aussenkante wird aufgebläht. */
  const outside=new Uint8Array(N),stack=[];
  for(let x=0;x<w;x++){stack.push(x,(h-1)*w+x)}for(let y=0;y<h;y++){stack.push(y*w,y*w+w-1)}
  while(stack.length){const i=stack.pop();if(outside[i]||Af[i]>=128)continue;outside[i]=1;const x=i%w;
    if(x>0)stack.push(i-1);if(x<w-1)stack.push(i+1);if(i>=w)stack.push(i-w);if(i<N-w)stack.push(i+w)}
  for(let i=0;i<N;i++){A[i]=(Af[i]<128&&!outside[i])?Af[i]:D[i*4+3];inside[i]=A[i]>127}
  const dist=TL.edt(inside,w,h),R=P.R,R2=R*2.3,hm=new Float32Array(N);
  for(let i=0;i<N;i++){if(!inside[i])continue;const d=Math.min(dist[i],R)/R,e=1-d;
    hm[i]=R*Math.sqrt(1-e*e)+.5*R*sstep(0,1,Math.min(dist[i],R2)/R2)}
  TL.blur(hm,w,h,P.br);TL.blur(hm,w,h,P.br);
  return{w,h,N,A,inside,dist,hm,P}};

g.TL=TL;
})(window);
