/* ============================================================
   Homepage-specific interactivity
   ============================================================ */

const reduceMotion=window.matchMedia('(prefers-reduced-motion:reduce)').matches;

// ---------- LIVE FEED: dual-row scrolling ticker ----------
const T="assets/testimonials/";
const names=[["Rohit D.","Cab driver · Mumbai",T+"img2.webp"],["Harpreet S.","Farmer · Amritsar",T+"img12.webp"],["Nikhil T.","Barista · Kolkata",T+"img13.webp"],["Ananya K.","Freelancer · Bengaluru",T+"img14.webp"],["Manish P.","Shop owner · Surat",T+"img15.webp"],["Rakesh V.","Accountant · Pune",T+"img16.webp"],["Sneha R.","Teacher · Jaipur",T+"img20.webp"],["Karan B.","Cook · Indore",T+"img21.webp"]];
const amts=[100,150,200,250,300,350,500,150,200,750,100,400];
const row1=document.getElementById('tickRow1'),row2=document.getElementById('tickRow2');
function tickCard(){
  const [nm,role,pic]=names[Math.floor(Math.random()*names.length)];
  const amt=amts[Math.floor(Math.random()*amts.length)];
  const el=document.createElement('div');el.className='tick-card';
  el.innerHTML=`<div class="feed-av"><img src="${pic}" alt="" width="36" height="36" loading="lazy" decoding="async" onerror="var p=this.parentNode;if(p){p.style.background='var(--mint-l)';p.innerHTML='<div style=&quot;width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:15px;color:var(--mint-d);&quot;>${nm[0]}</div>';}"></div><div class="tick-txt"><div class="feed-name">${nm}</div><div class="feed-meta">${role}</div></div><div class="tick-amt">₹${amt}</div>`;
  return el;
}
// populate both rows, then duplicate the whole sequence for a seamless -50% loop
if(row1&&row2){
  const fill=row=>{
    const cards=[];
    for(let i=0;i<16;i++)cards.push(tickCard());
    cards.forEach(c=>row.appendChild(c));               // first half
    cards.forEach(c=>row.appendChild(c.cloneNode(true)));// identical second half
  };
  fill(row1);fill(row2);
}
// today counter tick
let tAmt=482300,tPpl=1247;const tAmtEl=document.getElementById('todayAmt'),tPplEl=document.getElementById('todayPpl');
if(tAmtEl&&tPplEl){
  const countTick=()=>{tAmt+=Math.floor(Math.random()*400)+100;if(Math.random()>0.4)tPpl+=1;tAmtEl.textContent='₹'+tAmt.toLocaleString('en-IN');tPplEl.textContent=tPpl.toLocaleString('en-IN');};
  let countTimer=setInterval(countTick,2600);
  document.addEventListener('visibilitychange',()=>{if(document.hidden){clearInterval(countTimer);countTimer=null;}else if(!countTimer)countTimer=setInterval(countTick,2600);});
}

