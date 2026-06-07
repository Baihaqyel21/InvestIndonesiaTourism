from pathlib import Path
from shutil import copy2

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "Gambar"
PUBLIC = ROOT / "public"
IMAGE_OUT = PUBLIC / "assets" / "images"
DOWNLOAD_OUT = PUBLIC / "downloads"

FOLDERS = {
    "Hero": "hero",
    "Bali": "bali",
    "Belitung": "belitung",
    "Borobudur": "borobudur",
    "Danau Toba": "danau-toba",
    "Labuan Bajo": "labuan-bajo",
    "Likupang": "likupang",
    "Mandalika": "mandalika",
    "KEK Batam": "kek-batam",
    "KEK Lido": "kek-lido",
    "KEK Morotai": "kek-morotai",
    "KEK Singhasari": "kek-singhasari",
    "KEK Tanjung Lesung": "kek-tanjung-lesung",
}


def ensure_clean_dir(path: Path) -> None:
    path.mkdir(parents=True, exist_ok=True)
    for item in path.iterdir():
        if item.is_file():
            item.unlink()
        elif item.is_dir():
            ensure_clean_dir(item)
            item.rmdir()


def export_image(src: Path, dest: Path, max_width: int = 2200) -> None:
    with Image.open(src) as image:
        image = image.convert("RGB")
        if image.width > max_width:
            ratio = max_width / image.width
            image = image.resize((max_width, int(image.height * ratio)), Image.Resampling.LANCZOS)
        dest.parent.mkdir(parents=True, exist_ok=True)
        image.save(dest, "JPEG", quality=84, optimize=True, progressive=True)


def main() -> None:
    PUBLIC.mkdir(exist_ok=True)
    ensure_clean_dir(IMAGE_OUT)
    DOWNLOAD_OUT.mkdir(parents=True, exist_ok=True)

    for original_folder, slug in FOLDERS.items():
        folder = SOURCE / original_folder
        if not folder.exists():
            continue
        files = sorted([p for p in folder.iterdir() if p.is_file()])
        for index, src in enumerate(files, start=1):
            export_image(src, IMAGE_OUT / slug / f"{slug}-{index:02}.jpg")

    for src_name, dest_name in [
        ("Original PNG Kemenpar.png", "kemenpar-logo.png"),
        ("Favicon Kemenpar.png", "favicon.png"),
    ]:
        src = ROOT / src_name
        if src.exists():
            copy2(src, PUBLIC / dest_name)

    for pdf in (ROOT / "downloads").glob("*.pdf"):
        copy2(pdf, DOWNLOAD_OUT / pdf.name)

    for data_file in (ROOT / "content").glob("*.json"):
        copy2(data_file, PUBLIC / data_file.name)


if __name__ == "__main__":
    main()
