import { Link } from "react-router";
import { Menu } from "lucide-react";

const Header = () => {
  return (
    <header className="w-full bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between rounded-2xl">
      <Link to="/home">
        <h1 className="text-xl font-bold text-slate-800">
          Sky<span className="text-emerald-600">Mart</span>
        </h1>
      </Link>

      <button
        className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition"
        aria-label="Open menu"
      >
        <Menu size={24} />
      </button>
    </header>
  );
};

export default Header;
