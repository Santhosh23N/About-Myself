from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors
import os

pdf_path = os.path.join(r"c:\Users\admin\Desktop\portfolio\assets", "resume.pdf")
os.makedirs(os.path.dirname(pdf_path), exist_ok=True)

doc = SimpleDocTemplate(
    pdf_path,
    pagesize=letter,
    rightMargin=40,
    leftMargin=40,
    topMargin=40,
    bottomMargin=40
)

styles = getSampleStyleSheet()

# Custom styles
name_style = ParagraphStyle(
    'NameStyle',
    parent=styles['Normal'],
    fontName='Helvetica-Bold',
    fontSize=20,
    leading=24,
    textColor=colors.HexColor('#0f172a'),
    alignment=0
)

contact_style = ParagraphStyle(
    'ContactStyle',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=9,
    leading=14,
    textColor=colors.HexColor('#475569')
)

heading_style = ParagraphStyle(
    'HeadingStyle',
    parent=styles['Normal'],
    fontName='Helvetica-Bold',
    fontSize=11,
    leading=15,
    textColor=colors.HexColor('#0284c7'),
    spaceBefore=8,
    spaceAfter=4
)

body_style = ParagraphStyle(
    'BodyStyle',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=9.5,
    leading=13.5,
    textColor=colors.HexColor('#1e293b')
)

bullet_style = ParagraphStyle(
    'BulletStyle',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=9,
    leading=13,
    textColor=colors.HexColor('#334155'),
    leftIndent=14
)

story = []

# Header
story.append(Paragraph("SANTHOSH M", name_style))
story.append(Spacer(1, 4))
contact_text = (
    "Thiruvannamalai, Tamil Nadu | Phone: 8015751033 | Email: santhosh23102005@gmail.com<br/>"
    "GitHub: github.com/Santhosh23N | LinkedIn: tinyurl.com/72keyraz"
)
story.append(Paragraph(contact_text, contact_style))
story.append(Spacer(1, 6))
story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor('#cbd5e1'), spaceBefore=2, spaceAfter=8))

# Professional Summary
story.append(Paragraph("PROFESSIONAL SUMMARY", heading_style))
summary_text = (
    "Motivated Computer Science undergraduate with a strong interest in full-stack development and "
    "backend engineering. Skilled in Python, Django, and modern web technologies. Experienced in building "
    "real-world web applications with role-based authentication, OTP verification, and database integration. "
    "Passionate about problem-solving and continuous learning."
)
story.append(Paragraph(summary_text, body_style))
story.append(Spacer(1, 6))

# Technical Skills
story.append(Paragraph("TECHNICAL SKILLS", heading_style))
skills = [
    "<b>Programming:</b> Python",
    "<b>Web Technologies:</b> HTML, CSS, JavaScript",
    "<b>Backend:</b> Django",
    "<b>Database:</b> MySQL",
    "<b>Core Concepts:</b> Problem Solving, Object-Oriented Programming (OOP), Role-Based Authentication"
]
for sk in skills:
    story.append(Paragraph(f"• {sk}", bullet_style))
story.append(Spacer(1, 6))

# Projects
story.append(Paragraph("PROJECTS", heading_style))
proj_title = "<b>VaultX – Warranty Management System</b> | Django, MySQL, OpenRouter API"
story.append(Paragraph(proj_title, body_style))
story.append(Paragraph("<i>GitHub: https://github.com/Santhosh23N/vaultx_EY_project.git</i>", contact_style))
bullets = [
    "Developed a full-stack web application using Django and MySQL.",
    "Implemented OTP-based authentication system for secure login and registration.",
    "Built role-based dashboards tailored for Customer, Seller, and Service Center.",
    "Integrated email notifications and conversational AI chatbot using OpenRouter API.",
    "Designed warranty claim tracking and real-time service status management system with database integration."
]
for b in bullets:
    story.append(Paragraph(f"• {b}", bullet_style))
story.append(Spacer(1, 6))

# Education
story.append(Paragraph("EDUCATION", heading_style))
edu1 = (
    "<b>Bachelor of Engineering (B.E.) – Computer Science Engineering</b><br/>"
    "Adhiparasakthi Engineering College, Melmaruvathur | Anna University<br/>"
    "Expected: March 2027 | <b>CGPA: 7.9</b>"
)
story.append(Paragraph(edu1, body_style))
story.append(Spacer(1, 4))
edu2 = (
    "<b>Higher Secondary Education</b><br/>"
    "SRI BHARATHI VIDHYASHRAM MATRIC HR SEC SCHOOL<br/>"
    "March 2023 | <b>Percentage: 66%</b>"
)
story.append(Paragraph(edu2, body_style))
story.append(Spacer(1, 6))

# Certifications
story.append(Paragraph("CERTIFICATIONS", heading_style))
certs = [
    "AWS Certification – Introduction to Generative AI (2025)",
    "FULL STACK – EY Edunet Certificate (2025)",
    "Artificial Intelligence and Machine Learning – Infosys Certificate (2025)"
]
for c in certs:
    story.append(Paragraph(f"• {c}", bullet_style))
story.append(Spacer(1, 6))

# Languages & Soft Skills
story.append(Paragraph("LANGUAGES & PROFESSIONAL SKILLS", heading_style))
story.append(Paragraph("<b>Languages:</b> Tamil, English, Hindi", body_style))
story.append(Paragraph("<b>Professional Skills:</b> Problem Solving, Communication, Self Learning, Team Collaboration, Structured Thinking, Continuous Learning", body_style))

doc.build(story)
print("PDF generated successfully at:", pdf_path)
