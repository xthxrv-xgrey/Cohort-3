import { Outlet } from "react-router";
import Header from "../components/Header";

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-slate-100 p-4 flex flex-col overflow-y-auto">
      <Header />

      <main className="w-full mt-4 flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
