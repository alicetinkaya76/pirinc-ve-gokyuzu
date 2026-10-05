# Gerçek görsel atölyesi — veri sözleşmesi (spec contract)

The site's "Aletin içinde ne var?" section will show each instrument through REAL images
(museum photographs, manuscript drawings) instead of the poor schematic WebGL models.
A small engine (`xr/engine.js` + `xr/engine.css` in the scratchpad) renders a per-instrument
spec. You produce the assets and the spec for ONE instrument.

## Deliverables (only inside your own folder)
- `/Users/alicetinkaya/Desktop/pirinc-ve-gokyuzu/gorseller/<id>/`  (create it)
  - image files: `.webp` (use alpha only for cut-outs), long edge ≤ 1400 px for layers,
    ≤ 1800 px for single-image views; quality ≈ 80. Keep the folder ≤ 2.5 MB total.
    File names: lowercase ascii, hyphens.
  - `spec.js` containing exactly `window.XP_SPEC = { ... };` (a JSON-compatible object
    literal: double-quoted keys/strings, no functions, no comments). Image `src` paths are
    relative to the repo root, e.g. `"gorseller/astro/rete.webp"`.
- Never edit `index.html` or any other file in the repo. Never commit.
- Keep your scripts and preview screenshots in the scratchpad, not in the repo.

## Spec schema
```
{
  "id": "astro",                       // instrument id
  "default": "patlatma",               // id of the view shown first
  "partNames": ["...", ...],           // EXACTLY the given list, same order (index = part number)
  "views": [ View, ... ],              // 1–4 views; the first/default should be the strongest
  "credits": { key: Credit, ... },
  "partImages": { "6": PartImage }     // optional: part index -> extra image shown in the side
                                       // panel when that part is selected (for parts not in any view)
}
View (type "stack") = {
  "id": "patlatma", "label": "Patlatılmış görünüm",   // short Turkish tab label (≤ 28 chars)
  "type": "stack",
  "frame": {"w": W, "h": H},          // your design coordinate space (e.g. source pixels)
  "aspect": 0.72,                     // optional: stage height / world width (crop empty space,
                                      // e.g. for tilted stacks); default = H/W
  "tilt": 58, "spin": 0,              // degrees; tilt>0 = 3D stack seen obliquely (CSS rotateX),
                                      // tilt 0 = flat 2D exploded board. Users can drag to change.
  "layers": [ Layer, ... ],           // painted in DOM order, but 3D depth (z) decides overlap
  "hotspots": [ Hotspot, ... ],
  "note": "One or two Turkish sentences: what this view shows, which object/source, what was cut, and any analogy."
}
View (type "image") = { "id","label","type":"image","src","w","h","credit","alt","hotspots":[...],"note" }
                       // a single picture with numbered callouts; hotspots have no "layer"
Layer = {
  "id": "rete", "src": "gorseller/astro/rete.webp", "w": 1200, "h": 1196,   // file pixel size
  "box": [x, y, w, h],                // assembled placement in frame units (top-left origin);
                                      // keep the file's aspect ratio
  "z": 20,                            // assembled depth in frame units (+ = toward viewer)
  "explode": [dx, dy, dz],            // displacement at slider = 1 ("Parçalar ayrık"), frame units
  "scale": [s0, s1],                  // optional: scale at slider 0 and 1 (e.g. an inset that grows out)
  "opacity": 0.35,                    // optional: e.g. a faint full-page backdrop
  "parts": [1, 2, 7],                 // part indices this layer carries (for highlight)
  "credit": "sbb", "alt": "Turkish alt text"
}
Hotspot = { "part": 2, "layer": "rete", "x": 0.5, "y": 0.2,   // normalized to that layer's image (0..1)
            "shapes": [ Shape, ... ] }                         // optional outline drawn when selected
Shape = {"type":"circle","cx":..,"cy":..,"r":..}  (r relative to layer WIDTH)
      | {"type":"ellipse","cx","cy","rx","ry","rot"}
      | {"type":"poly","points":[[x,y],...],"closed":false}    // all normalized to the layer image
Credit = { "text": "Institution – shelfmark/accession, view (Turkish where natural)",
           "license": "CC BY 4.0", "licenseUrl": "https://...", "url": "object/source page",
           "source": "full-resolution image URL actually used", "accession": "...",
           "author": "photographer if required by licence", "retrieved": "2026-10-05",
           "evidence": "how the licence was verified (API field / page statement)" }
PartImage = { "src", "w", "h", "credit": "key", "caption": "Turkish caption incl. what object it is" }
```

## Rules
- Licences: PD/CC0/PDM > CC BY > CC BY-SA. CC BY-NC only if there is truly no alternative,
  and say so in `evidence`. Credit text must match the source's own required attribution
  (author name for CC BY/BY-SA photos). Re-verify the licence from the source metadata.
- Honesty: in the view `note`, state when the object is an analogy (a different object than
  the one the book describes), when layers come from different objects, or when a part is our
  interpretation. Never invent accession numbers, dates, makers.
- Every part in `partNames` should be reachable: either a hotspot in some view, or a
  `partImages` entry. If a part cannot be shown honestly at all, leave it out and say why in
  your final report.
- Hotspot coordinates must be ACCURATE: verify by rendering overlays and looking at them.
- Turkish UI text (labels, notes, alt, captions). Institution names in original language.
- Exploded views: the separated state (slider ≈ 0.55 default, and 1.0) must read like a
  technical exploded drawing — parts move apart along a sensible axis, nothing flies off
  stage, the assembled state (0) must look like the real assembled object (aligned centres
  and matching scale; measure circles/edges with OpenCV, don't guess).
- Cut-outs: clean edges (no halo of black/paper background), alpha feathered ≤ 2 px.
  Rotate source frames to a sensible orientation where needed.

## Preview / verification (mandatory)
- Harness: `file://<S>/xr/harness.html?spec=<url-encoded file:///Users/alicetinkaya/Desktop/pirinc-ve-gokyuzu/gorseller/<id>/spec.js>&t=0.55&sel=2&view=<viewId>`
  (base href is the repo root, so `gorseller/...` paths resolve.) Helper:
  `cd <S>/pw && S=<S> node harn.js <specUrl> out.png 1280 900 <t> <selPart> <viewId>` and the same at 390 844.
  Launch flag `--allow-file-access-from-files` is already in harn.js.
- For every view: screenshot desktop 1280×900 and mobile 390×844 at t=0, 0.55, 1 and with
  each part selected; LOOK at them (Read) and fix until it looks like a museum-quality plate.
