import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

function EventDetail() {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        api.get(`/events/${id}`)
            .then((res) => setEvent(res.data))
            .catch((err) => console.error(err));
    }, [id]);

    const handleBuy = async () => {
        try {
            setLoading(true);

            await api.post("/checkout", {
                event_id: id,
            });

            toast.success("Ticket purchased successfully 🎉");
        } catch (err) {
            console.error(err);
            toast.error("Failed to buy ticket");
        } finally {
            setLoading(false);
        }
    };

    if (!event) return <p className="p-6">Loading...</p>;

    return (
        <div className="min-h-screen bg-gray-50 py-10">
            <div className="max-w-4xl mx-auto px-6">
                {/* IMAGE */}
                <div className="h-64 bg-gray-200 rounded-2xl mb-6"></div>

                {/* TITLE */}
                <h1 className="text-3xl font-bold mb-2">{event.title}</h1>

                <p className="text-gray-500 mb-4">{event.location}</p>

                <p className="text-lg mb-6">{event.description}</p>

                <p className="text-xl font-semibold text-indigo-600 mb-6">
                    Rp {event.price}
                </p>

                {/* BUTTON */}
                <button
                    onClick={handleBuy}
                    disabled={loading}
                    className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
                >
                    {loading ? "Processing..." : "Buy Ticket 🎫"}
                </button>
            </div>
        </div>
    );
}

export default EventDetail;
