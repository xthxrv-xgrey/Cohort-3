import Header from "../components/ui/Header.jsx";
import Footer from "../components/ui/Footer.jsx";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <main className="min-h-screen overflow-hidden">
      <Header />
      <div className="pt-[8vh] px-4 sm:px-8 md:px-12 lg:px-20 xl:px-32 2xl:px-40 bg-background">
        <Outlet />
      </div>
      <Footer />
    </main>
  );
};

export default MainLayout;

{
  /* suppose i want to take full height except that 10vh how do i and also on scroll i want header to be fixed */
}
{
  /* suppose this has a height of 10vh and i always want this to be in the top */
}
