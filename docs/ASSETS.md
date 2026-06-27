# Asset pipeline (D0 starter)

The redesign's "wow" depends on real assets. The generative SVG art is a
placeholder and caps the ceiling — this is the plan for replacing it.

## Directories

```
public/
  models/      # compressed .glb product models (Draco/meshopt) + KTX2 textures
  img/         # product & campaign photography (source → optimized variants)
  env/         # HDRI / studio environment maps for the 3D viewer
```

## Product imagery

- [ ] Source/commission multi-angle studio shots + macro detail + lifestyle per SKU.
- [ ] Optimize to AVIF + WebP with responsive `srcset`; generate blur-up (LQIP) placeholders.
- [ ] Serve via CDN; lazy-load below the fold.
- [ ] Define an art-direction kit (lighting, crops, grain) for consistency.

## 3D models (for the hero + PDP viewer — D1)

- [ ] Model or acquire 2–3 hero bags as `.glb`.
- [ ] Compress geometry (Draco or meshopt) and textures (KTX2 / Basis).
- [ ] Author PBR leather materials (albedo / normal / roughness / AO).
- [ ] Target < ~2–3 MB per model; load lazily, only on routes that use them.
- [ ] Provide a static image fallback for reduced-motion / low-power / no-WebGL.

## Conventions

- Filenames: `{slug}--{color}--{angle}.{ext}` (e.g. `atlas-backpack--ink--front.avif`).
- Every 3D experience ships with a 2D fallback; never block first paint on a model.
