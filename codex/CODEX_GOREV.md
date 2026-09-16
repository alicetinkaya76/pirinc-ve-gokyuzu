# Görev: Aletlere 3B patlatılmış görünüm ve eklem şeması ekle

## Bağlam

`index.html` tek dosyalık bir web sitesidir. Fuat Sezgin'in *İslam'da Bilim ve Teknik*
Cilt I kitabından çıkarılmış etkileşimli bir müzedir. Derleme adımı **yoktur**: dosya
doğrudan GitHub Pages'te yayımlanır. Bundler, npm, framework yok; düz HTML + CSS +
vanilla JS.

Senden istenen: sitede zaten adı ve **parça listesi** bulunan aletlere, parçaların
birbirinden ayrılarak açıldığı **3B patlatılmış görünüm** (exploded view) ve parçaların
birbirine nasıl bağlandığını gösteren **eklem şeması** eklemek.

## Dosyada hâlihazırda ne var

Tek dosya, yaklaşık 700 KB. İçinde şu küresel değişkenler tanımlı (hepsi klasik script
kapsamında, sırayla yüklenir):

| Ad | Ne |
|---|---|
| `VERI` | Bütün veri katmanı. `VERI.aletler`, `VERI.haritalar`, `VERI.kitaplar`, `VERI.alimler`, `VERI.olaylar`, `VERI.vitrin`, `VERI.defter`, `VERI.tusi`, `VERI.ih`, `VERI.thm` |
| `AST` | Usturlap matematiği: `AST.plate(enlem,k)`, `AST.rete(k,yıl)`, `AST.alt(yıldız,enlem,dönüş)`, `AST.tanr(dec)`, `AST.STARS`, `AST.EPS` |
| `EQ` | Ekuant ve Tûsî çifti matematiği |
| `P_PARCA` | Usturlabın sekiz parçası: `{id, ad, ar, ds}` |
| `SEHIRLER` | Enlem ön ayarları |
| `usturlapKur(kök)` | 2B usturlabı SVG olarak kuran fabrika |
| `$`, `$$`, `el`, `esc`, `svg` | Kısa yardımcılar. `svg(tag, attrs)` SVG düğümü üretir |

Parça listesi olan nesneler `VERI.aletler` içinde `parca` alanıyla durur:

```js
VERI.aletler.filter(o => o.parca && o.parca.length >= 2)   // 25 kayıt
```

## Ne yapılacak

### 1. Yeni bölüm: "Patlatılmış Görünüm"

`#vitrin` bölümünden hemen **önce** yeni bir `<section id="patlatma">` ekle. Sitedeki
diğer bölümlerin kalıbını birebir izle: `.wrap` → `.sect-h` (`.kick` + `h2` + `.sub`)
→ `.case`.

### 2. Hangi aletler

Öncelik sırası (parça verisi en zengin ve geometrisi en anlamlı olanlar):

1. **Usturlap** — `P_PARCA`'daki sekiz parça. Katmanlı bir disk yığını olduğu için
   patlatmaya en uygun olan budur, önce bunu yap.
2. **Pusula** — `VERI.aletler` içinde "Pusula (magnetik / mıknatıslı iğne)".
   Altı parça: mıknatıslı iğne, otuz iki kısma bölünmüş disk, diski taşıyan kap,
   kardan denilen silindirik asma mekanizması, karton disk, diskin üstündeki çivi.
   **Kardan askısı gerçek bir eklemdir** — iki halkanın dik eksenlerde dönmesini göster.
3. **Altı pistonlu su çıkarma ve dağıtım mekanizması** — su çarkı, eksantrik mili,
   altı kaldıraç, altı piston. Bu bir **kinematik zincirdir**: çark döner, eksantrik
   mili kaldıraçları, kaldıraçlar pistonları sürer. Eklemleri bu zinciri göstermeli.
4. **Kavs ez-ziyâr (büyük tatar oku)** — devasa yay, birbirine yapıştırılmış ahşap ve
   boynuz plaka katları, çark. Katmanlı yay için patlatma çok uygun.
5. **Tabak Menâtık** — merkezî gösterge (Alhidade), derecelendirilmiş paralel cetvel,
   deferent daireleri, ek daireler.

Beşi de zor gelirse ilk üçünü tam yap; yarım bırakma.

### 3. Patlatma nasıl çalışmalı

- **Tek sürgü** patlatma katsayısını 0'dan 1'e sürer. 0'da alet monte, 1'de parçalar
  eksen boyunca tamamen ayrık.
