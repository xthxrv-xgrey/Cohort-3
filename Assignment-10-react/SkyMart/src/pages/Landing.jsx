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
      <div className="w-full max-w-5xl space-y-4">
        {/* Hero */}
        <section className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800">
              Shop Smarter with{" "}
              <span className="text-emerald-600">SkyMart</span>
            </h1>

            <p className="text-base text-slate-500">
              Your trusted online shopping destination for amazing products,
              great deals, and a smooth shopping experience.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/register"
                className="bg-emerald-600 text-white px-5 py-2.5 rounded-lg font-medium text-center hover:bg-emerald-700 transition"
              >
                Create Account
              </Link>

              <Link
                to="/login"
                className="border border-slate-300 text-slate-700 px-5 py-2.5 rounded-lg font-medium text-center hover:bg-slate-100 transition"
              >
                Login
              </Link>
            </div>
          </div>

          <div className="w-50 h-50 bg-emerald-100 rounded-full flex items-center justify-center overflow-hidden">
            <img
              src="https://images.pexels.com/photos/23223851/pexels-photo-23223851.jpeg?_gl=1*1oj88u4*_ga*MTgwMTE3NjY2My4xNzgzMzEwNTcy*_ga_8JE65Q40S6*czE3ODQ1NTExNzQkbzIkZzEkdDE3ODQ1NTE0MjEkajQzJGwwJGgw"
              alt=""
            />
          </div>
        </section>

        {/* Why SkyMart */}
        <section className="bg-white border border-slate-200 rounded-2xl p-5">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">
            Why Choose SkyMart?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="border border-slate-200 rounded-xl p-4"
              >
                <div className="text-2xl">{feature.icon}</div>

                <h3 className="mt-2 font-semibold text-slate-800">
                  {feature.title}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Trust Banner */}
        <section className="bg-emerald-600 rounded-2xl p-6 text-center text-white">
          <h2 className="text-xl font-semibold">Ready to start shopping?</h2>

          <p className="mt-1 text-sm text-emerald-100">
            Join SkyMart today and enjoy a simple, secure shopping experience.
          </p>

          <Link
            to="/register"
            className="inline-block mt-4 bg-white text-emerald-700 px-5 py-2.5 rounded-lg font-medium hover:bg-emerald-50 transition"
          >
            Register Now
          </Link>
        </section>
      </div>
    </div>
  );
};

export default Landing;
