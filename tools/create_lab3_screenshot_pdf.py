from pathlib import Path
from PIL import Image
from reportlab.lib.pagesizes import A4, landscape
from reportlab.lib import colors
from reportlab.lib.utils import ImageReader
from reportlab.pdfgen import canvas

ROOT = Path(__file__).resolve().parents[1]
SCREENSHOTS = ROOT / "lab-03" / "screenshots"
OUT = ROOT / "output" / "BDF_Lab_03_Screenshots.pdf"

ORDER = [
    ("POST_add_book.png", "POST - Create a book"),
    ("POST_missing_title.png", "POST - Validation: missing title"),
    ("POST_missing_author.png", "POST - Validation: missing author"),
    ("POST_missing_price.png", "POST - Validation: missing price"),
    ("POST_invalid_price.png", "POST - Validation: non-numeric price"),
    ("GET_book_by_ID.png", "GET - Read a book by ID"),
    ("GET_book_not_found.png", "GET - Read a missing book"),
    ("GET_search_q.png", "GET - Search books by title"),
    ("GET_limit.png", "GET - Pagination: limit"),
    ("GET_offset.png", "GET - Pagination: offset"),
    ("GET_order_by_price_ASC.png", "GET - Sort by price ascending"),
    ("GET_order_by_price_DESC.png", "GET - Sort by price descending"),
    ("GET_min_price.png", "GET - Minimum price filter"),
    ("GET_max_price.png", "GET - Maximum price filter"),
    ("GET_price_range.png", "GET - Price range filter"),
    ("GET_invalid_limit.png", "GET - Validation: invalid limit"),
    ("GET_invalid_offset.png", "GET - Validation: invalid offset"),
    ("GET_invalid_order_by.png", "GET - Validation: invalid order_by"),
    ("GET_invalid_order.png", "GET - Validation: invalid order"),
    ("GET_invalid_min_price.png", "GET - Validation: invalid minimum price"),
    ("GET_invalid_max_price.png", "GET - Validation: invalid maximum price"),
    ("GET_invalid_price_range.png", "GET - Validation: invalid price range"),
    ("PUT_update_book.png", "PUT - Update a book"),
    ("PUT_book_not_found.png", "PUT - Update a missing book"),
    ("DELETE_book.png", "DELETE - Delete a book"),
    ("DELETE_book_not_found.png", "DELETE - Delete a missing book"),
]

missing = [name for name, _ in ORDER if not (SCREENSHOTS / name).is_file()]
if missing:
    raise FileNotFoundError("Missing screenshot(s): " + ", ".join(missing))

OUT.parent.mkdir(parents=True, exist_ok=True)
page_w, page_h = landscape(A4)
pdf = canvas.Canvas(str(OUT), pagesize=(page_w, page_h), pageCompression=1)
pdf.setTitle("Backend Development Fundamentals - Lab Report 03 - Screenshot Evidence")
pdf.setAuthor("Juttu Vedant")
pdf.setSubject("REST API, query parameters, validation, and debugging evidence")

for index, (filename, caption) in enumerate(ORDER, start=1):
    path = SCREENSHOTS / filename
    with Image.open(path) as img:
        image_w, image_h = img.size
        img.verify()

    # One screenshot per page. Fit the complete image inside the page; never crop.
    margin_x = 34
    image_bottom = 54
    image_top = page_h - 78
    box_w = page_w - (2 * margin_x)
    box_h = image_top - image_bottom
    scale = min(box_w / image_w, box_h / image_h)
    draw_w = image_w * scale
    draw_h = image_h * scale
    draw_x = (page_w - draw_w) / 2
    draw_y = image_bottom + (box_h - draw_h) / 2

    pdf.setFillColor(colors.HexColor("#15243A"))
    pdf.setFont("Helvetica-Bold", 14)
    pdf.drawString(margin_x, page_h - 34, "BACKEND DEVELOPMENT FUNDAMENTALS")
    pdf.setFillColor(colors.HexColor("#526174"))
    pdf.setFont("Helvetica", 9)
    pdf.drawRightString(page_w - margin_x, page_h - 34, "LAB REPORT 03")

    pdf.setStrokeColor(colors.HexColor("#D7DEE8"))
    pdf.setLineWidth(0.7)
    pdf.line(margin_x, page_h - 45, page_w - margin_x, page_h - 45)

    pdf.setFillColor(colors.HexColor("#15243A"))
    pdf.setFont("Helvetica-Bold", 11)
    pdf.drawString(margin_x, page_h - 64, caption)

    pdf.drawImage(
        ImageReader(str(path)),
        draw_x,
        draw_y,
        width=draw_w,
        height=draw_h,
        preserveAspectRatio=True,
        mask="auto",
    )

    pdf.setStrokeColor(colors.HexColor("#D7DEE8"))
    pdf.line(margin_x, 40, page_w - margin_x, 40)
    pdf.setFillColor(colors.HexColor("#526174"))
    pdf.setFont("Helvetica", 8)
    pdf.drawString(margin_x, 26, "Juttu Vedant | 252U1R9048 | Gen AI 2A(304)")
    pdf.drawRightString(page_w - margin_x, 26, f"Screenshot {index} of {len(ORDER)}")
    pdf.showPage()

pdf.save()
print(f"Created {OUT} with {len(ORDER)} uncropped screenshots.")
