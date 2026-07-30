# Support CRM

A full-stack Support CRM application built with **FastAPI** and **React** for managing customer support tickets.

## Features

- Create new support tickets
- View all support tickets
- Search tickets by customer name or subject
- Filter tickets by status
- View ticket details
- Update ticket status
- Add internal support notes
- Responsive user interface

---

## Tech Stack

### Backend
- FastAPI
- SQLAlchemy
- SQLite
- Pydantic

### Frontend
- React (Vite)
- Tailwind CSS
- Axios

---

## Project Structure

```
support-crm/
│
├── backend/
│   ├── app/
│   ├── requirements.txt
│   └── ...
│
├── frontend/
│   ├── src/
│   ├── package.json
│   └── ...
│
└── README.md
```

---

## Backend Setup

```bash
cd backend

python -m venv venv

# Windows
venv\Scripts\activate

pip install -r requirements.txt

uvicorn app.main:app --reload
```

Backend will run at:

```
http://127.0.0.1:8000
```

Swagger Documentation:

```
http://127.0.0.1:8000/docs
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend will run at:

```
http://localhost:5173
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tickets/` | Get all tickets |
| GET | `/api/tickets/{id}` | Get ticket by ID |
| POST | `/api/tickets/` | Create ticket |
| PUT | `/api/tickets/{id}` | Update ticket |

---

## Screenshots

You can add screenshots of:

- Dashboard
- Create Ticket Form
- Ticket Details
- Search & Filter

---

## Future Improvements

- User authentication
- Email notifications
- Pagination
- PostgreSQL support

---

## Author

**Shaikh Irshad**