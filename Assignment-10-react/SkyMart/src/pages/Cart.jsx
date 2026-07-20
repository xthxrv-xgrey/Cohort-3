import { Link } from "react-router";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import CartCard from "../components/CartCard.jsx";

const Cart = () => {
  const { cart } = useContext(CartContext);

  const cartItems = Object.values(cart);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const shipping = cartItems.length ? 99 : 0;

  const discount = 0;

  const total = subtotal + shipping - discount;

  return (
    <div className="space-y-6">
      {/* Header */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6">
        <h1 className="text-3xl font-semibold text-slate-800">Shopping Cart</h1>

        <p className="mt-2 text-slate-500">
          Review your selected products before checkout.
        </p>
      </section>

      {/* Main */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cart Items */}
        <section className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-5">
          {cartItems.length ? (
            <div className="space-y-5">
              {cartItems.map((item) => (
                <CartCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="text-7xl mb-4">🛒</div>

              <h2 className="text-2xl font-semibold text-slate-800">
                Your cart is empty
              </h2>

              <p className="mt-2 text-slate-500">
                Looks like you haven't added any products yet.
              </p>

              <Link
                to={"/products"}
                className="mt-6 px-6 py-3 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition"
              >
                Continue Shopping
              </Link>
            </div>
          )}
        </section>

        {/* Summary */}
        <aside className="bg-white border border-slate-200 rounded-2xl p-6 h-fit sticky top-6">
          <h2 className="text-xl font-semibold text-slate-800">
            Order Summary
          </h2>

          <div className="mt-6 space-y-4">
            <div className="flex justify-between text-slate-600">
              <span>Items ({totalItems})</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-slate-600">
              <span>Shipping</span>
              <span>{shipping === 0 ? "Free" : `₹${shipping.toFixed(2)}`}</span>
            </div>

            <div className="flex justify-between text-slate-600">
              <span>Discount</span>
              <span className="text-emerald-600">-₹{discount.toFixed(2)}</span>
            </div>

            <hr className="border-slate-200" />

            <div className="flex justify-between text-xl font-bold text-slate-800">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>

          <button className="w-full mt-8 rounded-xl bg-emerald-600 py-3 font-medium text-white hover:bg-emerald-700 transition">
            Proceed to Checkout
          </button>

          <button className="w-full mt-3 rounded-xl border border-slate-300 py-3 font-medium text-slate-700 hover:bg-slate-100 transition">
            Continue Shopping
          </button>

          <div className="mt-6 border-t border-slate-200 pt-5 space-y-2 text-sm text-slate-500">
            <p>✓ Secure Checkout</p>
            <p>✓ 7-Day Return Policy</p>
            <p>✓ Fast & Reliable Delivery</p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Cart;
