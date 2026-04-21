/**
 * AIUNITES Admin Module
 * Floating admin toolbar + login modal for aiunites-site
 * Triggered by: triple-click on logo, or ?admin=1 URL param
 * Auth stored in localStorage as aiunites_currentUser
 *
 * Local admin credentials are in js/local-users.js (gitignored)
 * Fallback demo admin: username=admin, password=aiunites2026
 */

(function() {
  'use strict';

  var STORAGE_KEY = 'aiunites_currentUser';
  var SESSION_KEY = 'aiunites_admin_session';

  // -- Load credentials from local-users.js (gitignored) or use fallback --
  function getAdminCreds() {
    if (typeof LOCAL_USERS !== 'undefined' && LOCAL_USERS.admin) {
      return LOCAL_USERS.admin;
    }
    // Fallback — works even without local-users.js
    return { username: 'admin', password: 'aiunites2026', displayName: 'Tom' };
  }

  // -- Check if currently logged in as admin --
  function isAdmin() {
    try {
      var u = JSON.parse(localStorage.getItem(STORAGE_KEY));
      return u && u.isAdmin === true;
    } catch(e) { return false; }
  }

  function getCurrentUser() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)); } catch(e) { return null; }
  }

  // -- Login --
  function login(username, password) {
    var creds = getAdminCreds();
    if (username === creds.username && password === creds.password) {
      var user = {
        username: creds.username,
        displayName: creds.displayName || 'Admin',
        isAdmin: true,
        loginTime: Date.now()
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      localStorage.setItem(SESSION_KEY, '1');
      return true;
    }
    return false;
  }

  // -- Logout --
  function logout() {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(SESSION_KEY);
    localStorage.removeItem('aiunites_stats_auth');
    hideToolbar();
  }

  // -- Inject CSS --
  function injectStyles() {
    if (document.getElementById('aiunites-admin-styles')) return;
    var style = document.createElement('style');
    style.id = 'aiunites-admin-styles';
    style.textContent = [
      '#au-admin-toolbar{position:fixed;bottom:0;left:0;right:0;z-index:99999;background:linear-gradient(135deg,#1e1b4b,#312e81);border-top:2px solid #6366f1;padding:0;display:flex;align-items:center;gap:0;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;font-size:13px;height:42px;box-shadow:0 -4px 20px rgba(99,102,241,.4)}',
      '#au-admin-toolbar .au-brand{color:#a5b4fc;font-weight:700;padding:0 14px;border-right:1px solid rgba(255,255,255,.1);white-space:nowrap;font-size:12px;letter-spacing:.05em}',
      '#au-admin-toolbar .au-user{color:rgba(255,255,255,.6);padding:0 10px;font-size:11px;border-right:1px solid rgba(255,255,255,.1)}',
      '#au-admin-toolbar .au-links{display:flex;flex:1;height:100%}',
      '#au-admin-toolbar .au-link{color:rgba(255,255,255,.8);text-decoration:none;padding:0 12px;display:flex;align-items:center;gap:5px;height:100%;border-right:1px solid rgba(255,255,255,.08);transition:background .15s;font-size:12px;white-space:nowrap}',
      '#au-admin-toolbar .au-link:hover{background:rgba(99,102,241,.3);color:#fff}',
      '#au-admin-toolbar .au-link.active{background:rgba(99,102,241,.4);color:#c7d2fe}',
      '#au-admin-toolbar .au-spacer{flex:1}',
      '#au-admin-toolbar .au-logout{color:rgba(255,100,100,.8);padding:0 14px;cursor:pointer;border-left:1px solid rgba(255,255,255,.1);display:flex;align-items:center;height:100%;font-size:12px;transition:background .15s}',
      '#au-admin-toolbar .au-logout:hover{background:rgba(239,68,68,.2);color:#fca5a5}',

      '#au-login-overlay{position:fixed;inset:0;z-index:999998;background:rgba(0,0,0,.7);display:flex;align-items:center;justify-content:center;backdrop-filter:blur(4px)}',
      '#au-login-box{background:#1e1b4b;border:1px solid #4f46e5;border-radius:12px;padding:32px;width:320px;box-shadow:0 20px 60px rgba(0,0,0,.5);font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}',
      '#au-login-box h2{color:#e0e7ff;font-size:18px;margin:0 0 6px;font-weight:700}',
      '#au-login-box p{color:#6366f1;font-size:12px;margin:0 0 20px}',
      '#au-login-box label{color:#a5b4fc;font-size:12px;font-weight:500;display:block;margin-bottom:4px}',
      '#au-login-box input{width:100%;background:#0f0d2a;border:1px solid #374151;border-radius:6px;padding:9px 12px;color:#e0e7ff;font-size:14px;margin-bottom:14px;box-sizing:border-box;outline:none;transition:border .15s}',
      '#au-login-box input:focus{border-color:#6366f1}',
      '#au-login-box .au-login-btn{width:100%;background:linear-gradient(135deg,#4f46e5,#7c3aed);color:#fff;border:none;border-radius:6px;padding:10px;font-size:14px;font-weight:600;cursor:pointer;transition:opacity .15s}',
      '#au-login-box .au-login-btn:hover{opacity:.9}',
      '#au-login-box .au-login-err{color:#f87171;font-size:12px;margin-top:8px;display:none}',
      '#au-login-box .au-cancel{color:#6366f1;font-size:12px;text-align:center;margin-top:12px;cursor:pointer;display:block}',

      // -- To Do panel --
      '#au-todo-panel{position:fixed;bottom:42px;left:0;right:0;z-index:99998;background:#0f0d2a;border-top:1px solid #4f46e5;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;transform:translateY(100%);transition:transform .25s ease;max-height:60vh;display:flex;flex-direction:column}',
      '#au-todo-panel.open{transform:translateY(0)}',
      '#au-todo-panel .au-todo-head{display:flex;align-items:center;gap:12px;padding:10px 16px;border-bottom:1px solid rgba(255,255,255,.08);flex-shrink:0}',
      '#au-todo-panel .au-todo-title{color:#e0e7ff;font-weight:700;font-size:13px;flex:1}',
      '#au-todo-panel .au-todo-meta{color:#6366f1;font-size:11px}',
      '#au-todo-panel .au-todo-close{color:rgba(255,255,255,.4);cursor:pointer;font-size:16px;line-height:1;padding:2px 6px}',
      '#au-todo-panel .au-todo-close:hover{color:#fff}',
      '#au-todo-panel .au-todo-body{overflow-y:auto;flex:1;padding:0}',
      '#au-todo-panel .au-todo-summary{display:flex;gap:0;border-bottom:1px solid rgba(255,255,255,.06)}',
      '#au-todo-panel .au-todo-stat{flex:1;text-align:center;padding:8px 4px;border-right:1px solid rgba(255,255,255,.06)}',
      '#au-todo-panel .au-todo-stat:last-child{border-right:none}',
      '#au-todo-panel .au-todo-stat .n{font-size:1.4rem;font-weight:800;display:block;font-family:"SF Mono",Consolas,monospace}',
      '#au-todo-panel .au-todo-stat .l{font-size:.65rem;color:rgba(255,255,255,.4);text-transform:uppercase;letter-spacing:.05em}',
      '#au-todo-panel .au-todo-item{display:grid;grid-template-columns:32px 1fr auto;align-items:center;gap:8px;padding:7px 14px;border-bottom:1px solid rgba(255,255,255,.04);cursor:default}',
      '#au-todo-panel .au-todo-item:hover{background:rgba(99,102,241,.06)}',
      '#au-todo-panel .au-todo-rank{color:rgba(255,255,255,.25);font-size:10px;font-family:monospace;text-align:center}',
      '#au-todo-panel .au-todo-main{min-width:0}',
      '#au-todo-panel .au-todo-issue{color:#e0e7ff;font-size:11px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
      '#au-todo-panel .au-todo-where{color:rgba(255,255,255,.35);font-size:10px;font-family:monospace;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
      '#au-todo-panel .au-todo-badge{font-size:9px;font-weight:700;padding:2px 6px;border-radius:3px;white-space:nowrap;text-transform:uppercase;letter-spacing:.04em}',
      '#au-todo-panel .au-todo-section{padding:5px 14px 2px;color:rgba(255,255,255,.25);font-size:9px;text-transform:uppercase;letter-spacing:.08em;background:#0c0a24;border-bottom:1px solid rgba(255,255,255,.04)}',
      '#au-todo-panel .au-todo-empty{padding:24px;text-align:center;color:rgba(255,255,255,.25);font-size:12px}',
      '#au-todo-tabs{display:flex;border-bottom:1px solid rgba(255,255,255,.08);flex-shrink:0}',
      '#au-todo-tabs .au-tab{flex:1;padding:7px 0;text-align:center;font-size:11px;font-weight:600;color:rgba(255,255,255,.4);cursor:pointer;border-bottom:2px solid transparent;transition:all .15s}',
      '#au-todo-tabs .au-tab.active{color:#a5b4fc;border-bottom-color:#6366f1}',
      '#au-todo-tabs .au-tab:hover{color:#e0e7ff}',
      '#au-brief-content{padding:12px 16px;font-size:11px;line-height:1.7;color:#c7d2fe}',
      '#au-brief-content h1{font-size:13px;font-weight:700;color:#e0e7ff;margin:0 0 8px}',
      '#au-brief-content h2{font-size:11px;font-weight:700;color:#a5b4fc;text-transform:uppercase;letter-spacing:.06em;margin:14px 0 6px;padding-bottom:4px;border-bottom:1px solid rgba(255,255,255,.06)}',
      '#au-brief-content h3{font-size:11px;font-weight:700;color:#e0e7ff;margin:10px 0 4px}',
      '#au-brief-content p{color:rgba(255,255,255,.6);margin:0 0 6px}',
      '#au-brief-content hr{border:none;border-top:1px solid rgba(255,255,255,.06);margin:10px 0}',
      '#au-brief-content ul{margin:0 0 6px;padding-left:16px}',
      '#au-brief-content li{color:rgba(255,255,255,.6);margin-bottom:2px}',
      '#au-brief-content table{width:100%;border-collapse:collapse;font-size:10px;margin-bottom:8px}',
      '#au-brief-content td,#au-brief-content th{padding:3px 6px;border-bottom:1px solid rgba(255,255,255,.05);color:rgba(255,255,255,.5)}',
      '#au-brief-content strong{color:#e0e7ff;font-weight:600}',
      '.au-todo-badge.cat-seo{background:rgba(99,102,241,.25);color:#a5b4fc}',
      '.au-todo-badge.cat-adsense{background:rgba(239,68,68,.2);color:#fca5a5}',
      '.au-todo-badge.cat-rank{background:rgba(245,158,11,.2);color:#fcd34d}',
      '.au-todo-badge.cat-cq{background:rgba(107,114,128,.2);color:#9ca3af}',
      '.au-todo-badge.cat-sec{background:rgba(239,68,68,.3);color:#f87171}',
      '.au-todo-badge.cat-auto{background:rgba(34,197,94,.15);color:#86efac}',
      '#au-todo-btn{position:relative}',
      '#au-todo-badge-count{position:absolute;top:4px;right:4px;background:#ef4444;color:#fff;font-size:8px;font-weight:700;border-radius:8px;padding:1px 4px;min-width:14px;text-align:center;line-height:14px;pointer-events:none}'
    ].join('');
    document.head.appendChild(style);
  }

  // -- Render admin toolbar --
  function showToolbar() {
    if (document.getElementById('au-admin-toolbar')) return;
    injectStyles();
    var u = getCurrentUser();
    var cur = window.location.pathname;

    var bar = document.createElement('div');
    bar.id = 'au-admin-toolbar';

    // Build base path that works both on aiunites.com and localhost:8000/aiunites-site/
    var basePath = (function() {
      var p = window.location.pathname;
      // On localhost the path includes the repo folder, e.g. /aiunites-site/index.html
      // We want the folder containing the current page
      return p.substring(0, p.lastIndexOf('/') + 1);
    })();

    var links = [
      { href: basePath + 'network-overview.html', icon: '&#128202;', label: 'Overview' },
      { href: basePath + 'network-stats.html', icon: '&#128225;', label: 'GSC + SEO' },
      { href: basePath + 'network-stats.html#seo', icon: '&#128269;', label: 'SEO Audit' },
      { href: 'https://lookerstudio.google.com/reporting/bb4e6805-5a2f-4d47-a5cc-283d1e5283cc', icon: '📈', label: 'Looker Studio', ext: true },
      { href: 'https://search.google.com/search-console', icon: '🌐', label: 'GSC', ext: true },
      { href: 'https://adsense.google.com/adsense/u/0/pub-4573596965267859/sites/list', icon: '💰', label: 'AdSense', ext: true }
    ];

    var linksHtml = links.map(function(l) {
      var active = !l.ext && cur.indexOf(l.href.replace('/#','').replace('#seo','')) !== -1 ? ' active' : '';
      var target = l.ext ? ' target="_blank"' : '';
      return '<a href="' + l.href + '" class="au-link' + active + '"' + target + '>' + l.icon + ' ' + l.label + '</a>';
    }).join('');

    bar.innerHTML = '<span class="au-brand">&#9670; AIUNITES ADMIN</span>' +
      '<span class="au-user">&#128100; ' + (u ? u.displayName : 'Admin') + '</span>' +
      '<div class="au-links">' + linksHtml + '</div>' +
      '<span class="au-spacer"></span>' +
      '<span class="au-link" id="au-todo-btn" style="cursor:pointer;border-left:1px solid rgba(255,255,255,.1)" title="Open action list">&#128203; To Do<span id="au-todo-badge-count" style="display:none"></span></span>' +
      '<span class="au-logout" id="au-logout-btn">&#10006; Logout</span>';

    document.body.appendChild(bar);
    document.body.style.paddingBottom = '42px';

    document.getElementById('au-logout-btn').addEventListener('click', function() {
      if (confirm('Log out of AIUNITES admin?')) { logout(); location.reload(); }
    });

    document.getElementById('au-todo-btn').addEventListener('click', function() {
      toggleTodoPanel();
    });

    // Load badge count immediately
    loadActionListBadge();
  }

  function hideToolbar() {
    var bar = document.getElementById('au-admin-toolbar');
    if (bar) bar.remove();
    document.body.style.paddingBottom = '';
  }

  // -------------------------------------------------------
  // TO DO PANEL
  // -------------------------------------------------------

  var _todoData = null;

  function getCatClass(cat) {
    cat = (cat || '').toLowerCase();
    if (cat === 'security')          return 'cat-sec';
    if (cat.indexOf('adsense') >= 0) return 'cat-adsense';
    if (cat === 'rankopportunity')   return 'cat-rank';
    if (cat === 'codequality')       return 'cat-cq';
    if (cat === 'seo')               return 'cat-seo';
    return 'cat-cq';
  }

  function getCatLabel(cat) {
    if (cat === 'RankOpportunity') return 'Rank ▲';
    if (cat === 'AdSense-JS')      return 'AdSense JS';
    return cat;
  }

  function renderTodoPanel(data) {
    var panel = document.getElementById('au-todo-panel');
    if (!panel) return;

    var needClaude = (data.actions || []).filter(function(a) { return !a.AutoFixable; });
    var autoFix    = (data.actions || []).filter(function(a) { return a.AutoFixable; });

    var summaryHtml = '<div class="au-todo-summary">' +
      '<div class="au-todo-stat"><span class="n" style="color:#f87171">' + needClaude.length + '</span><span class="l">Needs Claude</span></div>' +
      '<div class="au-todo-stat"><span class="n" style="color:#86efac">' + autoFix.length + '</span><span class="l">Auto-fixable</span></div>' +
      '<div class="au-todo-stat"><span class="n" style="color:#a5b4fc">' + (data.totalActions || 0) + '</span><span class="l">Total issues</span></div>' +
      '<div class="au-todo-stat"><span class="n" style="color:#6366f1;font-size:.85rem">' + (data.generatedFmt || '–').replace(',','') + '</span><span class="l">Last scored</span></div>' +
      '</div>';

    var claudeRows = needClaude.slice(0, 40).map(function(a) {
      var where = (a.Domain || '') + (a.File ? ' → ' + (a.File + '').replace(/^.*\\/,'').replace(/^.*\//,'') : '');
      return '<div class="au-todo-item">' +
        '<span class="au-todo-rank">#' + a.Rank + '</span>' +
        '<div class="au-todo-main">' +
          '<div class="au-todo-issue">' + (a.Issue || a.Fix || '') + '</div>' +
          '<div class="au-todo-where">' + where + '</div>' +
        '</div>' +
        '<span class="au-todo-badge ' + getCatClass(a.Category) + '">' + getCatLabel(a.Category) + '</span>' +
      '</div>';
    }).join('');

    var autoRows = autoFix.map(function(a) {
      var where = (a.Domain || '') + (a.File ? ' → ' + (a.File + '').replace(/^.*\\/,'').replace(/^.*\//,'') : '');
      return '<div class="au-todo-item" style="opacity:.6">' +
        '<span class="au-todo-rank">#' + a.Rank + '</span>' +
        '<div class="au-todo-main">' +
          '<div class="au-todo-issue">' + (a.Issue || '') + '</div>' +
          '<div class="au-todo-where">' + where + '</div>' +
        '</div>' +
        '<span class="au-todo-badge cat-auto">Auto ✓</span>' +
      '</div>';
    }).join('');

    panel.querySelector('.au-todo-body').innerHTML =
      summaryHtml +
      (claudeRows ? '<div class="au-todo-section">Needs Claude — work through in order</div>' + claudeRows : '') +
      (autoRows   ? '<div class="au-todo-section">Auto-fixable — run auto-improve.ps1</div>' + autoRows : '') +
      (!claudeRows && !autoRows ? '<div class="au-todo-empty">No actions found. Run prioritize-fixes.ps1 to generate.</div>' : '');
  }

  function fetchActionList(cb) {
    if (_todoData) { cb(_todoData); return; }
    var urls = [
      'data/action-list.json?_=' + Date.now(),
      'https://aiunites.github.io/cloudsion-site/data/action-list.json?_=' + Date.now()
    ];
    function tryNext(i) {
      if (i >= urls.length) { cb(null); return; }
      fetch(urls[i]).then(function(r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json();
      }).then(function(d) {
        _todoData = d; cb(d);
      }).catch(function() { tryNext(i + 1); });
    }
    tryNext(0);
  }

  function loadActionListBadge() {
    fetchActionList(function(data) {
      if (!data) return;
      var needClaude = (data.actions || []).filter(function(a) { return !a.AutoFixable; }).length;
      var badge = document.getElementById('au-todo-badge-count');
      if (badge && needClaude > 0) {
        badge.textContent = needClaude;
        badge.style.display = 'inline-block';
      }
    });
  }

  function toggleTodoPanel() {
    var panel = document.getElementById('au-todo-panel');
    if (!panel) {
      panel = document.createElement('div');
      panel.id = 'au-todo-panel';
      panel.innerHTML =
        '<div class="au-todo-head">' +
          '<span class="au-todo-title">&#128203; Work Queue</span>' +
          '<span class="au-todo-meta" id="au-todo-status">Loading...</span>' +
          '<span class="au-todo-close" id="au-todo-close">&#10006;</span>' +
        '</div>' +
        '<div id="au-todo-tabs">' +
          '<div class="au-tab active" id="au-tab-actions" onclick="auSwitchTab(\"actions\")">&#128203; Action List</div>' +
          '<div class="au-tab" id="au-tab-brief" onclick="auSwitchTab(\"brief\")">&#128196; Session Brief</div>' +
        '</div>' +
        '<div class="au-todo-body" id="au-tab-body-actions"><div class="au-todo-empty">Loading...</div></div>' +
        '<div class="au-todo-body" id="au-tab-body-brief" style="display:none"><div class="au-todo-empty">Loading brief...</div></div>';
      document.body.appendChild(panel);

      document.getElementById('au-todo-close').addEventListener('click', function() {
        panel.classList.remove('open');
      });

      // Load action list
      fetchActionList(function(data) {
        var statusEl = document.getElementById('au-todo-status');
        if (!data) {
          if (statusEl) statusEl.textContent = 'No data - run prioritize-fixes.ps1';
          document.getElementById('au-tab-body-actions').innerHTML = '<div class="au-todo-empty">Run prioritize-fixes.ps1 then Publish Now to generate action-list.json.</div>';
          return;
        }
        if (statusEl) statusEl.textContent = data.generatedFmt || '';
        renderTodoPanel(data);
      });

      // Load session brief
      fetchSessionBrief(function(md) {
        var body = document.getElementById('au-tab-body-brief');
        if (!md) {
          body.innerHTML = '<div class="au-todo-empty">No session-brief.md found. Run prioritize-fixes.ps1 then Publish Now.</div>';
          return;
        }
        body.innerHTML = '<div id="au-brief-content">' + renderMarkdown(md) + '</div>';
      });

      setTimeout(function() { panel.classList.add('open'); }, 20);
    } else {
      panel.classList.toggle('open');
    }
  }

  window.auSwitchTab = function(tab) {
    ['actions','brief'].forEach(function(t) {
      document.getElementById('au-tab-' + t).classList.toggle('active', t === tab);
      document.getElementById('au-tab-body-' + t).style.display = t === tab ? 'block' : 'none';
    });
  };

  function fetchSessionBrief(cb) {
    var urls = [
      'data/session-brief.md?_=' + Date.now(),
      'https://aiunites.github.io/cloudsion-site/data/session-brief.md?_=' + Date.now()
    ];
    function tryNext(i) {
      if (i >= urls.length) { cb(null); return; }
      fetch(urls[i]).then(function(r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.text();
      }).then(function(t) { cb(t); }).catch(function() { tryNext(i + 1); });
    }
    tryNext(0);
  }

  function renderMarkdown(md) {
    var h = md
      .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
      .replace(/^# (.+)$/mg,       '<h1>$1</h1>')
      .replace(/^## (.+)$/mg,      '<h2>$1</h2>')
      .replace(/^### (.+)$/mg,     '<h3>$1</h3>')
      .replace(/^---+$/mg,         '<hr>')
      .replace(/\*\*(.+?)\*\*/g,   '<strong>$1</strong>')
      .replace(/`([^`]+)`/g,       '<code style="background:rgba(255,255,255,.08);padding:1px 4px;border-radius:3px;font-size:10px">$1</code>')
      .replace(/^- (.+)$/mg,       '<li>$1</li>')
      .replace(/^\| (.+) \|$/mg, function(row) {
        if (row.match(/^\| [-|\s]+\|$/)) return '';
        var cells = row.split('|').slice(1,-1).map(function(c) { return '<td>' + c.trim() + '</td>'; }).join('');
        return '<tr>' + cells + '</tr>';
      })
      .replace(/(<tr>.*<\/tr>\n?)+/g, '<table>  function toggleTodoPanel() {
    var panel = document.getElementById('au-todo-panel');
    if (!panel) {
      // Create panel
      panel = document.createElement('div');
      panel.id = 'au-todo-panel';
      panel.innerHTML =
        '<div class="au-todo-head">' +
          '<span class="au-todo-title">&#128203; Action List</span>' +
          '<span class="au-todo-meta" id="au-todo-status">Loading...</span>' +
          '<span class="au-todo-close" id="au-todo-close">&#10006;</span>' +
        '</div>' +
        '<div class="au-todo-body"><div class="au-todo-empty">Loading...</div></div>';
      document.body.appendChild(panel);

      document.getElementById('au-todo-close').addEventListener('click', function() {
        panel.classList.remove('open');
      });

      fetchActionList(function(data) {
        var statusEl = document.getElementById('au-todo-status');
        if (!data) {
          if (statusEl) statusEl.textContent = 'No data — run prioritize-fixes.ps1';
          panel.querySelector('.au-todo-body').innerHTML = '<div class="au-todo-empty">Run prioritize-fixes.ps1 then Publish Now to generate action-list.json.</div>';
          return;
        }
        if (statusEl) statusEl.textContent = 'Updated ' + (data.generatedFmt || '');
        renderTodoPanel(data);
      });

      // Small delay so CSS transition fires
      setTimeout(function() { panel.classList.add('open'); }, 20);
    } else {
      panel.classList.toggle('open');
    }
  }</table>')
      .replace(/(<li>.*<\/li>\n?)+/g, '<ul>  function toggleTodoPanel() {
    var panel = document.getElementById('au-todo-panel');
    if (!panel) {
      // Create panel
      panel = document.createElement('div');
      panel.id = 'au-todo-panel';
      panel.innerHTML =
        '<div class="au-todo-head">' +
          '<span class="au-todo-title">&#128203; Action List</span>' +
          '<span class="au-todo-meta" id="au-todo-status">Loading...</span>' +
          '<span class="au-todo-close" id="au-todo-close">&#10006;</span>' +
        '</div>' +
        '<div class="au-todo-body"><div class="au-todo-empty">Loading...</div></div>';
      document.body.appendChild(panel);

      document.getElementById('au-todo-close').addEventListener('click', function() {
        panel.classList.remove('open');
      });

      fetchActionList(function(data) {
        var statusEl = document.getElementById('au-todo-status');
        if (!data) {
          if (statusEl) statusEl.textContent = 'No data — run prioritize-fixes.ps1';
          panel.querySelector('.au-todo-body').innerHTML = '<div class="au-todo-empty">Run prioritize-fixes.ps1 then Publish Now to generate action-list.json.</div>';
          return;
        }
        if (statusEl) statusEl.textContent = 'Updated ' + (data.generatedFmt || '');
        renderTodoPanel(data);
      });

      // Small delay so CSS transition fires
      setTimeout(function() { panel.classList.add('open'); }, 20);
    } else {
      panel.classList.toggle('open');
    }
  }</ul>')
      .replace(/\n{2,}/g, '</p><p>')
      .replace(/^(?!<[hputl]|<\/|<tr|<li)(.+)$/mg, '$1');
    return '<p>' + h + '</p>';
  }

  // -- Show login modal --
  function showLoginModal() {
    if (document.getElementById('au-login-overlay')) return;
    injectStyles();

    var overlay = document.createElement('div');
    overlay.id = 'au-login-overlay';
    overlay.innerHTML = '<div id="au-login-box">' +
      '<h2>&#9670; AIUNITES Admin</h2>' +
      '<p>Sign in to access network reports and tools</p>' +
      '<label>Username</label>' +
      '<input type="text" id="au-username" placeholder="admin" autocomplete="username">' +
      '<label>Password</label>' +
      '<input type="password" id="au-password" placeholder="&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;" autocomplete="current-password">' +
      '<button class="au-login-btn" id="au-login-submit">Sign In</button>' +
      '<div class="au-login-err" id="au-login-err">Incorrect username or password</div>' +
      '<span class="au-cancel" id="au-cancel">Cancel</span>' +
      '</div>';
    document.body.appendChild(overlay);

    var userInput = document.getElementById('au-username');
    var passInput = document.getElementById('au-password');
    var errEl    = document.getElementById('au-login-err');

    document.getElementById('au-login-submit').addEventListener('click', function() {
      if (login(userInput.value.trim(), passInput.value)) {
        overlay.remove();
        showToolbar();
        // Redirect to `next` param if present
        var nextMatch = window.location.search.match(/[?&]next=([^&]+)/);
        if (nextMatch) {
          window.location.href = decodeURIComponent(nextMatch[1]);
        } else if (window.location.pathname.indexOf('network-stats') !== -1 ||
                   window.location.pathname.indexOf('network-overview') !== -1) {
          location.reload();
        }
      } else {
        errEl.style.display = 'block';
        passInput.value = '';
        passInput.focus();
      }
    });

    passInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') document.getElementById('au-login-submit').click();
    });

    document.getElementById('au-cancel').addEventListener('click', function() { overlay.remove(); });
    overlay.addEventListener('click', function(e) { if (e.target === overlay) overlay.remove(); });

    setTimeout(function() { userInput.focus(); }, 100);
  }

  // -- Triple-click logo trigger --
  function setupTrigger() {
    var clicks = 0, timer = null;
    var logo = document.querySelector('.nav-logo, .logo, [class*="logo"], #nav-logo, a[href="/"]');

    // Also trigger via URL param ?admin=login
    if (window.location.search.indexOf('admin=login') !== -1) {
      setTimeout(showLoginModal, 300);
    }

    if (!logo) return;
    logo.addEventListener('click', function() {
      clicks++;
      clearTimeout(timer);
      timer = setTimeout(function() { clicks = 0; }, 600);
      if (clicks >= 3) {
        clicks = 0;
        clearTimeout(timer);
        if (!isAdmin()) { showLoginModal(); }
      }
    });
  }

  // -- Init --
  function init() {
    // Expose global for footer link
    window.__auAdminNav = function() {
      if (isAdmin()) { showToolbar(); }
      else { showLoginModal(); }
    };

    if (isAdmin()) {
      showToolbar();
    } else {
      setupTrigger();
      injectFooterLink();
    }
  }

  // -- Inject subtle Admin link into footer --
  function injectFooterLink() {
    // Wait for DOM then find footer-legal or footer-bottom
    function tryInject() {
      var legal = document.querySelector('.footer-legal, .footer-bottom, footer');
      if (!legal) return;
      var link = document.createElement('a');
      link.href = '#';
      link.textContent = '\u25C6 Admin';
      link.style.cssText = 'color:rgba(255,255,255,0.2);font-size:0.72rem;text-decoration:none;margin-left:16px;transition:color 0.2s;';
      link.addEventListener('mouseenter', function() { link.style.color = 'rgba(99,102,241,0.7)'; });
      link.addEventListener('mouseleave', function() { link.style.color = 'rgba(255,255,255,0.2)'; });
      link.addEventListener('click', function(e) { e.preventDefault(); showLoginModal(); });
      legal.appendChild(link);
    }
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', tryInject);
    } else {
      tryInject();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
