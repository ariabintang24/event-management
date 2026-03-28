import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <nav className="bg-white shadow-sm">
            <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
                {/* Logo */}
                <div className="text-xl font-bold text-indigo-600">
                    Eventify
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex gap-6 font-medium">
                    <Link to="/" className="hover:text-indigo-600">
                        Home
                    </Link>
                    <Link to="/events" className="hover:text-indigo-600">
                        Events
                    </Link>
                    <Link to="/profile" className="hover:text-indigo-600">
                        Profile
                    </Link>
                </div>

                {/* Mobile Button */}
                <button className="md:hidden" onClick={() => setOpen(!open)}>
                    ☰
                </button>
            </div>

            {/* Mobile Menu */}
            {open && (
                <div className="md:hidden px-6 pb-4 flex flex-col gap-3">
                    <Link to="/" onClick={() => setOpen(false)}>
                        Home
                    </Link>
                    <Link to="/events" onClick={() => setOpen(false)}>
                        Events
                    </Link>
                    <Link to="/profile" onClick={() => setOpen(false)}>
                        Profile
                    </Link>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
