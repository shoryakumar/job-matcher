from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import os
from match_resume import extract_text_from_file, calculate_match_score
from email_generator import generate_email
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.post("/match_and_email")
async def match_and_email(jd_file: UploadFile = File(...), resume_file: UploadFile = File(...)):
    jd_path = os.path.join(UPLOAD_DIR, jd_file.filename)
    resume_path = os.path.join(UPLOAD_DIR, resume_file.filename)

    with open(jd_path, "wb") as f:
        f.write(await jd_file.read())
    with open(resume_path, "wb") as f:
        f.write(await resume_file.read())

    jd_text = extract_text_from_file(jd_path)
    resume_text = extract_text_from_file(resume_path)

    score = calculate_match_score(jd_text, resume_text)
    email = generate_email(jd_text, resume_text, score)

    return {"match_score": score, "email_content": email}