import { Link } from "react-router";

const Home = () => {
  const highlights = [
    {
      title: "Fast Delivery",
      description: "Get your favorite products delivered quickly.",
      icon: "🚚",
    },
    {
      title: "Best Deals",
      description: "Enjoy amazing offers and affordable prices.",
      icon: "🔥",
    },
    {
      title: "Secure Shopping",
      description: "Safe payments and trusted shopping experience.",
      icon: "🔒",
    },
  ];

  return (
    <div className="space-y-5">
      {/* Main Hero Banner */}
      <section className="bg-white rounded-2xl border border-slate-200 p-7 md:p-10 flex flex-col md:flex-row items-center justify-between gap-7">
        <div className="max-w-xl space-y-5">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800">
            Welcome to <span className="text-emerald-600">SkyMart</span>
          </h1>

          <p className="text-lg text-slate-500">
            Everything you need, delivered with trust. Explore thousands of
            products and enjoy a smooth shopping experience.
          </p>

          <Link
            to="/products"
            className="inline-block bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-emerald-700 transition"
          >
            Browse Products
          </Link>
        </div>

        <div className="w-full md:w-96 h-56 bg-emerald-100 rounded-2xl flex items-center justify-center overflow-hidden">
          <img
            alt=""
            src="https://images.pexels.com/photos/7319118/pexels-photo-7319118.jpeg?_gl=1*1jopxru*_ga*MTgwMTE3NjY2My4xNzgzMzEwNTcy*_ga_8JE65Q40S6*czE3ODQ1NTExNzQkbzIkZzEkdDE3ODQ1NTEyMzAkajQkbDAkaDA."
          />
        </div>
      </section>

      {/* SkyMart Experience */}
      <section className="bg-emerald-600 rounded-2xl p-7 text-white flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-semibold">
            Shop with confidence at SkyMart
          </h2>

          <p className="mt-2 text-emerald-100">
            Quality products, secure payments and reliable delivery.
          </p>
        </div>

        <Link
          to="/products"
          className="bg-white text-emerald-700 px-6 py-3 rounded-lg font-medium hover:bg-emerald-50 transition"
        >
          Start Shopping
        </Link>
      </section>

      {/* Highlights */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {highlights.map((item) => (
          <div
            key={item.title}
            className="bg-white border border-slate-200 rounded-xl p-5"
          >
            <div className="text-3xl">{item.icon}</div>

            <h3 className="mt-3 font-semibold text-slate-800">{item.title}</h3>

            <p className="mt-2 text-sm text-slate-500">{item.description}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Home;
