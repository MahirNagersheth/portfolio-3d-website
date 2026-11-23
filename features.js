// Mahir Nagersheth — portfolio features layered on top of main.js
// (classic script: shares main.js globals such as focusPlanet, PLANETS,
//  PLANET_BY_ID, SUBSECTION_SELECTORS, clickScrollUntil, LITE, track).
//
//   1. Mission Briefing      — one-screen recruiter summary
//   2. Mission logs          — case studies behind work + project cards
//   3. Constellation map     — skills as stars, linked by shared projects
//   4. Flight recorder       — career timeline that flies the camera
//   5. Dialog focus handling — focus moves in, stays in, and returns
//   6. Analytics             — optional GoatCounter + outbound/resume events

(function () {
  'use strict';

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const el = (tag, cls, text) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  };
  const isTyping = (e) => /^(input|textarea|select)$/i.test(e.target?.tagName || '') || e.target?.isContentEditable;

  // Generic open/close for the [hidden] modals in index.html
  function openModal(id) { document.getElementById(id)?.removeAttribute('hidden'); }
  function closeModal(id) { document.getElementById(id)?.setAttribute('hidden', ''); }
  function wireModal(id) {
    const m = document.getElementById(id);
    if (!m) return;
    $$('[data-close]', m).forEach(b => b.addEventListener('click', () => closeModal(id)));
    addEventListener('keydown', e => {
      if (e.key === 'Escape' && !m.hasAttribute('hidden')) { e.stopImmediatePropagation(); closeModal(id); }
    });
  }

  // ==========================================================
  //  1. Mission Briefing
  // ==========================================================
  wireModal('briefing-modal');
  function openBriefing() { openModal('briefing-modal'); track('briefing-open'); }
  $$('[data-open-briefing]').forEach(b => b.addEventListener('click', openBriefing));
  addEventListener('keydown', e => {
    if ((e.key === 'b' || e.key === 'B') && !isTyping(e) && !e.metaKey && !e.ctrlKey && !e.altKey && !anyOverlayOpen()) {
      openBriefing();
    }
  });

  // ==========================================================
  //  2. Mission logs
  // ==========================================================
  const LOGS = {
    goldman: {
      eyebrow: 'Goldman Sachs · Risk Division',
      title: 'Risk Engineering Summer Analyst',
      meta: 'Dallas, TX · June – August 2026',
      mission: 'Turn Snowflake risk data from four risk programs into automated, Board-ready reporting — and make it easy for stakeholders to interrogate.',
      approach: [
        'Built a Python/SQL pipeline ingesting Snowflake data across 4 risk programs, caching filtered datasets in Parquet.',
        'Automated Board report generation — KPI calculations, Matplotlib charts, and a standardized report template.',
        'Engineered LLM prompts over the Snowflake risk data to generate contextual insights alongside the automated KPIs and visualizations.',
        'Published the reports to a SharePoint AI agent so stakeholders could query and interpret the data through a chat interface.',
      ],
      stack: ['Python', 'SQL', 'Snowflake', 'Parquet', 'Matplotlib', 'LLMs', 'SharePoint AI agent'],
      note: 'Internal systems and data are confidential — this log covers only what is shareable.',
    },
    rapidops: {
      eyebrow: 'Rapidops Inc. · Ahmedabad, India',
      title: 'Data Analyst Intern',
      meta: 'January – May 2025',
      mission: 'Move data from three CRM/ERP ecosystems into a faster, cleaner warehouse and reporting layer.',
      approach: [
        'Architected Azure Data Factory pipelines on Azure Synapse processing 50K+ daily records.',
        'Designed warehouse schema mappings in SQL Server (SSMS) across 3 CRM/ERP ecosystems.',
        'Deployed an Azure Synapse + Snowflake warehouse with a SQL pool.',
        'Built a Power BI dashboard with 60+ DAX measures for statistical decision-making.',
      ],
      outcome: ['Refresh latency down 15%', 'Query latency down 35%'],
      stack: ['Azure Data Factory', 'Azure Synapse', 'Snowflake', 'SQL Server', 'Power BI', 'DAX', 'T-SQL'],
    },
    agentic: {
      eyebrow: 'CMU Agentic Systems Studio · Spring 2026',
      title: 'AI-Powered Agentic Portfolio Management System',
      meta: 'With Raj Bhuyan & Sanath Mahesh Kumar',
      mission: 'Can a team of LLM agents make portfolio decisions that are explainable, risk-controlled, and safe to hand to a human for sign-off?',
      approach: [
        'A 13-agent, 7-stage LangGraph pipeline analyzes stocks across fundamentals, technicals, sentiment, and news.',
        'An adversarial bull/bear debate stress-tests every thesis before it reaches the risk team.',
        'A three-perspective risk team enforces a hard 20% concentration cap.',
        'Human-in-the-loop approval gates every paper-executed trade.',
        'Every LLM call has a deterministic rule-based fallback; every decision lands in an append-only audit trail.',
      ],
      outcome: [
        'CLASSic evaluation across 10 normal, adversarial, and failure scenarios',
        'Backtested across 3 stress periods — COVID, the 2021/22 rate hikes, and the 2023 SVB collapse',
      ],
      stack: ['LangGraph', 'LLM agents', 'Python', 'Groq', 'Streamlit', 'SQLite'],
      links: [
        ['Live demo', 'https://portfolio-agent-system-gvbz3pbxkyadcbzijueteb.streamlit.app/'],
        ['5-min walkthrough', 'https://youtu.be/sNbteh8wBLY'],
        ['Paper (PDF)', 'agentic-portfolio-paper.pdf'],
      ],
    },
    dit: {
      eyebrow: 'Deep Generative Models · Carnegie Mellon',
      title: 'Time-Adaptive Masked DiT × Optimal-Transport Flow',
      meta: 'With Zhixuan Jiang & Mahika Gunjkar',
      mission: 'Two training-time accelerators for diffusion transformers — OT coupling for flow matching and time-adaptive token masking. Do they compound?',
      approach: [
        'Class-conditional latent Diffusion Transformer (DiT-XL backbone) for ImageNet-100, trained on VAE-compressed latents.',
        'Minibatch optimal-transport coupling for flow matching.',
        'A time-adaptive token-masking schedule during training.',
        'A 2×2 factorial study at fixed scale to isolate each intervention and their interaction.',
      ],
      outcome: [
        'The effects are non-additive: neither helps alone, but together they beat the additive baseline by 1.9 FID points',
        'Protocol: Heun-40 sampler, CFG 1.75, 5k samples',
      ],
      stack: ['PyTorch', 'Diffusion models', 'Flow matching', 'DiT-XL', 'VAE latents', 'FID'],
      links: [
        ['GitHub', 'https://github.com/MahikaGunjkar/Hw5DiffusionTeam6'],
        ['Walkthrough', 'https://youtu.be/hQw28E0EF9Q'],
        ['Report (PDF)', 'dit-ot-flow-report.pdf'],
      ],
    },
    knee: {
      eyebrow: 'Deep Learning · Medical imaging',
      title: 'Knee Arthritis Detection · Multi-CNN',
      meta: 'Pandit Deendayal Energy University',
      mission: 'Detect early-stage knee arthritis from X-ray images to support faster, earlier diagnosis.',
      approach: [
        'Built a multi-CNN diagnostic model using ResNet101, VGG16/19, DenseNet121, and MobileNetV2.',
        'Compared the architectures to select the strongest performer.',
      ],
      outcome: ['98% accuracy', '0.97 AUC'],
      stack: ['TensorFlow', 'PyTorch', 'CNNs', 'Matplotlib'],
      links: [['GitHub', 'https://github.com/MahirNagersheth/Knee-Arthritis-Detection-System']],
    },
    fuel: {
      eyebrow: 'Published · IEEE Xplore',
      title: 'Predicting Vehicle Fuel Efficiency with ML',
      meta: 'Presented at ICONAT 2024 · Published December 2024',
      mission: 'Which classical ML model predicts vehicle fuel efficiency best?',
      approach: [
        'Implemented six algorithms: Random Forest, KNN, Decision Tree, SVM, Linear and Ridge Regression.',
        'Compared them head-to-head on the same data.',
      ],
      outcome: ['Decision Tree won with an RMSE of 2.75'],
      stack: ['Python', 'scikit-learn', 'Pandas', 'NumPy'],
      links: [['IEEE Xplore', 'https://ieeexplore.ieee.org/document/10775078']],
    },
    credit: {
      eyebrow: 'Deployed app',
      title: 'Credit Risk Prediction App',
      meta: 'Streamlit',
      mission: 'Predict credit default risk from applicant data, despite heavy class imbalance.',
      approach: [
        'EDA and feature engineering to handle class imbalance.',
        'Tree-based classifiers — Decision Tree, Random Forest, ExtraTrees, and XGBoost — tuned with GridSearchCV.',
        'Shipped behind a Streamlit front-end.',
      ],
      stack: ['XGBoost', 'scikit-learn', 'Streamlit', 'Pandas'],
    },
  };

  const logModal = document.getElementById('log-modal');
  wireModal('log-modal');

  function renderLog(key, num) {
    const log = LOGS[key];
    const body = $('#log-body');
    if (!log || !body) return;
    body.replaceChildren();
    body.append(el('span', 'log-eyebrow', `Mission log ${String(num).padStart(2, '0')} · ${log.eyebrow}`));
    const h = el('h3', 'log-title', log.title); h.id = 'log-title';
    body.append(h, el('p', 'log-meta', log.meta));

    const section = (label, node) => {
      const sec = el('section', 'log-sec');
      sec.append(el('h4', 'log-label', label), node);
      body.append(sec);
    };
    section('Mission', el('p', 'log-mission', log.mission));
    const ul = el('ul', 'log-list');
    log.approach.forEach(a => ul.append(el('li', null, a)));
    section('Flight plan', ul);
    if (log.outcome?.length) {
      const out = el('div', 'log-outcomes');
      log.outcome.forEach(o => out.append(el('span', 'log-outcome', o)));
      section('Telemetry', out);
    }
    const st = el('div', 'log-stack');
    log.stack.forEach(t => st.append(el('span', null, t)));
    section('Instruments', st);
    if (log.links?.length) {
      const lk = el('div', 'log-links');
      log.links.forEach(([label, href]) => {
        const a = el('a', null, label + ' →');
        a.href = href; a.target = '_blank'; a.rel = 'noopener';
        lk.append(a);
      });
      body.append(lk);
    }
    if (log.note) body.append(el('p', 'log-note', log.note));
  }

  $$('[data-log]').forEach((card, i) => {
    const key = card.dataset.log;
    if (!LOGS[key]) return;
    const btn = el('button', 'log-btn', 'Open mission log');
    btn.type = 'button';
    btn.prepend(el('span', 'log-btn-dot'));
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      renderLog(key, i + 1);
      openModal('log-modal');
      logModal?.querySelector('.log-panel')?.scrollTo?.(0, 0);
      track('mission-log/' + key);
    });
    const slot = card.querySelector('.project-links') || card.querySelector('.work-tags') || card.querySelector('.project-stack');
    if (slot) slot.after(btn); else card.append(btn);
  });

  // ==========================================================
  //  3. Constellation map (skills ↔ projects ↔ roles)
  // ==========================================================
  (function constellation() {
    const wrap = $('.skills-constellation');
    const grid = $('.sc-grid', wrap || document);
    const hint = $('.sc-hint', wrap || document);
    if (!wrap || !grid) return;
    const chips = $$('.sc-chip', grid);
    const chipByTag = new Map(chips.map(c => [c.dataset.tag, c]));
    const cards = $$('.project-card[data-tags], .work-card[data-tags]');
    const tagsOf = (card) => (card.dataset.tags || '').split(/\s+/).filter(Boolean);
    const defaultHint = hint?.textContent || '';

    // Edges: two skills are linked when they were used together somewhere
    const edges = new Map();
    cards.forEach(card => {
      const t = tagsOf(card).filter(x => chipByTag.has(x));
      for (let i = 0; i < t.length; i++) for (let j = i + 1; j < t.length; j++) {
        const k = [t[i], t[j]].sort().join('|');
        edges.set(k, (edges.get(k) || 0) + 1);
      }
    });

    const NS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('class', 'sc-lines');
    svg.setAttribute('aria-hidden', 'true');
    grid.prepend(svg);
    const lines = [];
    edges.forEach((w, k) => {
      const [a, b] = k.split('|');
      const ln = document.createElementNS(NS, 'line');
      ln.dataset.a = a; ln.dataset.b = b;
      ln.style.setProperty('--w', String(Math.min(3, w)));
      svg.append(ln);
      lines.push(ln);
    });

    function layout() {
      const g = grid.getBoundingClientRect();
      svg.setAttribute('width', g.width);
      svg.setAttribute('height', g.height);
      const center = (c) => {
        const r = c.getBoundingClientRect();
        return [r.left - g.left + 10, r.top - g.top + r.height / 2];   // the star dot sits at the chip's left
      };
      lines.forEach(ln => {
        const [x1, y1] = center(chipByTag.get(ln.dataset.a));
        const [x2, y2] = center(chipByTag.get(ln.dataset.b));
        ln.setAttribute('x1', x1); ln.setAttribute('y1', y1);
        ln.setAttribute('x2', x2); ln.setAttribute('y2', y2);
      });
    }
    if ('ResizeObserver' in window) new ResizeObserver(layout).observe(grid);
    document.fonts?.ready?.then(layout);
    layout();

    // Which planets hold cards using this skill → glow them in the 3D scene
    function planetsFor(matched) {
      const ids = new Set();
      matched.forEach(c => { const sec = c.closest('section[id]'); if (sec && PLANET_BY_ID[sec.id]) ids.add(sec.id); });
      return ids;
    }
    function glow(ids) {
      PLANETS.forEach(p => {
        if (mode === 'planet' && activePlanetId === p.id) return;   // render loop owns the active planet
        p.material.emissiveIntensity = ids.has(p.id) ? 0.95 : 0.18;
      });
      requestRender();
    }

    function apply(tag) {
      const matched = tag ? cards.filter(c => tagsOf(c).includes(tag)) : [];
      cards.forEach(card => {
        const hit = matched.includes(card);
        card.classList.toggle('skill-highlight', !!tag && hit);
        card.classList.toggle('skill-dim', !!tag && !hit && card.classList.contains('project-card'));
      });
      const near = new Set();
      lines.forEach(ln => {
        const on = !!tag && (ln.dataset.a === tag || ln.dataset.b === tag);
        ln.classList.toggle('lit', on);
        if (on) near.add(ln.dataset.a === tag ? ln.dataset.b : ln.dataset.a);
      });
      chips.forEach(c => {
        c.classList.toggle('lit', c.dataset.tag === tag);
        c.classList.toggle('near', near.has(c.dataset.tag));
      });
      grid.classList.toggle('has-focus', !!tag);
      glow(planetsFor(matched));
      if (hint) {
        if (!tag) { hint.textContent = defaultHint; return; }
        const proj = matched.filter(c => c.classList.contains('project-card')).length;
        const roles = matched.filter(c => c.classList.contains('work-card')).length;
        const parts = [];
        if (proj) parts.push(`${proj} project${proj === 1 ? '' : 's'}`);
        if (roles) parts.push(`${roles} role${roles === 1 ? '' : 's'}`);
        hint.textContent = `${chipByTag.get(tag).textContent.trim()} — ${parts.join(' · ') || 'coursework'}`;
      }
    }
    chips.forEach(chip => {
      chip.addEventListener('mouseenter', () => apply(chip.dataset.tag));
      chip.addEventListener('mouseleave', () => apply(null));
      chip.addEventListener('focus', () => apply(chip.dataset.tag));
      chip.addEventListener('blur', () => apply(null));
    });
  })();

  // ==========================================================
  //  4. Flight recorder — replay the journey through the system
  // ==========================================================
  (function flightRecorder() {
    const box = $('#flight-recorder');
    if (!box) return;
    const stops = $$('.fr-stop', box);
    const playBtn = $('#fr-play', box);
    const hud = el('div', 'tour-indicator fr-hud');
    hud.setAttribute('role', 'status');
    document.body.append(hud);
    let playing = false, idx = -1, timer = null;

    function cardFor(stop) {
      const planet = stop.dataset.planet;
      const sel = SUBSECTION_SELECTORS[planet];
      if (!sel || stop.dataset.card == null) return null;
      return $$(`#${planet} ${sel}`)[+stop.dataset.card] || null;
    }
    function flyTo(stop) {
      stops.forEach(s => s.classList.toggle('on', s === stop));
      const planet = stop.dataset.planet;
      focusPlanet(planet, false);                   // camera + comet flight path
      clickScrollUntil = performance.now() + 1800;  // don't let scroll logic fight the flight
      const card = cardFor(stop);
      (card || document.getElementById(planet))?.scrollIntoView({
        behavior: LITE ? 'auto' : 'smooth', block: card ? 'center' : 'start',
      });
      card?.classList.add('fr-arrive');
      setTimeout(() => card?.classList.remove('fr-arrive'), 1600);
    }
    function showHud(stop, i) {
      hud.replaceChildren(
        el('span', 'fr-hud-step', `${i + 1}/${stops.length}`),
        el('span', 'fr-hud-text', `${stop.querySelector('.fr-date')?.textContent} · ${stop.querySelector('.fr-name')?.textContent}`),
        el('span', 'fr-hud-hint', 'Esc to stop'),
      );
      hud.classList.add('active');
    }
    function stop() {
      if (!playing) return;
      playing = false; clearTimeout(timer);
      hud.classList.remove('active');
      if (playBtn) playBtn.textContent = '▶ Replay the journey';
      ['wheel', 'touchstart', 'keydown'].forEach(ev => removeEventListener(ev, interrupt, true));
    }
    function next() {
      idx++;
      if (idx >= stops.length) { stop(); return; }
      flyTo(stops[idx]); showHud(stops[idx], idx);
      timer = setTimeout(next, 3400);
    }
    // Any manual scroll / key press hands control back to the visitor
    function interrupt(e) {
      if (e.type === 'keydown' && e.key === 'Escape') e.stopImmediatePropagation();
      stop();
    }
    function play() {
      if (playing) { stop(); return; }
      playing = true; idx = -1;
      if (playBtn) playBtn.textContent = '■ Stop';
      track('flight-recorder');
      next();
      setTimeout(() => ['wheel', 'touchstart', 'keydown'].forEach(ev => addEventListener(ev, interrupt, { capture: true, passive: true })), 300);
    }
    playBtn?.addEventListener('click', play);
    stops.forEach(s => s.addEventListener('click', () => { stop(); flyTo(s); }));
  })();

  // ==========================================================
  //  5. Dialog focus handling (a11y)
  //  Opening moves focus inside; Tab stays inside modal dialogs;
  //  closing returns focus to whatever opened it.
  // ==========================================================
  (function dialogFocus() {
    const IDS = ['cheatsheet', 'changelog-modal', 'yt-modal', 'search-palette', 'add-self-modal', 'ask-panel', 'briefing-modal', 'log-modal'];
    const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select, textarea, iframe, [tabindex]:not([tabindex="-1"])';
    const visibleFocusables = (root) => $$(FOCUSABLE, root).filter(n => n.offsetParent !== null || n === document.activeElement);

    IDS.forEach(id => {
      const dlg = document.getElementById(id);
      if (!dlg) return;
      let opener = null;
      new MutationObserver(() => {
        if (!dlg.hasAttribute('hidden')) {
          if (!opener) opener = document.activeElement;
          if (!dlg.contains(document.activeElement)) {
            const target = dlg.querySelector('[data-autofocus]') || visibleFocusables(dlg)[0];
            target?.focus({ preventScroll: true });
          }
        } else if (opener) {
          const o = opener; opener = null;
          if (document.contains(o) && o !== document.body) o.focus({ preventScroll: true });
        }
      }).observe(dlg, { attributes: true, attributeFilter: ['hidden'] });
    });

    document.addEventListener('keydown', e => {
      if (e.key !== 'Tab') return;
      const dlg = IDS.map(id => document.getElementById(id))
        .find(d => d && !d.hasAttribute('hidden') && d.getAttribute('aria-modal') === 'true');
      if (!dlg) return;
      const f = visibleFocusables(dlg);
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (!dlg.contains(document.activeElement)) { e.preventDefault(); first.focus(); }
      else if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
  })();

  // ==========================================================
  //  6. Analytics (GoatCounter — free, cookieless). Set
  //     window.GOATCOUNTER_CODE in index.html to turn it on.
  // ==========================================================
  (function analytics() {
    const code = window.GOATCOUNTER_CODE;
    if (code && /^[a-z0-9-]+$/i.test(code)) {
      const s = document.createElement('script');
      s.async = true;
      s.dataset.goatcounter = `https://${code}.goatcounter.com/count`;
      s.src = 'https://gc.zgo.at/count.js';
      document.head.append(s);
    }
    document.addEventListener('click', e => {
      const a = e.target.closest?.('a[href]');
      if (!a) return;
      const href = a.getAttribute('href');
      if (/^resume\.pdf/.test(href)) track('resume-download');
      else if (href.startsWith('mailto:')) track('email');
      else if (href.startsWith('tel:')) track('phone');
      else if (/linkedin\.com/.test(href)) track('linkedin');
      else if (/github\.com/.test(href)) track('github');
      else if (/^https?:/.test(href)) track('outbound/' + new URL(href).hostname);
    }, true);
  })();
})();