// ---------- INTERACTIVE SLIDER ----------
const track=document.getElementById('track'),thumb=document.getElementById('thumb'),sFill=document.getElementById('sFill'),demoNum=document.getElementById('demoNum'),demoMsg=document.getElementById('demoMsg'),demoTxt=document.getElementById('demoTxt'),dchips=document.querySelectorAll('.demo-chip');
if(track&&thumb){
  const MAX=2000;let val=350;
  function msgFor(v){
    if(v===0)return['🙌','<b>Tight month? Totally fine.</b> Nothing is deducted, and your journey stays alive. No penalty, ever.'];
    if(v<=200)return['🌱','<b>Small still counts.</b> Every ₹ you put in is doing quiet work. Start where you are.'];
    if(v<=800)return['👍','<b>This feels right.</b> A steady amount inside your comfort zone, exactly what InGood is built for.'];
    if(v<=1400)return['💪','<b>Good month!</b> Investing a little extra now can make a real difference later.'];
    return['🚀','<b>Big push!</b> Great when you can, and no worry at all on the months you can\'t.'];
  }
  function setVal(v,snapChip){
    val=Math.max(0,Math.min(MAX,Math.round(v/10)*10));
    const pct=val/MAX*100;
    sFill.style.width=pct+'%';thumb.style.left=pct+'%';
    demoNum.textContent=val.toLocaleString('en-IN');
    const[emo,txt]=msgFor(val);
    const emoEl=demoMsg.querySelector('.emo');
    // pop the emoji only when it actually changes — not on every drag pixel
    if(emoEl.dataset.emo!==emo){
      emoEl.dataset.emo=emo;
      emoEl.textContent=emo;
      emoEl.classList.remove('pop');void emoEl.offsetWidth;emoEl.classList.add('pop');
    }
    demoTxt.innerHTML=txt;
    demoMsg.style.background=val===0?'rgba(148,163,184,0.14)':'rgba(62,203,165,0.12)';
    track.setAttribute('aria-valuenow',val);
    track.setAttribute('aria-valuetext','₹'+val.toLocaleString('en-IN'));
    dchips.forEach(c=>c.classList.toggle('on',snapChip&&+c.dataset.v===val));
  }
  function fromEvent(e){
    const r=track.getBoundingClientRect();
    const x=(e.touches?e.touches[0].clientX:e.clientX)-r.left;
    setVal(Math.max(0,Math.min(1,x/r.width))*MAX,false);
  }
  let dragging=false;
  function down(e){dragging=true;thumb.classList.add('grab');fromEvent(e);e.preventDefault();}
  function move(e){if(dragging)fromEvent(e);}
  function up(){dragging=false;thumb.classList.remove('grab');}
  track.addEventListener('mousedown',down);window.addEventListener('mousemove',move);window.addEventListener('mouseup',up);
  track.addEventListener('touchstart',down,{passive:false});window.addEventListener('touchmove',move,{passive:false});window.addEventListener('touchend',up);
  dchips.forEach(c=>c.addEventListener('click',()=>setVal(+c.dataset.v,true)));
  track.addEventListener('keydown',e=>{
    const step=e.shiftKey?100:50;let nv=val;
    if(e.key==='ArrowRight'||e.key==='ArrowUp')nv=val+step;
    else if(e.key==='ArrowLeft'||e.key==='ArrowDown')nv=val-step;
    else if(e.key==='Home')nv=0;
    else if(e.key==='End')nv=MAX;
    else if(e.key==='PageUp')nv=val+200;
    else if(e.key==='PageDown')nv=val-200;
    else return;
    e.preventDefault();setVal(nv,true);
  });
  setVal(350,true);
}

// ---------- YOUR MONTHS ----------
const mos=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const mData=[300,500,0,400,650,800,300,0,550,700,450,800];
const monthsBars=document.getElementById('monthsBars'),mMax=Math.max(...mData);
if(monthsBars){
  mData.forEach((v,i)=>{
    const el=document.createElement('div');el.className='mbar'+(v===0?' skip':'');
    el.innerHTML=`<div class="tip">${mos[i]} · ${v===0?'Skipped (₹0)':'₹'+v}</div><div class="amt">${v===0?'skip':'₹'+v}</div><div class="bar" data-h="${v===0?8:Math.round(v/mMax*100)}"></div><div class="mo">${mos[i]}</div>`;
    el.setAttribute('tabindex','0');
    monthsBars.appendChild(el);
  });
  const mTotalEl=document.getElementById('mTotal');
  window.animateMonths=function(){
    const bars=monthsBars.querySelectorAll('.bar');
    const tot=mData.reduce((a,b)=>a+b,0);let cur=0;const step=tot/40;
    const iv=setInterval(()=>{cur+=step;if(cur>=tot){cur=tot;clearInterval(iv);}mTotalEl.textContent='₹'+Math.round(cur).toLocaleString('en-IN');},22);
    if(reduceMotion){
      bars.forEach(b=>{b.style.transition='none';b.style.height=b.dataset.h+'%';});
      return;
    }
    // bounce: each bar pops up, dips down, then settles — staggered left → right
    bars.forEach((b,i)=>{
      b.style.transition='none';b.style.height='0%';
      const h=+b.dataset.h,t=220+i*85;
      setTimeout(()=>{b.style.transition='height .34s cubic-bezier(.2,.8,.2,1)';b.style.height=Math.min(100,h*1.12)+'%';},t);
      setTimeout(()=>{b.style.transition='height .26s cubic-bezier(.2,.8,.2,1)';b.style.height=Math.max(h*.88,4)+'%';},t+400);
      setTimeout(()=>{b.style.transition='height .32s cubic-bezier(.2,.8,.2,1)';b.style.height=h+'%';},t+720);
    });
  };
}

