import { useContext } from "react";
import { Link } from "react-router";
import { MoveRight } from "lucide-react";
import { AuthContext } from "../context/AuthContext.jsx";

const categories = [
  { id: "01", title: "Men's Clothing" },
  { id: "02", title: "Jewelery" },
  { id: "03", title: "Electronics" },
  { id: "04", title: "Women's Clothing" },
];

const Home = () => {
  const { currentUser, users } = useContext(AuthContext);

  return (
    <div className="min-h-[92vh] py-4 overflow-y-scroll hide-scrollbar flex flex-col gap-4">
      <div className="pt-20 flex flex-col gap-4">
        <p className="font-sans text-xs text-muted-foreground font-semibold tracking-widest">
          GOOD TO SEE YOU
        </p>

        <h1 className="font-serif text-8xl">
          Hello, <span className="italic">{users[currentUser].firstName}</span>.
        </h1>

        <div className="flex flex-col justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground max-w-100">
            A fresh selection has landed. Browse by category, or dive into what
            we're leading with this week.
          </p>

          <Link
            to="/shop"
            className="flex gap-2 text-sm hover:text-muted-foreground active:scale-95"
          >
            Shop everything
            <MoveRight />
          </Link>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center pt-8 pb-4 border-b-2 border-border">
          <h1>Departments</h1>

          <p className="font-sans text-xs text-muted-foreground font-semibold tracking-widest">
            {categories.length} CATEGORIES
          </p>
        </div>

        <div className="grid gap-4 py-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              to="/shop"
              className="h-50 w-full bg-surface rounded-2xl p-4 flex flex-col justify-between hover:bg-secondary transition-all duration-200 hover:scale-[1.02] active:scale-95 cursor-pointer"
            >
              <p className="font-serif text-xl">{category.id}</p>

              <div className="flex flex-col gap-4">
                <h2 className="font-serif text-2xl">{category.title}</h2>

                <span className="flex gap-2 text-sm items-center text-muted-foreground">
                  Browse
                  <MoveRight size={12} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
