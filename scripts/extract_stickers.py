"""
Extract individual sticker / doodle / paper / tape elements from the asset sheet
into transparent PNGs (alpha derived from distance to the cream paper colour,
colour de-matted so edges don't carry a cream halo).

Output: _work/stickers_raw/<name>.png  (RGBA, original resolution)
"""
from PIL import Image
import numpy as np
from scipy import ndimage as ndi
import os, sys

SRC = "assets/file_000000003a5481f4a5cbce67a2648862.png"
OUT = "_work/stickers_raw"
os.makedirs(OUT, exist_ok=True)

im = Image.open(SRC).convert("RGB")
a = np.asarray(im).astype(np.float32)
bg = np.median(a[:20, :20].reshape(-1, 3), 0)

# colour distance to paper
d = np.abs(a - bg).max(2)
alpha_soft = np.clip((d - 14) / 52.0, 0, 1)

# (name, box, solid)  solid=True -> fill holes (paper, photos, blobs)
S = True
B = False
ITEMS = [
    ("brush-purple-halftone", (20, 25, 255, 200), B),
    ("brush-yellow-scribble", (248, 40, 412, 170), B),
    ("doodle-crown", (438, 35, 535, 115), B),
    ("doodle-bulb", (558, 35, 655, 155), B),
    ("doodle-star-dark", (670, 55, 715, 112), B),
    ("doodle-star-yellow-sm", (708, 115, 764, 168), B),
    ("doodle-arrow-curve", (315, 135, 462, 200), B),
    ("brush-pink-scribble", (440, 150, 585, 235), B),
    ("doodle-squiggle-arrow", (598, 175, 765, 225), B),
    ("doodle-arrow-up", (810, 178, 885, 240), B),
    ("doodle-arrow-bend", (900, 195, 1030, 285), B),
    ("doodle-arrow-diag", (1010, 205, 1135, 310), B),
    ("tape-stack", (750, 35, 1135, 165), S),
    ("paper-fold-purple", (1120, 15, 1350, 230), S),
    ("leaf-green-tall", (1360, 20, 1450, 205), B),
    ("doodle-sparkle", (1465, 15, 1510, 75), B),
    ("doodle-heart", (1462, 82, 1510, 140), B),
    ("doodle-burst-dark", (1435, 165, 1497, 235), B),
    ("doodle-circle-yellow", (1290, 240, 1415, 325), B),
    ("doodle-scribble-vertical", (1440, 262, 1495, 400), B),
    ("doodle-star-outline", (1170, 175, 1240, 250), B),
    ("brush-yellow-big", (38, 200, 265, 375), B),
    ("brush-green", (265, 210, 435, 380), B),
    ("brush-pink", (440, 250, 648, 360), B),
    ("brush-navy", (665, 240, 865, 362), B),
    ("brush-purple-sm", (1070, 280, 1230, 365), B),
    ("brush-green-sm", (1232, 345, 1385, 408), B),
    ("brush-pink-2", (1305, 400, 1460, 508), B),
    ("doodle-burst-purple", (895, 310, 975, 395), B),
    ("doodle-burst-yellow", (1012, 340, 1068, 408), B),
    ("cutout-girl", (25, 392, 250, 574), S),
    ("polaroid-space", (275, 415, 467, 557), S),
    ("paper-purple-star", (483, 400, 560, 505), S),
    ("leaf-dark-tall", (565, 388, 645, 552), B),
    ("doodle-m", (655, 455, 712, 505), B),
    ("blob-pink-sm", (660, 415, 750, 500), S),
    ("doodle-star-yellow", (650, 520, 714, 585), B),
    ("photo-torn-woman", (1250, 525, 1497, 722), S),
    ("paper-navy", (50, 590, 247, 712), S),
    ("paper-lavender", (255, 588, 384, 720), S),
    ("paper-green", (390, 593, 500, 730), S),
    ("paper-coral", (510, 598, 624, 717), S),
    ("paper-grid", (632, 600, 780, 734), S),
    ("tape-dotted-yellow", (48, 710, 212, 772), S),
    ("tape-purple-sm", (122, 754, 245, 802), S),
    ("tape-green-sm", (256, 736, 358, 770), S),
    ("tape-pink", (248, 774, 402, 817), S),
    ("tape-grey", (420, 730, 567, 792), S),
    ("blob-navy", (426, 788, 537, 882), S),
    ("blob-lavender", (546, 778, 647, 882), S),
    ("blob-yellow", (661, 770, 770, 880), S),
    ("blob-pink", (776, 773, 892, 882), S),
    ("blob-green", (908, 770, 990, 882), S),
    ("doodle-scribble-loop", (808, 622, 947, 742), B),
    ("leaf-yellow", (923, 630, 1012, 767), B),
    ("leaf-purple", (1023, 615, 1117, 757), B),
    ("leaf-branch-dark", (1076, 638, 1224, 782), B),
    ("doodle-heart-sm", (1198, 615, 1237, 662), B),
    ("shape-triangles", (1238, 758, 1390, 832), S),
    ("doodle-wave-green", (1222, 842, 1388, 872), B),
    ("doodle-scribble-green", (1403, 762, 1503, 818), B),
    ("doodle-tick", (1406, 802, 1450, 842), B),
    ("doodle-crown-sm", (1033, 810, 1090, 870), B),
    ("doodle-arrow-double", (1098, 813, 1157, 870), B),
    ("halftone-purple", (18, 805, 247, 1017), B),
    ("brush-yellow-scribble-2", (210, 873, 342, 982), B),
    ("doodle-zigzag", (353, 918, 417, 957), B),
    ("doodle-squiggle", (293, 966, 417, 992), B),
    ("doodle-burst-pink", (443, 903, 530, 987), B),
    ("tape-beige-torn", (578, 910, 802, 990), S),
    ("texture-navy-distressed", (833, 898, 1067, 997), S),
    ("watercolor-lavender", (1096, 873, 1252, 1002), B),
    ("paper-coral-fold", (1273, 893, 1377, 992), S),
    ("leaf-dark-corner", (1388, 888, 1492, 1002), B),
    ("doodle-dots", (1478, 912, 1512, 982), B),
]

