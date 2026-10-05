# Gerçek görsel atölyesi — araçlar

"Aletin içinde ne var?" bölümünün **Gerçek görseller** kipi bu klasördeki dosyalardan üretilir ve
`index.html` içine gömülür (site tek dosya olarak kalır; görseller `gorseller/` altındadır).

- `engine.js`, `engine.css` — katmanları CSS 3B ile yığan, numara/çizgi/etiket çizen görüntüleyici.
- `integrate.js`, `integrate.css` — 3B Atölye'ye bağlantı: kip düğmesi, parça listesi, "Parçaları ayır", büyük görünüm.
- `SPEC_CONTRACT.md` — `gorseller/<alet>/spec.js` veri biçimi.
- `assemble.py` — motor + tüm `spec.js` + bağlantıyı `index.html`e yerleştirir (işaretler arası değiştirir, tekrar çalıştırılabilir):
  `python3 araclar/gercek-gorsel/assemble.py`
- `kaynaklar.py` — `gorseller/KAYNAKLAR.md` dosyasını spec'lerdeki kaynak kayıtlarından yeniden üretir:
  `python3 araclar/gercek-gorsel/kaynaklar.py`

Bir görseli ya da numara konumunu değiştirmek için ilgili `spec.js`yi düzenleyip iki betiği çalıştırın.