// ---------- GROWTH CHART ----------
const amtChips=document.querySelectorAll('.amount-chips .chip'),yrChips=document.querySelectorAll('.horizon-chips .chip'),gc=document.getElementById('growthChart');
const sI=document.getElementById('sI'),sO=document.getElementById('sO'),sG=document.getElementById('sG'),sX=document.getElementById('sX'),sILabel=document.getElementById('sILabel');
const yAxis=document.querySelector('.chart-yaxis'),xAxis=document.querySelector('.chart-xaxis');
if(gc){
  function fmt(v){return'₹'+Math.round(v).toLocaleString('en-IN');}
  // Short ₹ for axis labels: ₹1.2L / ₹9.4L / ₹1.1Cr
  function fmtShort(v){
    if(v>=1e7)return'₹'+(v/1e7).toFixed(v>=1e8?0:1).replace(/\.0$/,'')+'Cr';
    if(v>=1e5)return'₹'+(v/1e5).toFixed(v>=1e6?0:1).replace(/\.0$/,'')+'L';
    if(v>=1e3)return'₹'+Math.round(v/1e3)+'k';
    return'₹'+Math.round(v);
  }
  // "nice" step so gridlines land on round numbers
  function niceStep(range,target){
    const raw=range/target,mag=Math.pow(10,Math.floor(Math.log10(raw))),n=raw/mag;
    const step=n>=5?5:n>=2.5?5:n>=2?2:1;return step*mag;
  }
  let curM=300,curY=10;

  window.drawGrowth=function(m,years){
    curM=m;curY=years;
    const N=years*12,r=0.12/12,W=320,H=120,p=8;const g=[],inv=[];let v=0;
    for(let i=0;i<=N;i++){inv.push(m*i);g.push(v);v=(v+m)*(1+r);}
    const mx=Math.max(...g,1),tY=x=>H-p-(x/mx)*(H-p*2),tX=i=>(i/N)*W;
    const gP=g.map((x,i)=>`${tX(i).toFixed(1)},${tY(x).toFixed(1)}`).join(' ');
    const iP=inv.map((x,i)=>`${tX(i).toFixed(1)},${tY(x).toFixed(1)}`).join(' ');
    const area=`M0,${H} `+g.map((x,i)=>`L${tX(i).toFixed(1)},${tY(x).toFixed(1)}`).join(' ')+` L${W},${H}Z`;
    // horizontal ₹ gridlines on nice round steps
    const step=niceStep(mx,4);let gridSvg='',yLabels='';
    for(let val=0;val<=mx;val+=step){
      const y=tY(val);
      gridSvg+=`<line class="grid" x1="0" y1="${y.toFixed(1)}" x2="${W}" y2="${y.toFixed(1)}"/>`;
      const topPct=(y/H)*100;
      yLabels+=`<span style="top:${topPct.toFixed(1)}%">${fmtShort(val)}</span>`;
    }
    gc.innerHTML=`<defs><linearGradient id="cg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#3ECBA5" stop-opacity="0.26"/><stop offset="100%" stop-color="#3ECBA5" stop-opacity="0.02"/></linearGradient></defs>${gridSvg}<path d="${area}" fill="url(#cg)"/><polyline points="${iP}" fill="none" stroke="#C8CDD8" stroke-width="1.6" stroke-dasharray="4 4"/><polyline class="draw" points="${gP}" pathLength="100" fill="none" stroke="#00C9A7" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>`;
    if(yAxis)yAxis.innerHTML=yLabels;
    // year axis: 0 … years, ~5 ticks
    if(xAxis){
      const ticks=Math.min(years,5),stepY=years/ticks;let xl='';
      for(let k=0;k<=ticks;k++){const yr=Math.round(k*stepY);const leftPct=(yr/years)*100;xl+=`<span style="left:${leftPct.toFixed(1)}%">${yr===0?'Now':'Y'+yr}</span>`;}
      xAxis.innerHTML=xl;
    }
    // draw animation: reset dash (no transition) then release next frame
    const line=gc.querySelector('.draw');
    if(line&&!reduceMotion){
      line.style.transition='none';line.style.strokeDashoffset='100';void line.offsetWidth;
      line.style.transition='';
      requestAnimationFrame(()=>requestAnimationFrame(()=>{line.style.strokeDashoffset='0';}));
    }
    // glowing marker on the final point
    positionTipDot(tX(N)/W,tY(g[N])/H);
    if(sILabel)sILabel.textContent='You invest';
    setStats(m*N,g[N],g[N]-m*N,g[N]/Math.max(m*N,1),false);
    window.currentSeries={m,N,years,H,p,g,inv,mx,tY:x=>H-p-(x/mx)*(H-p*2)};
  };

  // stat writer — count-up when animate=true, else instant
  let statTimer=null;
  function setStats(invest,become,growth,mult,animate){
    if(statTimer){clearInterval(statTimer);statTimer=null;}
    const write=(inv,bec,grw,mlt)=>{
      sI.textContent=fmt(inv);sO.textContent=fmt(bec);sG.textContent='+'+fmt(grw);
      sX.textContent=mlt.toFixed(1)+'×';
    };
    if(!animate||reduceMotion){write(invest,become,growth,mult);return;}
    let cur=0;const steps=42;
    statTimer=setInterval(()=>{
      cur++;const f=cur/steps;const e=1-Math.pow(1-f,3);// easeOutCubic
      write(invest*e,become*e,growth*e,1+(mult-1)*e);
      if(cur>=steps){clearInterval(statTimer);statTimer=null;write(invest,become,growth,mult);}
    },22);
  }

  // glowing end-dot lives in .chart-wrap (created by the tooltip IIFE below);
  // store target as fractions and place it once the wrap exists.
  let tipFrac={x:0,y:0};
  function positionTipDot(fx,fy){
    tipFrac={x:fx,y:fy};
    const d=document.querySelector('.c-tip-dot');if(!d)return;
    const rc=gc.getBoundingClientRect(),wr=d.parentNode.getBoundingClientRect();
    d.style.left=(rc.left-wr.left+fx*rc.width)+'px';
    d.style.top=(rc.top-wr.top+fy*rc.height)+'px';
    d.classList.add('show');
  }
  window._repositionTipDot=()=>positionTipDot(tipFrac.x,tipFrac.y);

  // first-view count-up + curve draw (called by the reveal observer)
  window.animateGrowth=function(){
    if(!window.currentSeries)return;
    const s=window.currentSeries;
    // re-run the draw so the curve animates when the section scrolls into view,
    // not silently off-screen during the initial render
    const line=gc.querySelector('.draw');
    if(line&&!reduceMotion){
      line.style.transition='none';line.style.strokeDashoffset='100';void line.offsetWidth;
      line.style.transition='';
      requestAnimationFrame(()=>requestAnimationFrame(()=>{line.style.strokeDashoffset='0';}));
    }
    setStats(s.m*s.N,s.g[s.N],s.g[s.N]-s.m*s.N,s.g[s.N]/Math.max(s.m*s.N,1),true);
  };

  amtChips.forEach(c=>c.addEventListener('click',()=>{amtChips.forEach(x=>x.classList.remove('active'));c.classList.add('active');drawGrowth(+c.dataset.v,curY);}));
  yrChips.forEach(c=>c.addEventListener('click',()=>{yrChips.forEach(x=>x.classList.remove('active'));c.classList.add('active');drawGrowth(curM,+c.dataset.y);}));
  drawGrowth(300,10);
}

