/* GERÇEK GÖRSEL ATÖLYESİ — müze fotoğrafları ve el yazması çizimlerinden kesilmiş katmanlar.
   Katmanlar CSS 3B dönüşümüyle yığılır ve "Parçaları ayır" ile birbirinden uzaklaşır.
   Numaralar, çizgiler ve kesimler bize aittir; görsellerin kendisi kaynak kurumundandır. */
(function(root){
  'use strict';
  const NS='http://www.w3.org/2000/svg';
  const el=(tag,cls,text)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(text!=null)n.textContent=text;return n;};
  const sv=(tag,attrs)=>{const n=document.createElementNS(NS,tag);for(const k in attrs)n.setAttribute(k,attrs[k]);return n;};
  const pad=i=>String(i+1).padStart(2,'0');
  const EASE={out:t=>1-(1-t)*(1-t),in:t=>t*t,inout:t=>t<.5?2*t*t:1-2*(1-t)*(1-t)};
  const lerp=(a,b,t)=>a+(b-a)*t;
  const moves=v=>v.type==='stack'&&(v.layers||[]).some(l=>(l.explode||[]).some(Boolean)||l.scale||l.rotate);

  function XPReal(host,spec,opts){
    opts=opts||{};
    const wrap=el('div','xr');
    const tabs=el('div','xr-tabs');tabs.setAttribute('role','group');tabs.setAttribute('aria-label','Görsel seçin');
    const stage=el('div','xr-stage');stage.tabIndex=0;stage.setAttribute('role','group');
    const fit=el('div','xr-fit');
    const world=el('div','xr-world');
    const overlay=el('div','xr-overlay');
    const lines=sv('svg',{class:'xr-lines','aria-hidden':'true'});
    const note=el('p','xr-note');
    const credit=el('p','xr-credit');
    fit.appendChild(world);overlay.appendChild(lines);stage.append(fit,overlay);wrap.append(tabs,stage,note,credit);host.appendChild(wrap);

    let view=null,t=typeof opts.t==='number'?opts.t:.55,selected=-1,tilt=0,spin=0,dy=0,layers=[],pins=[],raf=0,alive=true,loaded=!opts.defer;
    const views=spec.views||[];
    const partName=(i,hs)=>(hs&&hs.label)||(opts.partNames&&opts.partNames[i])||(spec.partNames&&spec.partNames[i])||('Parça '+(i+1));
    const tabButtons=views.map(v=>{
      const b=el('button','xr-tab',v.label);b.type='button';b.setAttribute('aria-pressed','false');
      b.addEventListener('click',()=>setView(v.id));tabs.appendChild(b);return b;
    });
    tabs.hidden=views.length<2;

    function creditText(keys){
      const seen=new Set(),list=[];
      keys.forEach(k=>{if(!k||seen.has(k))return;seen.add(k);const c=spec.credits&&spec.credits[k];if(c)list.push(c);});
      credit.replaceChildren();
      list.forEach((c,i)=>{
        if(i)credit.append(' · ');
        if(c.url){const a=el('a',null,c.text);a.href=c.url;a.target='_blank';a.rel='noopener';credit.append(a);}else credit.append(c.text);
        if(c.license){credit.append(' (');if(c.licenseUrl){const a=el('a',null,c.license);a.href=c.licenseUrl;a.target='_blank';a.rel='noopener license';credit.append(a);}else credit.append(c.license);credit.append(')');}
      });
      if(list.length)credit.append('. Numaralar, çizgiler ve kesimler bu sayfaya aittir.');
    }

    function shapeNodes(s,w,h,part){
      const make=cls=>{
        const st={class:cls,'vector-effect':'non-scaling-stroke'};let n;
        if(s.type==='circle')n=sv('circle',Object.assign(st,{cx:s.cx*w,cy:s.cy*h,r:s.r*w}));
        else if(s.type==='ellipse')n=sv('ellipse',Object.assign(st,{cx:s.cx*w,cy:s.cy*h,rx:s.rx*w,ry:s.ry*h},s.rot?{transform:`rotate(${s.rot} ${s.cx*w} ${s.cy*h})`}:{}));
        else n=sv(s.closed?'polygon':'polyline',Object.assign(st,{points:(s.points||[]).map(p=>(p[0]*w)+','+(p[1]*h)).join(' ')}));
        n.dataset.part=part;if(s.dash)n.classList.add('dash');return n;
      };
      return [make('xr-shape-halo'),make('xr-shape')];
    }

    function build(){
      world.replaceChildren();overlay.querySelectorAll('.xr-pin,.xr-label').forEach(n=>n.remove());lines.replaceChildren();dy=0;fit.style.transform='';
      const fr=view.frame||{w:view.w,h:view.h};
      const L=view.type==='image'?[{id:'img',src:view.src,w:view.w,h:view.h,box:[0,0,fr.w,fr.h],z:0,parts:[],credit:view.credit,alt:view.alt}]:view.layers;
      layers=L.map(d=>{
        const n=el('div','xr-layer');n.dataset.layer=d.id;
        if(d.pivot)n.style.transformOrigin=(d.pivot[0]*100)+'% '+(d.pivot[1]*100)+'%';
        const img=el('img');img.alt=d.alt||'';img.decoding='auto';img.draggable=false;img.width=d.w;img.height=d.h;
        img.addEventListener('load',schedule);if(loaded)img.src=d.src;else img.dataset.src=d.src;
        const svg=sv('svg',{viewBox:`0 0 ${d.w} ${d.h}`,preserveAspectRatio:'none','aria-hidden':'true'});
        n.append(img,svg);world.appendChild(n);
        return {d,n,svg};
      });
      const byId=new Map(layers.map(l=>[l.d.id,l]));
      pins=[];const labelled=new Set();
      (view.hotspots||[]).forEach(hs=>{
        const L=byId.get(hs.layer||'img')||layers[0];if(!L)return;
        const a=el('i','xr-anchor');a.style.left=(hs.x*100)+'%';a.style.top=(hs.y*100)+'%';L.n.appendChild(a);
        (hs.shapes||[]).forEach(s=>shapeNodes(s,L.d.w,L.d.h,hs.part).forEach(g=>L.svg.appendChild(g)));
        const pin=el('button','xr-pin',String(hs.part+1));pin.type='button';pin.dataset.part=hs.part;
        pin.setAttribute('aria-label',pad(hs.part)+' · '+partName(hs.part,hs));
        pin.addEventListener('click',e=>{e.stopPropagation();opts.onPick&&opts.onPick(hs.part);});
        overlay.appendChild(pin);
        let label=null;
        if(!labelled.has(hs.part)){
          labelled.add(hs.part);
          label=el('button','xr-label');label.type='button';label.dataset.part=hs.part;label.tabIndex=-1;label.setAttribute('aria-hidden','true');/* erişilebilir ad ve odak numaralı iğnede; etiket yalnız fareyle/dokunarak seçim için */
          label.append(el('span','xr-no',pad(hs.part)),el('span',null,partName(hs.part,hs)));
          label.addEventListener('click',e=>{e.stopPropagation();opts.onPick&&opts.onPick(hs.part);});
          overlay.appendChild(label);
        }
        const line=sv('line',{class:'xr-line'});line.dataset.part=hs.part;lines.appendChild(line);
        pins.push({hs,a,pin,label,line,L});
      });
      tilt=view.tilt||0;spin=view.spin||0;
      wrap.classList.toggle('xr-stack',view.type==='stack');wrap.classList.toggle('xr-3d',tilt>0);
      stage.setAttribute('aria-label',(view.label||'')+(tilt>0?' · Ok tuşlarıyla ya da sürükleyerek açıyı değiştirebilirsiniz':''));
      stage.tabIndex=tilt>0?0:-1;/* düz görünümde sahnenin klavye işi yok: sekme durağı yalnız iğnelerde */
      note.textContent=view.note||'';note.hidden=!view.note;
      creditText(L.map(d=>d.credit).concat(view.credits||[]));
      applySelection();layout();
    }

    function layout(){
      if(!alive||!view)return;
      const W=stage.clientWidth;if(!W)return;
      const fr=view.frame||{w:view.w,h:view.h};
      const mode=view.labels||'side';
      const wide=W>=640&&pins.length>0&&mode==='side';
      const gutter=wide?Math.min(190,Math.round(W*.22)):0;wrap.style.setProperty('--xr-gutter',gutter+'px');
      const asp=Array.isArray(view.aspect)?Math.max(view.aspect[0],view.aspect[1]):(view.aspect||fr.h/fr.w);
      /* sahne en çok ekranın %80'i; büyük görünüm penceresinde pencerenin boş yüksekliği */
      const dlg=stage.closest('dialog[open]');
      const cap=dlg?Math.max(300,dlg.clientHeight-230):Math.max(360,(root.innerHeight||900)*.8);
      let ww=W-2*gutter,sh=ww*asp;
      if(sh>cap){ww=cap/asp;sh=cap;}
      const scale=ww/fr.w,hh=fr.h*scale;
      stage.style.height=Math.round(sh)+'px';
      Object.assign(world.style,{left:Math.round((W-ww)/2)+'px',top:Math.round((sh-hh)/2)+'px',width:ww+'px',height:hh+'px',
        transform:tilt||spin?`rotateX(${tilt}deg) rotateZ(${spin}deg)`:'none'});
      layers.forEach(l=>{
        const d=l.d,[x,y,w,h]=d.box,e=d.explode||[0,0,0],k=(EASE[d.ease]||(v=>v))(t);
        const sc=d.scale?lerp(d.scale[0],d.scale[1],k):1,rot=d.rotate?lerp(d.rotate[0],d.rotate[1],k):0;
        Object.assign(l.n.style,{left:(x*scale)+'px',top:(y*scale)+'px',width:(w*scale)+'px',height:(h*scale)+'px',opacity:d.opacity!=null?String(d.opacity):'',
          transform:`translate3d(${e[0]*k*scale}px,${e[1]*k*scale}px,${((d.z||0)+e[2]*k)*scale}px)`+(sc!==1?` scale(${sc})`:'')+(rot?` rotate(${rot}deg)`:'')});
      });
      wrap.classList.toggle('xr-wide',wide);wrap.dataset.labels=mode;
      schedule();
    }

    function schedule(){if(!raf)raf=requestAnimationFrame(()=>{raf=0;if(alive){recentre();placePins();}});}
    /* Yığın, her ayrışma düzeyinde sahnenin ortasında kalsın (sahne yüksekliği sabit: sayfa zıplamaz). */
    function recentre(){
      if(view.type!=='stack'||view.fit===false){fit.style.transform='';return;}
      const sr=stage.getBoundingClientRect();let top=Infinity,bot=-Infinity;
      layers.forEach(l=>{if(l.d.opacity===0)return;const r=l.n.getBoundingClientRect();if(!r.height)return;top=Math.min(top,r.top-sr.top);bot=Math.max(bot,r.bottom-sr.top);});
      if(!isFinite(top))return;
      const H=sr.height,shift=bot-top>H-12?6-top:H/2-(top+bot)/2;
      if(Math.abs(shift)<.5)return;
      dy+=shift;fit.style.transform=`translateY(${dy}px)`;
    }
    function placePins(){
      const sr=stage.getBoundingClientRect();if(!sr.width)return;
      const W=sr.width,H=sr.height,mode=wrap.dataset.labels,wide=wrap.classList.contains('xr-wide');
      const pts=pins.map(p=>{const r=p.a.getBoundingClientRect();return {p,x:r.left-sr.left,y:r.top-sr.top,on:t>=(p.hs.minT??0)-1e-6&&t<=(p.hs.maxT??1)+1e-6};});
      pts.forEach(({p,x,y,on})=>{p.pin.style.left=x+'px';p.pin.style.top=y+'px';p.pin.hidden=!on;});
      lines.setAttribute('viewBox',`0 0 ${W} ${H}`);
      pts.forEach(o=>{o.p.line.setAttribute('visibility','hidden');if(o.p.label)o.p.label.hidden=true;});
      if(mode==='inline'&&W>=480){
        pts.forEach(o=>{if(!o.p.label||!o.on)return;const L=o.p.label;L.hidden=false;const w=L.offsetWidth,h=L.offsetHeight;
          let lx=o.x+18;if(lx+w>W-6)lx=o.x-18-w;L.style.left=Math.max(6,lx)+'px';L.style.top=Math.max(6,Math.min(H-h-6,o.y-h/2))+'px';});
        return;
      }
      if(!wide)return;
      const cols={left:[],right:[]};
      pts.forEach(o=>{if(!o.p.label||!o.on)return;o.p.label.hidden=false;const s=o.p.hs.side;(s==='left'||(!s&&o.x<W/2)?cols.left:cols.right).push(o);});
      const gap=8;
      for(const side of ['left','right']){
        const list=cols[side].sort((a,b)=>a.y-b.y);
        list.forEach(o=>{o.h=o.p.label.offsetHeight||26;o.w=o.p.label.offsetWidth||120;o.ly=o.y-o.h/2;});
        const push=()=>{for(let i=0;i<list.length;i++){if(list[i].ly<6)list[i].ly=6;if(i&&list[i].ly<list[i-1].ly+list[i-1].h+gap)list[i].ly=list[i-1].ly+list[i-1].h+gap;}};
        push();
        const last=list[list.length-1],over=last?last.ly+last.h-(H-6):0;
        if(over>0){list.forEach(o=>o.ly-=over);push();}
        list.forEach(o=>{
          const lx=side==='left'?6:W-6-o.w;
          o.p.label.style.left=lx+'px';o.p.label.style.top=o.ly+'px';
          const ex=side==='left'?lx+o.w:lx,ey=o.ly+o.h/2;
          Object.entries({x1:o.x,y1:o.y,x2:ex,y2:ey}).forEach(([k,v])=>o.p.line.setAttribute(k,v));o.p.line.setAttribute('visibility','visible');
        });
      }
    }

    function applySelection(){
      const has=selected>=0;
      wrap.classList.toggle('xr-has-sel',has);
      layers.forEach(l=>{const on=has&&(l.d.parts||[]).includes(selected);l.n.classList.toggle('on',on);l.n.classList.toggle('dim',has&&!on&&(l.d.parts||[]).length>0);});
      pins.forEach(p=>{const on=p.hs.part===selected;p.pin.classList.toggle('on',on);p.pin.setAttribute('aria-pressed',String(on));if(p.label)p.label.classList.toggle('on',on);p.line.classList.toggle('on',on);});
      world.querySelectorAll('.xr-shape,.xr-shape-halo').forEach(s=>s.classList.toggle('on',Number(s.dataset.part)===selected));
    }

    function setView(id){
      view=views.find(v=>v.id===id)||views[0];
      tabButtons.forEach((b,i)=>b.setAttribute('aria-pressed',String(views[i]===view)));
      build();opts.onView&&opts.onView(view,moves(view));
    }
    const hasPart=i=>!!(view&&(view.hotspots||[]).some(h=>h.part===i));
    /* parça yalnız belli bir ayrışmadan sonra görünüyorsa (minT), o eşiği bildir */
    const minTFor=i=>{const hs=view?(view.hotspots||[]).filter(h=>h.part===i):[];return hs.length?Math.min(...hs.map(h=>h.minT||0)):0;};
    const viewsWith=i=>views.filter(v=>(v.hotspots||[]).some(h=>h.part===i));

    /* sürükleyerek açı: fare iki eksende, dokunmatik yalnız yatayda (dikey kaydırma sayfaya kalır) */
    let drag=null;
    stage.addEventListener('pointerdown',e=>{if(!view||!tilt&&!view.tilt)return;if(e.target.closest('.xr-pin,.xr-label'))return;drag={x:e.clientX,y:e.clientY,tilt,spin,touch:e.pointerType!=='mouse'};try{stage.setPointerCapture(e.pointerId);}catch(_){}stage.classList.add('dragging');});
    stage.addEventListener('pointermove',e=>{if(!drag)return;spin=drag.spin+(e.clientX-drag.x)*.35;if(!drag.touch)tilt=Math.max(0,Math.min(78,drag.tilt-(e.clientY-drag.y)*.3));layout();});
    const end=()=>{drag=null;stage.classList.remove('dragging');};
    stage.addEventListener('pointerup',end);stage.addEventListener('pointercancel',end);
    stage.addEventListener('keydown',e=>{
      if(!view||!view.tilt)return;
      const k={ArrowLeft:[-8,0],ArrowRight:[8,0],ArrowUp:[0,-5],ArrowDown:[0,5]}[e.key];if(!k)return;e.preventDefault();
      spin+=k[0];tilt=Math.max(0,Math.min(78,tilt+k[1]));layout();
    });
    const ro='ResizeObserver' in root?new ResizeObserver(()=>layout()):null;
    if(ro)ro.observe(stage);else root.addEventListener('resize',layout);

    setView(spec.default||(views[0]&&views[0].id));
    return {
      el:wrap,setView,hasPart,viewsWith,minTFor,
      get view(){return view;},
      moves:()=>!!view&&moves(view),
      setT(v){t=Math.max(0,Math.min(1,v));layout();},
      select(i){selected=Number.isInteger(i)?i:-1;applySelection();schedule();return hasPart(selected);},
      resetAngle(){tilt=view.tilt||0;spin=view.spin||0;layout();},
      relayout:layout,
      /* defer:true ile kurulduysa görseller ancak bu çağrıyla indirilir (iskelet ve sahne yüksekliği önceden hazırdır). */
      load(){if(loaded)return;loaded=true;world.querySelectorAll('img[data-src]').forEach(i=>{i.src=i.dataset.src;i.removeAttribute('data-src');});},
      destroy(){alive=false;if(ro)ro.disconnect();else root.removeEventListener('resize',layout);if(raf)cancelAnimationFrame(raf);wrap.remove();}
    };
  }
  root.XPReal=XPReal;
})(window);
