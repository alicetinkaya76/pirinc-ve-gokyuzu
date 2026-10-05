/* Gerçek görsel kipi: 3B Atölye'yi müze fotoğrafları ve el yazması çizimleri üzerinden gösterir.
   Parça listesi, açıklama paneli, "Parçaları ayır" ve büyük görünüm 3B şemayla ortaktır. */
(function(){
  'use strict';
  const section=document.getElementById('patlatma');
  const SPECS=window.XP_REAL_SPECS||{};
  if(!section||typeof XPReal!=='function'||!Object.keys(SPECS).length)return;
  const q=s=>section.querySelector(s);
  const select=q('#xp-instrument'),scene=q('#xp-scene'),explode=q('#xp-explode'),visual=q('.xp-visual'),labels=q('#xp-labels'),toolbar=q('.xp-toolbar');
  if(!select||!scene||!explode||!visual||!labels||!toolbar)return;

  const modes=document.createElement('div');modes.className='xp-modes';modes.setAttribute('role','group');modes.setAttribute('aria-label','Görünüm türü');
  const modeButton=(id,text)=>{const b=document.createElement('button');b.type='button';b.className='xp-mode';b.dataset.mode=id;b.textContent=text;b.setAttribute('aria-pressed','false');modes.appendChild(b);return b;};
  const bReal=modeButton('real','Gerçek görseller'),b3d=modeButton('3d','3B şema');
  toolbar.insertBefore(modes,q('#xp-reset'));

  const host=document.createElement('div');host.className='xr-host';visual.insertBefore(host,visual.firstChild);
  const motionHint=document.createElement('p');motionHint.className='xr-motion-hint';motionHint.hidden=true;
  const toMotion=document.createElement('button');toMotion.type='button';toMotion.textContent='3B şemada izleyin';
  motionHint.append('Bu aletin hareketini ',toMotion,'.');host.after(motionHint);
  const switched=document.createElement('p');switched.className='xr-switched';switched.setAttribute('role','status');switched.setAttribute('aria-live','polite');host.after(switched);
  const figure=document.createElement('figure');figure.className='xr-part-figure';figure.hidden=true;q('#xp-detail').after(figure);
  const noteP=q('.xp-note p'),note3d=noteP?noteP.textContent:'';
  const noteReal='Görseller, kaynak kurumlarındaki gerçek nesnelerin fotoğrafları ve el yazması çizimleridir; numaralar, çizgiler ve kesimler bu sayfaya aittir. Her görselin kaynağı ve lisansı altında yazılıdır.';

  let mode='real';try{if(localStorage.getItem('pg-xp-mode')==='3d')mode='3d';}catch(_){}
  let xr=null,cur=null,near=false;

  const names=()=>Array.from(labels.querySelectorAll('.xp-part')).map(b=>{const s=b.children[1];return s&&s.firstChild?s.firstChild.textContent:b.textContent;});
  const selectedPart=()=>{const i=Number(scene.dataset.selectedPart);return Number.isInteger(i)?i:-1;};
  const pick=i=>{const b=labels.querySelector('.xp-part[data-xp-part="'+i+'"]');if(b)b.click();};

  function credit(spec,key){
    const c=spec.credits&&spec.credits[key];if(!c)return null;
    const p=document.createElement('span');
    if(c.url){const a=document.createElement('a');a.href=c.url;a.target='_blank';a.rel='noopener';a.textContent=c.text;p.append(a);}else p.append(c.text);
    if(c.license){p.append(' (');if(c.licenseUrl){const a=document.createElement('a');a.href=c.licenseUrl;a.target='_blank';a.rel='noopener license';a.textContent=c.license;p.append(a);}else p.append(c.license);p.append(')');}
    return p;
  }
  function showFigure(sel){
    const spec=SPECS[cur],pi=spec&&spec.partImages&&spec.partImages[String(sel)];
    figure.replaceChildren();
    if(mode!=='real'||!pi||sel<0){figure.hidden=true;return;}
    const img=document.createElement('img');img.src=pi.src;img.alt=pi.caption||'';img.width=pi.w;img.height=pi.h;img.loading='lazy';img.decoding='async';
    const cap=document.createElement('figcaption');cap.append(pi.caption||'');
    const c=credit(spec,pi.credit);if(c){cap.append(' — ',c);}
    figure.append(img,cap);figure.hidden=false;
  }
  function sync(){
    if(!xr||mode!=='real')return;/* 3B şemadayken sürgüye ve görünüme dokunulmaz; gerçek kipe dönünce apply() eşitler */
    const sel=selectedPart(),from=xr.view;let ok=xr.select(sel);switched.textContent='';
    if(sel>=0&&!ok){const vs=xr.viewsWith(sel);if(vs.length){xr.setView(vs[0].id);ok=xr.select(sel);switched.textContent='Bu parça “'+from.label+'” görselinde yok; “'+vs[0].label+'” görseline geçildi.';}}
    const need=sel>=0?xr.minTFor(sel):0;
    if(need>Number(explode.value)&&xr.moves()){explode.value=String(need);explode.dispatchEvent(new Event('input',{bubbles:true}));}
    showFigure(sel);
  }
  function onView(v,moving){explode.disabled=mode==='real'&&!moving;switched.textContent='';}
  /* Motorun iskeleti hemen kurulur (sahne yüksekliği baştan belli: bölüm sonradan uzamaz, çapalar kaymaz);
     görseller ise yalnız gerçek kipte ve bölüm yakındayken indirilir. */
  function build(){
    if(xr){xr.destroy();xr=null;}
    const id=select.value,spec=SPECS[id];cur=spec?id:null;
    if(spec){const v=Number(explode.value);xr=XPReal(host,spec,{partNames:names(),t:Number.isFinite(v)?v:.55,onPick:pick,onView,defer:true});}
    apply();
  }
  const fetchImages=()=>{if(xr&&near&&mode==='real')xr.load();};
  function apply(){
    const real=mode==='real'&&!!cur;
    section.classList.toggle('xp-mode-real',real);
    bReal.setAttribute('aria-pressed',String(real));b3d.setAttribute('aria-pressed',String(!real));
    bReal.disabled=!cur;host.hidden=!real;
    motionHint.hidden=!(real&&['compass','pump'].includes(select.value));
    if(noteP)noteP.textContent=real?noteReal:note3d;
    if(real&&xr){fetchImages();onView(xr.view,xr.moves());xr.relayout();sync();}else{explode.disabled=false;figure.hidden=true;}
  }
  const setMode=m=>{mode=m;if(window.pgTrack)pgTrack('xp_mode',{mode:m});try{localStorage.setItem('pg-xp-mode',m);}catch(_){}
    if(m==='real')near=true;
    apply();if(m==='3d')dispatchEvent(new Event('resize'));};
  bReal.addEventListener('click',()=>setMode('real'));
  b3d.addEventListener('click',()=>setMode('3d'));
  /* Oynat düğmesi, 3B sahne yeniden görünür sayılana dek (bir iki kare) devre dışıdır; odak hazır olunca taşınır. */
  toMotion.addEventListener('click',()=>{setMode('3d');const play=document.getElementById('xp-play'),step=document.getElementById('xp-step');let n=0;
    const go=()=>{if(play&&!play.disabled)play.focus({preventScroll:true});else if(++n<30)requestAnimationFrame(go);else if(step)step.focus({preventScroll:true});};
    if(step)step.focus({preventScroll:true});requestAnimationFrame(go);});
  select.addEventListener('change',build);
  select.addEventListener('change',()=>{if(window.pgTrack)pgTrack('xp_instrument',{instrument:select.value});});
  explode.addEventListener('input',()=>{if(xr)xr.setT(Number(explode.value));});
  q('#xp-reset').addEventListener('click',()=>{if(!xr)return;const spec=SPECS[cur];if(spec&&spec.default&&xr.view&&xr.view.id!==spec.default)xr.setView(spec.default);xr.setT(Number(explode.value));xr.resetAngle();sync();});
  new MutationObserver(sync).observe(scene,{attributes:true,attributeFilter:['data-selected-part']});

  /* Görseller yalnız bölüme yaklaşınca yüklenir; iskelet ve kip sınıfı hemen uygulanır ki 3B şema bir an görünmesin. */
  build();
  if('IntersectionObserver' in window){
    const io=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){io.disconnect();near=true;fetchImages();}},{rootMargin:'900px 0px'});
    io.observe(section);
  }else{near=true;fetchImages();}
})();