// ---------- FAQ ----------
document.querySelectorAll('.fq').forEach(q=>q.addEventListener('click',()=>{
  const item=q.parentElement,open=item.classList.toggle('open');
  q.setAttribute('aria-expanded',open);
}));

// Measure each answer so hover-preview and click-open both expand to the right height.
document.querySelectorAll('.fitem').forEach(item=>{
  const fa=item.querySelector('.fa'),inner=fa.querySelector('.fa-in');
  const setH=()=>item.style.setProperty('--fa-h',inner.scrollHeight+'px');
  setH();window.addEventListener('resize',setH);
});

// ---------- REVEAL + trigger months ----------
const revealEls=[...document.querySelectorAll('.reveal')];
function forceReveal(el){
  if(el.classList.contains('in'))return;
  el.classList.add('in');
  if(el.querySelector&&el.querySelector('#monthsBars')&&window.animateMonths){animateMonths();}
  if(el.querySelector&&el.querySelector('#growthChart')&&window.animateGrowth){animateGrowth();}
}
if('IntersectionObserver'in window){
  const io=new IntersectionObserver((es)=>{es.forEach(e=>{if(e.isIntersecting){forceReveal(e.target);io.unobserve(e.target);}});},{threshold:0.15});
  revealEls.forEach(el=>io.observe(el));
  // Safety net: if the observer never fires for something already on-screen
  // (fast scroll on load, some in-app webviews), reveal it after a short delay
  // so content — like the live ticker — can never stay stuck at opacity:0.
  setTimeout(()=>{
    const vh=window.innerHeight||document.documentElement.clientHeight;
    revealEls.forEach(el=>{
      if(el.classList.contains('in'))return;
      const r=el.getBoundingClientRect();
      if(r.top<vh&&r.bottom>0)forceReveal(el);
    });
  },1200);
}else{
  // No IntersectionObserver support → just show everything.
  revealEls.forEach(forceReveal);
}

