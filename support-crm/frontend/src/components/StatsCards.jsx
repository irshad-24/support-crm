function StatsCards({ tickets }) {
  const total = tickets.length;
  const open = tickets.filter((t) => t.status === "Open").length;
  const inProgress = tickets.filter(
    (t) => t.status === "In Progress"
  ).length;
  const closed = tickets.filter((t) => t.status === "Closed").length;

  const cards = [
    {
      title: "Total Tickets",
      value: total,
      color: "bg-blue-500",
    },
    {
      title: "Open",
      value: open,
      color: "bg-red-500",
    },
    {
      title: "In Progress",
      value: inProgress,
      color: "bg-yellow-500",
    },
    {
      title: "Closed",
      value: closed,
      color: "bg-green-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
        >
          <div
            className={`w-12 h-12 rounded-lg ${card.color} mb-4`}
          ></div>

          <h3 className="text-gray-500 text-sm font-medium">
            {card.title}
          </h3>

          <p className="text-3xl font-bold mt-2">
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}

export default StatsCards;