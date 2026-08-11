/* ============================================================
   Shared site header — injected into <div id="site-header"></div>
   Also injects the scroll-progress bar + back-to-top button, and
   wires up: mobile menu, sticky capsule nav, scroll progress,
   back-to-top, and nav scroll-spy.
   Reused on every page. Nav links point at index.html#... so they
   work from any sub-page; the scroll-spy only lights up sections
   that actually exist on the current page.
   ============================================================ */
(function(){
  const mount=document.getElementById('site-header');
  if(!mount)return;

  mount.innerHTML=`
  <a id="top"></a>
  <div class="scroll-prog" id="scrollProg"></div>
  <button class="to-top" id="toTop" type="button" aria-label="Back to top"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg></button>

  <nav class="nav"><div class="nav-in">
    <a href="index.html" class="logo" aria-label="InGood home"><span class="in">In</span><span class="good">Good</span></a>
    <ul class="nav-links" id="navLinks">
      <li><a href="index.html#how">How it works</a></li>
      <li><a href="index.html#reviews">Reviews</a></li>
      <li><a href="index.html#plans">Plans</a></li>
      <li><a href="index.html#why">Why InGood</a></li>
      <li><a href="index.html#growth">Growth</a></li>
      <li><a href="index.html#faq">FAQ</a></li>
    </ul>
    <div class="nav-right">
      <button class="nav-cta" type="button">Get the app</button>
      <button class="nav-toggle" id="navToggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="navLinks"><span></span><span></span><span></span></button>
    </div>
  </div></nav>`;

  const reduceMotion=window.matchMedia('(prefers-reduced-motion:reduce)').matches;

  // ---------- NAV: mobile menu ----------
  const navToggle=document.getElementById('navToggle'),navLinks=document.getElementById('navLinks');
  function closeNav(){navLinks.classList.remove('open');navToggle.classList.remove('open');navToggle.setAttribute('aria-expanded','false');navToggle.setAttribute('aria-label','Open menu');}
  navToggle.addEventListener('click',()=>{
    const open=navLinks.classList.toggle('open');
    navToggle.classList.toggle('open',open);
    navToggle.setAttribute('aria-expanded',open);
    navToggle.setAttribute('aria-label',open?'Close menu':'Open menu');
  });
  navLinks.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeNav));
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeNav();});

  // ---------- SCROLL PROGRESS + BACK-TO-TOP + STICKY CAPSULE NAV ----------
  const scrollProg=document.getElementById('scrollProg'),toTop=document.getElementById('toTop'),navEl=document.querySelector('.nav');
  let scrollRAF=false;
  function onScroll(){
    if(scrollRAF)return;scrollRAF=true;
    requestAnimationFrame(()=>{
      const h=document.documentElement,st=h.scrollTop||document.body.scrollTop;
      const sh=h.scrollHeight-h.clientHeight;
      scrollProg.style.width=(sh>0?(st/sh)*100:0)+'%';
      toTop.classList.toggle('show',st>600);
      navEl.classList.toggle('shrunk',st>40);
      scrollRAF=false;
    });
  }
  window.addEventListener('scroll',onScroll,{passive:true});onScroll();
  toTop.addEventListener('click',()=>window.scrollTo({top:0,behavior:reduceMotion?'auto':'smooth'}));

  // ---------- NAV SCROLL-SPY ----------
  // Read the fragment from each link (href may be "index.html#why") and only
  // track sections present on this page — sub-pages without them just skip.
  const spyLinks=[...navLinks.querySelectorAll('a')];
  const spyMap=spyLinks.map(a=>{
    const href=a.getAttribute('href')||'';
    const hash=href.includes('#')?'#'+href.split('#')[1]:'';
    return{a,sec:hash?document.querySelector(hash):null};
  }).filter(x=>x.sec);
  if(spyMap.length){
    const spyIO=new IntersectionObserver(es=>{
      es.forEach(e=>{if(e.isIntersecting){
        spyMap.forEach(x=>x.a.classList.toggle('active',x.sec===e.target));
      }});
    },{rootMargin:'-45% 0px -50% 0px'});
    spyMap.forEach(x=>spyIO.observe(x.sec));
  }

  // ---------- NAV CTA → Play Store ----------
  const APP_URL='https://play.google.com/store/apps/details?id=com.ingood&hl=en_IN';
  const navCta=mount.querySelector('.nav-cta');
  if(navCta)navCta.addEventListener('click',()=>window.open(APP_URL,'_blank','noopener'));
})();
