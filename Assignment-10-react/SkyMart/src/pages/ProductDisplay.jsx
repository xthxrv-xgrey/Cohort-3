import { Link, useParams } from "react-router";
import { useEffect, useState, useContext } from "react";
import { api } from "../services/api.js";
import { CartContext } from "../context/CartContext.jsx";

const ProductDisplay = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const { addToCart, cart } = useContext(CartContext);

  const getProduct = async () => {
    try {
      setLoading(true);

      const response = await api.get(`https://fakestoreapi.com/products/${id}`);

      setProduct(response.data);
    } catch (error) {
      console.error("Failed to fetch product:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-2xl font-semibold">
        Loading...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex justify-center items-center text-2xl font-semibold">
        Product not found.
      </div>
    );
  }

  const inCart = !!cart?.[product.id];

  return (
    <section className="min-h-screen bg-gray-100 py-10 px-6">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto mb-6">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 shadow hover:bg-gray-100 transition"
        >
          ← Back to Products
        </Link>
      </div>

      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg p-8 grid md:grid-cols-2 gap-10">
        <div className="flex justify-center items-center">
          <img
            src={product.image}
            alt={product.title}
            className="h-[450px] object-contain"
          />
        </div>

        <div className="flex flex-col justify-center">
          <span className="text-blue-600 font-semibold mb-2 capitalize">
            {product.category}
          </span>

          <h1 className="text-4xl font-bold">{product.title}</h1>

          <div className="flex items-center gap-3 mt-4">
            <span className="text-yellow-500 text-xl">
              ⭐ {product.rating?.rate}
            </span>

            <span className="text-gray-500">
              ({product.rating?.count} Reviews)
            </span>
          </div>

          <h2 className="text-4xl font-bold text-green-600 mt-6">
            ${product.price}
          </h2>

          <p className="text-gray-600 leading-8 mt-6">{product.description}</p>

          <div className="flex gap-5 mt-8">
            {inCart ? (
              <Link
                to="/cart"
                className="w-full rounded-lg bg-gray-500 py-3 text-center flex justify-center items-center font-medium text-white hover:bg-slate-900 transition"
              >
                Added
              </Link>
            ) : (
              <button
                onClick={() => addToCart(product)}
                className="w-full rounded-lg bg-emerald-600 py-3 font-medium text-white hover:bg-emerald-700 transition"
              >
                Add to Cart
              </button>
            )}

            <button className="border-2 border-black px-8 py-3 rounded-xl hover:bg-black hover:text-white transition">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDisplay;
