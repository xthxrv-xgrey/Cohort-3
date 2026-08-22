import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { Menu } from "lucide-react";

type Props = {};

const ComponentLayout = ({}: Props) => {
  const location = useLocation();
  console.log(location);
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const components = [
    "Button",
    "Card",
    "Modal",
    "Input",
    "Navbar",
    "Carousel",
    "Tooltip",
    "Layout",
  ];

  return (
    <div className="flex min-h-screen text-gray-900 dark:text-gray-100 bg-white dark:bg-slate-950 transition-colors duration-250">
      <aside
        className={`
          w-64 p-6 flex flex-col
          border-r border-gray-200 dark:border-slate-800
          bg-white dark:bg-slate-950
          fixed md:static top-0 left-0 h-full z-20
          transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          transition-transform duration-300 ease-in-out
          md:translate-x-0
        `}
      >
        <h2 className="text-md font-bold mb-6">Components</h2>
        <ul className="flex flex-col gap-2">
          {components.map((item) => (
            <li
              onClick={() => navigate(`/components/${item.toLowerCase()}`)}
              key={item}
              className={`cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400 text-md hover:translate-x-1 transition-all duration-200 ease-in-out ${
                location.pathname === `/components/${item.toLowerCase()}`
                  ? "text-indigo-600 dark:text-indigo-400 font-semibold"
                  : "text-gray-400 dark:text-gray-500"
              }`}
            >
              {item}
            </li>
          ))}
        </ul>
      </aside>

      <div className="flex-1 ml-10 p-6">
        <button
          className="md:hidden mb-4 text-gray-700 dark:text-gray-300"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu size={24} />
        </button>

        <Outlet />
      </div>
    </div>
  );
};

export default ComponentLayout;
