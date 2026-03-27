import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import noImage from "../assets/no-data.png";

function History() {
    const [transactions, setTransactions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        api.get("/history")
            .then((res) => setTransactions(res.data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 px-6 py-10">
            <div className="max-w-4xl mx-auto">
                {/* TITLE */}
                <h1 className="text-2xl font-bold text-gray-900 mb-6">
                    Payment History 💳
                </h1>

                {/* EMPTY STATE */}
                {transactions.length === 0 && (
                    <div className="text-center text-gray-500 mt-20">
                        No transactions yet
                    </div>
                )}

                {/* LIST */}
                <div className="space-y-4">
                    {transactions.map((trx) => (
                        <div
                            key={trx.id}
                            className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-4 flex items-center justify-between"
                        >
                            {/* LEFT: IMAGE + INFO */}
                            <div className="flex items-center gap-4">
                                {/* IMAGE */}
                                <img
                                    src={
                                        trx.event?.image
                                            ? `http://localhost:8000/storage/${trx.event.image}`
                                            : noImage
                                    }
                                    alt=""
                                    className="w-16 h-16 rounded-xl object-cover"
                                />

                                {/* TEXT (CLICKABLE) */}
                                <div
                                    onClick={() =>
                                        navigate(`/history/${trx.id}`)
                                    }
                                    className="cursor-pointer"
                                >
                                    <h2 className="font-semibold text-gray-900 hover:text-indigo-600 transition">
                                        {trx.event?.title || "Event not found"}
                                    </h2>

                                    <p className="text-sm text-gray-500">
                                        {trx.event?.location || "-"}
                                    </p>
                                </div>
                            </div>

                            {/* RIGHT: STATUS + DATE */}
                            <div className="text-right">
                                <span
                                    className={`text-xs px-3 py-1 rounded-full font-medium
            ${
                trx.status === "paid"
                    ? "bg-green-100 text-green-600"
                    : trx.status === "pending"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-red-100 text-red-600"
            }`}
                                >
                                    {trx.status}
                                </span>

                                <p className="text-xs text-gray-400 mt-2">
                                    {new Date(
                                        trx.created_at,
                                    ).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default History;
