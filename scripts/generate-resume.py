"""Optional maintainer tool: regenerate the checked-in public-safe PDF from resume.json.
Requires reportlab; site builds do not require Python. Review rendered pages after edits.
"""
import json
import hashlib
from pathlib import Path
from xml.sax.saxutils import escape
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, KeepTogether
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_LEFT
from reportlab import rl_config

rl_config.invariant = 1
root = Path(__file__).resolve().parents[1]
source = root / "content/resume.json"
r = json.loads(source.read_text())
target = root / "public/kaden-diaz-resume.pdf"
styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name="Name", fontName="Helvetica-Bold", fontSize=24, leading=28, textColor=HexColor("#12364a"), spaceAfter=6))
styles.add(ParagraphStyle(name="Section", fontName="Helvetica-Bold", fontSize=11, leading=15, textColor=HexColor("#12364a"), spaceBefore=12, spaceAfter=5))
styles.add(ParagraphStyle(name="Copy", fontName="Helvetica", fontSize=9.3, leading=13, spaceAfter=6))
styles.add(ParagraphStyle(name="SmallCopy", fontName="Helvetica", fontSize=8.3, leading=11, spaceAfter=5))
story=[]
def para(text, style="Copy"):
    return Paragraph(escape(text), styles[style])
def section(title):
    story.append(para(title.upper(),"Section"))
def footer(canvas, doc):
    canvas.saveState()
    canvas.setFont("Helvetica",7.3)
    canvas.setFillColor(HexColor("#465765"))
    canvas.drawString(44,29,"Kaden Diaz | Public portfolio review copy | October 23, 2026")
    canvas.drawRightString(568,29,str(doc.page))
    canvas.restoreState()
story += [para(r["name"],"Name"), para(r["title"]), para(r["contact"],"SmallCopy"), para(r["linkedin"],"SmallCopy"), para(r["notice"],"SmallCopy")]
section("Profile");story.append(para(r["profile"]))
section("Professional experience")
for e in r["experience"]:
    block=[Paragraph("<b>"+escape(e["role"])+"</b><br/>"+escape(e["company"])+"<br/>"+escape(e["period"]),styles["Copy"])]
    block.extend(para("- "+d) for d in e["details"])
    story.append(KeepTogether(block))
section("Core competencies");story.append(para(r["competencies"]))
story.append(PageBreak())
story += [para("Technical work & learning","Name"),para(r["title"],"SmallCopy")]
section("Selected projects")
for p in r["projects"]:
    story.append(Paragraph("<b>"+escape(p["name"])+"</b> - "+escape(p["text"]),styles["Copy"]))
section("Selected credentials & training")
story.append(para(r["credentialsNote"],"SmallCopy"))
for c in r["credentials"]:story.append(para("- "+c,"SmallCopy"))
section("Education")
for e in r["education"]:story.append(para(e["school"]+" | "+e["qualification"]))
SimpleDocTemplate(str(target),pagesize=(612,792),rightMargin=44,leftMargin=44,topMargin=38,bottomMargin=47,title="Kaden Diaz - Public Portfolio Resume Review",author="Kaden Diaz",subject="Public-safe professional resume review copy").build(story,onFirstPage=footer,onLaterPages=footer)
receipt={"source":"content/resume.json","sourceSha256":hashlib.sha256(source.read_bytes()).hexdigest(),"pdf":"public/kaden-diaz-resume.pdf","pdfSha256":hashlib.sha256(target.read_bytes()).hexdigest()}
(root/"content/resume-receipt.json").write_text(json.dumps(receipt,indent=2)+"\n")
print("Generated public-safe review PDF and source receipt.")
