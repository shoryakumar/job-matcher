from agent_chain import create_agent_chain

def generate_email(jd_text, resume_text, score):
    prompt = (
        f"A resume was matched with a job description. The match score is {score}%. "
        f"Based on the information, write a professional email to apply for the job. "
        f"\n\nJob Description:\n{jd_text[:1000]}\n\nResume:\n{resume_text[:1000]}"
    )

    chain = create_agent_chain()
    response = chain.run(prompt)
    return response