- Parçalar ayrılırken aralarında **eklem çizgileri** (ince, kesikli) kalsın; bu çizgiler
  hangi parçanın hangisine, nereden bağlandığını gösterir. Usturlapta bütün yığını tutan
  tek bir merkezî mil vardır — onu görünür kıl.
- Her parçanın yanında **etiketi** dursun: Türkçe adı, varsa Arapçası.
- Bir parçaya tıklayınca o parça öne çıksın, ötekiler sönükleşsin; yanda o parçanın
  kitaptaki açıklaması görünsün. Sitedeki mevcut `.apart` / `.pitem` odaklanma davranışı
  aynı mantıkta, ona bak.
- **Sürükleyerek döndürme** ve **tekerlekle yakınlaştırma** olsun.

### 4. Teknik kısıtlar — bunlara uy

- **Tek dosya kalacak.** Harici `.js` / `.css` dosyası ekleme. Her şey `index.html` içinde.
- **Derleme adımı ekleme.** npm, webpack, vite, TypeScript yok.
- Kütüphane gerekiyorsa **yalnızca cdnjs**'ten, **sürümü sabitlenmiş UMD** derlemesi kullan:
  `https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js`
  Sayfa Claude Artifact olarak da yayımlandığı için başka CDN'ler engellenir.
  `OrbitControls` çekirdek pakette **yoktur** — cdnjs'te güvenilir biçimde bulunmaz,
  onu çekmeye çalışma; sürükle-döndür ve tekerlek-yakınlaştırmayı kendin yaz (otuz satır).
- three.js fazla ağır gelirse **kendi izometrik/perspektif izdüşümünü** yazman da kabul
  edilebilir; sitenin geri kalanı zaten elle yazılmış SVG ve Canvas. Seçimi sen yap,
  ama gerekçeni koda bir yorum olarak yaz.
- **Renkleri CSS değişkenlerinden al**, sabit renk yazma:
  `--ink --ink2 --case --case2 --brass --brass-lit --brass-dim --verd --verd-dim
  --lapis --rust --text --dim --faint --rule --rule2`
  Sitede **açık tema** (`Parşömen` düğmesi, `data-theme="light"`) var; patlatma her iki
  temada da okunaklı olmalı. Canvas/WebGL kullanıyorsan tema değişince renkleri yenile.
- `prefers-reduced-motion` açıkken kendiliğinden dönme/animasyon olmasın.
- Telefon genişliğinde (~400 px) çalışsın, yatay kaydırma doğurmasın.
- Klavyeyle erişilebilir olsun: parçalar `tabindex` alsın, `Enter`/`Space` ile seçilsin,
  odak görünür olsun.

### 5. Veri dürüstlüğü — en önemli madde

Bu sitenin tamamı kitabın metninden çıkarıldı ve **kitapta geçmeyen hiçbir bilgi
eklenmedi**. Bunu bozma:

- **Parça adı uydurma.** Yalnızca `P_PARCA` ve `VERI.aletler[].parca` içinde geçen adları
  kullan. Bir alette senin bildiğin ama listede olmayan bir parça varsa **ekleme**.
- Geometri kaçınılmaz olarak bir **yeniden kurgudur**: kitap ölçülü teknik resim vermez.
  Bunu kullanıcıdan gizleme — her patlatmanın altına kısa bir not koy:
  *"Parça adları kitaptan; biçim ve oranlar, metindeki tarife dayanan bir yeniden kurgudur."*
- Ölçü, tarih, malzeme gibi sayısal bir şey yazacaksan yalnızca ilgili kaydın
  `ac`, `kim`, `tarih` alanlarından al.

### 6. Bozmayacakların

Şunlar çalışıyor, dokunma: `#usturlap` (gerçek stereografik izdüşüm),
`#ekuant` (ekuant kanıtı + Tûsî çifti), `#defter` (doğruluk defteri), `#akdeniz`,
`#vitrin`, `#etiket`, `#zaman`, `#dizin`, tema düğmesi, ilerleme çubuğu.

İşin bitince tarayıcı konsolunda **sıfır hata** olmalı ve yukarıdaki bölümlerin hepsi
hâlâ çalışıyor olmalı.

## Kabul ölçütü

1. `index.html` tek dosya, derleme adımsız, çift tıkla açılınca çalışıyor.
2. En az üç alet için patlatılmış görünüm var; sürgü, döndürme, parça seçimi çalışıyor.
3. Eklemler görünür ve hangi parçanın nereye bağlandığını anlatıyor.
4. Bütün parça adları kitap kaynaklı; uydurma parça yok.
5. Her iki temada okunaklı, telefonda bozulmuyor, konsol temiz.
6. Mevcut bölümlerin hiçbiri bozulmamış.
