import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";
import dayjs from "dayjs";

function Checkout() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(false);

    // helper tanggal indonesia
    const hari = [
        "Minggu",
        "Senin",
        "Selasa",
        "Rabu",
        "Kamis",
        "Jumat",
        "Sabtu",
    ];
    const bulan = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
    ];

    const formatTanggal = (date) => {
        const d = new Date(date);
        return `${hari[d.getDay()]}, ${d.getDate()} ${
            bulan[d.getMonth()]
        } ${d.getFullYear()}`;
    };

    useEffect(() => {
        api.get(`/events/${id}`)
            .then((res) => setEvent(res.data))
            .catch((err) => console.error(err));
    }, [id]);

    const handleCheckout = async () => {
        try {
            if (!event) return;

            setLoading(true);

            // ✅ selalu buat transaction dulu
            const res = await api.post("/checkout", {
                event_id: id,
            });

            const trxId = res.data.transaction?.id;
            const token = res.data.token;

            if (!trxId) {
                console.error("Transaction ID not found");
                return;
            }

            // ✅ FREE EVENT (tidak perlu snap)
            if (event.price === 0) {
                navigate(`/success/${trxId}`);
                return;
            }

            // ❗ pastikan snap ready
            if (!window.snap) {
                alert("Payment service not ready");
                return;
            }

            // ✅ SNAP PAYMENT
            window.snap.pay(token, {
                onSuccess: function () {
                    window.location.replace(`/success/${trxId}`);
                },
                onPending: function () {
                    navigate(`/history/${trxId}`);
                },
                onError: function () {
                    alert("Payment failed");
                },
                onClose: function () {
                    console.log("User closed popup");
                },
            });
        } catch (err) {
            console.error(err);
            alert("Checkout gagal");
        } finally {
            setLoading(false);
        }
    };

    if (!event) return <p className="p-6">Loading...</p>;

    const startDate = dayjs(event.date);
    const endDate = event.end_date ? dayjs(event.end_date) : null;

    return (
        <div className="min-h-screen bg-gray-50 py-10">
            <div className="max-w-3xl mx-auto px-6">
                {/* TITLE */}
                <h1 className="text-2xl font-semibold text-gray-900 mb-6">
                    Checkout Ticket
                </h1>

                {/* CARD */}
                <div className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
                    {/* EVENT TITLE */}
                    <h2 className="text-xl font-semibold text-gray-900">
                        {event.title}
                    </h2>

                    <div className="">
                        {/* LOCATION */}
                        <div className="flex justify-between items-center py-3">
                            <span className="text-gray-500 text-sm">
                                Location
                            </span>
                            <span className="text-gray-800 font-medium text-sm text-right">
                                {event.location}
                            </span>
                        </div>

                        {/* DATE */}
                        <div className="flex justify-between items-center py-3">
                            <span className="text-gray-500 text-sm">Date</span>
                            <span className="text-gray-800 font-medium text-sm text-right">
                                {formatTanggal(event.date)}
                            </span>
                        </div>

                        {/* TIME */}
                        <div className="flex justify-between items-center py-3">
                            <span className="text-gray-500 text-sm">Time</span>
                            <span className="text-gray-800 font-medium text-sm text-right">
                                {startDate.format("HH:mm")}
                                {endDate && ` - ${endDate.format("HH:mm")}`}
                            </span>
                        </div>
                    </div>

                    {/* TOTAL */}
                    <div className="flex justify-between items-center border-t pt-4 mt-4">
                        <span className="text-gray-500 text-sm">Total</span>
                        <span className="text-lg font-semibold text-gray-900">
                            Rp {event.price}
                        </span>
                    </div>
                </div>

                {/* ACTION */}
                <button
                    onClick={handleCheckout}
                    disabled={loading}
                    className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
                >
                    {loading
                        ? "Processing..."
                        : event.price === 0
                          ? "Get Ticket"
                          : "Pay Now"}
                </button>

                {/* INFO / RULES */}
                <div className="mt-6 bg-white rounded-2xl shadow-sm p-5 text-sm text-gray-600 space-y-2">
                    <p className="font-semibold text-gray-800 mb-1">
                        Informasi
                    </p>

                    <p>
                        • Tiket yang sudah dibeli tidak dapat dikembalikan atau
                        ditukar.
                    </p>
                    <p>
                        • Pastikan data dan event yang dipilih sudah benar
                        sebelum melanjutkan pembayaran.
                    </p>
                    <p>
                        • Untuk event gratis, tiket akan langsung tersedia
                        setelah konfirmasi.
                    </p>
                    <p>
                        • Simpan bukti pembayaran atau tiket untuk ditunjukkan
                        saat masuk event.
                    </p>
                </div>

                {/* BACK */}
                <button
                    onClick={() => navigate(-1)}
                    className="w-full mt-4 text-sm text-gray-500 hover:underline"
                >
                    Kembali
                </button>
            </div>
        </div>
    );
}

export default Checkout;
