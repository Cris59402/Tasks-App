import Card from "./(components)/Card";

const getTickets = async () => {
  try {
    const res = await fetch("https://localhost:3000/api/Tickets", {
      cache: "no-store",
    });
    return res.json();
  } catch (err) {
    console.log("Error fetching", err);
  }
};

const Dashboard = async () => {
  const tickets = await getTickets();
  const uniq = [...new Set(tickets?.map(({ category }) => category))];

  return (
    <div className="p-5">
      <div>
        {tickets &&
          uniq?.map((uniq, index) => (
            <div className="mb-4" key={index}>
              <h2>{uniq}</h2>
              <div className="lg:grid grid-cols-2 xl:grid-cols-4">
                {tickets
                  .filter((ticket) => ticket.category === uniq)
                  .map((filterT, i) => (
                    <Card id={i} key={i} ticket={filterT} />
                  ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
