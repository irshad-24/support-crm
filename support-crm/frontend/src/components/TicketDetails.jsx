import { useState } from "react";
import { toast } from "react-hot-toast";
import api from "../services/api";

function TicketDetails({ ticket, onClose, onUpdated }) {
  const [status, setStatus] = useState(ticket.status);
  const [notes, setNotes] = useState(ticket.internal_notes || "");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    setLoading(true);

    try {
      await api.put(`/tickets/${ticket.ticket_id}`, {
        status,
        internal_notes: notes,
      });

      toast.success("Ticket updated successfully!");

      onUpdated();
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update ticket.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-2xl rounded-xl p-6 shadow-xl">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            Ticket Details
          </h2>

          <button
            onClick={onClose}
            disabled={loading}
            className="text-2xl font-bold text-gray-500 hover:text-black disabled:opacity-50"
          >
            ×
          </button>
        </div>

        <div className="space-y-4">

          <div>
            <label className="font-semibold">Ticket ID</label>
            <p>{ticket.ticket_id}</p>
          </div>

          <div>
            <label className="font-semibold">Customer</label>
            <p>{ticket.customer_name}</p>
          </div>

          <div>
            <label className="font-semibold">Email</label>
            <p>{ticket.customer_email}</p>
          </div>

          <div>
            <label className="font-semibold">Subject</label>
            <p>{ticket.subject}</p>
          </div>

          <div>
            <label className="font-semibold">Description</label>
            <p>{ticket.description}</p>
          </div>

          <div>
            <label className="font-semibold block mb-2">
              Status
            </label>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              disabled={loading}
              className="border rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            >
              <option>Open</option>
              <option>In Progress</option>
              <option>Closed</option>
            </select>
          </div>

          <div>
            <label className="font-semibold block mb-2">
              Internal Notes
            </label>

            <textarea
              rows="5"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              disabled={loading}
              className="border rounded-lg w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              placeholder="Add internal notes..."
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              disabled={loading}
              className="px-5 py-2 border rounded-lg hover:bg-gray-100 transition disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              onClick={handleUpdate}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition disabled:bg-blue-400 disabled:cursor-not-allowed"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default TicketDetails;