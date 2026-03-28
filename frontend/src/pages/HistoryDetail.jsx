import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

function HistoryDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [trx, setTrx] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handlePay = async () => {
        console.log("TRX ID:", trx.id);
        try {
            const res = await api.post(`/transactions/${trx.id}/pay`);

            const trxId = trx?.id;

            if (!trxId) {
                console.error("Transaction ID missing");
                return;
            }

            window.snap.pay(res.data.token, {
                onSuccess: function () {
                    window.location.replace(`/success/${trxId}`);
                },
            });
        
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        api.get(`/transactions/${id}`)
            .then((res) => setTrx(res.data))
            .catch((err) => {
                console.error(err);
                setError("Failed to load data");
            })
            .finally(() => setLoading(false));
    }, [id]);

    if (error) return <p className="p-6 text-red-500">{error}</p>;

    return (
        <div className="min-h-screen bg-gray-50 px-6 py-10">
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm p-6">
                {/* TITLE (STATIC) */}
                <h1 className="text-xl font-bold text-gray-900 mb-6">
                    Transaction Detail
                </h1>

                {/* IMAGE */}
                <div className="mb-6">
                    {loading ? (
                        <div className="w-full h-48 bg-gray-200 rounded-xl animate-pulse"></div>
                    ) : (
                        <img
                            src={
                                trx?.event?.image
                                    ? `http://localhost:8000/storage/${trx.event.image}`
                                    : "/no-image.png"
                            }
                            alt=""
                            className="w-full h-48 object-cover rounded-xl"
                        />
                    )}
                </div>

                {/* EVENT */}
                <div className="mb-6">
                    {loading ? (
                        <>
                            <div className="h-5 w-56 bg-gray-200 rounded mb-2 animate-pulse"></div>
                            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                        </>
                    ) : (
                        <>
                            <h2 className="text-lg font-semibold text-gray-800">
                                {trx?.event?.title || "Event not found"}
                            </h2>
                            <p className="text-sm text-gray-500">
                                {trx?.event?.location || "-"}
                            </p>
                        </>
                    )}
                </div>

                {/* INFO */}
                <div className="space-y-3 text-sm mb-6">
                    {/* ORDER ID */}
                    <div className="flex justify-between">
                        <span className="text-gray-500">Order ID</span>
                        {loading ? (
                            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                        ) : (
                            <span className="font-medium">{trx.order_id}</span>
                        )}
                    </div>

                    {/* AMOUNT */}
                    <div className="flex justify-between">
                        <span className="text-gray-500">Amount</span>
                        {loading ? (
                            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                        ) : (
                            <span className="font-medium">Rp {trx.amount}</span>
                        )}
                    </div>

                    {/* STATUS */}
                    <div className="flex justify-between">
                        <span className="text-gray-500">Status</span>
                        {loading ? (
                            <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                        ) : (
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
                        )}
                    </div>

                    {/* DATE */}
                    <div className="flex justify-between">
                        <span className="text-gray-500">Date</span>
                        {loading ? (
                            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                        ) : (
                            <span className="font-medium">
                                {new Date(trx.created_at).toLocaleString()}
                            </span>
                        )}
                    </div>
                </div>

                {/* ACTIONS */}
                <div className="flex flex-col gap-3">
                    {loading ? (
                        <div className="h-12 w-full bg-gray-200 rounded-xl animate-pulse"></div>
                    ) : (
                        <>
                            {trx.status === "paid" && (
                                <button
                                    onClick={() => navigate("/my-tickets")}
                                    className="bg-green-600 text-white py-3 rounded-xl font-semibold"
                                >
                                    View Ticket 🎟️
                                </button>
                            )}

                            {trx.status === "pending" && (
                                <button
                                    onClick={handlePay}
                                    className="bg-indigo-600 text-white py-3 rounded-xl font-semibold"
                                >
                                    Continue Payment
                                </button>
                            )}

                            {trx.status === "failed" && (
                                <button className="bg-red-600 text-white py-3 rounded-xl font-semibold">
                                    Retry Payment
                                </button>
                            )}

                            {trx.status === "expired" && (
                                <button className="bg-gray-800 text-white py-3 rounded-xl font-semibold">
                                    Order Again
                                </button>
                            )}
                        </>
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