mask_any = alpha_soft > 0.25
lab, n = ndi.label(ndi.binary_dilation(mask_any, iterations=2))

for name, (x0, y0, x1, y1), solid in ITEMS:
    sub_lab = lab[y0:y1, x0:x1]
    ids, counts = np.unique(sub_lab[sub_lab > 0], return_counts=True)
    keep = np.zeros(sub_lab.shape, bool)
    for i, c in zip(ids, counts):
        total = (lab == i).sum()
        # component mostly inside the box (or box-dominant) -> keep
        if c / total > 0.55 or c > 0.35 * (x1 - x0) * (y1 - y0) * 0.5 and c / total > 0.25:
            keep |= sub_lab == i
    al = alpha_soft[y0:y1, x0:x1].copy()
    if solid:
        core = (al > 0.3) & keep
        core = ndi.binary_closing(core, iterations=3)
        core = ndi.binary_fill_holes(core)
        # tiny erosion kills the cream fringe, then feather
        core = ndi.binary_erosion(core, iterations=1)
        feather = ndi.gaussian_filter(core.astype(np.float32), 0.8)
        al = np.clip(feather * 1.15, 0, 1)
    else:
        grown = ndi.binary_dilation(keep, iterations=2)
        al = al * grown
    rgb = a[y0:y1, x0:x1]
    # de-matte: fg = (px - bg*(1-a)) / a
    safe = np.maximum(al, 0.04)[..., None]
    fg = (rgb - bg * (1 - al[..., None])) / safe
    if solid:
        fg = rgb  # opaque interior keeps original pixels
    fg = np.clip(fg, 0, 255)
    out = np.dstack([fg, al * 255]).astype(np.uint8)
    img = Image.fromarray(out, "RGBA")
    bb = img.getchannel("A").point(lambda v: 255 if v > 8 else 0).getbbox()
    if not bb:
        print("EMPTY", name)
        continue
    pad = 4
    bb = (max(bb[0] - pad, 0), max(bb[1] - pad, 0), min(bb[2] + pad, img.width), min(bb[3] + pad, img.height))
    img.crop(bb).save(f"{OUT}/{name}.png")
print("done", len(ITEMS))
