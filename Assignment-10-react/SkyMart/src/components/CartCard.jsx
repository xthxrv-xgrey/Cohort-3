import { useContext } from "react";
import { Trash2 } from "lucide-react";
import { CartContext } from "../context/CartContext";

const CartCard = ({ item }) => {
  const { removeFromCart, increaseQuantity, decreaseQuantity } =
    useContext(CartContext);

  return (
    <article className="flex flex-col sm:flex-row gap-5 p-5 border border-slate-200 rounded-2xl hover:border-emerald-300 transition">
      {/* Image */}
      <div className="w-full sm:w-36 h-36 bg-white rounded-xl border border-slate-200 flex items-center justify-center overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="h-full w-full object-contain p-3"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 flex flex-col">
        <span className="self-start px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-medium capitalize">
          {item.category}
        </span>

        <h2 className="mt-3 text-lg font-semibold text-slate-800 line-clamp-2">
          {item.title}
        </h2>

        <p className="mt-2 text-sm text-slate-500 line-clamp-2">
          {item.description}
        </p>

        <div className="mt-auto pt-4">
          <p className="text-2xl font-bold text-emerald-600">
            ₹{item.price.toFixed(2)}
          </p>

          <p className="text-sm text-slate-500 mt-1">
            Total: ₹{(item.price * item.quantity).toFixed(2)}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex sm:flex-col justify-between items-center sm:items-end gap-4">
        {/* Remove */}
        <button
          onClick={() => removeFromCart(item.id)}
          className="text-red-500 hover:text-red-600 transition"
        >
          <Trash2 size={20} />
        </button>

        {/* Quantity Controls */}
        <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden">
          <button
            onClick={() => decreaseQuantity(item.id)}
            className="w-10 h-10 hover:bg-slate-100 transition text-lg"
          >
            −
          </button>

          <span className="w-10 text-center font-medium">{item.quantity}</span>

          <button
            onClick={() => increaseQuantity(item.id)}
            className="w-10 h-10 hover:bg-slate-100 transition text-lg"
          >
            +
          </button>
        </div>
      </div>
    </article>
  );
};

export default CartCard;
