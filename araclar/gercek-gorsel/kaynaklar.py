#!/usr/bin/env python3
"""gorseller/*/spec.js içindeki kaynak kayıtlarından gorseller/KAYNAKLAR.md üretir."""
import json, re, pathlib, sys
REPO = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else '/Users/alicetinkaya/Desktop/pirinc-ve-gokyuzu')
NAMES = {'astro': 'Usturlap', 'compass': 'Pusula', 'pump': 'Altı pistonlu su mekanizması',
         'bow': 'Kavs ez-ziyar (büyük arbalet)', 'tabak': 'Tabak Menâtık'}
ORDER = ['astro', 'compass', 'pump', 'bow', 'tabak']
out = ['# Görsel kaynakları ve lisanslar', '',
       '"Aletin içinde ne var?" bölümünün **Gerçek görseller** kipindeki her görsel, aşağıdaki kurumların',
       'açık erişimli kayıtlarından alınmıştır. Kesimler, döndürmeler, renk ayarı, numaralar, çizgiler ve',
       'katman düzeni bu siteye aittir; kaynak görsellerin lisansı türetilmiş dosyalar için de geçerlidir',
       '(CC BY-SA görsellerden türetilen kesimler CC BY-SA olarak kalır; CC BY-NC görseller yalnız ticari',
       'olmayan kullanım içindir). Lisanslar kaynak kurumun kendi metaverisinden doğrulanmıştır.', '']
for key in ORDER:
    f = REPO / 'gorseller' / key / 'spec.js'
    if not f.exists():
        continue
    m = re.match(r'^\s*window\.XP_SPEC\s*=\s*(\{.*\})\s*;?\s*$', f.read_text(encoding='utf-8'), re.S)
    spec = json.loads(m.group(1))
    used = {}
    for v in spec.get('views', []):
        ks = [l.get('credit') for l in v.get('layers', [])] + [v.get('credit')] + list(v.get('credits', []))
        for k in ks:
            if k:
                used.setdefault(k, []).append(v['label'])
    for i, pi in (spec.get('partImages') or {}).items():
        used.setdefault(pi.get('credit'), []).append('yan panel görseli')
    out += [f'## {NAMES.get(key, key)}', '']
    for k, c in spec.get('credits', {}).items():
        where = ', '.join(dict.fromkeys(used.get(k, []))) or '—'
        out.append(f'- **{c.get("text", k)}**')
        if c.get('license'):
            lic = f'[{c["license"]}]({c["licenseUrl"]})' if c.get('licenseUrl') else c['license']
            out.append(f'  - Lisans: {lic}')
        for lab, fld in [('Kayıt', 'url'), ('Kullanılan dosya', 'source'), ('Envanter / raf no', 'accession'),
                         ('Fotoğrafçı / yazar', 'author'), ('Erişim', 'retrieved'), ('Lisans kanıtı', 'evidence')]:
            if c.get(fld):
                out.append(f'  - {lab}: {c[fld]}')
        out.append(f'  - Kullanıldığı görünüm: {where}')
    out.append('')
(REPO / 'gorseller' / 'KAYNAKLAR.md').write_text('\n'.join(out), encoding='utf-8')
print('yazıldı', REPO / 'gorseller' / 'KAYNAKLAR.md')
