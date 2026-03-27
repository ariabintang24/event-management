import { useEffect, useState } from "react";
import api from "../services/api";

function Tickets() {
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        api.get("/my-tickets")
            .then((res) => setTickets(res.data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 px-6 py-10">
            <h1 className="text-2xl font-bold mb-6">My Tickets</h1>

            <div className="space-y-4">
                {tickets.map((ticket) => (
                    <div
                        key={ticket.id}
                        className="bg-white rounded-2xl shadow-sm p-4 flex gap-4"
                    >
                        {/* IMAGE */}
                        <img
                            src={`http://localhost:8000/storage/${ticket.event.image}`}
                            alt=""
                            className="w-24 h-24 object-cover rounded-xl"
                        />

                        {/* INFO */}
                        <div className="flex-1">
                            <h2 className="font-semibold text-gray-900">
                                {ticket.event.title}
                            </h2>

                            <p className="text-sm text-gray-500">
                                {ticket.event.location}
                            </p>

                            <p className="text-sm text-gray-500">
                                {ticket.event.date}
                            </p>

                            {/* STATUS */}
                            <span
                                className={`text-xs px-3 py-1 rounded-full mt-2 inline-block
                                ${
                                    ticket.status === "paid"
                                        ? "bg-green-100 text-green-600"
                                        : "bg-yellow-100 text-yellow-600"
                                }
                            `}
                            >
                                {ticket.status}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Tickets;
