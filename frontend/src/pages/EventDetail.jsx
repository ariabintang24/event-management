import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";
import { Bookmark } from "lucide-react";
import dayjs from "dayjs";

function EventDetail() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(false);

    // ✅ dummy tags dulu
    // const tags = ["festival", "anime", "jakarta"];

    // ✅ helper format tanggal (INDONESIA tanpa locale dayjs)
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
        return `${hari[d.getDay()]}, ${d.getDate()} ${bulan[d.getMonth()]} ${d.getFullYear()}`;
    };

    useEffect(() => {
        api.get(`/events/${id}`)
            .then((res) => setEvent(res.data))
            .catch((err) => console.error(err));
    }, [id]);

    // const handleBuy = async () => {
    //     try {
    //         setLoading(true);

    //         await api.post("/checkout", {
    //             event_id: id,
    //         });

    //         toast.success("Ticket purchased successfully 🎉");
    //     } catch (err) {
    //         console.error(err);
    //         toast.error("Failed to buy ticket");
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    if (!event) return <p className="p-6">Loading...</p>;

    // ✅ logic date (dipindah ke sini, aman)
    const startDate = dayjs(event.date);
    const endDate = event.end_date ? dayjs(event.end_date) : null;
    const isSameDay = endDate && startDate.isSame(endDate, "day");

    return (
        <div className="min-h-screen bg-gray-50 py-10">
            <div className="max-w-4xl mx-auto px-6">
                {/* IMAGE */}
                <div className="h-64 rounded-2xl overflow-hidden mb-6 shadow-sm">
                    <img
                        src={`http://localhost:8000/storage/${event.image}`}
                        alt={event.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* HEADER */}
                <div className="mb-4">
                    {/* TITLE + BOOKMARK */}
                    <div className="flex items-start justify-between mb-2">
                        <h1 className="text-3xl font-bold text-gray-900">
                            {event.title}
                        </h1>

                        <button className="p-2 rounded-full hover:bg-gray-100 transition">
                            <Bookmark className="w-5 h-5 text-gray-500" />
                        </button>
                    </div>
                </div>

                {/* TAGS */}
                {/* <div className="flex flex-wrap gap-2 mb-6">
                    {tags.map((tag, index) => (
                        <span
                            key={index}
                            className="bg-indigo-100 text-indigo-600 text-xs px-3 py-1 rounded-full font-medium"
                        >
                            #{tag}
                        </span>
                    ))}
                </div> */}

                {/* INFO CONTAINER */}
                <div className="bg-white rounded-2xl shadow-sm p-5 mb-6 space-y-4">
                    {/* LOCATION */}
                    <div className="flex justify-between items-center py-3">
                        <span className="text-gray-500 text-sm">Location</span>
                        <span className="font-medium text-gray-800">
                            {event.location}
                        </span>
                    </div>

                    {/* DATE */}
                    <div className="flex justify-between items-center py-3">
                        <span className="text-gray-500 text-sm">Date</span>
                        <span className="font-medium text-gray-800 text-right">
                            {formatTanggal(event.date)}
                        </span>
                    </div>

                    {/* TIME */}
                    <div className="flex justify-between items-center py-3">
                        <span className="text-gray-500 text-sm">Time</span>
                        <span className="font-medium text-gray-800">
                            {startDate.format("HH:mm")}

                            {endDate &&
                                (isSameDay
                                    ? ` - ${endDate.format("HH:mm")}`
                                    : ` → ${endDate.format("HH:mm")}`)}
                        </span>
                    </div>

                    {/* END DATE (hanya kalau beda hari) */}
                    {endDate && !isSameDay && (
                        <div className="flex justify-between items-center py-3">
                            <span className="text-gray-500 text-sm">
                                Ends At
                            </span>
                            <span className="font-medium text-gray-800 text-right">
                                {formatTanggal(event.end_date)}
                            </span>
                        </div>
                    )}

                    {/* PRICE */}
                    <div className="flex justify-between items-center">
                        <span className="text-gray-500 text-sm">Price</span>
                        <span
                            className={`font-semibold ${
                                event.price === 0
                                    ? "text-green-600"
                                    : "text-indigo-600"
                            }`}
                        >
                            {event.price === 0 ? "Free" : `Rp ${event.price}`}
                        </span>
                    </div>

                    {/* POSTED BY */}
                    <div className="flex justify-between items-center">
                        <span className="text-gray-500 text-sm">Posted By</span>
                        <span className="flex items-center gap-2 font-medium text-gray-800">
                            <span className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs">
                                A
                            </span>
                            Admin
                        </span>
                    </div>
                </div>

                {/* DESCRIPTION */}
                <div className="mb-8">
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">
                        Description
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                        {event.description}
                    </p>
                </div>

                {/* PRICE + CTA */}
                <div className="flex items-center justify-between bg-white p-5 rounded-2xl shadow-sm">
                    {/* <p
                        className={`text-xl font-semibold ${
                            event.price === 0
                                ? "text-green-600"
                                : "text-indigo-600"
                        }`}
                    >
                        {event.price === 0 ? "FREE" : `Rp ${event.price}`}
                    </p> */}

                    <button
                        onClick={() => navigate(`/checkout/${event.id}`)}
                        disabled={loading}
                        className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
                    >
                        {loading ? "Processing..." : "Get Ticket"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EventDetail;