// ---------- CLICK RIPPLE on all buttons ----------
function attachRipple(el){
  el.style.position=getComputedStyle(el).position==='static'?'relative':el.style.position;
  el.style.overflow='hidden';
  el.addEventListener('pointerdown',e=>{
    if(reduceMotion)return;
    const r=el.getBoundingClientRect(),d=Math.max(r.width,r.height);
    const rp=document.createElement('span');rp.className='ripple';
    rp.style.width=rp.style.height=d+'px';
    rp.style.left=(e.clientX-r.left-d/2)+'px';rp.style.top=(e.clientY-r.top-d/2)+'px';
    el.appendChild(rp);setTimeout(()=>rp.remove(),600);
  });
}
document.querySelectorAll('.nav-cta,.hero-cta,.foot .big,.sc-btn,.demo-chip,.chip').forEach(attachRipple);

// ---------- CTA BUTTONS → open the Play Store listing ----------
// Every primary call-to-action opens the app listing (social links are handled
// separately in footer.js). Functional controls — FAQ toggles, chart chips,
// carousel dots, the nav menu, back-to-top — keep their own behaviour.
const APP_URL='https://play.google.com/store/apps/details?id=com.ingood&hl=en_IN';
document.querySelectorAll('.hero-cta,.plan-cta').forEach(btn=>{
  btn.addEventListener('click',()=>window.open(APP_URL,'_blank','noopener'));
});

// ---------- HERO CURSOR-FOLLOW GLOW ----------
const hero=document.querySelector('.hero');
if(hero&&!reduceMotion&&window.matchMedia('(hover:hover)').matches){
  const glow=document.createElement('div');glow.className='hero-cursor';hero.prepend(glow);
  hero.addEventListener('pointermove',e=>{
    const r=hero.getBoundingClientRect();
    glow.style.left=(e.clientX-r.left)+'px';glow.style.top=(e.clientY-r.top)+'px';glow.style.opacity='1';
  });
  hero.addEventListener('pointerleave',()=>glow.style.opacity='0');
}

// ---------- TRUST CHIPS → tap to reveal ----------
const tstrip=document.querySelector('.tstrip');
if(tstrip){
  const note=document.createElement('div');note.className='tstrip-note';note.id='tstripNote';
  tstrip.parentNode.insertBefore(note,tstrip.nextSibling);
  const chipInfo=[
    'Registered with SEBI as a mutual fund distributor. Your investments go through regulated channels.',
    'No lock‑in period. Your money is never trapped. Start and stop whenever life changes.',
    'Skip any month with zero penalty. Your journey and streak stay perfectly intact.'
  ];
  document.querySelectorAll('.tchip').forEach((chip,i)=>{
    chip.setAttribute('tabindex','0');chip.setAttribute('role','button');
    const show=()=>{
      const open=chip.classList.contains('pop');
      document.querySelectorAll('.tchip').forEach(c=>c.classList.remove('pop'));
      if(open){note.classList.remove('show');return;}
      chip.classList.add('pop');
      note.innerHTML='<b>'+chip.textContent.trim()+'</b>: '+chipInfo[i];
      note.classList.add('show');
    };
    chip.addEventListener('click',show);
    chip.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();show();}});
  });
}

