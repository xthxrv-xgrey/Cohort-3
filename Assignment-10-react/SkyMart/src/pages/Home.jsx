import { Link } from "react-router";

const Home = () => {
  const categories = [
    "Electronics",
    "Fashion",
    "Home & Kitchen",
    "Mobiles",
    "Accessories",
  ];

  const products = [
    {
      name: "Smart Watch",
      price: "₹2,999",
      image: "⌚",
    },
    {
      name: "Wireless Headphones",
      price: "₹1,499",
      image: "🎧",
    },
    {
      name: "Gaming Laptop",
      price: "₹59,999",
      image: "💻",
    },
  ];

  return (
    <div className="h-full overflow-y-auto space-y-6">
      {/* Hero Section */}
      <section className="bg-white rounded-2xl border border-slate-200 p-8 flex flex-col md:flex-row justify-between items-center">
        <div className="space-y-4 max-w-xl">
          <h1 className="text-4xl font-bold text-slate-800">
            Welcome to Sky<span className="text-emerald-600">Mart</span>
          </h1>

          <p className="text-slate-500 text-lg">
            Discover amazing products at the best prices. Shop electronics,
            fashion, accessories and more from one place.
          </p>

          <Link
            to="/products"
            className="inline-block bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition"
          >
            Explore Products
          </Link>
        </div>

        <div className="mt-6 md:mt-0 bg-emerald-100 rounded-full w-48 h-48 flex items-center justify-center">
          <span className="text-7xl">🛒</span>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-semibold text-slate-800">
            Shop By Category
          </h2>

          <Link
            to="/products"
            className="text-emerald-600 text-sm hover:underline"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {categories.map((category) => (
            <Link
              key={category}
              to="/products"
              className="border border-slate-200 rounded-xl p-4 text-center hover:border-emerald-500 hover:bg-emerald-50 transition"
            >
              <p className="font-medium text-slate-700">{category}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-semibold text-slate-800">
            Featured Products
          </h2>

          <Link
            to="/products"
            className="text-emerald-600 text-sm hover:underline"
          >
            See More
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {products.map((product) => (
            <div
              key={product.name}
              className="border border-slate-200 rounded-xl p-5 hover:shadow-sm transition"
            >
              <div className="h-32 bg-slate-100 rounded-lg flex items-center justify-center text-5xl">
                {product.image}
              </div>

              <h3 className="mt-4 font-medium text-slate-800">
                {product.name}
              </h3>

              <p className="mt-2 text-emerald-600 font-semibold">
                {product.price}
              </p>

              <Link
                to="/products"
                className="block mt-4 text-center border border-slate-300 rounded-lg py-2 text-sm hover:bg-slate-100"
              >
                View Product
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
