// ===== CONFIGURATION =====
const LOGO_PATH = "./assets/oblivion-logo.png";

document.addEventListener('DOMContentLoaded', () => {
  initNavScroll();
  initMobileDrawer();
  initCopyEmail();
  initRevealOnScroll();
  initOpsCounters();
  initHeroGraph();
});

// ===== Sticky nav background on scroll =====
function initNavScroll(){
  const nav = document.getElementById('site-nav');
  const onScroll = () => {
    if (window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive:true });
  onScroll();
}

// ===== Mobile drawer =====
function initMobileDrawer(){
  const toggle = document.getElementById('drawer-toggle');
  const drawer = document.getElementById('mobile-drawer');
  toggle.addEventListener('click', () => {
    const isOpen = drawer.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    drawer.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
  });
  drawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ===== Copy email to clipboard =====
function initCopyEmail(){
  const btn = document.getElementById('copy-email');
  const confirm = document.getElementById('copy-confirm');
  const email = "oblivion330121@gmail.com";
  btn.addEventListener('click', async () => {
    try{
      await navigator.clipboard.writeText(email);
      confirm.textContent = "COPIED";
      setTimeout(() => confirm.textContent = "", 2000);
    }catch(e){
      confirm.textContent = "COPY FAILED";
    }
  });
}

// ===== Scroll reveal =====
function initRevealOnScroll(){
  const sections = document.querySelectorAll('.section, .contact-section');
  sections.forEach(s => s.classList.add('reveal'));
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold:0.15 });
  sections.forEach(s => observer.observe(s));
}

// ===== Animated counters in Operations panel =====
function initOpsCounters(){
  const els = document.querySelectorAll('.ops-val[data-count]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        animateCount(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold:0.4 });
  els.forEach(el => observer.observe(el));
}
function animateCount(el){
  const target = parseInt(el.dataset.count, 10);
  const original = el.textContent;
  let current = 0;
  const step = Math.max(1, Math.round(target / 30));
  const interval = setInterval(() => {
    current += step;
    if (current >= target){
      el.textContent = original;
      clearInterval(interval);
    } else {
      el.textContent = original.includes('/') ? `${current} / 07` : String(current).padStart(2,'0');
    }
  }, 30);
}

// ===== Hero synthetic intelligence graph (SVG) =====
function initHeroGraph(){
  const svg = document.getElementById('graph-svg');
  if (!svg) return;

  const W = 600, H = 500;
  const labels = ['NODE','ENTITY','DATASET','PIPELINE','MODEL','EVENT','OBJECT'];
  const nodeCount = 16;
  const nodes = [];

  for (let i = 0; i < nodeCount; i++){
    nodes.push({
      x: 60 + Math.random() * (W - 120),
      y: 60 + Math.random() * (H - 120),
      r: 3 + Math.random() * 4,
      label: labels[Math.floor(Math.random() * labels.length)] + '-' + String(Math.floor(Math.random()*90)+10).padStart(2,'0')
    });
  }

  // Build links between nearby-ish nodes (synthetic, not distance-accurate)
  const links = [];
  nodes.forEach((n, i) => {
    const linkCount = 1 + Math.floor(Math.random() * 2);
    for (let k = 0; k < linkCount; k++){
      const j = Math.floor(Math.random() * nodeCount);
      if (j !== i) links.push([i, j]);
    }
  });

  const ns = 'http://www.w3.org/2000/svg';
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);

  links.forEach(([a,b]) => {
    const line = document.createElementNS(ns, 'line');
    line.setAttribute('x1', nodes[a].x);
    line.setAttribute('y1', nodes[a].y);
    line.setAttribute('x2', nodes[b].x);
    line.setAttribute('y2', nodes[b].y);
    line.setAttribute('stroke', 'rgba(255,255,255,0.12)');
    line.setAttribute('stroke-width', '1');
    svg.appendChild(line);
  });

  nodes.forEach((n, i) => {
    const circle = document.createElementNS(ns, 'circle');
    circle.setAttribute('cx', n.x);
    circle.setAttribute('cy', n.y);
    circle.setAttribute('r', n.r);
    circle.setAttribute('fill', i % 5 === 0 ? '#5B7CFA' : '#F1F3F4');
    circle.setAttribute('opacity', '0.85');
    svg.appendChild(circle);

    if (i % 3 === 0){
      const text = document.createElementNS(ns, 'text');
      text.setAttribute('x', n.x + 8);
      text.setAttribute('y', n.y - 8);
      text.setAttribute('font-size', '8');
      text.setAttribute('font-family', 'JetBrains Mono, monospace');
      text.setAttribute('fill', 'rgba(255,255,255,0.45)');
      text.textContent = n.label;
      svg.appendChild(text);
    }
  });
}