// ---------- VIDEO SLOT → tap to "play" ----------
document.querySelectorAll('.slot').forEach(slot=>{
  if(!slot.querySelector('.play'))return;
  slot.setAttribute('tabindex','0');slot.setAttribute('role','button');
  const prog=document.createElement('div');prog.className='vprog';slot.appendChild(prog);
  const toggle=()=>{
    const playing=slot.classList.toggle('playing');
    const spec=slot.querySelector('.spec b');
    if(spec)spec.dataset.orig=spec.dataset.orig||spec.textContent;
    if(spec)spec.textContent=playing?'▶ Playing preview…':spec.dataset.orig;
    if(playing&&!reduceMotion)setTimeout(()=>{slot.classList.remove('playing');if(spec)spec.textContent=spec.dataset.orig;},8000);
  };
  slot.addEventListener('click',toggle);
  slot.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();toggle();}});
});

// ---------- CAROUSEL: drag-to-scroll + dot indicators ----------
function enhanceCarousel(sel,opts={}){
  const el=document.querySelector(sel);if(!el)return;
  const cards=[...el.children];
  let current=0;
  // Scroll the CONTAINER (not the whole page) so autoplay/dots slide the track
  // sideways instead of yanking the window via scrollIntoView.
  function scrollToCard(i){
    const c=cards[i];if(!c)return;
    const target=c.offsetLeft-(el.clientWidth-c.offsetWidth)/2;
    const max=el.scrollWidth-el.clientWidth;
    el.scrollTo({left:Math.max(0,Math.min(max,target)),behavior:reduceMotion?'auto':'smooth'});
  }
  // dots
  const dots=document.createElement('div');dots.className='cdots';
  cards.forEach((c,i)=>{
    const b=document.createElement('button');b.className='cdot'+(i===0?' on':'');
    b.type='button';b.setAttribute('aria-label','Go to item '+(i+1));
    b.addEventListener('click',()=>scrollToCard(i));
    dots.appendChild(b);
  });
  el.parentNode.insertBefore(dots,el.nextSibling);
  const dotEls=[...dots.children];
  let ticking=false;
  el.addEventListener('scroll',()=>{
    if(ticking)return;ticking=true;
    requestAnimationFrame(()=>{
      const mid=el.scrollLeft+el.clientWidth/2;let best=0,bd=1e9;
      cards.forEach((c,i)=>{const cc=c.offsetLeft+c.offsetWidth/2,d=Math.abs(cc-mid);if(d<bd){bd=d;best=i;}});
      current=best;
      dotEls.forEach((d,i)=>d.classList.toggle('on',i===best));
      ticking=false;
    });
  },{passive:true});
  // drag to scroll
  let down=false,sx=0,sl=0,moved=false;
  el.addEventListener('pointerdown',e=>{down=true;moved=false;sx=e.clientX;sl=el.scrollLeft;});
  el.addEventListener('pointermove',e=>{
    if(!down)return;const dx=e.clientX-sx;
    if(Math.abs(dx)>6){moved=true;el.classList.add('dragging');}
    el.scrollLeft=sl-dx;
  });
  const endDrag=()=>{down=false;el.classList.remove('dragging');};
  el.addEventListener('pointerup',endDrag);el.addEventListener('pointerleave',endDrag);
  el.addEventListener('click',e=>{if(moved){e.preventDefault();e.stopPropagation();}},true);
  // gentle auto-advance (opt-in) — pauses on hover / drag / hidden tab, off for reduced motion
  if(opts.autoplay&&!reduceMotion){
    const gap=opts.interval||4500;let timer=null,resumeT=null;
    const go=i=>scrollToCard(i);
    const play=()=>{if(timer)return;timer=setInterval(()=>go((current+1)%cards.length),gap);};
    const pause=()=>{clearInterval(timer);timer=null;};
    const bump=()=>{pause();clearTimeout(resumeT);resumeT=setTimeout(play,gap+1500);};
    el.addEventListener('pointerenter',pause);
    el.addEventListener('pointerleave',play);
    el.addEventListener('pointerdown',bump);
    el.addEventListener('touchstart',bump,{passive:true});
    document.addEventListener('visibilitychange',()=>document.hidden?pause():play());
    play();
  }
}
// ---------- TESTIMONIALS: seamless infinite marquee ----------
(function(){
  const el=document.querySelector('.tcards');if(!el)return;
  const track=document.createElement('div');track.className='tcards-track';
  const cards=[...el.children];
  cards.forEach(c=>track.appendChild(c));
  // clone the set once so the CSS -50% translate loops with no seam
  cards.forEach(c=>{const clone=c.cloneNode(true);clone.setAttribute('aria-hidden','true');track.appendChild(clone);});
  el.appendChild(track);
})();
enhanceCarousel('.screens');

