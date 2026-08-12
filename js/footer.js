/* ============================================================
   Shared site footer — injected into <div id="site-footer"></div>
   Reused on every page.
   ============================================================ */
(function(){
  const mount=document.getElementById('site-footer');
  if(!mount)return;

  mount.innerHTML=`
  <div class="foot"><div class="foot-in">
    <h2>Start Small. <span>Start Today.</span></h2>
    <p>No fixed amount. No pressure. Just a range that fits your life, and a journey that never breaks.</p>
    <button class="big">Start Now</button>
    <div class="foot-trust"><span>SEBI Registered</span><span>·</span><span>UPI only</span><span>·</span><span>2‑min setup</span></div>
  </div></div>
  <div class="social-fan">
    <p class="social-fan-title">Follow the journey</p>
    <ul>
      <li style="--i:#a955ff;--j:#ea51ff">
        <a href="https://www.instagram.com/ingoodfinserv/" target="_blank" rel="noopener noreferrer" aria-label="InGood on Instagram">
          <span class="icon"><svg viewBox="0 0 24 24"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.3-1.46.72-2.12 1.38C1.35 2.67.94 3.35.63 4.14.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.3.79.72 1.46 1.38 2.12.66.66 1.33 1.08 2.12 1.38.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56.79-.3 1.46-.72 2.12-1.38.66-.66 1.08-1.33 1.38-2.12.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91-.3-.79-.72-1.46-1.38-2.12A5.9 5.9 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0m0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32M12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8m6.41-10.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88"/></svg></span>
          <span class="title">Instagram</span>
        </a>
      </li>
      <li style="--i:#56CCF2;--j:#2F80ED">
        <a href="https://www.facebook.com/profile.php?id=61588520924862" target="_blank" rel="noopener noreferrer" aria-label="InGood on Facebook">
          <span class="icon"><svg viewBox="0 0 24 24"><path d="M24 12.07C24 5.44 18.63.07 12 .07S0 5.44 0 12.07c0 5.99 4.39 10.95 10.13 11.85v-8.38H7.08v-3.47h3.05V9.43c0-3.01 1.79-4.67 4.53-4.67 1.31 0 2.69.24 2.69.24v2.95h-1.51c-1.5 0-1.96.93-1.96 1.87v2.25h3.33l-.53 3.47h-2.8v8.38C19.61 23.02 24 18.06 24 12.07"/></svg></span>
          <span class="title">Facebook</span>
        </a>
      </li>
      <li style="--i:#00A0DC;--j:#0077B5">
        <a href="https://www.linkedin.com/company/ingood-finserv-private-limited/?viewAsMember=true" target="_blank" rel="noopener noreferrer" aria-label="InGood on LinkedIn">
          <span class="icon"><svg viewBox="0 0 24 24"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"/></svg></span>
          <span class="title">LinkedIn</span>
        </a>
      </li>
    </ul>
  </div>
  <div class="legal">
    <div class="lk"><a href="#">Privacy</a><a href="#">Terms</a><a href="#">SEBI disclosure</a><a href="#">Contact</a></div>
    <p class="fine">Mutual fund investments are subject to market risks. Read all scheme‑related documents carefully. InGood Finserv Pvt. Ltd., Mumbai. SEBI Registered Mutual Fund Distributor. Returns shown are illustrative and not guaranteed.</p>
  </div>`;

  // ---------- FOOTER CTA → Play Store (social links are set in the markup above) ----------
  const APP_URL='https://play.google.com/store/apps/details?id=com.ingood&hl=en_IN';
  const bigCta=mount.querySelector('.big');
  if(bigCta)bigCta.addEventListener('click',()=>window.open(APP_URL,'_blank','noopener'));
})();
