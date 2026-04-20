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
      '#au-login-box .au-cancel{color:#6366f1;font-size:12px;text-align:center;margin-top:12px;cursor:pointer;display:block}'
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
      '<span class="au-logout" id="au-logout-btn">&#10006; Logout</span>';

    document.body.appendChild(bar);
    document.body.style.paddingBottom = '42px';

    document.getElementById('au-logout-btn').addEventListener('click', function() {
      if (confirm('Log out of AIUNITES admin?')) { logout(); location.reload(); }
    });
  }

  function hideToolbar() {
    var bar = document.getElementById('au-admin-toolbar');
    if (bar) bar.remove();
    document.body.style.paddingBottom = '';
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
