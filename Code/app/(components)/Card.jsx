import Delete from "./Delete";
import PriorityDisplay from "./PriorityDisplay";
import Progress from "./Progress";
import Status from "./Status";
import Link from "next/link";

const Card = ({ ticket }) => {
  const timeStamp = (timeStamp) => {
    const option = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minutes: "2-digit",
      hour12: true,
    };
    const date = new Date(timeStamp);
    const formatDate = date.toLocaleString("en-US", option);
    return formatDate;
  };

  return (
    <div className="flex flex-col bg-card hover:bg-card-hover rounded-md shadow-lg p-3 m-2">
      <div className="flex mb-3">
        <PriorityDisplay priority={ticket.priority} />
        <div className="ml-auto">
          <Delete id={ticket._id} />
        </div>
      </div>
      <Link href={`/TicketPage/${ticket._id}`} style={{ display: "contents" }}>
        <h3>{ticket.title}</h3>
        <hr className="h-px border-0 bg-page mb-2" />
        <p className="whitespace-pre-wrap">{ticket.description}</p>

        <div className="flex-grow"></div>
        <div className="flex mt-2">
          <div className="flex flex-col">
            <p className="text-xs my-1">{timeStamp(ticket.createdAT)}</p>
            <Progress progress={ticket.progress} />
          </div>
          <div className="ml-auto flex items-end">
            <Status status={ticket.status} />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
