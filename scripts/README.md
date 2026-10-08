# Asset pipeline (run from project root)
1. `python3 scripts/extract_stickers.py`  – cut doodles/papers/tapes from the sticker sheet (alpha from paper colour)
2. Real-ESRGAN (ncnn-vulkan, x4plus) on `_work/photos_raw/*.png` → `_work/photos_x4/`
3. `python3 scripts/upscale_stickers.py`  – ESRGAN on stickers → `_work/stickers_x3`
4. `REMBG_MODEL=u2net_human_seg <venv>/bin/python scripts/cutouts.py` – hero/journey cut-outs
5. `python3 scripts/build_assets.py` – writes public/assets/shamim/** + src/lib/asset-manifest.json
