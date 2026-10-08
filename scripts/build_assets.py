"""
Assemble /public/assets/shamim from the upscaled working files and write a manifest
(src/lib/asset-manifest.json) with intrinsic sizes so next/image never causes layout shift.

Run order:
  1) scripts/extract_stickers.py   -> _work/stickers_raw
  2) real-esrgan on photos         -> _work/photos_x4   (see README in scripts/)
  3) scripts/upscale_stickers.py   -> _work/stickers_x3
  4) scripts/cutouts.py (optional) -> _work/cutouts
  5) this script
"""
from PIL import Image, ImageFilter
import numpy as np, os, json, glob, shutil

PUB = "public/assets/shamim"
for d in ("photos", "textures", "doodles", "stickers", "paper", "collage"):
    os.makedirs(f"{PUB}/{d}", exist_ok=True)
os.makedirs(f"{PUB}/model", exist_ok=True)

manifest = {}
def reg(kind, name, path):
    im = Image.open(path)
    import hashlib
    ver = hashlib.md5(open(path, "rb").read()).hexdigest()[:8]   # cache-bust when an asset is regenerated
    manifest[f"{kind}/{name}"] = {"src": "/" + path.replace("public/", "", 1) + "?v=" + ver, "w": im.width, "h": im.height}

rng = np.random.default_rng(7)

# ── photos: x4 upscale + very light grain to hide synthetic smoothness ─────────
for f in sorted(glob.glob("_work/photos_x4/*.png")):
    n = os.path.basename(f)[:-4]
    im = Image.open(f).convert("RGB")
    a = np.asarray(im).astype(np.float32)
    noise = rng.normal(0, 2.2, a.shape[:2])[..., None]
    a = np.clip(a + noise, 0, 255).astype(np.uint8)
    out = Image.fromarray(a).filter(ImageFilter.UnsharpMask(radius=1.2, percent=40, threshold=2))
    dst = f"{PUB}/photos/{n}.webp"
    out.save(dst, quality=88, method=6)
    reg("photos", n, dst)

# derived art-directed crop: city skyline + sky from the sunset portrait (no person), for the wide intent band
_sky = Image.open("_work/photos_x4/p8-city.png").convert("RGB").crop((470, 330, 1388, 1090))
_sky.save(f"{PUB}/photos/p8-skyline.webp", quality=88, method=6)
reg("photos", "p8-skyline", f"{PUB}/photos/p8-skyline.webp")

# ── scale-model ("ماکت") photos: ESRGAN x4 -> downscale so the long edge is 1920px ──────────
for f in sorted(glob.glob("_work/model_x4/*.png")):
    n = os.path.basename(f)[:-4]
    im = Image.open(f).convert("RGB")
    im.thumbnail((1920, 1920), Image.LANCZOS)
    dst = f"{PUB}/model/{n}.webp"
    im.save(dst, quality=86, method=6)
    reg("model", n, dst)

# ── stickers ──────────────────────────────────────────────────────────────────
GROUP = {
    "doodles": ("doodle-", "leaf-", "shape-"),
    "stickers": ("brush-", "blob-", "watercolor-", "halftone-"),
    "paper": ("paper-", "tape-", "texture-"),
    "collage": ("photo-", "polaroid-"),
}
for f in sorted(glob.glob("_work/stickers_x3/*.webp")):
    n = os.path.basename(f)[:-5]
    for g, prefixes in GROUP.items():
        if n.startswith(prefixes):
            dst = f"{PUB}/{g}/{n}.webp"
            shutil.copy(f, dst)
            reg(g, n, dst)
            break

# ── cutouts (hero girl etc.) ──────────────────────────────────────────────────
for f in sorted(glob.glob("_work/cutouts/*.webp")):
    n = os.path.basename(f)[:-5]
    dst = f"{PUB}/collage/{n}.webp"
    shutil.copy(f, dst)
    reg("collage", n, dst)

# ── textures ──────────────────────────────────────────────────────────────────
# film grain tile (greyscale, tiles seamlessly because noise is i.i.d.)
g = rng.normal(128, 46, (260, 260)).clip(0, 255).astype(np.uint8)
Image.fromarray(g, "L").save(f"{PUB}/textures/grain.png", optimize=True)
# paper fibre tile: low-frequency mottling + fine fibres, warm cream
from scipy import ndimage as ndi
base = rng.normal(0, 1, (520, 520))
low = ndi.gaussian_filter(base, 18, mode="wrap"); low /= low.std()
mid = ndi.gaussian_filter(rng.normal(0, 1, (520, 520)), 2.2, mode="wrap"); mid /= mid.std()
fib = ndi.gaussian_filter(rng.normal(0, 1, (520, 520)), (0.6, 5), mode="wrap"); fib /= fib.std()
v = 249 + low * 2.2 + mid * 1.8 + fib * 1.8
rgb = np.dstack([v + 3, v + 1, v - 3]).clip(0, 255).astype(np.uint8)
Image.fromarray(rgb, "RGB").save(f"{PUB}/textures/paper.jpg", quality=80, optimize=True)

os.makedirs("src/lib", exist_ok=True)
json.dump(manifest, open("src/lib/asset-manifest.json", "w"), indent=1, ensure_ascii=False)
print(len(manifest), "assets registered")
