from pydantic import BaseModel, EmailStr
from datetime import datetime
from app.enums import TicketStatus

class TicketCreate(BaseModel):
    customer_name: str
    customer_email: EmailStr
    subject: str
    description: str


class NoteResponse(BaseModel):
    note_text: str
    created_at: datetime

    class Config:
        from_attributes = True
        
class TicketDetailResponse(BaseModel):
    ticket_id: str
    customer_name: str
    customer_email: EmailStr
    subject: str
    description: str
    status: TicketStatus
    created_at: datetime
    updated_at: datetime

    notes: list[NoteResponse] = []

    class Config:
        from_attributes = True


class TicketResponse(BaseModel):
    ticket_id: str
    customer_name: str
    customer_email: EmailStr
    subject: str
    description: str
    status: TicketStatus
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class TicketUpdate(BaseModel):
    status: TicketStatus
    note: str | None = None