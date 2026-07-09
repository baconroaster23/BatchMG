

(function () {
  "use strict";


  const particleLayer = document.querySelector(".particles");
  if (particleLayer) {
    const count = window.innerWidth < 700 ? 12 : 28;
    for (let i = 0; i < count; i++) {
      const p = document.createElement("div");
      p.className = "particle";
      p.style.left = Math.random() * 100 + "%";
      p.style.animationDuration = 12 + Math.random() * 18 + "s";
      p.style.animationDelay = -Math.random() * 20 + "s";
      p.style.opacity = 0.2 + Math.random() * 0.4;
      particleLayer.appendChild(p);
    }
  }


  const blobs = document.querySelectorAll(".blob");
  window.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    blobs.forEach((b, i) => {
      const depth = (i + 1) * 12;
      b.style.transform = `translate(${x * depth}px, ${y * depth}px)`;
    });
  });


  const terminal = document.querySelector(".terminal");
  const wrap = document.querySelector(".terminal-wrap");
  if (terminal && wrap) {
    let raf;
    wrap.addEventListener("mousemove", (e) => {
      const rect = wrap.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        terminal.style.transform =
          `rotateY(${dx * 8}deg) rotateX(${-dy * 8}deg) translateZ(0)`;
      });
    });
    wrap.addEventListener("mouseleave", () => {
      terminal.style.transform = "rotateY(0deg) rotateX(0deg)";
    });
  }


  const termBody = document.getElementById("term-body");
  if (termBody) {

    const script = [
      { t: "C:\\BatchManager> ", c: "prompt" },
      { t: "batch search git\n", c: "" , delay: 400 },
      { t: "✔ ", c: "ok" },
      { t: "Syncing repository...\n", c: "dim", delay: 600 },
      { t: "✔ ", c: "ok" },
      { t: "Package found\n\n", c: "dim", delay: 400 },
      { t: "  Git\n", c: "val" },
      { t: "  Version 2.51\n\n", c: "dim" },
      { t: "Done.\n\n", c: "ok", delay: 500 },
      { t: "C:\\BatchManager> ", c: "prompt" },
    ];

    const cursor = document.createElement("span");
    cursor.className = "cursor";

    function typeSegment(seg, done) {
      const span = document.createElement("span");
      if (seg.c) span.className = seg.c;
      termBody.insertBefore(span, cursor);
      let i = 0;
      const speed = 18 + Math.random() * 20;
      function tick() {
        span.textContent += seg.t[i++];
        if (i < seg.t.length) setTimeout(tick, speed);
        else setTimeout(done, seg.delay || 60);
      }
      tick();
    }

    function runOnce(done) {
      termBody.innerHTML = "";
      termBody.appendChild(cursor);
      let idx = 0;
      function next() {
        if (idx >= script.length) { setTimeout(done, 2500); return; }
        typeSegment(script[idx++], next);
      }
      next();
    }
    function loop() { runOnce(loop); }
    loop();
  }


  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll(".reveal, .timeline-step").forEach((el) => io.observe(el));

  const dlBtn = document.getElementById("download-bat");
  if (dlBtn) {
    dlBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const a = document.createElement("a");
      a.href = "https://github.com/baconroaster23/install";
      a.download = "Installer.bat";
      document.body.appendChild(a);
      a.click();
      a.remove();
    });
  }


  const nav = document.querySelector(".nav");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) nav.style.background = "rgba(9, 14, 26, 0.85)";
    else nav.style.background = "rgba(9, 14, 26, 0.6)";
  });
})();
