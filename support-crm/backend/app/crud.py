from sqlalchemy.orm import Session
from datetime import datetime
import uuid

from app import models, schemas


def generate_ticket_id():
    return f"TKT-{uuid.uuid4().hex[:6].upper()}"


def create_ticket(db: Session, ticket: schemas.TicketCreate):
    db_ticket = models.Ticket(
        ticket_id=generate_ticket_id(),
        customer_name=ticket.customer_name,
        customer_email=ticket.customer_email,
        subject=ticket.subject,
        description=ticket.description,
        status="Open",
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    db.add(db_ticket)
    db.commit()
    db.refresh(db_ticket)

    return db_ticket