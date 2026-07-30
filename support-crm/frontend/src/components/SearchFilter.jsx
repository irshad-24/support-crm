import { useState, useEffect } from "react";

function SearchFilter({
  onNewTicket,
  search,
  setSearch,
  status,
  setStatus,
}) {
  const [searchText, setSearchText] = useState(search);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchText);
    }, 400);

    return () => clearTimeout(timer);
  }, [searchText]);

  return (
    <div className="bg-white p-5 rounded-lg shadow-md flex flex-col md:flex-row gap-4">
      <input
        type="text"
        placeholder="Search by ID, Name, Email or Subject..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="border rounded-lg px-4 py-2 flex-1"
      />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border rounded-lg px-4 py-2"
      >
        <option value="">All Status</option>
        <option value="Open">Open</option>
        <option value="In Progress">In Progress</option>
        <option value="Closed">Closed</option>
      </select>

      <button
        onClick={onNewTicket}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        + New Ticket
      </button>
    </div>
  );
}

export default SearchFilter;