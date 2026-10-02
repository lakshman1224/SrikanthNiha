document.addEventListener('DOMContentLoaded', () => {
  const pages = Array.from(document.querySelectorAll('.page'));
  const pageNo = document.getElementById('page');
  const music = document.getElementById('weddingMusic');
  const musicBtn = document.getElementById('musicBtn');
  const musicLabel = document.getElementById('musicLabel');
  const reveal = document.getElementById('reveal');
  const details = document.getElementById('details');
  const hint = document.getElementById('hint');
  let current = 1;
  let countdownTimer = null;

  // True page-by-page navigation. No scrolling between sections.
  function go(n) {
    n = Math.max(1, Math.min(pages.length, Number(n) || 1));
    current = n;
    pages.forEach((page, i) => {
      const active = i === n - 1;
      page.classList.toggle('active', active);
      page.setAttribute('aria-hidden', active ? 'false' : 'true');
    });
    document.querySelectorAll('nav button[data-go]').forEach(btn => {
      btn.classList.toggle('active', Number(btn.dataset.go) === n);
    });
    if (pageNo) pageNo.textContent = String(n).padStart(2,'0') + ' / ' + String(pages.length).padStart(2,'0');
  }

  // Every invitation button and bottom page button uses data-go.
  document.querySelectorAll('[data-go]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      go(btn.dataset.go);
    });
  });

  // Expose navigation for compatibility.
  window.go = go;
  window.nextPage = () => go(current + 1);
  window.prevPage = () => go(current - 1);

  // Muhurtham reveal.
  function startCountdown() {
    const target = Date.parse('2026-10-29T19:29:00+05:30');
    const d = document.getElementById('d');
    const h = document.getElementById('h');
    const m = document.getElementById('m');
    const s = document.getElementById('s');
    if (!d || !h || !m || !s) return;
    const tick = () => {
      const diff = Math.max(0, target - Date.now());
      d.textContent = String(Math.floor(diff / 86400000)).padStart(2,'0');
      h.textContent = String(Math.floor(diff / 3600000) % 24).padStart(2,'0');
      m.textContent = String(Math.floor(diff / 60000) % 60).padStart(2,'0');
      s.textContent = String(Math.floor(diff / 1000) % 60).padStart(2,'0');
    };
    tick();
    clearInterval(countdownTimer);
    countdownTimer = setInterval(tick, 1000);
  }
  startCountdown();

  if (reveal) {
    reveal.addEventListener('click', e => {
      e.preventDefault();
      if (details) details.classList.add('show');
      if (hint) hint.textContent = 'శుభ ముహూర్తం ఇదిగో మీ ముందుంది ✨';
      reveal.textContent = '♥ మంగళ ముహూర్తం ♥';
      startCountdown();
    });
  }

  // Music: intentionally 25% volume.
  if (music) {
    music.volume = 0.125;
    music.loop = true;
  }
  function musicUI(on) {
    if (musicBtn) {
      musicBtn.classList.toggle('on', on);
      musicBtn.setAttribute('aria-pressed', String(on));
      musicBtn.textContent = on ? '❚❚' : '♫';
    }
    if (musicLabel) musicLabel.textContent = on ? 'Music ON' : 'Music OFF';
  }
  if (music && musicBtn) {
    music.addEventListener('play', () => musicUI(true));
    music.addEventListener('pause', () => musicUI(false));
    musicBtn.addEventListener('click', async e => {
      e.preventDefault();
      e.stopPropagation();
      try {
        if (music.paused) await music.play();
        else music.pause();
      } catch (err) {
        musicUI(false);
      }
    });
  }


  // Lightweight falling petals.
  const petals = document.getElementById('petals');
  if (petals) {
    setInterval(() => {
      const p = document.createElement('i');
      p.className = 'petal';
      p.style.left = Math.random() * 100 + 'vw';
      p.style.setProperty('--x', (Math.random() * 180 - 90) + 'px');
      p.style.animationDuration = (7 + Math.random() * 7) + 's';
      petals.appendChild(p);
      setTimeout(() => p.remove(), 15000);
    }, 850);
  }

  go(1);
});

document.addEventListener("DOMContentLoaded", () => {
  const music = document.getElementById("weddingMusic");
  if (music) music.volume = 0.125;
});
