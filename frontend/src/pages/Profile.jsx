import { useEffect, useState } from "react";
import api from "../services/api";
import QRCode from "react-qr-code";

function Profile() {
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        api.get("/tickets")
            .then((res) => setTickets(res.data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-6xl mx-auto px-6">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold flex items-center gap-2">
                        My Profile <span>👤</span>
                    </h1>
                    <p className="text-gray-500 mt-1">
                        Manage your tickets and activity
                    </p>
                </div>

                {/* Tickets */}
                <div>
                    <h2 className="text-xl font-semibold mb-4">
                        My Tickets 🎫
                    </h2>

                    {tickets.length === 0 && (
                        <p className="text-gray-500">No tickets yet</p>
                    )}

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {tickets.map((ticket) => (
                            <div
                                key={ticket.id}
                                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-5 flex flex-col items-center"
                            >
                                <h3 className="font-semibold text-lg mb-1">
                                    {ticket.event.title}
                                </h3>

                                <p className="text-sm text-gray-500 mb-3">
                                    {ticket.status === "used"
                                        ? "Used ❌"
                                        : "Active ✅"}
                                </p>

                                {/* QR */}
                                <div className="bg-white p-3 rounded-lg border">
                                    <QRCode value={ticket.qr_code} size={120} />
                                </div>

                                <p className="text-xs text-gray-400 mt-3 break-all text-center">
                                    {ticket.qr_code}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
