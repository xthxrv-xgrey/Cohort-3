import { Link } from "react-router";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { cart, addToCart } = useContext(CartContext);

  const inCart = !!cart[product.id];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-md transition">
      {/* Product Image */}
      <Link to="#">
        <div className="h-56 bg-slate-100 rounded-xl flex items-center justify-center overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-contain p-4 hover:scale-105 transition"
          />
        </div>
      </Link>

      {/* Product Details */}
      <div className="mt-4 space-y-3">
        <p className="text-sm font-medium text-emerald-600 capitalize">
          {product.category}
        </p>

        <h3 className="text-lg font-semibold text-slate-800 line-clamp-2">
          {product.title}
        </h3>

        <div className="flex items-center gap-2 text-sm">
          <span className="rounded-md bg-emerald-600 px-2 py-1 text-white">
            ⭐ {product.rating.rate}
          </span>

          <span className="text-slate-500">
            ({product.rating.count} reviews)
          </span>
        </div>

        <p className="text-2xl font-bold text-slate-800">
          ${product.price.toFixed(2)}
        </p>

        <p className="line-clamp-2 text-sm text-slate-500">
          {product.description}
        </p>
      </div>

      {/* Cart Action */}
      {inCart ? (
        <Link
          to="/cart"
          className="mt-5 block w-full rounded-lg bg-slate-800 py-3 text-center font-medium text-white transition hover:bg-slate-900"
        >
          Go to Cart
        </Link>
      ) : (
        <button
          onClick={() => addToCart(product)}
          className="mt-5 w-full rounded-lg bg-emerald-600 py-3 font-medium text-white transition hover:bg-emerald-700"
        >
          Add to Cart
        </button>
      )}
    </div>
  );
};

export default ProductCard;
