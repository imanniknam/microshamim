"""Background removal for the portrait cut-outs (hero + journey). Run with the rembg venv:
   ~/.cache/shamim-tools/venv/bin/python scripts/cutouts.py
"""
import os, sys
from PIL import Image, ImageFilter
import numpy as np
from rembg import remove, new_session

MODEL = os.environ.get("REMBG_MODEL", "u2net_human_seg")
sess = new_session(MODEL)
os.makedirs("_work/cutouts", exist_ok=True)
JOBS = {"cutout-hero": "_work/photos_x4/p1-dream.png", "cutout-journey": "_work/photos_x4/p8-city.png"}
for name, src in JOBS.items():
    im = Image.open(src).convert("RGB")
    # work at moderate size for the matte, then scale the matte up
    small = im.resize((im.width // 2, im.height // 2), Image.LANCZOS)
    m = remove(small, session=sess, only_mask=True, post_process_mask=True)
    m = m.resize(im.size, Image.LANCZOS).filter(ImageFilter.GaussianBlur(1.2))
    a = np.asarray(m).astype(np.float32) / 255.0
    a = np.clip((a - 0.12) / 0.76, 0, 1)          # tighten halo
    if name == "cutout-hero":
        # the laptop sits on the photo edge and the person-segmenter drops it: recover it with GrabCut,
        # then give the cropped right edge a torn-paper profile so it reads as an intentional cut.
        import cv2
        cvim = cv2.cvtColor(np.asarray(im), cv2.COLOR_RGB2BGR)
        H, W = cvim.shape[:2]
        rect = (int(0.38 * W), int(0.60 * H), W - 2 - int(0.38 * W), int(0.93 * H) - int(0.60 * H))
        gm = np.zeros((H, W), np.uint8)
        cv2.grabCut(cvim, gm, rect, np.zeros((1, 65)), np.zeros((1, 65)), 6, cv2.GC_INIT_WITH_RECT)
        lap = np.where((gm == cv2.GC_FGD) | (gm == cv2.GC_PR_FGD), 1.0, 0.0).astype(np.float32)
        lap = cv2.GaussianBlur(lap, (0, 0), 1.6)
        a = np.maximum(a, lap)
        rng = np.random.default_rng(3)
        prof = np.cumsum(rng.normal(0, 9, H)); prof = (prof - prof.mean()) * 0.8
        prof = cv2.GaussianBlur(prof.reshape(-1, 1).astype(np.float32), (0, 0), 6).ravel() + rng.normal(0, 3.5, H)
        edge = (W - 26 + prof).astype(int)
        xs = np.arange(W)[None, :]
        a = a * (xs < edge[:, None])
        a = cv2.GaussianBlur(a.astype(np.float32), (0, 0), 1.1)
    out = im.convert("RGBA"); out.putalpha(Image.fromarray((np.clip(a, 0, 1) * 255).astype(np.uint8)))
    bb = out.getchannel("A").point(lambda v: 255 if v > 10 else 0).getbbox()
    out = out.crop(bb)
    out.save(f"_work/cutouts/{name}.png")
    # keep delivery size sane: max 1400px tall
    s = min(1.0, 1400 / out.height)
    out.resize((int(out.width * s), int(out.height * s)), Image.LANCZOS).save(f"_work/cutouts/{name}.webp", quality=90, method=6)
    print(name, out.size)
