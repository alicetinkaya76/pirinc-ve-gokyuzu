#!/usr/bin/env python3
"""Gerçek görsel atölyesini index.html'e yerleştirir (yeniden çalıştırılabilir: işaretler arası değiştirilir)."""
import pathlib, re, json, sys
TOOLS = pathlib.Path(__file__).resolve().parent
REPO = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else TOOLS.parents[1]
P = REPO/'index.html'
s = P.read_text(encoding='utf-8')
css = (TOOLS/'engine.css').read_text() + '\n' + (TOOLS/'integrate.css').read_text()
specs = {}
for f in sorted((REPO/'gorseller').glob('*/spec.js')):
    body = f.read_text(encoding='utf-8').strip()
    m = re.match(r'^window\.XP_SPEC\s*=\s*(\{.*\})\s*;?\s*$', body, re.S)
    if not m: sys.exit(f'bad spec wrapper: {f}')
    spec = json.loads(m.group(1))          # must be strict JSON
    specs[spec['id']] = spec
data = 'window.XP_REAL_SPECS=' + json.dumps(specs, ensure_ascii=False, separators=(',', ':')) + ';'
js = (TOOLS/'engine.js').read_text() + '\n' + data + '\n' + (TOOLS/'integrate.js').read_text()
CB, CE = '/* XR-CSS:BEGIN */', '/* XR-CSS:END */'
JB, JE = '<!-- XR:BEGIN -->', '<!-- XR:END -->'
cblock = CB + '\n' + css + '\n' + CE
jblock = JB + '\n<script>\n' + js + '\n</script>\n' + JE
if CB in s:
    s = re.sub(re.escape(CB) + r'.*?' + re.escape(CE), lambda _: cblock, s, flags=re.S)
else:
    b = s.index('<body'); i = s.rindex('</style>', 0, b); s = s[:i] + cblock + '\n' + s[i:]
if JB in s:
    s = re.sub(re.escape(JB) + r'.*?' + re.escape(JE), lambda _: jblock, s, flags=re.S)
else:
    i = s.rindex('</body>'); s = s[:i] + jblock + '\n' + s[i:]
P.write_text(s, encoding='utf-8')
print('specs:', sorted(specs), 'bytes:', len(s.encode()))
