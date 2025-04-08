import docx2txt
import PyPDF2

def extract_text_from_file(filepath):
    if filepath.endswith(".pdf"):
        with open(filepath, "rb") as f:
            reader = PyPDF2.PdfReader(f)
            return " ".join([page.extract_text() for page in reader.pages if page.extract_text()])
    elif filepath.endswith(".docx"):
        return docx2txt.process(filepath)
    else:
        return ""

def calculate_match_score(jd_text, resume_text):
    jd_words = set(jd_text.lower().split())
    resume_words = set(resume_text.lower().split())
    common = jd_words.intersection(resume_words)
    return round((len(common) / len(jd_words)) * 100, 2)