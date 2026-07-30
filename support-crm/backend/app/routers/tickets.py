from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from fastapi import HTTPException
from fastapi import Query
from app.database import get_db
from app import schemas
from app.crud import ticket_crud

router = APIRouter(
    prefix="/api/tickets",
    tags=["Tickets"]
)


@router.post("/", response_model=schemas.TicketResponse)
def create_ticket(
    ticket: schemas.TicketCreate,
    db: Session = Depends(get_db)
):
    return ticket_crud.create_ticket(db, ticket)


@router.get("/", response_model=list[schemas.TicketResponse])
def get_all_tickets(
    status: str = None,
    search: str = None,
    db: Session = Depends(get_db)
):
    return ticket_crud.get_tickets(db, status, search)

@router.get("/{ticket_id}", response_model=schemas.TicketDetailResponse)
def get_ticket(
    ticket_id: str,
    db: Session = Depends(get_db)
):
    ticket = ticket_crud.get_ticket_by_ticket_id(db, ticket_id)

    if not ticket:
        raise HTTPException(
            status_code=404,
            detail="Ticket not found"
        )

    return ticket

@router.put("/{ticket_id}", response_model=schemas.TicketResponse)
def update_ticket(
    ticket_id: str,
    ticket_update: schemas.TicketUpdate,
    db: Session = Depends(get_db)
):

    ticket = ticket_crud.update_ticket(
        db,
        ticket_id,
        ticket_update
    )

    if not ticket:
        raise HTTPException(
            status_code=404,
            detail="Ticket not found"
        )

    return ticket