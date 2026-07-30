from sqlalchemy.orm import Session
from sqlalchemy import or_
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
        status=models.TicketStatus.OPEN.value,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    db.add(db_ticket)
    db.commit()
    db.refresh(db_ticket)

    return db_ticket


def get_tickets(db: Session, status: str = None, search: str = None):
    query = db.query(models.Ticket)

    if status:
        query = query.filter(models.Ticket.status == status)

    if search:
        query = query.filter(
            or_(
                models.Ticket.customer_name.ilike(f"%{search}%"),
                models.Ticket.customer_email.ilike(f"%{search}%"),
                models.Ticket.subject.ilike(f"%{search}%"),
                models.Ticket.description.ilike(f"%{search}%"),
                models.Ticket.ticket_id.ilike(f"%{search}%")
            )
        )

    return query.order_by(models.Ticket.created_at.desc()).all()

def get_ticket_by_ticket_id(db: Session, ticket_id: str):
    return (
        db.query(models.Ticket)
        .filter(models.Ticket.ticket_id == ticket_id)
        .first()
    )
def update_ticket(db: Session, ticket_id: str, ticket_update: schemas.TicketUpdate):

    ticket = (
        db.query(models.Ticket)
        .filter(models.Ticket.ticket_id == ticket_id)
        .first()
    )

    if not ticket:
        return None

    ticket.status = ticket_update.status
    ticket.updated_at = datetime.utcnow()

    if ticket_update.note:
        note = models.Note(
            ticket_id=ticket.id,
            note_text=ticket_update.note
        )

        db.add(note)

    db.commit()
    db.refresh(ticket)

    return ticket