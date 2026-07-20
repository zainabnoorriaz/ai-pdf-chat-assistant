from pydantic import BaseModel


class ChatRequest(BaseModel):
    pdf_id: int
    question: str