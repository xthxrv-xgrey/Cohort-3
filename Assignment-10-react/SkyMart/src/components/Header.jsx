import { Link, NavLink } from "react-router";
import { ShoppingCart, LogOut } from "lucide-react";
import { AuthContext } from "../context/AuthContext.jsx";
import { CartContext } from "../context/CartContext.jsx";
import { useContext } from "react";

const Header = () => {
  const { cart } = useContext(CartContext);
  const { setCurrentUser } = useContext(AuthContext);

  const items = Object.keys(cart || {}).length;

  const navLinkClass = ({ isActive }) =>
    `px-4 py-2 rounded-lg font-medium transition ${
      isActive
        ? "bg-emerald-600 text-white"
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
    }`;

  return (
    <header className="w-full bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between rounded-2xl">
      <Link to="/home">
        <h1 className="text-xl font-bold text-slate-800">
          Sky<span className="text-emerald-600">Mart</span>
        </h1>
      </Link>

      <div className="flex items-center gap-4">
        <NavLink to="/home" className={navLinkClass}>
          Home
        </NavLink>

        <NavLink to="/products" className={navLinkClass}>
          Products
        </NavLink>

        <NavLink to="/cart" className={navLinkClass}>
          Cart
        </NavLink>
      </div>

      <div className="flex flex-row gap-4">
        <Link
          to="/cart"
          className="relative p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition"
          aria-label="Cart"
        >
          <ShoppingCart size={24} />

          {items > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[11px] font-bold text-white">
              {items}
            </span>
          )}
        </Link>

        <button
          className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition"
          onClick={() => {
            setCurrentUser(null);
          }}
        >
          <LogOut size={24} />
        </button>
      </div>
    </header>
  );
};

export default Header;
