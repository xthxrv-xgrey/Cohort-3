import { Link } from "react-router";

const Landing = () => {
  const features = [
    {
      title: "Fast Delivery",
      description:
        "Get your orders delivered quickly and safely right at your doorstep.",
      icon: "🚚",
    },
    {
      title: "Quality Products",
      description: "Shop from a wide range of carefully selected products.",
      icon: "✨",
    },
    {
      title: "Secure Payments",
      description:
        "Your transactions and personal information are always protected.",
      icon: "🔒",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 p-4 flex items-center justify-center">
      <div className="w-full max-w-5xl space-y-6">
        {/* Hero */}
        <section className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl space-y-5">
            <h1 className="text-4xl md:text-6xl font-bold text-slate-800">
              Shop Smarter with{" "}
              <span className="text-emerald-600">SkyMart</span>
            </h1>

            <p className="text-lg text-slate-500">
              Your trusted online shopping destination for amazing products,
              great deals, and a smooth shopping experience.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/register"
                className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium text-center hover:bg-emerald-700 transition"
              >
                Create Account
              </Link>

              <Link
                to="/login"
                className="border border-slate-300 text-slate-700 px-6 py-3 rounded-lg font-medium text-center hover:bg-slate-100 transition"
              >
                Login
              </Link>
            </div>
          </div>

          <div className="w-52 h-52 bg-emerald-100 rounded-full flex items-center justify-center">
            <span className="text-8xl">🛍️</span>
          </div>
        </section>

        {/* Why SkyMart */}
        <section className="bg-white border border-slate-200 rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-slate-800 mb-5">
            Why Choose SkyMart?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="border border-slate-200 rounded-xl p-5"
              >
                <div className="text-3xl">{feature.icon}</div>

                <h3 className="mt-3 font-semibold text-slate-800">
                  {feature.title}
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Trust Banner */}
        <section className="bg-emerald-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-semibold">Ready to start shopping?</h2>

          <p className="mt-2 text-emerald-100">
            Join SkyMart today and enjoy a simple, secure shopping experience.
          </p>

          <Link
            to="/register"
            className="inline-block mt-5 bg-white text-emerald-700 px-6 py-3 rounded-lg font-medium hover:bg-emerald-50 transition"
          >
            Register Now
          </Link>
        </section>
      </div>
    </div>
  );
};

export default Landing;
