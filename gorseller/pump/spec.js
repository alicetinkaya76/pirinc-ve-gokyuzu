window.XP_SPEC = {
 "id": "pump",
 "default": "cizim",
 "partNames": [
  "su çarkı",
  "eksantrik mili",
  "altı kaldıraç",
  "altı piston"
 ],
 "views": [
  {
   "id": "cizim",
   "label": "Çizimden patlatma",
   "type": "stack",
   "frame": {
    "w": 3918,
    "h": 5757
   },
   "tilt": 0,
   "spin": 0,
   "layers": [
    {
     "id": "zemin",
     "src": "gorseller/pump/sayfa-zemin.webp",
     "w": 953,
     "h": 1400,
     "box": [
      0,
      0,
      3918,
      5757
     ],
     "z": 0,
     "explode": [
      0,
      0,
      0
     ],
     "parts": [],
     "credit": "cbl",
     "alt": "Chester Beatty Ar 5232, 19b yaprağının çizim bölümü: kâğıt zemin; yazı ve birleşik çizim soluk bırakılmış."
    },
    {
     "id": "pistonlar",
     "src": "gorseller/pump/alti-piston.webp",
     "w": 1327,
     "h": 1053,
     "box": [
      400,
      1070,
      2948,
      2340
     ],
     "z": 2,
     "explode": [
      -330,
      -1000,
      0
     ],
     "parts": [
      3
     ],
     "credit": "cbl",
     "alt": "Altı silindir, piston kolları, ağırlıklar, silindirleri çevreleyen dikdörtgen gövde ve ortak çıkışa giden altı boru (Takiyüddin'in el yazmasındaki çizimden kesilmiş)."
    },
    {
     "id": "kaldiraclar",
     "src": "gorseller/pump/kaldiraclar.webp",
     "w": 1335,
     "h": 993,
     "box": [
      380,
      2255,
      2966,
      2207
     ],
     "z": 4,
     "explode": [
      0,
      0,
      0
     ],
     "parts": [
      2
     ],
     "credit": "cbl",
     "alt": "Altı kaldıraç çizgisi ve üzerinde döndükleri ortak dayanak çubuğu (Takiyüddin'in el yazmasındaki çizimden kesilmiş)."
    },
    {
     "id": "mil",
     "src": "gorseller/pump/eksantrik-mili.webp",
     "w": 1397,
     "h": 216,
     "box": [
      303,
      4281,
      3104,
      479
     ],
     "z": 6,
     "explode": [
      0,
      380,
      0
     ],
     "parts": [
      1
     ],
     "credit": "cbl",
     "alt": "Eksantrik mili: kırmızı mil, altı kam ve iki ucundaki siyah yatak (Takiyüddin'in el yazmasındaki çizimden kesilmiş)."
    },
    {
     "id": "cark",
     "src": "gorseller/pump/su-carki.webp",
     "w": 231,
     "h": 736,
     "box": [
      2814,
      3672,
      514,
      1635
     ],
     "z": 8,
     "explode": [
      520,
      380,
      0
     ],
     "parts": [
      0
     ],
     "credit": "cbl",
     "alt": "Kaşık biçimli kanatlarıyla su çarkı, mil üzerindeki göbeğiyle (Takiyüddin'in el yazmasındaki çizimden kesilmiş)."
    }
   ],
   "hotspots": [
    {
     "part": 0,
     "layer": "cark",
     "x": 0.5039,
     "y": 0.074,
     "shapes": [
      {
       "type": "circle",
       "cx": 0.5078,
       "cy": 0.4948,
       "r": 0.1848
      }
     ]
    },
    {
     "part": 1,
     "layer": "mil",
     "x": 0.5525,
     "y": 0.4739,
     "shapes": [
      {
       "type": "circle",
       "cx": 0.0483,
       "cy": 0.7766,
       "r": 0.0226
      },
      {
       "type": "circle",
       "cx": 0.1891,
       "cy": 0.6931,
       "r": 0.0226
      },
      {
       "type": "circle",
       "cx": 0.2983,
       "cy": 0.6284,
       "r": 0.0226
      },
      {
       "type": "circle",
       "cx": 0.4729,
       "cy": 0.3319,
       "r": 0.0226
      },
      {
       "type": "circle",
       "cx": 0.6337,
       "cy": 0.2818,
       "r": 0.0226
      },
      {
       "type": "circle",
       "cx": 0.7845,
       "cy": 0.2129,
       "r": 0.0226
      }
     ]
    },
    {
     "part": 2,
     "layer": "kaldiraclar",
     "x": 0.1918,
     "y": 0.8101,
     "shapes": [
      {
       "type": "circle",
       "cx": 0.0442,
       "cy": 0.6275,
       "r": 0.0135
      },
      {
       "type": "circle",
       "cx": 0.209,
       "cy": 0.6275,
       "r": 0.0135
      },
      {
       "type": "circle",
       "cx": 0.3439,
       "cy": 0.6275,
       "r": 0.0135
      },
      {
       "type": "circle",
       "cx": 0.5233,
       "cy": 0.6275,
       "r": 0.0135
      },
      {
       "type": "circle",
       "cx": 0.6807,
       "cy": 0.6275,
       "r": 0.0135
      },
      {
       "type": "circle",
       "cx": 0.8388,
       "cy": 0.6275,
       "r": 0.0135
      }
     ]
    },
    {
     "part": 3,
     "layer": "pistonlar",
     "x": 0.0787,
     "y": 0.7449,
     "shapes": [
      {
       "type": "circle",
       "cx": 0.077,
       "cy": 0.8923,
       "r": 0.021
      },
      {
       "type": "circle",
       "cx": 0.2476,
       "cy": 0.9017,
       "r": 0.021
      },
      {
       "type": "circle",
       "cx": 0.4064,
       "cy": 0.906,
       "r": 0.021
      },
      {
       "type": "circle",
       "cx": 0.5787,
       "cy": 0.9043,
       "r": 0.021
      },
      {
       "type": "circle",
       "cx": 0.7419,
       "cy": 0.8966,
       "r": 0.021
      },
      {
       "type": "circle",
       "cx": 0.9111,
       "cy": 0.7513,
       "r": 0.021
      }
     ]
    }
   ],
   "note": "Chester Beatty Library'deki Ar 5232 nüshasının (kayda göre müellif hattı) 19b yaprağındaki çizimden kesilmiş dört parça. Kaydırıcı açıldıkça güç zinciri boyunca ayrılırlar: çark milin ucundan sağa kayar, mil aşağı iner, kaldıraçlar yerinde kalır, pistonlar ağırlık, silindir, dikdörtgen gövde ve borularıyla yukarı çıkar. Soluk zemin aynı sayfadır ve birleşik çizimi gösterir. Çizgilerin üst üste bindiği birkaç küçük yer (ağırlıkların kaldıraç çizgisi altında kalan kısmı, milin çark göbeği altındaki kısmı) kesimde tarafımızdan tamamlandı.",
   "aspect": 1.52
  },
  {
   "id": "sayfa",
   "label": "Tam sayfa",
   "type": "image",
   "src": "gorseller/pump/sayfa-19b.webp",
   "w": 1318,
   "h": 1800,
   "credit": "cbl",
   "alt": "Takiyüddin'in el yazmasında altı pistonlu su pompasının çizildiği sayfa: üstte ortak çıkış borusu, ortada silindirler, altta kaldıraçlar, kamlı mil ve su çarkı.",
   "hotspots": [
    {
     "part": 0,
     "x": 0.6385,
     "y": 0.6194,
     "shapes": [
      {
       "type": "ellipse",
       "cx": 0.6389,
       "cy": 0.7169,
       "rx": 0.0569,
       "ry": 0.1097
      }
     ]
    },
    {
     "part": 1,
     "x": 0.4383,
     "y": 0.7188,
     "shapes": [
      {
       "type": "circle",
       "cx": 0.1414,
       "cy": 0.7389,
       "r": 0.0133
      },
      {
       "type": "circle",
       "cx": 0.2243,
       "cy": 0.7333,
       "r": 0.0133
      },
      {
       "type": "circle",
       "cx": 0.2886,
       "cy": 0.729,
       "r": 0.0133
      },
      {
       "type": "circle",
       "cx": 0.3915,
       "cy": 0.7093,
       "r": 0.0133
      },
      {
       "type": "circle",
       "cx": 0.4861,
       "cy": 0.706,
       "r": 0.0133
      },
      {
       "type": "circle",
       "cx": 0.575,
       "cy": 0.7014,
       "r": 0.0133
      }
     ]
    },
    {
     "part": 2,
     "x": 0.2355,
     "y": 0.6542,
     "shapes": [
      {
       "type": "circle",
       "cx": 0.1524,
       "cy": 0.5982,
       "r": 0.0075
      },
      {
       "type": "circle",
       "cx": 0.2452,
       "cy": 0.5982,
       "r": 0.0075
      },
      {
       "type": "circle",
       "cx": 0.3211,
       "cy": 0.5982,
       "r": 0.0075
      },
      {
       "type": "circle",
       "cx": 0.422,
       "cy": 0.5982,
       "r": 0.0075
      },
      {
       "type": "circle",
       "cx": 0.5106,
       "cy": 0.5982,
       "r": 0.0075
      },
      {
       "type": "circle",
       "cx": 0.5996,
       "cy": 0.5982,
       "r": 0.0075
      }
     ]
    },
    {
     "part": 3,
     "x": 0.1753,
     "y": 0.4833,
     "shapes": [
      {
       "type": "circle",
       "cx": 0.1744,
       "cy": 0.5312,
       "r": 0.0118
      },
      {
       "type": "circle",
       "cx": 0.2698,
       "cy": 0.5343,
       "r": 0.0118
      },
      {
       "type": "circle",
       "cx": 0.3586,
       "cy": 0.5357,
       "r": 0.0118
      },
      {
       "type": "circle",
       "cx": 0.455,
       "cy": 0.5351,
       "r": 0.0118
      },
      {
       "type": "circle",
       "cx": 0.5463,
       "cy": 0.5326,
       "r": 0.0118
      },
      {
       "type": "circle",
       "cx": 0.641,
       "cy": 0.4854,
       "r": 0.0118
      }
     ]
    }
   ],
   "note": "Çizimin bulunduğu sayfanın tamamı; kütüphane kaydı bu nüshayı müellif hattı olarak tanımlar, kırmızı satır da “ve bu onun resmidir” der. Alttaki satırlar, bizim okumamızla, altı borunun (silindirin) şart olmadığını, tek boruyla da su alınabileceğini, ama suyun düzenli yükselmesi için üçten az olmamasının daha iyi olduğunu söyler."
  },
  {
   "id": "model",
   "label": "İstanbul'daki model",
   "type": "image",
   "src": "gorseller/pump/istanbul-model.webp",
   "w": 1800,
   "h": 1436,
   "credit": "mustafa",
   "alt": "İstanbul'daki müzede altı pistonlu pompanın modern modeli: arkada kanatlı su çarkı, çaprazlama bakır kamlı mil, altı ahşap kaldıraç ve sol uçlarında altı bronz silindir; solda su kulesine çıkan boru.",
   "hotspots": [
    {
     "part": 0,
     "x": 0.5458,
     "y": 0.3349,
     "shapes": [
      {
       "type": "ellipse",
       "cx": 0.6702,
       "cy": 0.3923,
       "rx": 0.187,
       "ry": 0.1651
      }
     ]
    },
    {
     "part": 1,
     "x": 0.7603,
     "y": 0.7,
     "shapes": [
      {
       "type": "poly",
       "points": [
        [
         0.6832,
         0.5048
        ],
        [
         0.7767,
         0.7416
        ]
       ],
       "closed": false
      },
      {
       "type": "circle",
       "cx": 0.7416,
       "cy": 0.5589,
       "r": 0.0115
      },
      {
       "type": "circle",
       "cx": 0.7309,
       "cy": 0.5947,
       "r": 0.0115
      },
      {
       "type": "circle",
       "cx": 0.7218,
       "cy": 0.6598,
       "r": 0.0115
      }
     ]
    },
    {
     "part": 2,
     "x": 0.6107,
     "y": 0.6866,
     "shapes": [
      {
       "type": "poly",
       "points": [
        [
         0.4466,
         0.5933
        ],
        [
         0.6794,
         0.5646
        ]
       ],
       "closed": false
      },
      {
       "type": "poly",
       "points": [
        [
         0.4542,
         0.6459
        ],
        [
         0.6947,
         0.6124
        ]
       ],
       "closed": false
      },
      {
       "type": "poly",
       "points": [
        [
         0.4656,
         0.6986
        ],
        [
         0.7099,
         0.6651
        ]
       ],
       "closed": false
      },
      {
       "type": "poly",
       "points": [
        [
         0.4656,
         0.7512
        ],
        [
         0.7252,
         0.7177
        ]
       ],
       "closed": false
      },
      {
       "type": "poly",
       "points": [
        [
         0.4656,
         0.8038
        ],
        [
         0.7176,
         0.7799
        ]
       ],
       "closed": false
      },
      {
       "type": "poly",
       "points": [
        [
         0.4656,
         0.8593
        ],
        [
         0.7099,
         0.8373
        ]
       ],
       "closed": false
      }
     ]
    },
    {
     "part": 3,
     "x": 0.4285,
     "y": 0.83,
     "shapes": [
      {
       "type": "circle",
       "cx": 0.4198,
       "cy": 0.5167,
       "r": 0.0168
      },
      {
       "type": "circle",
       "cx": 0.4198,
       "cy": 0.5598,
       "r": 0.0168
      },
      {
       "type": "circle",
       "cx": 0.4198,
       "cy": 0.6077,
       "r": 0.0168
      },
      {
       "type": "circle",
       "cx": 0.4221,
       "cy": 0.6555,
       "r": 0.0168
      },
      {
       "type": "circle",
       "cx": 0.4198,
       "cy": 0.6986,
       "r": 0.0168
      },
      {
       "type": "circle",
       "cx": 0.4285,
       "cy": 0.734,
       "r": 0.0168
      }
     ]
    }
   ],
   "note": "İstanbul'daki İslam Bilim ve Teknoloji Tarihi Müzesi'nde 2020'de fotoğraflanmış modern bir yeniden yapım (yapanı ve envanter numarası fotoğrafın kaydında yok); su kulesi çizimde bulunmaz, modelin eklemesidir. Bizim okumamızla kaldıraç uçlarındaki altı bronz silindir çizimdeki ağırlıklı piston başlarıdır; pompa gövdeleri altlarında kalır, yalnız öndekinin kırmızı gövdesi görünür."
  },
  {
   "id": "agricola",
   "label": "Avrupa'da: Agricola 1556",
   "type": "image",
   "src": "gorseller/pump/agricola-1556.webp",
   "w": 1430,
   "h": 1600,
   "credit": "agricola",
   "alt": "Agricola'nın De re metallica kitabından ağaç baskı: sağda su çarkı A, ortada üzerinde çıkıntılar bulunan mil B, üç piston kolu ve toprağa inen üç pompa borusu.",
   "hotspots": [
    {
     "part": 0,
     "x": 0.835,
     "y": 0.3,
     "shapes": [
      {
       "type": "ellipse",
       "cx": 0.8095,
       "cy": 0.4176,
       "rx": 0.0774,
       "ry": 0.2074
      }
     ],
     "label": "su çarkı (A)"
    },
    {
     "part": 1,
     "x": 0.57,
     "y": 0.4053,
     "shapes": [
      {
       "type": "poly",
       "points": [
        [
         0.0292,
         0.4053
        ],
        [
         0.9286,
         0.4053
        ]
       ],
       "closed": false
      },
      {
       "type": "circle",
       "cx": 0.2815,
       "cy": 0.3154,
       "r": 0.0214
      },
      {
       "type": "circle",
       "cx": 0.4446,
       "cy": 0.3511,
       "r": 0.0214
      },
      {
       "type": "circle",
       "cx": 0.2976,
       "cy": 0.4574,
       "r": 0.0214
      },
      {
       "type": "circle",
       "cx": 0.1506,
       "cy": 0.408,
       "r": 0.0214
      }
     ],
     "label": "kamlı mil (B)"
    },
    {
     "part": 3,
     "x": 0.3536,
     "y": 0.712,
     "shapes": [
      {
       "type": "circle",
       "cx": 0.2185,
       "cy": 0.6532,
       "r": 0.0476
      },
      {
       "type": "circle",
       "cx": 0.3536,
       "cy": 0.6532,
       "r": 0.0476
      },
      {
       "type": "circle",
       "cx": 0.4958,
       "cy": 0.6532,
       "r": 0.0476
      }
     ],
     "label": "üç pompa"
    }
   ],
   "note": "Karşılaştırma için, Takiyüddin'in düzeneği değil: Agricola'nın De re metallica'sından (Basel 1556) madenden su çeken bir pompa. Çark (A) mili (B) döndürür, mildeki yassı çıkıntılar piston kollarındaki takozları doğrudan kaldırır; arada kaldıraç yoktur ve pompa sayısı üçtür."
  }
 ],
 "credits": {
  "cbl": {
   "text": "Chester Beatty Library, Dublin, Ar 5232, f.19v",
   "license": "CC BY 4.0",
   "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
   "url": "https://viewer.cbl.ie/viewer/image/Ar_5232/42/",
   "source": "https://viewer.cbl.ie/viewer/api/v1/records/Ar_5232/files/images/Ar5232_042.jpg/full/max/0/default.jpg",
   "accession": "Ar 5232, f.19v (IIIF canvas 42, görüntü Ar5232_042, 5748×7557)",
   "retrieved": "2026-10-05",
   "evidence": "2026-10-05'te kaynağında yeniden kontrol: chesterbeatty.ie/about/copyright-2/ 'For all digital images of museum objects unless otherwise listed: CC BY – 4.0' der ve Chester Beatty'ye atıf ister. Ar_5232 IIIF manifestosunda license alanı doldurulmamış yer tutucu ('iiif_license'), metadata 'Copyright: Chester Beatty Library'; nesne için başka telif atfı listelenmemiş, yani kurum geneli politika geçerli. Canvas 42 etiketi 'f.19v', görüntü 5748×7557 (info.json). Kayıt açıklaması: 'identified as autograph copy, possibly Cairo, Egypt, undated, c. 1550'."
  },
  "mustafa": {
   "text": "Fotoğraf: Mustafa-trit20, Wikimedia Commons – İslam Bilim ve Teknoloji Tarihi Müzesi'ndeki model (kırpılmıştır)",
   "license": "CC BY-SA 4.0",
   "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/",
   "url": "https://commons.wikimedia.org/wiki/File:1553_Ottoman_water_pump,_reconstructed_model.jpg",
   "source": "https://upload.wikimedia.org/wikipedia/commons/a/a4/1553_Ottoman_water_pump%2C_reconstructed_model.jpg",
   "author": "Mustafa-trit20",
   "accession": "envanter numarası bilinmiyor",
   "retrieved": "2026-10-05",
   "evidence": "Commons API extmetadata (2026-10-05'te yeniden alındı): LicenseShortName 'CC BY-SA 4.0', Artist 'Mustafa-trit20', Credit 'Own work', AttributionRequired true, DateTimeOriginal 2020-02-18, açıklama 'Reconstructed model ... in the Istanbul Museum of the History of Science and Technology in Islam', kategori 'İslam Bilim ve Teknoloji Tarihi Müzesi'; indirilen dosyanın SHA-1'i API'deki dab1576e… ile aynı. Lisans fotoğrafı kapsar; adı belirtilmeyen model yapımcısının hakları bu lisansla ele alınmaz. Kırpma ve numaralar türev eserdir ve CC BY-SA 4.0 ile paylaşılır."
  },
  "agricola": {
   "text": "Georgius Agricola, De re metallica, Basel: Froben ve Episcopius 1556, s. 142 – Internet Archive (University of California Libraries nüshası)",
   "license": "Kamu malı",
   "url": "https://archive.org/details/georgiiagricolae00agri/page/n161/mode/1up",
   "source": "https://archive.org/download/georgiiagricolae00agri/page/n161.jpg",
   "accession": "IA georgiiagricolae00agri, n161 (s. 142); call number srlf_ucla:LAGE-341814",
   "retrieved": "2026-10-05",
   "evidence": "archive.org/metadata/georgiiagricolae00agri (2026-10-05'te yeniden alındı): possible-copyright-status 'NOT_IN_COPYRIGHT', date 1556, publisher 'Basileae : [Apvd Hieron Frobenivm et Nicolavm Episcopivm]', contributor University of California Libraries; licenseurl ve rights alanları boş. Sayfa n161'in üst köşesinde basılı sayfa numarası 142 okunuyor. 1556 tarihli ağaç baskının sadık taraması: kamu malı."
  }
 }
};
