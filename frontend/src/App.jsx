import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";
import Tickets from "./pages/Tickets";
import History from "./pages/History";
import HistoryDetail from "./pages/HistoryDetail";

function App() {
    return (
        <BrowserRouter>
            <Navbar />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/events" element={<Events />} />
                <Route path="/events/:id" element={<EventDetail />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/checkout/:id" element={<Checkout />} />
                <Route path="/success/:id" element={<Success />} />
                <Route path="/my-tickets" element={<Tickets />} />
                <Route path="/history" element={<History />} />
                <Route path="/history/:id" element={<HistoryDetail />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
