import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

function Events() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        api.get("/events")
            .then((res) => setEvents(res.data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div style={{ padding: "20px" }}>
            <h1>All Events 🎉</h1>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => (
                    <div
                        key={event.id}
                        className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition overflow-hidden"
                    >
                        {/* IMAGE */}
                        <div className="h-48 bg-gray-200">
                            {event.image ? (
                                <img
                                    src={`http://localhost:8000/storage/${event.image}`}
                                    alt={event.title}
                                    className="w-full h-full object-cover"
                                />
                            ) : null}
                        </div>

                        {/* CONTENT */}
                        <div className="p-5">
                            <h3 className="text-lg font-semibold mb-1">
                                {event.title}
                            </h3>

                            <p className="text-gray-500 text-sm mb-2">
                                📍 {event.location}
                            </p>

                            <p className="text-indigo-600 font-semibold mb-4">
                                Rp {event.price}
                            </p>

                            <Link
                                to={`/events/${event.id}`}
                                className="inline-block text-sm font-medium text-indigo-600 hover:underline"
                            >
                                View Detail →
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Events;
