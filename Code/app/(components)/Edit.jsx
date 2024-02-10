"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Edit = ({ ticket }) => {
  const edit = ticket._id === "new" ? false : true;
  const router = useRouter();
  const handleSubmit = async (e) => {
    if (edit) {
      const res = await fetch(`/api/Tickets/${ticket._id}`, {
        method: "PUT",
        body: JSON.stringify({ data }),
        "Content-type": "application/json",
      });

      if (!res.ok) {
        throw new Error("Actualizarea ticketului a esuat.");
      }
    } else {
      const res = await fetch("/api/Tickets", {
        method: "POST",
        body: JSON.stringify({ data }),
        "Content-type": "application/json",
      });

      if (!res.ok) {
        throw new Error("Crearea ticketului a esuat.");
      }
    }

    router.refresh();
    router.push("/");
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const firstTicketData = {
    title: "",
    description: "",
    priority: 1,
    progress: 0,
    status: "not started",
    category: "Problems",
  };

  if (edit) {
    firstTicketData["title"] = ticket.title;
    firstTicketData["description"] = ticket.description;
    firstTicketData["priority"] = ticket.priority;
    firstTicketData["progress"] = ticket.progress;
    firstTicketData["category"] = ticket.category;
  }

  const [data, setData] = useState(firstTicketData);
  return (
    <div className="flex justify-center">
      <form
        className="flex flex-col gap-3 w-1/2"
        method="post"
        onSubmit={handleSubmit}
      >
        <h2>{edit ? "Actualizeaza ticket-ul" : "Creaza Ticket"}</h2>
        <label>Titlu</label>
        <input
          type="text"
          id="title"
          name="title"
          onChange={handleChange}
          required={true}
          value={data.title}
        />
        <label>Descriere</label>
        <textarea
          id="description"
          name="description"
          onChange={handleChange}
          required={true}
          value={data.description}
          rows="3"
        />
        <label>Categorie</label>
        <select name="category" value={data.category} onChange={handleChange}>
          <option value="Problem1">Hard</option>
          <option value="Problem2">Soft</option>
          <option value="Problem3">Database</option>
          <option value="Problem4">Front</option>
        </select>
        <label>Prioritate</label>
        <div>
          <input
            id="priority-1"
            name="priority"
            type="radio"
            onChange={handleChange}
            value={1}
            checked={data.priority == 1}
          />
          <label>1</label>
          <input
            id="priority-2"
            name="priority"
            type="radio"
            onChange={handleChange}
            value={2}
            checked={data.priority == 2}
          />
          <label>2</label>
          <input
            id="priority-3"
            name="priority"
            type="radio"
            onChange={handleChange}
            value={3}
            checked={data.priority == 3}
          />
          <label>3</label>
          <input
            id="priority-4"
            name="priority"
            type="radio"
            onChange={handleChange}
            value={4}
            checked={data.priority == 4}
          />
          <label>4</label>
          <input
            id="priority-5"
            name="priority"
            type="radio"
            onChange={handleChange}
            value={5}
            checked={data.priority == 5}
          />
          <label>5</label>
        </div>
        <div>
          <label>Progres</label>
          <input
            type="range"
            id="progress"
            name="progress"
            value={data.progress}
            min="0"
            max="100"
            onChange={handleChange}
          />
          <label>Status</label>
          <select name="status" value={data.status} onChange={handleChange}>
            <option value="not started">Not started</option>
            <option value="started">Started</option>
            <option value="done">Done</option>
          </select>
          <input
            type="submit"
            className="btn max-w-xs"
            value={edit ? "Actualizeaza ticket-ul" : "Creaza Ticket"}
          />
        </div>
      </form>
    </div>
  );
};

export default Edit;
