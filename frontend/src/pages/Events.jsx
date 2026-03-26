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

            {events.map((event) => (
                <div
                    key={event.id}
                    style={{
                        border: "1px solid #ccc",
                        padding: "10px",
                        marginBottom: "10px",
                    }}
                >
                    <h3>{event.title}</h3>
                    <p>{event.location}</p>
                    <p>Price: Rp {event.price}</p>

                    <Link to={`/events/${event.id}`}>View Detail</Link>
                </div>
            ))}
        </div>
    );
}

export default Events;
