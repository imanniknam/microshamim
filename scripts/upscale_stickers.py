"""Upscale extracted RGBA stickers with Real-ESRGAN (anime model: clean edges) -> webp."""
from PIL import Image
import subprocess, os, glob, shutil, numpy as np
TOOL=os.path.expanduser("~/.cache/shamim-tools/realesrgan-ncnn-vulkan")
MODELS=os.path.expanduser("~/.cache/shamim-tools/models")
SKIP={"paper-grid","tape-beige-torn","blob-pink-sm","paper-fold-purple","cutout-girl"}
RAW="_work/stickers_raw"; TMP="_work/stk_tmp"; OUT="_work/stickers_x3"
os.makedirs(TMP,exist_ok=True); os.makedirs(OUT,exist_ok=True)
def up(src,dst,model):
    subprocess.run([TOOL,"-i",src,"-o",dst,"-n",model,"-s","4","-m",MODELS],stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL,check=True)
for f in sorted(glob.glob(RAW+"/*.png")):
    n=os.path.basename(f)[:-4]
    if n in SKIP: continue
    im=Image.open(f).convert("RGBA")
    # pad so tiny images are fine for ncnn tiles
    rgb=Image.new("RGB",im.size); rgb.paste(im.convert("RGB"))
    a=im.getchannel("A")
    rgb.save(f"{TMP}/c.png"); Image.merge("RGB",(a,a,a)).save(f"{TMP}/a.png")
    model="realesrgan-x4plus" if n.startswith(("photo","polaroid","paper","leaf","texture","watercolor","blob","brush","halftone","tape","shape")) else "realesrgan-x4plus-anime"
    up(f"{TMP}/c.png",f"{TMP}/c4.png",model); up(f"{TMP}/a.png",f"{TMP}/a4.png","realesrgan-x4plus-anime")
    c4=Image.open(f"{TMP}/c4.png").convert("RGB"); a4=Image.open(f"{TMP}/a4.png").convert("L")
    w,h=int(im.width*3),int(im.height*3)
    c=c4.resize((w,h),Image.LANCZOS); al=a4.resize((w,h),Image.LANCZOS)
    out=c.convert("RGBA"); out.putalpha(al)
    out.save(f"{OUT}/{n}.webp",quality=92,method=6,exact=True)
    print(n,out.size)