// ---------- PLAN CARDS: tap to flip on touch (hover handles desktop) ----------
if(!window.matchMedia('(hover:hover)').matches){
  document.querySelectorAll('.plan').forEach(plan=>{
    plan.addEventListener('click',e=>{
      // let the CTA button do its own thing without flipping
      if(e.target.closest('.plan-cta'))return;
      const open=plan.classList.toggle('flipped');
      plan.querySelector('.plan-inner').style.transform=open?'rotateY(180deg)':'';
    });
  });
}

// ---------- GROWTH CHART: interactive hover tooltip ----------
(function(){
  if(!gc)return;
  const wrap=document.createElement('div');wrap.className='chart-wrap';
  gc.parentNode.insertBefore(wrap,gc);wrap.appendChild(gc);
  const line=document.createElement('div');line.className='c-line';
  const dot=document.createElement('div');dot.className='c-dot';
  const tip=document.createElement('div');tip.className='chart-tip';
  const tipDot=document.createElement('div');tipDot.className='c-tip-dot';
  wrap.appendChild(line);wrap.appendChild(dot);wrap.appendChild(tip);wrap.appendChild(tipDot);
  // now that the marker exists inside the wrap, place it on the final point
  if(window._repositionTipDot)window._repositionTipDot();
  window.addEventListener('resize',()=>{if(window._repositionTipDot)window._repositionTipDot();});

  function pointFor(clientX){
    if(!window.currentSeries)return;
    const s=window.currentSeries;
    const rc=gc.getBoundingClientRect();
    let f=(clientX-rc.left)/rc.width;f=Math.max(0,Math.min(1,f));
    const i=Math.round(f*s.N);
    const px=(i/s.N)*rc.width;
    const py=s.tY(s.g[i])/s.H*rc.height;
    line.style.left=px+'px';dot.style.left=px+'px';dot.style.top=py+'px';
    const yr=(i/12).toFixed(1).replace('.0','');
    tip.innerHTML='<b>'+fmt(s.g[i])+'</b>Year '+yr+' · you put in '+fmt(s.inv[i]);
    let tx=px+12;if(tx>rc.width-130)tx=px-130;
    tip.style.left=Math.max(0,tx)+'px';tip.style.top=Math.max(2,py-46)+'px';
    line.style.display=dot.style.display=tip.style.display='block';
  }
  function hide(){line.style.display=dot.style.display=tip.style.display='none';}
  gc.addEventListener('pointermove',e=>pointFor(e.clientX));
  gc.addEventListener('pointerdown',e=>pointFor(e.clientX));
  gc.addEventListener('pointerleave',hide);

  function fmt(v){return'₹'+Math.round(v).toLocaleString('en-IN');}
})();

// ---------- HERO IMAGE → subtle tilt on pointer ----------
const heroVisual=document.querySelector('.hero-visual');
if(heroVisual&&!reduceMotion&&window.matchMedia('(hover:hover)').matches){
  heroVisual.style.transition='transform .2s ease';
  heroVisual.style.transformStyle='preserve-3d';
  heroVisual.addEventListener('pointermove',e=>{
    const r=heroVisual.getBoundingClientRect();
    const rx=((e.clientY-r.top)/r.height-.5)*-7,ry=((e.clientX-r.left)/r.width-.5)*7;
    heroVisual.style.transform=`perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  });
  heroVisual.addEventListener('pointerleave',()=>heroVisual.style.transform='');
}
