"""Convert sign-type photos from CartelesYarda/ to optimized WebP in public/images/tipos-cartel/."""
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).parent.parent
SRC = ROOT / "CartelesYarda"
DST = ROOT / "public" / "images" / "tipos-cartel"

MAX_WIDTH = 800
QUALITY = 82

MAPPING = {
    "cartel saliente logo.jpg": "saliente.webp",
    "Frontal.png": "frontal.webp",
    "Luminoso.png": "luminoso.webp",
    "Iluminado.png": "iluminado.webp",
    "marquesina.jpg": "marquesina.webp",
    "Toldo.png": "toldo.webp",
}

DST.mkdir(parents=True, exist_ok=True)

for src_name, dst_name in MAPPING.items():
    src_path = SRC / src_name
    dst_path = DST / dst_name

    if not src_path.exists():
        print(f"SKIP (missing): {src_name}")
        continue

    img = Image.open(src_path)
    if img.mode in ("RGBA", "LA", "P"):
        img = img.convert("RGB")

    if img.width > MAX_WIDTH:
        ratio = MAX_WIDTH / img.width
        new_size = (MAX_WIDTH, int(img.height * ratio))
        img = img.resize(new_size, Image.LANCZOS)

    img.save(dst_path, "WEBP", quality=QUALITY, method=6)

    src_kb = src_path.stat().st_size / 1024
    dst_kb = dst_path.stat().st_size / 1024
    reduction = (1 - dst_kb / src_kb) * 100
    print(f"{src_name:35s} -> {dst_name:20s} {src_kb:>8.1f} KB -> {dst_kb:>6.1f} KB ({reduction:>5.1f}% menos)")
