import { useState } from "react";
import { toast } from "react-hot-toast";
import api from "../services/api";

function TicketForm({ onClose, onTicketCreated }) {
  const [formData, setFormData] = useState({
    customer_name: "",
    customer_email: "",
    subject: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await api.post("/tickets/", formData);

      toast.success("Ticket created successfully!");

      onTicketCreated();
      onClose();
    } catch (error) {
      console.error("Error creating ticket:", error);

      toast.error("Failed to create ticket.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white w-[500px] rounded-lg p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-5">
          Create Ticket
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            type="text"
            name="customer_name"
            placeholder="Customer Name"
            className="w-full border rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="customer_email"
            placeholder="Customer Email"
            className="w-full border rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="subject"
            placeholder="Subject"
            className="w-full border rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            rows="4"
            className="w-full border rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
            required
          />

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-5 py-2 border rounded hover:bg-gray-100 transition disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded transition disabled:bg-blue-400 disabled:cursor-not-allowed"
            >
              {loading ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TicketForm;