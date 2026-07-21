import { useContext, useState } from "react";
import { Link, NavLink } from "react-router";
import { ShoppingBag, LogOut, Menu, X } from "lucide-react";
import { toast } from "sonner";

import { AuthContext } from "../../context/AuthContext.jsx";
import { useCart } from "../../hooks/useCart.js";

const Header = () => {
  const { setCurrentUser } = useContext(AuthContext);
  const { itemsInCart } = useCart();

  const [openMenu, setOpenMenu] = useState(false);

  const navLinkClass = ({ isActive }) =>
    `relative pb-1 transition-colors duration-300
    after:absolute after:left-0 after:bottom-0
    after:h-[2px] after:w-full
    after:bg-primary
    after:origin-left
    after:transition-transform after:duration-300
    ${
      isActive
        ? "text-primary after:scale-x-100 font-semibold"
        : "text-muted-foreground after:scale-x-0 hover:text-primary hover:after:scale-x-100"
    }`;

  const closeMenu = () => setOpenMenu(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b-2 border-border">
      <div className="h-[8vh] py-4 flex justify-between items-center px-4 sm:px-8 md:px-12 lg:px-20 xl:px-32 2xl:px-40">
        <Link to="/home">
          <h1 className="font-serif text-2xl">Sky Mart</h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8 text-sm font-sans">
          <NavLink to="/home" className={navLinkClass}>
            Home
          </NavLink>

          <NavLink to="/shop" className={navLinkClass}>
            Shop
          </NavLink>

          <NavLink to="/cart" className={navLinkClass}>
            Cart
          </NavLink>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex gap-8">
          <Link
            className="relative inline-flex items-center justify-center"
            to="/cart"
          >
            <ShoppingBag size={22} />

            <span className="absolute top-1 -right-2 min-w-4 h-4 px-1 flex items-center justify-center rounded-full bg-primary text-primary-foreground text-[10px] font-medium">
              {itemsInCart}
            </span>
          </Link>

          <button
            className="flex items-center gap-4 border-2 border-border py-2 px-4 rounded-4xl text-muted-foreground hover:text-black hover:border-primary active:scale-95 transition"
            onClick={() => {
              setCurrentUser(null);
              toast.success("Logout Successful");
            }}
          >
            <LogOut size={12} />

            <p className="text-xs">Logout</p>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setOpenMenu(!openMenu)}>
          {openMenu ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`md:hidden overflow-hidden border-t border-border transition-all duration-300 ${
          openMenu ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-6 px-6 py-6 text-sm">
          <NavLink to="/home" className={navLinkClass} onClick={closeMenu}>
            Home
          </NavLink>

          <NavLink to="/shop" className={navLinkClass} onClick={closeMenu}>
            Shop
          </NavLink>

          <NavLink to="/cart" className={navLinkClass} onClick={closeMenu}>
            Cart
          </NavLink>

          <Link
            to="/cart"
            className="flex items-center gap-3 text-muted-foreground"
            onClick={closeMenu}
          >
            <ShoppingBag size={20} />
            Cart Items ({itemsInCart})
          </Link>

          <button
            className="flex items-center gap-3 text-muted-foreground hover:text-black"
            onClick={() => {
              setCurrentUser(null);
              toast.success("Logout Successful");
              closeMenu();
            }}
          >
            <LogOut size={16} />
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
