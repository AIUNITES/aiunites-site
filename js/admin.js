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

  function getAdminCreds() {
    if (typeof LOCAL_USERS !== 'undefined' && LOCAL_USERS.admin) {
      return LOCAL_USERS.admin;
    }
    return { username: 'admin', password: 'aiunites2026', displayName: 'Tom' };
  }

  function isAdmin() {
    try {
      var u = JSON.parse(localStorage.getItem(STORAGE_KEY));
      return u && u.isAdmin === true;
    } catch(e) { return false; }
  }

  function getCurrentUser() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)); } catch(e) { return null; }
  }

  function login(username, password) {
    var creds = getAdminCreds();
    if (username === creds.username && password === creds.password) {
      var user = { username: creds.username, displayName: creds.displayName || 'Admin', isAdmin: true, loginTime: Date.now() };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      localStorage.setItem(SESSION_KEY, '1');
      return true;
    }
    return false;
  }

  function logout() {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(SESSION_KEY);
    localStorage.removeItem('aiunites_stats_auth');
    hideToolbar();
  }

  // -------------------------------------------------------
  // STYLES
  // -------------------------------------------------------
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
      '#au-todo-panel{position:fixed;bottom:42px;left:0;right:0;z-index:99998;background:#0f0d2a;border-top:1px solid #4f46e5;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;transform:translateY(100%);transition:transform .25s ease;max-height:60vh;display:flex;flex-direction:column}',
      '#au-todo-panel.open{transform:translateY(0)}',
      '.au-todo-head{display:flex;align-items:center;gap:12px;padding:10px 16px;border-bottom:1px solid rgba(255,255,255,.08);flex-shrink:0}',
      '.au-todo-title{color:#e0e7ff;font-weight:700;font-size:13px;flex:1}',
      '.au-todo-meta{color:#6366f1;font-size:11px}',
      '.au-todo-close{color:rgba(255,255,255,.4);cursor:pointer;font-size:16px;line-height:1;padding:2px 6px}',
      '.au-todo-close:hover{color:#fff}',
      '.au-todo-body{overflow-y:auto;flex:1;padding:0}',
      '.au-todo-summary{display:flex;gap:0;border-bottom:1px solid rgba(255,255,255,.06)}',
      '.au-todo-stat{flex:1;text-align:center;padding:8px 4px;border-right:1px solid rgba(255,255,255,.06)}',
      '.au-todo-stat:last-child{border-right:none}',
      '.au-todo-stat .sn{font-size:1.4rem;font-weight:800;display:block;font-family:"SF Mono",Consolas,monospace}',
      '.au-todo-stat .sl{font-size:.65rem;color:rgba(255,255,255,.4);text-transform:uppercase;letter-spacing:.05em}',
      '.au-todo-item{display:grid;grid-template-columns:32px 1fr auto;align-items:center;gap:8px;padding:7px 14px;border-bottom:1px solid rgba(255,255,255,.04)}',
      '.au-todo-item:hover{background:rgba(99,102,241,.06)}',
      '.au-todo-rank{color:rgba(255,255,255,.25);font-size:10px;font-family:monospace;text-align:center}',
      '.au-todo-main{min-width:0}',
      '.au-todo-issue{color:#e0e7ff;font-size:11px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
      '.au-todo-where{color:rgba(255,255,255,.35);font-size:10px;font-family:monospace;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
      '.au-todo-badge{font-size:9px;font-weight:700;padding:2px 6px;border-radius:3px;white-space:nowrap;text-transform:uppercase;letter-spacing:.04em}',
      '.au-todo-section{padding:5px 14px 2px;color:rgba(255,255,255,.25);font-size:9px;text-transform:uppercase;letter-spacing:.08em;background:#0c0a24;border-bottom:1px solid rgba(255,255,255,.04)}',
      '.au-todo-empty{padding:24px;text-align:center;color:rgba(255,255,255,.25);font-size:12px}',
      '.au-todo-badge.cat-seo{background:rgba(99,102,241,.25);color:#a5b4fc}',
      '.au-todo-badge.cat-adsense{background:rgba(239,68,68,.2);color:#fca5a5}',
      '.au-todo-badge.cat-rank{background:rgba(245,158,11,.2);color:#fcd34d}',
      '.au-todo-badge.cat-cq{background:rgba(107,114,128,.2);color:#9ca3af}',
      '.au-todo-badge.cat-sec{background:rgba(239,68,68,.3);color:#f87171}',
      '.au-todo-badge.cat-auto{background:rgba(34,197,94,.15);color:#86efac}',
      '#au-todo-btn{position:relative}',
      '#au-todo-badge-count{position:absolute;top:4px;right:4px;background:#ef4444;color:#fff;font-size:8px;font-weight:700;border-radius:8px;padding:1px 4px;min-width:14px;text-align:center;line-height:14px;pointer-events:none}',
      '.au-todo-tabs{display:flex;border-bottom:1px solid rgba(255,255,255,.08);flex-shrink:0}',
      '.au-todo-tabs .au-tab{flex:1;padding:7px 0;text-align:center;font-size:11px;font-weight:600;color:rgba(255,255,255,.4);cursor:pointer;border-bottom:2px solid transparent;transition:all .15s}',
      '.au-todo-tabs .au-tab.active{color:#a5b4fc;border-bottom-color:#6366f1}',
      '.au-todo-tabs .au-tab:hover{color:#e0e7ff}',
      '.au-brief-body{overflow-y:auto;flex:1;padding:12px 16px;font-size:11px;line-height:1.7;color:rgba(255,255,255,.6)}',
      '.au-brief-body h1{font-size:13px;font-weight:700;color:#e0e7ff;margin:0 0 8px}',
      '.au-brief-body h2{font-size:11px;font-weight:700;color:#a5b4fc;text-transform:uppercase;letter-spacing:.06em;margin:14px 0 5px;padding-bottom:3px;border-bottom:1px solid rgba(255,255,255,.06)}',
      '.au-brief-body h3{font-size:11px;font-weight:700;color:#e0e7ff;margin:8px 0 3px}',
      '.au-brief-body hr{border:none;border-top:1px solid rgba(255,255,255,.06);margin:8px 0}',
      '.au-brief-body ul{margin:0 0 6px;padding-left:16px}',
      '.au-brief-body li{margin-bottom:2px}',
      '.au-brief-body strong{color:#e0e7ff}',
      '.au-brief-body code{background:rgba(255,255,255,.08);padding:1px 4px;border-radius:3px;font-size:10px;font-family:monospace}'
    ].join('');
    document.head.appendChild(style);
  }

  // -------------------------------------------------------
  // TOOLBAR
  // -------------------------------------------------------
  function showToolbar() {
    if (document.getElementById('au-admin-toolbar')) return;
    injectStyles();
    var u = getCurrentUser();
    var cur = window.location.pathname;
    var bar = document.createElement('div');
    bar.id = 'au-admin-toolbar';

    var basePath = (function() {
      var p = window.location.pathname;
      return p.substring(0, p.lastIndexOf('/') + 1);
    })();

    var links = [
      { href: basePath + 'network-overview.html', icon: '&#128202;', label: 'Overview' },
      { href: basePath + 'network-stats.html', icon: '&#128225;', label: 'GSC + SEO' },
      { href: basePath + 'network-stats.html#seo', icon: '&#128269;', label: 'SEO Audit' },
      { href: 'https://lookerstudio.google.com/reporting/bb4e6805-5a2f-4d47-a5cc-283d1e5283cc', icon: '&#128200;', label: 'Looker', ext: true },
      { href: 'https://search.google.com/search-console', icon: '&#127760;', label: 'GSC', ext: true },
      { href: 'https://adsense.google.com/adsense/u/0/pub-4573596965267859/sites/list', icon: '&#128176;', label: 'AdSense', ext: true }
    ];

    var linksHtml = links.map(function(l) {
      var active = !l.ext && cur.indexOf(l.href.replace('#seo','')) !== -1 ? ' active' : '';
      var target = l.ext ? ' target="_blank"' : '';
      return '<a href="' + l.href + '" class="au-link' + active + '"' + target + '>' + l.icon + ' ' + l.label + '</a>';
    }).join('');

    bar.innerHTML =
      '<span class="au-brand">&#9670; AIUNITES ADMIN</span>' +
      '<span class="au-user">&#128100; ' + (u ? u.displayName : 'Admin') + '</span>' +
      '<div class="au-links">' + linksHtml + '</div>' +
      '<span class="au-spacer"></span>' +
      '<span class="au-link" id="au-todo-btn" style="cursor:pointer;border-left:1px solid rgba(255,255,255,.1)" title="Work queue">&#128203; To Do<span id="au-todo-badge-count" style="display:none"></span></span>' +
      '<a href="admin.html" class="au-link" style="border-left:1px solid rgba(255,255,255,.1)" title="Full admin dashboard">&#128202; Admin</a>' +
      '<span class="au-logout" id="au-logout-btn">&#10006; Logout</span>';

    document.body.appendChild(bar);
    document.body.style.paddingBottom = '42px';

    document.getElementById('au-logout-btn').addEventListener('click', function() {
      if (confirm('Log out of AIUNITES admin?')) { logout(); location.reload(); }
    });
    document.getElementById('au-todo-btn').addEventListener('click', toggleTodoPanel);
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
    if (cat === 'RankOpportunity') return 'Rank+';
    if (cat === 'AdSense-JS')      return 'AdSenseJS';
    return cat || 'Other';
  }

  function renderActionTab(data, bodyEl) {
    var needClaude = (data.actions || []).filter(function(a) { return !a.AutoFixable; });
    var autoFix    = (data.actions || []).filter(function(a) { return a.AutoFixable; });

    var summary =
      '<div class="au-todo-summary">' +
        '<div class="au-todo-stat"><span class="sn" style="color:#f87171">' + needClaude.length + '</span><span class="sl">Needs Claude</span></div>' +
        '<div class="au-todo-stat"><span class="sn" style="color:#86efac">' + autoFix.length + '</span><span class="sl">Auto-fixable</span></div>' +
        '<div class="au-todo-stat"><span class="sn" style="color:#a5b4fc">' + (data.totalActions || 0) + '</span><span class="sl">Total issues</span></div>' +
        '<div class="au-todo-stat"><span class="sn" style="color:#6366f1;font-size:.75rem">' + (data.generatedFmt || '-') + '</span><span class="sl">Last scored</span></div>' +
      '</div>';

    function makeRow(a, faded) {
      var fname = (a.File || '').replace(/^.*[\\/]/, '').substring(0, 30);
      var where = (a.Domain || 'unknown') + (fname ? ' / ' + fname : '');
      var iss = (a.Issue || a.Fix || '').substring(0, 80);
      return '<div class="au-todo-item"' + (faded ? ' style="opacity:.55"' : '') + '>' +
        '<span class="au-todo-rank">#' + a.Rank + '</span>' +
        '<div class="au-todo-main">' +
          '<div class="au-todo-issue">' + iss + '</div>' +
          '<div class="au-todo-where">' + where + '</div>' +
        '</div>' +
        '<span class="au-todo-badge ' + getCatClass(a.Category) + '">' + getCatLabel(a.Category) + '</span>' +
      '</div>';
    }

    var claudeHtml = needClaude.slice(0, 40).map(function(a) { return makeRow(a, false); }).join('');
    var autoHtml   = autoFix.map(function(a) { return makeRow(a, true); }).join('');

    bodyEl.innerHTML = summary +
      (claudeHtml ? '<div class="au-todo-section">Needs Claude - work top to bottom</div>' + claudeHtml : '') +
      (autoHtml   ? '<div class="au-todo-section">Auto-fixable - run auto-improve.ps1</div>' + autoHtml   : '') +
      (!claudeHtml && !autoHtml ? '<div class="au-todo-empty">Nothing to do! Run prioritize-fixes.ps1 to refresh.</div>' : '');
  }

  function renderBriefTab(md, bodyEl) {
    // Simple markdown to HTML - safe, no eval
    var lines = md.split('\n');
    var html = '';
    var inUl = false;

    lines.forEach(function(line) {
      var trimmed = line.trim();
      if (!trimmed) {
        if (inUl) { html += '</ul>'; inUl = false; }
        return;
      }
      if (/^# /.test(trimmed)) {
        if (inUl) { html += '</ul>'; inUl = false; }
        html += '<h1>' + trimmed.slice(2) + '</h1>';
      } else if (/^## /.test(trimmed)) {
        if (inUl) { html += '</ul>'; inUl = false; }
        html += '<h2>' + trimmed.slice(3) + '</h2>';
      } else if (/^### /.test(trimmed)) {
        if (inUl) { html += '</ul>'; inUl = false; }
        html += '<h3>' + trimmed.slice(4) + '</h3>';
      } else if (/^---/.test(trimmed)) {
        if (inUl) { html += '</ul>'; inUl = false; }
        html += '<hr>';
      } else if (/^\- /.test(trimmed) || /^\* /.test(trimmed)) {
        if (!inUl) { html += '<ul>'; inUl = true; }
        var liText = trimmed.slice(2);
        liText = liText.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
        html += '<li>' + liText + '</li>';
      } else if (/^\|/.test(trimmed)) {
        if (/^\| ?[-:| ]+\|/.test(trimmed)) return; // separator row
        if (inUl) { html += '</ul>'; inUl = false; }
        var cells = trimmed.split('|').slice(1,-1).map(function(c) { return '<td>' + c.trim() + '</td>'; }).join('');
        html += '<table style="width:100%;border-collapse:collapse;font-size:10px;margin-bottom:4px"><tr>' + cells + '</tr></table>';
      } else {
        if (inUl) { html += '</ul>'; inUl = false; }
        var p = trimmed.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
        html += '<p>' + p + '</p>';
      }
    });
    if (inUl) html += '</ul>';
    bodyEl.innerHTML = html;
  }

  function fetchActionList(cb) {
    if (_todoData) { cb(_todoData); return; }
    var urls = [
      'data/action-list.json?_=' + Date.now(),
      'https://aiunites.github.io/cloudsion-site/data/action-list.json?_=' + Date.now()
    ];
    function tryNext(i) {
      if (i >= urls.length) { cb(null); return; }
      fetch(urls[i])
        .then(function(r) { if (!r.ok) throw 0; return r.json(); })
        .then(function(d) { _todoData = d; cb(d); })
        .catch(function() { tryNext(i + 1); });
    }
    tryNext(0);
  }

  function fetchSessionBrief(cb) {
    var urls = [
      'data/session-brief.md?_=' + Date.now(),
      'https://aiunites.github.io/cloudsion-site/data/session-brief.md?_=' + Date.now()
    ];
    function tryNext(i) {
      if (i >= urls.length) { cb(null); return; }
      fetch(urls[i])
        .then(function(r) { if (!r.ok) throw 0; return r.text(); })
        .then(function(t) { cb(t); })
        .catch(function() { tryNext(i + 1); });
    }
    tryNext(0);
  }

  function loadActionListBadge() {
    fetchActionList(function(data) {
      if (!data) return;
      var count = (data.actions || []).filter(function(a) { return !a.AutoFixable; }).length;
      var badge = document.getElementById('au-todo-badge-count');
      if (badge && count > 0) { badge.textContent = count; badge.style.display = 'inline-block'; }
    });
  }

  function fetchVisibility(cb) {
    var urls = [
      'data/visibility.json?_=' + Date.now(),
      'https://aiunites.github.io/cloudsion-site/data/visibility.json?_=' + Date.now()
    ];
    function tryNext(i) {
      if (i >= urls.length) { cb(null); return; }
      fetch(urls[i])
        .then(function(r) { if (!r.ok) throw 0; return r.json(); })
        .then(function(d) { cb(d); })
        .catch(function() { tryNext(i + 1); });
    }
    tryNext(0);
  }

  function renderWidgetsTab(vis, bodyEl) {
    if (!vis || !vis.widgets) {
      bodyEl.innerHTML = '<div class="au-todo-empty">No visibility.json found. Run update-visibility.ps1 then Publish Now.</div>';
      return;
    }

    var html = '<div style="padding:10px 14px 4px;border-bottom:1px solid rgba(255,255,255,.06)">' +
      '<div style="font-size:9px;font-family:monospace;text-transform:uppercase;letter-spacing:.07em;color:rgba(255,255,255,.25);margin-bottom:2px">Widget visibility control</div>' +
      '<div style="font-size:10px;color:rgba(255,255,255,.35)">Admin always sees all widgets. Toggle public to show on web pages.</div>' +
      '<div style="font-size:9px;font-family:monospace;color:rgba(255,255,255,.2);margin-top:3px">Updated: ' + (vis.updatedFmt || vis.updated || 'never') + '</div>' +
    '</div>';

    var widgets = vis.widgets;
    Object.keys(widgets).forEach(function(id) {
      var w = widgets[id];
      var isPublic = w.public === true;
      var metThresh = w.meetsThreshold === true;

      var statusBadge = isPublic
        ? '<span style="background:rgba(16,185,129,.2);border:1px solid rgba(16,185,129,.4);color:#6ee7b7;border-radius:4px;padding:2px 7px;font-size:9px;font-weight:700;font-family:monospace">PUBLIC</span>'
        : '<span style="background:rgba(239,68,68,.15);border:1px solid rgba(239,68,68,.3);color:#fca5a5;border-radius:4px;padding:2px 7px;font-size:9px;font-weight:700;font-family:monospace">ADMIN ONLY</span>';

      var threshBadge = metThresh
        ? '<span style="color:#6ee7b7;font-size:9px;font-family:monospace">Threshold met</span>'
        : '<span style="color:rgba(255,255,255,.25);font-size:9px;font-family:monospace">' + (w.thresholdStatus || 'Not met') + '</span>';

      // Build promote/demote command for clipboard
      var boolVal = isPublic ? '$false' : '$true';
      var cmd = '& "C:\\Users\\tombh\\Documents\\GitHub\\scripts\\update-visibility.ps1" -Widget "' + id + '" -Public ' + boolVal;
      var btnLabel = isPublic ? 'Set admin only' : 'Promote to public';
      var btnColor = isPublic ? 'rgba(239,68,68,.2)' : 'rgba(16,185,129,.2)';
      var btnBorder = isPublic ? 'rgba(239,68,68,.4)' : 'rgba(16,185,129,.4)';
      var btnText   = isPublic ? '#fca5a5' : '#6ee7b7';

      html += '<div style="padding:10px 14px;border-bottom:1px solid rgba(255,255,255,.04)">' +
        '<div style="display:flex;align-items:center;gap:8px;margin-bottom:4px">' +
          statusBadge +
          '<span style="font-size:11px;font-weight:600;color:#e0e7ff">' + (w.label || id) + '</span>' +
        '</div>' +
        '<div style="font-size:10px;color:rgba(255,255,255,.35);margin-bottom:4px">' + (w.desc || '') + '</div>' +
        '<div style="margin-bottom:6px">' + threshBadge + '</div>' +
        '<button onclick="auCopyCmd(this, ' + JSON.stringify(cmd) + ')" style="' +
          'background:' + btnColor + ';border:1px solid ' + btnBorder + ';color:' + btnText + ';' +
          'border-radius:4px;padding:4px 10px;font-size:9px;font-family:monospace;cursor:pointer;' +
          'transition:opacity .15s">' + btnLabel + '</button>' +
        '<span class="au-cmd-status" style="font-size:9px;font-family:monospace;color:rgba(255,255,255,.3);margin-left:8px"></span>' +
      '</div>';
    });

    html += '<div style="padding:8px 14px">' +
      '<div style="font-size:9px;font-family:monospace;color:rgba(255,255,255,.2);line-height:1.6">' +
        'Click a button to copy the PowerShell command, then paste in terminal and run Publish Now.' +
      '</div>' +
    '</div>';

    bodyEl.innerHTML = html;
  }

  window.auCopyCmd = function(btn, cmd) {
    navigator.clipboard.writeText(cmd).then(function() {
      var status = btn.nextElementSibling;
      if (status) { status.textContent = 'Copied! Paste in PowerShell then Publish Now'; }
      btn.style.opacity = '.5';
      setTimeout(function() {
        if (status) { status.textContent = ''; }
        btn.style.opacity = '1';
      }, 4000);
    });
  };

  function renderPipelineTab(data, bodyEl) {
    var total    = data ? (data.totalActions || 0)  : 0;
    var autoN    = data ? (data.autoFixable  || 0)  : 0;
    var claudeN  = data ? (data.needsClaude  || 0)  : 0;
    var W = 560; // bar width
    var autoW  = total > 0 ? Math.round((autoN  / total) * W) : 0;
    var claudeW = total > 0 ? Math.round((claudeN / total) * W) : 0;
    var otherW  = W - autoW - claudeW;

    // Category counts
    var cats = { SEO:0, CodeQuality:0, AdSense:0, RankOpportunity:0, Security:0, Other:0 };
    if (data && data.actions) {
      data.actions.forEach(function(a) {
        var c = a.Category || 'Other';
        if (cats.hasOwnProperty(c)) cats[c]++; else cats.Other++;
      });
    }
    var catMax = Math.max.apply(null, Object.keys(cats).map(function(k){ return cats[k]; })) || 1;
    var catColors = { SEO:'#818cf8', CodeQuality:'#9ca3af', AdSense:'#f87171', RankOpportunity:'#fcd34d', Security:'#ef4444', Other:'#6b7280' };
    var catLabels = { SEO:'SEO', CodeQuality:'Code', AdSense:'AdSense', RankOpportunity:'Rank+', Security:'Security', Other:'Other' };

    var catBars = '';
    var cx = 20;
    var catKeys = ['SEO','CodeQuality','AdSense','RankOpportunity','Security'];
    catKeys.forEach(function(k) {
      var bw = Math.round((cats[k] / catMax) * 100);
      catBars +=
        '<rect x="' + cx + '" y="' + (115 - Math.round((cats[k]/catMax)*40)) + '" width="14" height="' + Math.round((cats[k]/catMax)*40) + '" rx="2" fill="' + catColors[k] + '" opacity=".75"/>'+
        '<text x="' + (cx+7) + '" y="120" text-anchor="middle" fill="rgba(255,255,255,.45)" font-size="8" font-family="monospace">' + catLabels[k] + '</text>'+
        '<text x="' + (cx+7) + '" y="108" text-anchor="middle" fill="' + catColors[k] + '" font-size="8" font-family="monospace">' + cats[k] + '</text>';
      cx += 24;
    });

    var chart =
      '<svg viewBox="0 0 600 135" width="100%" style="display:block;margin-bottom:0">' +
        '<text x="20" y="16" fill="rgba(255,255,255,.5)" font-size="10" font-family="sans-serif" font-weight="600" letter-spacing=".06em">ISSUE BREAKDOWN</text>' +
        '<rect x="20" y="24" width="' + W + '" height="22" rx="4" fill="rgba(255,255,255,.06)"/>' +
        '<rect x="20" y="24" width="' + autoW + '" height="22" rx="4" fill="#16a34a" opacity=".8"/>' +
        '<rect x="' + (20+autoW) + '" y="24" width="' + claudeW + '" height="22" rx="0" fill="#b91c1c" opacity=".7"/>' +
        (otherW > 0 ? '<rect x="' + (20+autoW+claudeW) + '" y="24" width="' + otherW + '" height="22" rx="4" fill="rgba(255,255,255,.08)"/>' : '') +
        '<text x="' + (20+autoW/2) + '" y="40" text-anchor="middle" fill="#fff" font-size="9" font-family="sans-serif" font-weight="600">' + autoN + ' auto</text>' +
        (claudeW > 30 ? '<text x="' + (20+autoW+claudeW/2) + '" y="40" text-anchor="middle" fill="#fca5a5" font-size="9" font-family="sans-serif" font-weight="600">' + claudeN + ' Claude</text>' : '') +
        '<text x="20" y="72" fill="rgba(255,255,255,.3)" font-size="8" font-family="sans-serif" letter-spacing=".05em">BY CATEGORY</text>' +
        catBars +
      '</svg>';

    // Sequence diagram
    function box(x, y, w, label, sub, fill, textFill) {
      var tf = textFill || '#e0e7ff';
      var sf = sub ? (textFill ? 'rgba(255,255,255,.55)' : 'rgba(255,255,255,.45)') : '';
      return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + (sub ? 38 : 28) + '" rx="5" fill="' + (fill||'rgba(255,255,255,.07)') + '" stroke="rgba(255,255,255,.12)" stroke-width="0.5"/>'+
             '<text x="' + (x+w/2) + '" y="' + (y+(sub?13:15)) + '" text-anchor="middle" fill="' + tf + '" font-size="9" font-family="sans-serif" font-weight="600">' + label + '</text>'+
             (sub ? '<text x="' + (x+w/2) + '" y="' + (y+26) + '" text-anchor="middle" fill="' + sf + '" font-size="8" font-family="sans-serif">' + sub + '</text>' : '');
    }
    function arr(x1,y1,x2,y2) {
      return '<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="rgba(255,255,255,.2)" stroke-width="1" marker-end="url(#aw)"/>';
    }
    function lane(y, label, color) {
      return '<rect x="4" y="' + y + '" width="592" height="54" rx="5" fill="' + color + '" opacity=".04"/>'+
             '<text x="10" y="' + (y+9) + '" fill="rgba(255,255,255,.2)" font-size="7" font-family="sans-serif" letter-spacing=".08em">' + label + '</text>';
    }

    var seq =
      '<svg viewBox="0 0 600 310" width="100%" style="display:block">' +
        '<defs><marker id="aw" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M2 2L8 5L2 8" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="1.5" stroke-linecap="round"/></marker></defs>' +
        '<text x="300" y="14" text-anchor="middle" fill="rgba(255,255,255,.5)" font-size="10" font-family="sans-serif" font-weight="600" letter-spacing=".06em">AUTONOMOUS PIPELINE</text>' +

        // Lanes
        lane(22,  'EVERY 10 MIN', '#6366f1') +
        lane(84,  'DAILY',        '#06b6d4') +
        lane(146, 'WEEKLY',       '#10b981') +
        lane(216, 'ON DEMAND',    '#f59e0b') +

        // Every 10 min row
        box(8,  30, 88, 'auto-publish', '.ps1',   'rgba(99,102,241,.25)', '#a5b4fc') +
        arr(96,  49, 108, 49) +
        box(108, 30, 72, 'git push', 'all repos', 'rgba(99,102,241,.15)') +
        arr(180, 49, 192, 49) +
        box(192, 30, 72, 'code scan', 'AdSense+sec', 'rgba(99,102,241,.15)') +
        arr(264, 49, 276, 49) +
        box(276, 30, 72, 'fix-queue', 'updated',  'rgba(99,102,241,.15)') +
        arr(348, 49, 360, 49) +
        box(360, 30, 80, 'IndexNow', 'submit URLs', 'rgba(99,102,241,.15)') +
        arr(440, 49, 452, 49) +
        box(452, 30, 80, 'backup', 'scripts repo', 'rgba(99,102,241,.15)') +

        // Daily row
        box(8,  92, 110, 'fetch-gsc-stats', '.ps1', 'rgba(6,182,212,.25)', '#67e8f9') +
        arr(118, 111, 130, 111) +
        box(130, 92, 90, 'gsc-stats', '.json -> CDN', 'rgba(6,182,212,.15)') +
        arr(220, 111, 232, 111) +
        box(232, 92, 100, 'admin panel', 'GSC + SEO tab', 'rgba(6,182,212,.15)') +

        // Weekly row
        box(8,  154, 78, 'seo-audit', '.ps1',       'rgba(16,185,129,.25)', '#6ee7b7') +
        arr(86,  173, 98, 173) +
        box(98,  154, 72, 'seo-fix', 'auto-patch',  'rgba(16,185,129,.15)') +
        arr(170, 173, 182, 173) +
        box(182, 154, 84, 'check-page-rank', '.ps1', 'rgba(16,185,129,.15)') +
        arr(266, 173, 278, 173) +
        box(278, 154, 88, 'prioritize-fixes', '.ps1', 'rgba(16,185,129,.15)') +
        arr(366, 173, 378, 173) +
        box(378, 154, 84, 'auto-improve', '.ps1',    'rgba(16,185,129,.15)') +
        arr(462, 173, 474, 173) +
        box(474, 154, 84, 'session-brief', '.md CDN', 'rgba(16,185,129,.15)') +

        // On demand row
        box(8,  224, 90, 'script-runner', '.ps1',    'rgba(245,158,11,.2)',  '#fcd34d') +
        arr(98,  243, 110, 243) +
        box(110, 224, 80, 'one-off fixes', 'queued',  'rgba(245,158,11,.1)') +
        box(280, 224, 90, 'Claude session', 'you + MCP', 'rgba(245,158,11,.2)', '#fcd34d') +
        arr(370, 243, 382, 243) +
        box(382, 224, 90, 'content fixes', 'top items', 'rgba(245,158,11,.1)') +
        arr(472, 243, 484, 243) +
        box(484, 224, 86, 'Publish Now', 'push live', 'rgba(245,158,11,.15)') +

        // Output boxes
        '<rect x="4" y="282" width="592" height="22" rx="4" fill="rgba(255,255,255,.04)" stroke="rgba(255,255,255,.08)" stroke-width="0.5"/>'+
        '<text x="300" y="297" text-anchor="middle" fill="rgba(255,255,255,.4)" font-size="9" font-family="sans-serif">All output published to GitHub Pages via aiunites.github.io CDN + custom domains</text>'+
      '</svg>';

    bodyEl.innerHTML =
      '<div style="padding:8px 12px 0">' + chart + '</div>' +
      '<div style="padding:0 12px 12px">' + seq + '</div>';
  }

  function toggleTodoPanel() {
    var panel = document.getElementById('au-todo-panel');
    if (panel) { panel.classList.toggle('open'); return; }

    panel = document.createElement('div');
    panel.id = 'au-todo-panel';

    // Head
    var head = document.createElement('div');
    head.className = 'au-todo-head';
    head.innerHTML =
      '<span class="au-todo-title">&#128203; Work Queue</span>' +
      '<span class="au-todo-meta" id="au-todo-status">Loading...</span>' +
      '<span class="au-todo-close" id="au-todo-close">&#10006;</span>';
    panel.appendChild(head);

    // Tabs
    var tabs = document.createElement('div');
    tabs.className = 'au-todo-tabs';
    tabs.innerHTML =
      '<div class="au-tab active" id="au-tab-actions">&#128203; Actions</div>' +
      '<div class="au-tab" id="au-tab-brief">&#128196; Brief</div>' +
      '<div class="au-tab" id="au-tab-pipeline">&#128202; Pipeline</div>' +
      '<div class="au-tab" id="au-tab-widgets">&#128274; Widgets</div>';
    panel.appendChild(tabs);

    // Bodies
    var bodyActions = document.createElement('div');
    bodyActions.className = 'au-todo-body';
    bodyActions.id = 'au-body-actions';
    bodyActions.innerHTML = '<div class="au-todo-empty">Loading...</div>';
    panel.appendChild(bodyActions);

    var bodyBrief = document.createElement('div');
    bodyBrief.className = 'au-brief-body';
    bodyBrief.id = 'au-body-brief';
    bodyBrief.style.display = 'none';
    bodyBrief.innerHTML = '<div class="au-todo-empty">Loading session brief...</div>';
    panel.appendChild(bodyBrief);

    var bodyPipeline = document.createElement('div');
    bodyPipeline.className = 'au-todo-body';
    bodyPipeline.id = 'au-body-pipeline';
    bodyPipeline.style.display = 'none';
    bodyPipeline.innerHTML = '<div class="au-todo-empty">Loading...</div>';
    panel.appendChild(bodyPipeline);

    var bodyWidgets = document.createElement('div');
    bodyWidgets.className = 'au-todo-body';
    bodyWidgets.id = 'au-body-widgets';
    bodyWidgets.style.display = 'none';
    bodyWidgets.innerHTML = '<div class="au-todo-empty">Loading widget visibility...</div>';
    panel.appendChild(bodyWidgets);

    document.body.appendChild(panel);

    // Tab switching
    document.getElementById('au-tab-actions').addEventListener('click', function() {
      document.getElementById('au-tab-actions').classList.add('active');
      document.getElementById('au-tab-brief').classList.remove('active');
      document.getElementById('au-body-actions').style.display = 'block';
      document.getElementById('au-body-brief').style.display = 'none';
    });
    document.getElementById('au-tab-brief').addEventListener('click', function() {
      document.getElementById('au-tab-brief').classList.add('active');
      document.getElementById('au-tab-actions').classList.remove('active');
      document.getElementById('au-tab-pipeline').classList.remove('active');
      document.getElementById('au-body-brief').style.display = 'block';
      document.getElementById('au-body-actions').style.display = 'none';
      document.getElementById('au-body-pipeline').style.display = 'none';
    });
    document.getElementById('au-tab-pipeline').addEventListener('click', function() {
      document.getElementById('au-tab-pipeline').classList.add('active');
      document.getElementById('au-tab-actions').classList.remove('active');
      document.getElementById('au-tab-brief').classList.remove('active');
      document.getElementById('au-tab-widgets').classList.remove('active');
      document.getElementById('au-body-pipeline').style.display = 'block';
      document.getElementById('au-body-actions').style.display = 'none';
      document.getElementById('au-body-brief').style.display = 'none';
      document.getElementById('au-body-widgets').style.display = 'none';
    });
    document.getElementById('au-tab-widgets').addEventListener('click', function() {
      document.getElementById('au-tab-widgets').classList.add('active');
      document.getElementById('au-tab-actions').classList.remove('active');
      document.getElementById('au-tab-brief').classList.remove('active');
      document.getElementById('au-tab-pipeline').classList.remove('active');
      document.getElementById('au-body-widgets').style.display = 'block';
      document.getElementById('au-body-actions').style.display = 'none';
      document.getElementById('au-body-brief').style.display = 'none';
      document.getElementById('au-body-pipeline').style.display = 'none';
    });

    document.getElementById('au-todo-close').addEventListener('click', function() {
      panel.classList.remove('open');
    });

    // Load action list
    fetchActionList(function(data) {
      var statusEl = document.getElementById('au-todo-status');
      if (!data) {
        if (statusEl) statusEl.textContent = 'No data - run prioritize-fixes.ps1';
        bodyActions.innerHTML = '<div class="au-todo-empty">Run prioritize-fixes.ps1 then Publish Now.</div>';
        return;
      }
      if (statusEl) statusEl.textContent = data.generatedFmt || '';
      renderActionTab(data, bodyActions);
    });

    // Load session brief
    fetchSessionBrief(function(md) {
      if (!md) {
        bodyBrief.innerHTML = '<div class="au-todo-empty">No session-brief.md yet. Run prioritize-fixes.ps1 then Publish Now.</div>';
        return;
      }
      renderBriefTab(md, bodyBrief);
    });

    // Render pipeline
    fetchActionList(function(data) {
      renderPipelineTab(data, bodyPipeline);
    });

    // Load widget visibility
    fetchVisibility(function(vis) {
      renderWidgetsTab(vis, bodyWidgets);
    });

    setTimeout(function() { panel.classList.add('open'); }, 20);
  }

  // -------------------------------------------------------
  // LOGIN MODAL
  // -------------------------------------------------------
  function showLoginModal() {
    if (document.getElementById('au-login-overlay')) return;
    injectStyles();

    var overlay = document.createElement('div');
    overlay.id = 'au-login-overlay';
    overlay.innerHTML =
      '<div id="au-login-box">' +
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
    var errEl     = document.getElementById('au-login-err');

    document.getElementById('au-login-submit').addEventListener('click', function() {
      if (login(userInput.value.trim(), passInput.value)) {
        overlay.remove();
        showToolbar();
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

  // -------------------------------------------------------
  // TRIGGER + INIT
  // -------------------------------------------------------
  function setupTrigger() {
    var clicks = 0, timer = null;
    var logo = document.querySelector('.nav-logo, .logo, [class*="logo"], #nav-logo, a[href="/"]');

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
        if (!isAdmin()) showLoginModal();
      }
    });
  }

  function injectFooterLink() {
    function tryInject() {
      var legal = document.querySelector('.footer-legal, .footer-bottom, footer');
      if (!legal) return;
      var link = document.createElement('a');
      if (isAdmin()) {
        link.href = 'admin.html';
        link.textContent = '\u25C6 Admin';
      } else {
        link.href = '#';
        link.textContent = '\u25C6 Admin';
        link.addEventListener('click', function(e) { e.preventDefault(); showLoginModal(); });
      }
      link.style.cssText = 'color:rgba(255,255,255,0.25);font-size:0.72rem;text-decoration:none;margin-left:16px;transition:color 0.2s;';
      link.addEventListener('mouseenter', function() { link.style.color = 'rgba(99,102,241,0.8)'; });
      link.addEventListener('mouseleave', function() { link.style.color = 'rgba(255,255,255,0.25)'; });
      legal.appendChild(link);
    }
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', tryInject);
    } else {
      tryInject();
    }
  }

  function injectNavButton() {
    function tryInject() {
      // Don't inject on admin.html - it has its own layout
      if (window.location.pathname.indexOf('admin.html') !== -1) return;
      if (document.getElementById('au-nav-btn')) return;

      var navLinks = document.getElementById('nav-links') ||
                     document.querySelector('.nav-links, .nav-menu, nav ul');
      if (!navLinks) return;

      var btn = document.createElement('a');
      btn.id = 'au-nav-btn';

      if (isAdmin()) {
        var u = getCurrentUser();
        btn.href = 'admin.html';
        btn.innerHTML = '&#128100; ' + ((u && u.displayName) || 'Admin');
        btn.style.cssText = 'display:inline-flex;align-items:center;gap:6px;background:rgba(99,102,241,.15);border:1px solid rgba(99,102,241,.4);color:#a5b4fc;text-decoration:none;padding:8px 16px;border-radius:8px;font-size:.85rem;font-weight:600;transition:all .2s;white-space:nowrap;';
        btn.addEventListener('mouseenter', function() { btn.style.background = 'rgba(99,102,241,.3)'; });
        btn.addEventListener('mouseleave', function() { btn.style.background = 'rgba(99,102,241,.15)'; });
      } else {
        btn.href = '#';
        btn.textContent = 'Log In';
        btn.style.cssText = 'display:inline-flex;align-items:center;background:#6366f1;color:#fff;text-decoration:none;padding:9px 20px;border-radius:8px;font-size:.9rem;font-weight:700;transition:opacity .2s;white-space:nowrap;';
        btn.addEventListener('mouseenter', function() { btn.style.opacity = '.85'; });
        btn.addEventListener('mouseleave', function() { btn.style.opacity = '1'; });
        btn.addEventListener('click', function(e) { e.preventDefault(); showLoginModal(); });
      }

      navLinks.appendChild(btn);
    }
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', tryInject);
    } else {
      tryInject();
    }
  }

  function init() {
    window.__auAdminNav = function() {
      if (isAdmin()) showToolbar();
      else showLoginModal();
    };
    // Always inject footer link and nav button (visible to everyone)
    injectFooterLink();
    injectNavButton();
    if (isAdmin()) {
      showToolbar();
    } else {
      setupTrigger();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
