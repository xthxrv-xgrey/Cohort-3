const Home = () => {
  return (
    <div className="min-h-screen bg-slate-100 p-4 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white border border-slate-200 rounded-xl shadow-sm p-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold text-slate-800">
            Welcome Back 👋
          </h1>

          <p className="text-slate-500">
            You are successfully logged in. This is your home dashboard.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="rounded-lg border border-slate-200 p-5">
            <h2 className="text-sm text-slate-500">Account Status</h2>
            <p className="mt-2 text-lg font-medium text-emerald-600">Active</p>
          </div>

          <div className="rounded-lg border border-slate-200 p-5">
            <h2 className="text-sm text-slate-500">Authentication</h2>
            <p className="mt-2 text-lg font-medium text-slate-800">Verified</p>
          </div>

          <div className="rounded-lg border border-slate-200 p-5">
            <h2 className="text-sm text-slate-500">Dashboard</h2>
            <p className="mt-2 text-lg font-medium text-slate-800">Ready</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
