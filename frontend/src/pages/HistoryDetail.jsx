import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

function HistoryDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [trx, setTrx] = useState(null);

    useEffect(() => {
        api.get(`/transactions/${id}`)
            .then((res) => setTrx(res.data))
            .catch((err) => console.error(err));
    }, [id]);

    if (!trx) return <p className="p-6">Loading...</p>;

    return (
        <div className="min-h-screen bg-gray-50 px-6 py-10">
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm p-6">
                {/* TITLE */}
                <h1 className="text-xl font-bold text-gray-900 mb-6">
                    Transaction Detail
                </h1>

                {/* EVENT */}
                <div className="mb-6">
                    <h2 className="text-lg font-semibold text-gray-800">
                        {trx.event?.title || "Event not found"}
                    </h2>
                    <p className="text-sm text-gray-500">
                        {trx.event?.location || "-"}
                    </p>
                </div>

                {/* INFO */}
                <div className="space-y-3 text-sm mb-6">
                    <div className="flex justify-between">
                        <span className="text-gray-500">Order ID</span>
                        <span className="font-medium">{trx.order_id}</span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-gray-500">Amount</span>
                        <span className="font-medium">Rp {trx.amount}</span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-gray-500">Status</span>
                        <span
                            className={`font-medium
                            ${
                                trx.status === "paid"
                                    ? "text-green-600"
                                    : trx.status === "pending"
                                      ? "text-yellow-600"
                                      : "text-red-600"
                            }`}
                        >
                            {trx.status}
                        </span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-gray-500">Date</span>
                        <span className="font-medium">
                            {new Date(trx.created_at).toLocaleString()}
                        </span>
                    </div>
                </div>

                {/* ACTIONS */}
                <div className="flex flex-col gap-3">
                    {/* 🔥 BRIDGE: VIEW TICKET */}
                    {trx.status === "paid" && (
                        <button
                            onClick={() => navigate("/my-tickets")}
                            className="bg-green-600 text-white py-3 rounded-xl font-semibold"
                        >
                            View Ticket 🎟️
                        </button>
                    )}

                    {/* RETRY PAYMENT */}
                    {trx.status === "pending" && (
                        <button className="bg-indigo-600 text-white py-3 rounded-xl font-semibold">
                            Pay Again
                        </button>
                    )}

                    {/* BACK */}
                    <button
                        onClick={() => navigate("/history")}
                        className="text-gray-500 py-2"
                    >
                        Back to History
                    </button>
                </div>
            </div>
        </div>
    );
}

export default HistoryDetail;
