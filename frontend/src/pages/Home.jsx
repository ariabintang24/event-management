import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

function Home() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        api.get("/events")
            .then((res) => setEvents(res.data.slice(0, 4)))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* HERO */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-16">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <h1 className="text-4xl font-bold mb-4">
                        Discover Amazing Events
                    </h1>
                    <p className="text-lg mb-6">
                        Find, book, and enjoy events around you
                    </p>

                    <Link
                        to="/events"
                        className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition"
                    >
                        Explore Events
                    </Link>
                </div>
            </div>

            {/* FEATURED EVENTS */}
            <div className="max-w-6xl mx-auto px-6 py-10">
                <h2 className="text-2xl font-bold mb-6">Featured Events</h2>

                {events.length === 0 && (
                    <p className="text-gray-500">No events available</p>
                )}

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {events.map((event) => (
                        <div
                            key={event.id}
                            className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-4"
                        >
                            {/* IMAGE (placeholder dulu) */}
                            <div className="h-40 bg-gray-200 rounded-xl mb-3"></div>

                            <h3 className="font-semibold text-lg">
                                {event.title}
                            </h3>

                            <p className="text-sm text-gray-500">
                                {event.location}
                            </p>

                            <p className="text-indigo-600 font-semibold mt-2">
                                Rp {event.price}
                            </p>

                            <Link
                                to={`/events/${event.id}`}
                                className="inline-block mt-3 text-sm text-indigo-600 hover:underline"
                            >
                                View Details →
                            </Link>
                        </div>
                    ))}
                </div>

                {/* SEE ALL */}
                <div className="text-center mt-8">
                    <Link
                        to="/events"
                        className="text-indigo-600 font-semibold hover:underline"
                    >
                        View All Events →
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Home;
