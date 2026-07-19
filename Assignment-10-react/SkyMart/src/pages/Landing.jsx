import { Link } from "react-router";

const Landing = () => {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white border border-slate-200 rounded-xl shadow-sm p-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-800">
          Welcome
        </h1>

        <p className="mt-4 text-slate-600">
          A simple authentication starter built with React, React Router and
          React Hook Form.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/login"
            className="rounded-lg bg-emerald-600 px-6 py-3 font-medium text-white transition hover:bg-emerald-700"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="rounded-lg border border-slate-300 px-6 py-3 font-medium text-slate-700 transition hover:bg-slate-100"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
