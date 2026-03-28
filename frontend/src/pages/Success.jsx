import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import { CheckCircle2, MapPin, Ticket } from "lucide-react";

function Success() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [trx, setTrx] = useState(null);

    useEffect(() => {
        api.get(`/transactions/${id}`)
            .then((res) => setTrx(res.data))
            .catch((err) => console.error(err));
    }, [id]);

    if (!trx) return <p className="p-6">Loading...</p>;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-gray-100 px-6">
            <div className="bg-white p-8 rounded-3xl shadow-lg max-w-md w-full text-center">
                {/* ICON */}
                <div className="flex justify-center mb-4">
                    <div className="bg-green-100 p-4 rounded-full">
                        <CheckCircle2 className="w-10 h-10 text-green-600" />
                    </div>
                </div>

                {/* TITLE */}
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    Payment Successful
                </h1>

                {/* DESC (lebih netral) */}
                <p className="text-gray-500 mb-6">
                    Your payment has been successfully completed.
                </p>

                {/* EVENT INFO (clean card) */}
                <div className="flex items-center justify-between border border-gray-200 rounded-2xl p-4 mb-6 text-left">
                    {/* LEFT */}
                    <div>
                        <h2 className="font-semibold text-gray-900">
                            {trx.event?.title}
                        </h2>

                        <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                            <MapPin className="w-4 h-4" />
                            <span>{trx.event?.location}</span>
                        </div>
                    </div>

                    {/* RIGHT IMAGE */}
                    <img
                        src={
                            trx.event?.image
                                ? `http://localhost:8000/storage/${trx.event.image}`
                                : "/no-image.png"
                        }
                        alt=""
                        className="w-16 h-16 rounded-xl object-cover ml-4"
                    />
                </div>

                {/* ACTIONS */}
                <div className="flex flex-col gap-3">
                    <button
                        onClick={() => navigate("/my-tickets")}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition"
                    >
                        View My Tickets
                    </button>

                    <button
                        onClick={() => navigate("/")}
                        className="text-gray-500 py-2 hover:text-gray-700 transition"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Success;
