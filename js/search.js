/**
 * AIUNITES Site-Wide Search
 * Drop this file into any AIUNITES page that loads search.js
 * Ctrl+K or click the search button to open.
 */
(function () {

  // ── Search Index ─────────────────────────────────────────────────────────
  // Each entry: { title, desc, tag, url, keywords }
  // tag drives the coloured pill; url is relative (works on any subdomain/GH Pages)
  var SEARCH_INDEX = [

    // ── Main pages ──
    { title: 'Home', desc: 'AIUNITES — middleware network of 18 connected web applications sharing auth, data sync, and notation protocols.', tag: 'Page', url: 'index.html', keywords: 'home aiunites middleware network overview' },
    { title: 'Network', desc: 'The 18 AIUNITES sites — VideoBate, Redomy, AIByJob, Gameatica, InThisWorld, BodSpas, VoiceStry, and more.', tag: 'Page', url: 'network.html', keywords: 'network sites apps webring portfolio' },
    { title: 'Identity', desc: 'Cross-site authentication — shared user table, session auth, demo mode, admin roles, DemoTemplate system.', tag: 'Page', url: 'identity.html', keywords: 'identity authentication login auth users sessions admin' },
    { title: 'Data', desc: 'CloudDB sync — local-first data storage with cloud sync via Google Forms and Apps Script. Offline-capable.', tag: 'Page', url: 'data.html', keywords: 'data clouddb sync local storage offline backup restore' },
    { title: 'Movement — HMN Notation', desc: 'Human Movement Notation family: MNN for body movement, VRN for voice, VNN for AI synthesis. Write once, use everywhere.', tag: 'Page', url: 'movement.html', keywords: 'hmn mnn vrn vnn movement notation body voice avatar' },
    { title: 'Consulting', desc: 'Middleware and integration architecture, vanilla JS web app development, AI integration. We run the network we consult on.', tag: 'Page', url: 'consulting.html', keywords: 'consulting services middleware web development ai integration' },
    { title: 'Press & Articles', desc: 'Long-form writing on open standards, middleware architecture, movement notation, and the AIUNITES network.', tag: 'Page', url: 'press.html', keywords: 'press articles blog writing editorial' },
    { title: 'Legal', desc: 'Privacy policy, terms of service, and legal information for AIUNITES.', tag: 'Page', url: 'legal.html', keywords: 'legal privacy terms policy' },

    // ── Notation / Spec ──
    { title: 'MNN Spec — Muscular Neuro Notation', desc: 'Full MNN v1.6 specification: muscle symbols, joint taxonomy, resistance vectors, LOD 1–4, ~149 muscles, EBNF grammar.', tag: 'Spec', url: 'spec.html', keywords: 'mnn spec specification muscular neuro notation muscles joints bodwave grammar ebnf' },
    { title: 'HMN Spec v1.2', desc: 'Full Human Movement Notation specification including MNN, VRN, transition notation, avatar surface layer, and prior art analysis.', tag: 'Spec', url: 'hmn-spec.html', keywords: 'hmn spec specification human movement notation vrn vnn transition easing morph avatar' },
    { title: 'HMN Builder', desc: 'Interactive MNN string builder — pick muscles, set joint angles, choose movement pattern, copy the result.', tag: 'Tool', url: 'builder.html', keywords: 'builder tool mnn string interactive muscles joints angles' },

    // ── Articles ──
    { title: 'Article: Your Fitness Data Belongs to You', desc: 'Why gym equipment, wearables, and clinical systems trap your movement data — and what open notation does about it.', tag: 'Article', url: 'article-fitness-data.html', keywords: 'fitness data ownership portability proprietary lock-in wearable gym equipment open standard' },
    { title: 'Article: The Movement Babel Problem', desc: 'Motion capture, physical therapy, game animation — five industries describing human movement in incompatible languages.', tag: 'Article', url: 'article-movement-babel.html', keywords: 'interoperability motion capture physical therapy game animation biomechanics babel formats c3d bvh fbx' },
    { title: 'Article: 18 Apps Without a Framework', desc: 'Why AIUNITES built 18 connected web apps in vanilla JavaScript, SQLite, and GitHub Pages — no framework, no build step.', tag: 'Article', url: 'article-middleware-philosophy.html', keywords: 'vanilla javascript no framework sqlite github pages local-first architecture middleware template' },

    // ── AIUNITES network sites ──
    { title: 'VideoBate', desc: 'Logical fallacy quiz game with AI content, leaderboards, and educational scoring.', tag: 'App', url: 'https://www.videobate.com/', keywords: 'videobate fallacy quiz game ai educational logic' },
    { title: 'AIByJob', desc: 'AI tools and agents organized by profession. Find the right AI workflow for your job.', tag: 'App', url: 'https://www.aibyjob.com/', keywords: 'aibyjob ai agents profession job workflow tools' },
    { title: 'Redomy', desc: 'Home renovation tracker — plan projects, track costs, manage your renovation workflow.', tag: 'App', url: 'https://www.redomy.com/', keywords: 'redomy home renovation tracker projects costs' },
    { title: 'AIZines', desc: 'Digital magazine creation platform — design and publish AI-assisted zines.', tag: 'App', url: 'https://www.aizines.com/', keywords: 'aizines magazine digital zine creation publishing' },
    { title: 'Gameatica', desc: 'Educational games for math and ELA learning — gamified skill practice.', tag: 'App', url: 'https://www.gameatica.com/', keywords: 'gameatica games educational math ela learning skills' },
    { title: 'BodSpas / BODWAVE', desc: 'Exercise and rehabilitation platform powered by MNN notation. Muscle trainer with compensation animations.', tag: 'App', url: 'https://www.bodspas.com/', keywords: 'bodspas bodwave exercise rehab rehabilitation mnn muscle trainer' },
    { title: 'InThisWorld', desc: 'Virtual worlds, avatars, LSL scripting, MNN animation engine. Second Life / OpenSim compatible.', tag: 'App', url: 'https://www.inthisworld.com/', keywords: 'inthisworld virtual worlds avatars lsl second life opensim mnn animation' },
    { title: 'VoiceStry', desc: 'Vocal training platform powered by VRN — Voice Resonance Notation. Resonance chambers, articulators.', tag: 'App', url: 'https://www.voicestry.com/', keywords: 'voicestry vocal training voice resonance notation vrn singing' },
    { title: 'FurnishThings', desc: 'Quality furniture and modern living products — curated home furnishings.', tag: 'App', url: 'https://www.furnishthings.com/', keywords: 'furnishthings furniture home modern living products' },
    { title: 'BizStry', desc: 'Business storytelling and brand narrative platform.', tag: 'App', url: 'https://www.bizstry.com/', keywords: 'bizstry business storytelling brand narrative' },
    { title: 'AI YHWH', desc: 'Spiritual and theological AI content platform.', tag: 'App', url: 'https://www.aiyhwh.com/', keywords: 'ai yhwh spiritual theological content' },
    { title: 'Cloudsion', desc: 'Cloud computing solutions and services platform.', tag: 'App', url: 'https://www.cloudsion.com/', keywords: 'cloudsion cloud computing solutions services' },
    { title: 'UptownIT', desc: 'IT services and technology solutions for businesses.', tag: 'App', url: 'https://www.uptownit.com/', keywords: 'uptownit it services technology solutions' },
    { title: 'ERPise', desc: 'ERP and SIS consulting for higher education. Jenzabar, SQL Server, IPEDS compliance, NCAA reporting.', tag: 'App', url: 'https://www.erpise.com/', keywords: 'erpise erp sis consulting higher education jenzabar sql ipeds ncaa' },
    { title: 'ERPize Magazine', desc: 'The ERP magazine — industry news, tutorials, audit series, and technical deep dives.', tag: 'App', url: 'https://www.erpize.com/', keywords: 'erpize magazine erp news tutorials audit articles' },
    { title: 'AITSQL', desc: 'SIS database audit tools — 57-check scripts for enrollment, academic standing, referential integrity, compliance.', tag: 'App', url: 'https://www.aitsql.com/', keywords: 'aitsql audit tools sql scripts database sis enrollment compliance integrity' },
    { title: 'COSMOS the OPERA', desc: 'Original opera with music player, sheet music, VRN vocal notation origins, and meditation content.', tag: 'App', url: 'https://www.cosmostheopera.com/', keywords: 'cosmos opera music player sheet music vrn meditation' },

    // ── Concepts / Keywords ──
    { title: 'MNN — Muscular Neuro Notation', desc: 'Open plain-text format for human movement: muscles, nerves, joints, resistance vectors. LOD 1–4, ~149 muscles.', tag: 'Notation', url: 'movement.html#mnn', keywords: 'mnn muscular neuro notation body movement muscles joints vectors bodwave' },
    { title: 'VRN — Voice Resonance Notation', desc: 'Open notation for vocal production: resonance chambers, articulators, breath placement, register. 75+ symbols.', tag: 'Notation', url: 'movement.html#vrn', keywords: 'vrn voice resonance notation vocal singing articulators chambers' },
    { title: 'Transition Notation — ~Nms.ease-bio', desc: 'MNN v1.6 animation timing: duration operator ~Nms, 6 easing curves mapped to neuroscience, loop/cycle/phase tags.', tag: 'Notation', url: 'movement.html#transitions', keywords: 'transition animation timing easing ease-bio loop cycle walk breathe avatar' },
    { title: 'Avatar Surface Layer', desc: 'MNN v1.6: [Morph:] and [Body:] tags for morph target weights, body composition, muscle definition rendering.', tag: 'Notation', url: 'movement.html#avatar-surface', keywords: 'avatar surface morph body composition rendering blendshape 3d' },
    { title: 'Cross-Site Authentication', desc: 'Shared SQLite user table, session-based auth, demo login, admin roles. DemoTemplate deploys it instantly.', tag: 'Middleware', url: 'identity.html', keywords: 'authentication auth login users sessions sqlite shared cross-site' },
    { title: 'CloudDB Sync', desc: 'Local-first data layer. Browser as source of truth, Google Forms/Apps Script for cloud sync. Works offline.', tag: 'Middleware', url: 'data.html', keywords: 'clouddb sync local first offline google forms apps script backup' },
    { title: 'DemoTemplate', desc: 'Base template with auth, admin panel, modals, dark theme, responsive design, webring. Clone to deploy.', tag: 'Middleware', url: 'network.html', keywords: 'demotemplate template auth admin modals clone deploy base' },
    { title: 'Webring Navigation', desc: 'Shared navigation bar linking all 18 AIUNITES sites. Fixed top bar, arrow scroll, responsive.', tag: 'Middleware', url: 'network.html', keywords: 'webring navigation bar linking sites shared consistent' },
    { title: 'Contact / Get in Touch', desc: 'Reach AIUNITES for consulting, collaboration, or questions about the network.', tag: 'Contact', url: 'index.html#contact', keywords: 'contact get in touch consulting collaboration questions' }
  ];

  // ── Styles ───────────────────────────────────────────────────────────────
  var style = document.createElement('style');
  style.textContent = [
    '.au-search-overlay{display:none;position:fixed;inset:0;z-index:100000;background:rgba(0,0,0,.88);backdrop-filter:blur(10px);padding:8vh 20px 20px;overflow-y:auto}',
    '.au-search-overlay.open{display:block}',
    '.au-search-container{max-width:660px;margin:0 auto}',
    '.au-search-input-wrap{display:flex;align-items:center;background:#1a1a2e;border:1px solid rgba(99,102,241,.4);border-radius:14px;padding:0 16px;margin-bottom:12px;transition:border-color .2s}',
    '.au-search-input-wrap:focus-within{border-color:rgba(99,102,241,.7);box-shadow:0 0 0 3px rgba(99,102,241,.12)}',
    '.au-search-icon{font-size:1.1rem;margin-right:12px;opacity:.5;flex-shrink:0}',
    '.au-search-input{flex:1;background:none;border:none;color:#f0f0f0;font-size:1.05rem;padding:16px 0;outline:none;font-family:inherit}',
    '.au-search-input::placeholder{color:rgba(255,255,255,.3)}',
    '.au-search-close{background:none;border:1px solid rgba(255,255,255,.15);color:rgba(255,255,255,.5);border-radius:6px;padding:4px 10px;cursor:pointer;font-size:.78rem;font-family:inherit;flex-shrink:0;white-space:nowrap}',
    '.au-search-close:hover{border-color:rgba(255,255,255,.35);color:#fff}',
    '.au-search-meta{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;padding:0 2px}',
    '.au-search-count{font-size:.8rem;color:rgba(255,255,255,.35);font-family:inherit}',
    '.au-filter-row{display:flex;gap:.4rem;flex-wrap:wrap}',
    '.au-chip{background:none;border:1px solid rgba(255,255,255,.12);color:rgba(255,255,255,.45);border-radius:20px;padding:.25rem .7rem;font-size:.72rem;font-weight:600;cursor:pointer;letter-spacing:.04em;font-family:inherit;transition:all .15s}',
    '.au-chip:hover{border-color:rgba(99,102,241,.4);color:rgba(255,255,255,.75)}',
    '.au-chip.active{background:rgba(99,102,241,.2);border-color:rgba(99,102,241,.5);color:#818cf8}',
    '.au-search-results{max-height:58vh;overflow-y:auto;scrollbar-width:thin;scrollbar-color:rgba(99,102,241,.3) transparent}',
    '.au-search-results::-webkit-scrollbar{width:4px}',
    '.au-search-results::-webkit-scrollbar-thumb{background:rgba(99,102,241,.3);border-radius:2px}',
    '.au-result{display:flex;align-items:flex-start;gap:12px;padding:13px 14px;border-radius:10px;text-decoration:none;color:#f0f0f0;transition:background .12s;border:1px solid transparent}',
    '.au-result:hover{background:rgba(99,102,241,.1);border-color:rgba(99,102,241,.2)}',
    '.au-result-tag-wrap{flex-shrink:0;padding-top:2px}',
    '.au-tag{display:inline-block;font-size:.66rem;font-weight:700;text-transform:uppercase;letter-spacing:.06em;padding:.2rem .55rem;border-radius:20px;white-space:nowrap}',
    '.au-tag-Page{background:rgba(99,102,241,.15);color:#818cf8}',
    '.au-tag-Spec{background:rgba(52,211,153,.12);color:#34d399}',
    '.au-tag-Tool{background:rgba(251,191,36,.12);color:#fbbf24}',
    '.au-tag-Article{background:rgba(244,114,182,.12);color:#f472b6}',
    '.au-tag-App{background:rgba(99,102,241,.1);color:#a5b4fc}',
    '.au-tag-Notation{background:rgba(52,211,153,.12);color:#6ee7b7}',
    '.au-tag-Middleware{background:rgba(251,191,36,.1);color:#fcd34d}',
    '.au-tag-Contact{background:rgba(239,68,68,.1);color:#fca5a5}',
    '.au-result-body{flex:1;min-width:0}',
    '.au-result h4{margin:0 0 3px;font-size:.95rem;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
    '.au-result p{margin:0;font-size:.82rem;color:rgba(255,255,255,.45);line-height:1.45;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}',
    '.au-result mark{background:rgba(99,102,241,.3);color:#c7d2fe;border-radius:2px;padding:0 2px}',
    '.au-hint{text-align:center;color:rgba(255,255,255,.3);padding:50px 20px;font-size:.9rem;line-height:1.8}',
    '.au-hint kbd{background:#1a1a2e;border:1px solid rgba(255,255,255,.12);border-radius:4px;padding:.15rem .55rem;font-size:.78rem;font-family:inherit}',
    '.au-search-footer{margin-top:10px;text-align:center;font-size:.72rem;color:rgba(255,255,255,.2)}',
    '.au-search-footer kbd{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:3px;padding:.1rem .45rem;font-family:inherit}'
  ].join('');
  document.head.appendChild(style);

  // ── Auto-inject search button into nav ────────────────────────────────────
  // Finds the first .nav-links and appends a search button before the .nav-cta
  (function injectSearchBtn() {
    var navLinks = document.querySelector('.nav-links');
    if (!navLinks) return;
    // Don't double-inject
    if (document.getElementById('auNavSearchBtn')) return;
    var btn = document.createElement('a');
    btn.id = 'auNavSearchBtn';
    btn.href = 'javascript:void(0)';
    btn.setAttribute('aria-label', 'Search (Ctrl+K)');
    btn.title = 'Search (Ctrl+K)';
    btn.onclick = function () { window.auOpenSearch && window.auOpenSearch(); };
    btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:5px"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>Search';
    btn.style.cssText = 'cursor:pointer;color:rgba(255,255,255,.65);font-size:.9rem;display:inline-flex;align-items:center;transition:color .2s;';
    btn.addEventListener('mouseenter', function(){ btn.style.color = '#fff'; });
    btn.addEventListener('mouseleave', function(){ btn.style.color = 'rgba(255,255,255,.65)'; });
    // Insert before the .nav-cta if it exists, otherwise append
    var cta = navLinks.querySelector('.nav-cta');
    if (cta) { navLinks.insertBefore(btn, cta); } else { navLinks.appendChild(btn); }
    // Also wire Ctrl+K display hint in the btn if desired
  })();

  // ── DOM ───────────────────────────────────────────────────────────────────
  var overlay = document.createElement('div');
  overlay.className = 'au-search-overlay';
  overlay.id = 'auSearchOverlay';
  overlay.innerHTML = [
    '<div class="au-search-container">',
      '<div class="au-search-input-wrap">',
        '<span class="au-search-icon">🔍</span>',
        '<input type="text" class="au-search-input" id="auSearchInput" placeholder="Search AIUNITES — pages, specs, apps, articles..." autocomplete="off" spellcheck="false">',
        '<button class="au-search-close" id="auSearchClose">ESC</button>',
      '</div>',
      '<div class="au-search-meta">',
        '<div class="au-filter-row" id="auChips">',
          '<button class="au-chip active" data-f="all">All</button>',
          '<button class="au-chip" data-f="Page">Pages</button>',
          '<button class="au-chip" data-f="Spec">Specs</button>',
          '<button class="au-chip" data-f="Article">Articles</button>',
          '<button class="au-chip" data-f="App">Apps</button>',
          '<button class="au-chip" data-f="Notation">Notation</button>',
          '<button class="au-chip" data-f="Middleware">Middleware</button>',
        '</div>',
        '<span class="au-search-count" id="auCount"></span>',
      '</div>',
      '<div class="au-search-results" id="auResults">',
        '<div class="au-hint">Start typing to search &middot; Press <kbd>ESC</kbd> to close</div>',
      '</div>',
      '<div class="au-search-footer"><kbd>Ctrl</kbd>+<kbd>K</kbd> to open &nbsp;&middot;&nbsp; <kbd>ESC</kbd> to close &nbsp;&middot;&nbsp; <kbd>Enter</kbd> on first result to go</div>',
    '</div>'
  ].join('');
  document.body.appendChild(overlay);

  // ── State ─────────────────────────────────────────────────────────────────
  var activeFilter = 'all';
  var lastQuery    = '';

  // ── Helpers ───────────────────────────────────────────────────────────────
  function norm(s) { return (s || '').toLowerCase(); }

  function highlight(text, query) {
    if (!query) return text;
    var escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return text.replace(new RegExp('(' + escaped + ')', 'gi'), '<mark>$1</mark>');
  }

  function runSearch() {
    var q   = norm(document.getElementById('auSearchInput').value.trim());
    var res = document.getElementById('auResults');
    var cnt = document.getElementById('auCount');
    lastQuery = q;

    if (!q) {
      res.innerHTML = '<div class="au-hint">Start typing to search &middot; Press <kbd>ESC</kbd> to close</div>';
      cnt.textContent = '';
      return;
    }

    var words   = q.split(/\s+/).filter(Boolean);
    var matched = SEARCH_INDEX.filter(function (item) {
      var hay = norm(item.title + ' ' + item.desc + ' ' + item.keywords + ' ' + item.tag);
      var tagOk = (activeFilter === 'all') || (norm(item.tag) === norm(activeFilter));
      var qOk   = words.every(function (w) { return hay.indexOf(w) !== -1; });
      return tagOk && qOk;
    });

    cnt.textContent = matched.length ? matched.length + ' result' + (matched.length !== 1 ? 's' : '') : '';

    if (!matched.length) {
      res.innerHTML = '<div class="au-hint">No results for "<strong style="color:rgba(255,255,255,.6)">' + q.replace(/</g, '&lt;') + '</strong>"</div>';
      return;
    }

    res.innerHTML = matched.map(function (item) {
      var tagClass = 'au-tag au-tag-' + item.tag.replace(/[^a-zA-Z]/g, '');
      return [
        '<a href="' + item.url + '" class="au-result" onclick="document.getElementById(\'auSearchOverlay\').classList.remove(\'open\');document.body.style.overflow=\'\';">',
          '<div class="au-result-tag-wrap"><span class="' + tagClass + '">' + item.tag + '</span></div>',
          '<div class="au-result-body">',
            '<h4>' + highlight(item.title, q) + '</h4>',
            '<p>' + highlight(item.desc, q) + '</p>',
          '</div>',
        '</a>'
      ].join('');
    }).join('');
  }

  // ── Open / Close ──────────────────────────────────────────────────────────
  function openSearch() {
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    var inp = document.getElementById('auSearchInput');
    inp.value = '';
    inp.focus();
    document.getElementById('auResults').innerHTML = '<div class="au-hint">Start typing to search &middot; Press <kbd>ESC</kbd> to close</div>';
    document.getElementById('auCount').textContent = '';
  }

  function closeSearch() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  // expose globally so nav button onclick can call it
  window.auOpenSearch  = openSearch;
  window.auCloseSearch = closeSearch;

  // ── Events ────────────────────────────────────────────────────────────────
  document.getElementById('auSearchInput').addEventListener('input', runSearch);

  document.getElementById('auSearchClose').addEventListener('click', closeSearch);

  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeSearch();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { closeSearch(); return; }
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); openSearch(); }
    // Enter navigates to first result
    if (e.key === 'Enter' && overlay.classList.contains('open')) {
      var first = document.querySelector('.au-result');
      if (first) { closeSearch(); window.location.href = first.href; }
    }
  });

  // Filter chips
  document.getElementById('auChips').addEventListener('click', function (e) {
    var chip = e.target.closest('.au-chip');
    if (!chip) return;
    document.querySelectorAll('.au-chip').forEach(function (c) { c.classList.remove('active'); });
    chip.classList.add('active');
    activeFilter = chip.dataset.f;
    runSearch();
  });

})();
