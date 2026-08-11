/* ============================================================
   Shared site footer — injected into <div id="site-footer"></div>
   Reused on every page.
   ============================================================ */
(function(){
  const mount=document.getElementById('site-footer');
  if(!mount)return;

  mount.innerHTML=`
  <div class="foot"><div class="foot-in">
    <h2>Start small. <span>Start today.</span></h2>
    <p>No fixed amount. No pressure. Just a range that fits your life, and a journey that never breaks.</p>
    <button class="big">Start with ₹500</button>
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
      <li style="--i:#FF9966;--j:#FF5E62">
        <a href="https://play.google.com/store/apps/details?id=com.ingood&amp;hl=en_IN" target="_blank" rel="noopener noreferrer" aria-label="InGood on YouTube">
          <span class="icon"><svg viewBox="0 0 24 24"><path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19C0 8.07 0 12 0 12s0 3.93.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.87.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.81M9.55 15.57V8.43L15.82 12z"/></svg></span>
          <span class="title">YouTube</span>
        </a>
      </li>
      <li style="--i:#80FF72;--j:#25D366">
        <a href="https://play.google.com/store/apps/details?id=com.ingood&amp;hl=en_IN" target="_blank" rel="noopener noreferrer" aria-label="InGood on WhatsApp">
          <span class="icon"><svg viewBox="0 0 24 24"><path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.47-2.4-1.48a9 9 0 0 1-1.65-2.06c-.17-.3-.02-.46.13-.6.13-.14.3-.35.44-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37s-1.04 1.02-1.04 2.48 1.07 2.88 1.22 3.07c.15.2 2.1 3.2 5.08 4.49.7.3 1.26.49 1.7.63.7.22 1.36.19 1.87.11.57-.08 1.76-.72 2-1.41.25-.7.25-1.29.18-1.41-.08-.13-.27-.2-.57-.35M12.05 21.8a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26A9.88 9.88 0 0 1 18.9 4.9a9.83 9.83 0 0 1 2.9 7c0 5.45-4.44 9.88-9.89 9.88M20.46 3.49A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.9c0 2.09.55 4.14 1.59 5.94L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.69 1.45c6.55 0 11.89-5.34 11.89-11.9 0-3.18-1.24-6.17-3.48-8.41"/></svg></span>
          <span class="title">WhatsApp</span>
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
      <li style="--i:#B0BEC5;--j:#607D8B">
        <a href="https://play.google.com/store/apps/details?id=com.ingood&amp;hl=en_IN" target="_blank" rel="noopener noreferrer" aria-label="InGood on X">
          <span class="icon"><svg viewBox="0 0 24 24"><path d="M18.24 2.25h3.31l-7.23 8.26L23.13 21.75h-6.66l-5.21-6.82-5.97 6.82H1.98l7.73-8.84L.87 2.25h6.83l4.71 6.23zm-1.16 17.52h1.83L7.08 4.13H5.12z"/></svg></span>
          <span class="title">X</span>
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
