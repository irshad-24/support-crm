import { useEffect, useState } from "react";
import api from "../services/api";

import Navbar from "../components/Navbar";
import SearchFilter from "../components/SearchFilter";
import TicketCard from "../components/TicketCard";
import TicketForm from "../components/TicketForm";
import TicketDetails from "../components/TicketDetails";
import StatsCards from "../components/StatsCards";

function Dashboard() {
  const [tickets, setTickets] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetchTickets();
  }, [search, status]);

  const fetchTickets = async () => {
    try {
      const response = await api.get("/tickets/", {
        params: {
          search: search || undefined,
          status: status || undefined,
        },
      });

      setTickets(response.data);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-7xl mx-auto p-6">
        <SearchFilter
          onNewTicket={() => setShowForm(true)}
          search={search}
          setSearch={setSearch}
          status={status}
          setStatus={setStatus}
        />
        <StatsCards tickets={tickets} />

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">
            Tickets
          </h2>

          {tickets.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-10 text-center text-gray-500">
              No tickets found
            </div>
          ) : (
            <div className="space-y-4">
              {tickets.map((ticket) => (
                <TicketCard
                  key={ticket.ticket_id}
                  ticket={ticket}
                  onClick={setSelectedTicket}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {showForm && (
        <TicketForm
          onClose={() => setShowForm(false)}
          onTicketCreated={() => {
            fetchTickets();
            setShowForm(false);
          }}
        />
      )}

      {selectedTicket && (
        <TicketDetails
          ticket={selectedTicket}
          onClose={() => setSelectedTicket(null)}
          onUpdated={() => {
            fetchTickets();
            setSelectedTicket(null);
          }}
        />
      )}
    </div>
  );
}

export default Dashboard;