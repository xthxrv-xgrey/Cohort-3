import React, { useContext } from "react";
import { MoveRight } from "lucide-react";
import { Link } from "react-router";
import { useCart } from "../hooks/useCart.js";
import CartProductCard from "../components/card/CartProductCard.jsx";
import { CartContext } from "../context/CartContext.jsx";
import { AuthContext } from "../context/AuthContext.jsx";
import { toast } from "sonner";

const Cart = () => {
  const { cart } = useContext(CartContext);
  const { currentUser } = useContext(AuthContext);
  const { itemsInCart, totalCartValue, clearCart } = useCart();

  const userCart = Object.values(cart[currentUser] || []);

  return (
    <div className="min-h-[92vh] py-4 overflow-y-scroll hide-scrollbar flex flex-col gap-4">
      <div className="py-16 flex flex-col gap-4">
        <p className="font-sans text-xs text-muted-foreground font-semibold tracking-widest">
          YOUR BAG
        </p>
        <h1 className="font-serif text-6xl italic">
          {itemsInCart} {itemsInCart === 1 ? "piece" : "pieces"}.
        </h1>
      </div>

      {userCart.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-1 py-20 gap-6 bg-secondary rounded-2xl">
          <h2 className="font-serif text-5xl italic">Your cart is empty</h2>

          <p className="text-muted-foreground text-center max-w-md">
            Looks like you haven't added any products to your bag yet. Start
            exploring our collection and find something you'll love.
          </p>

          <Link
            to="/shop"
            className="px-8 py-4 bg-primary text-secondary rounded-full flex items-center gap-3 hover:bg-muted-foreground transition active:scale-95"
          >
            Browse Products
            <MoveRight size={20} />
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Left - Product Cards */}
          <div className="w-full lg:w-2/3 flex flex-col gap-4">
            {userCart.map((product) => (
              <CartProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Right - Summary */}
          <div className="bg-secondary p-8 h-max w-full lg:w-1/3 flex flex-col gap-4 rounded-2xl">
            <h1 className="font-serif text-4xl">Summary</h1>

            <div className="flex justify-between items-center">
              <h2 className="text-muted-foreground font-sans text-sm">
                Subtotal
              </h2>
              <span>${totalCartValue}</span>
            </div>

            <div className="flex justify-between items-center">
              <h2 className="text-muted-foreground font-sans text-sm">
                Shipping
              </h2>
              <span>Free</span>
            </div>

            <hr />

            <div className="flex justify-between items-center">
              <h1>Total</h1>
              <span className="font-serif text-4xl">${totalCartValue}</span>
            </div>

            <button
              className="w-full p-4 flex items-center justify-center gap-4 bg-primary rounded-full text-secondary mt-4 hover:bg-muted-foreground active:scale-95 transition"
              onClick={() => {
                toast.success("Order successful!");
                clearCart();
              }}
            >
              Checkout
              <MoveRight />
            </button>

            <p className="font-sans text-xs text-muted-foreground self-center text-center">
              Shipping and taxes calculated at checkout.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
