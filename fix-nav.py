"""
fix-nav.py — replaces old flat nav-links with new dropdown nav across all middleware pages
Run from: C:\Users\tombh\Documents\GitHub\aiunites-site\
"""
import re, os, glob

NEW_NAV = '''      <div class="nav-links" id="nav-links">
        <div class="nav-more" id="nav-about" style="position:relative">
          <button class="nav-more-btn" id="nav-about-btn" aria-expanded="false">About &#9660;</button>
          <div class="nav-more-drop" id="nav-about-drop">
            <a href="network.html">Network</a>
            <a href="identity.html">Identity</a>
            <a href="data.html">Data</a>
          </div>
        </div>
        <div class="nav-more" id="nav-movement" style="position:relative">
          <button class="nav-more-btn" id="nav-movement-btn" aria-expanded="false">Movement &#9660;</button>
          <div class="nav-more-drop" id="nav-movement-drop">
            <a href="movement.html">Movement Overview</a>
            <a href="notation-studio.html" style="color:#a78bfa;font-weight:600">&#9670; UMN Studio</a>
            <a href="builder.html">HMN Builder</a>
            <a href="hmn-spec.html">HMN Spec</a>
          </div>
        </div>
        <a href="my-ai-profile.html">My Profile</a>
        <a href="consulting.html">Consulting</a>
        <a href="index.html#contact" class="nav-cta">Contact Us</a>
      </div>'''

# Match the nav-links div (with all its varying inner content)
PATTERN = re.compile(
    r'      <div class="nav-links" id="nav-links">.*?      </div>',
    re.DOTALL
)

TARGETS = [
    'network.html', 'identity.html', 'data.html', 'movement.html',
    'consulting.html', 'press.html', 'builder.html', 'hmn-spec.html',
    'notation-studio.html', 'my-ai-profile.html', 'my-ai-profile-builder.html',
    'spec.html', 'legal.html', 'acp.html', 'acp-builder.html',
    'articles.html', 'article-fitness-data.html',
    'article-middleware-philosophy.html', 'article-movement-babel.html',
]

changed = []
for fname in TARGETS:
    if not os.path.exists(fname):
        print(f'SKIP (not found): {fname}')
        continue
    with open(fname, 'r', encoding='utf-8-sig') as f:
        content = f.read()
    
    # Only replace if old flat nav is present (contains individual Network/Identity/Data links)
    if 'id="nav-links"' not in content:
        print(f'SKIP (no nav-links): {fname}')
        continue
    
    new_content, n = PATTERN.subn(NEW_NAV, content, count=1)
    if n == 0:
        print(f'NO MATCH: {fname}')
        continue
    if new_content == content:
        print(f'UNCHANGED: {fname}')
        continue
    
    with open(fname, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f'UPDATED: {fname}')
    changed.append(fname)

print(f'\nDone. {len(changed)} files updated.')
