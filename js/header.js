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

  <div class="app-fabs" role="group" aria-label="Download the InGood app">
    <a class="app-fab app-fab-android" href="https://play.google.com/store/apps/details?id=com.ingood&amp;hl=en_IN" target="_blank" rel="noopener noreferrer" aria-label="Get InGood on Google Play" title="Get it on Google Play">
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.6 9.48l1.84-3.18a.38.38 0 0 0-.14-.52.38.38 0 0 0-.52.14l-1.87 3.23a11.43 11.43 0 0 0-8.82 0L6.22 5.92a.38.38 0 0 0-.52-.14.38.38 0 0 0-.14.52L7.4 9.48A10.81 10.81 0 0 0 2 18h20a10.81 10.81 0 0 0-5.4-8.52M7.3 15.09a1.06 1.06 0 1 1 1.06-1.06 1.06 1.06 0 0 1-1.06 1.06m9.4 0a1.06 1.06 0 1 1 1.06-1.06 1.06 1.06 0 0 1-1.06 1.06"/></svg>
    </a>
    <a class="app-fab app-fab-ios" href="https://apps.apple.com/in/app/ingood/id6752019056" target="_blank" rel="noopener noreferrer" aria-label="Download InGood on the App Store" title="Download on the App Store">
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.05 12.54c-.03-2.68 2.19-3.96 2.29-4.03-1.25-1.83-3.19-2.08-3.88-2.11-1.65-.17-3.22.97-4.06.97-.83 0-2.12-.95-3.49-.92-1.8.03-3.46 1.04-4.38 2.65-1.87 3.24-.48 8.03 1.34 10.66.89 1.29 1.95 2.73 3.34 2.68 1.34-.05 1.85-.87 3.47-.87 1.62 0 2.08.87 3.49.84 1.44-.02 2.35-1.31 3.23-2.61 1.02-1.5 1.44-2.95 1.46-3.03-.03-.01-2.8-1.07-2.83-4.24M14.38 4.57c.74-.89 1.24-2.13 1.1-3.37-1.07.04-2.36.71-3.12 1.6-.68.79-1.28 2.05-1.12 3.26 1.19.09 2.4-.6 3.14-1.49"/></svg>
    </a>
  </div>

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
