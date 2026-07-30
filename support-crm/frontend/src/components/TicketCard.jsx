function TicketCard({ ticket, onClick }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "Open":
        return "bg-red-100 text-red-700";

      case "In Progress":
        return "bg-yellow-100 text-yellow-700";

      case "Closed":
        return "bg-green-100 text-green-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div
      onClick={() => onClick(ticket)}
      className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md hover:border-blue-400 transition-all duration-200 cursor-pointer"
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">
            {ticket.subject}
          </h3>

          <p className="text-gray-700 mt-2 font-medium">
            {ticket.customer_name}
          </p>

          <p className="text-sm text-gray-500">
            {ticket.customer_email}
          </p>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
            ticket.status
          )}`}
        >
          {ticket.status}
        </span>
      </div>

      <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between text-sm text-gray-500">
        <span>
          Ticket ID: <span className="font-medium">{ticket.ticket_id}</span>
        </span>

        <span className="text-blue-600 font-medium">
          View Details →
        </span>
      </div>
    </div>
  );
}

export default TicketCard;