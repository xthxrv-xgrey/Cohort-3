import {
  Search,
  SlidersHorizontal,
  ArrowUpDown,
  RotateCcw,
} from "lucide-react";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ProductContext } from "../../context/ProductContext";

const Filterbar = ({ setFilteredProducts }) => {
  const { allProducts } = useContext(ProductContext);

  const { register, watch, reset } = useForm({
    defaultValues: {
      search: "",
      category: "all",
      sort: "none",
    },
  });

  const search = watch("search");
  const category = watch("category");
  const sort = watch("sort");

  useEffect(() => {
    let filtered = [...allProducts];

    // Search
    if (search) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase()),
      );
    }

    // Category
    if (category !== "all") {
      filtered = filtered.filter((product) => product.category === category);
    }

    // Sort
    switch (sort) {
      case "lowToHigh":
        filtered.sort((a, b) => a.price - b.price);
        break;

      case "highToLow":
        filtered.sort((a, b) => b.price - a.price);
        break;

      case "rating":
        filtered.sort((a, b) => b.rating.rate - a.rating.rate);
        break;

      default:
        break;
    }

    setFilteredProducts(filtered);
  }, [search, category, sort, allProducts, setFilteredProducts]);

  const clearFilters = () => {
    reset({
      search: "",
      category: "all",
      sort: "none",
    });

    setFilteredProducts(allProducts);
  };

  return (
    <div className="border-y-2 border-border bg-background">
      <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-32 2xl:px-40 py-10">
        <form className="flex flex-col gap-4 rounded-4xl border-2 border-border bg-card p-5 lg:flex-row items-stretch">
          {/* Search */}

          <div className="flex flex-1 items-center gap-3 rounded-full border-2 border-border bg-background px-5">
            <Search size={18} className="shrink-0 text-muted-foreground" />

            <input
              type="text"
              placeholder="Search products..."
              className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground"
              {...register("search")}
            />
          </div>

          {/* Category */}

          <div className="relative flex items-center gap-3 rounded-full border-2 border-border bg-background px-5">
            <SlidersHorizontal
              size={18}
              className="shrink-0 text-muted-foreground"
            />

            <select
              className="w-full appearance-none cursor-pointer bg-transparent py-3 pr-8 text-sm outline-none"
              {...register("category")}
            >
              <option value="all">All Products</option>

              <option value="men's clothing">Men's Clothing</option>

              <option value="jewelery">Jewelry</option>

              <option value="electronics">Electronics</option>

              <option value="women's clothing">Women's Clothing</option>
            </select>

            <span className="pointer-events-none absolute right-5 text-xs text-muted-foreground">
              ▾
            </span>
          </div>

          {/* Sort */}

          <div className="relative flex items-center gap-3 rounded-full border-2 border-border bg-background px-5">
            <ArrowUpDown size={18} className="shrink-0 text-muted-foreground" />

            <select
              className="w-full appearance-none cursor-pointer bg-transparent py-3 pr-8 text-sm outline-none"
              {...register("sort")}
            >
              <option value="none">Sort By</option>

              <option value="lowToHigh">Price: Low → High</option>

              <option value="highToLow">Price: High → Low</option>

              <option value="rating">Highest Rated</option>
            </select>

            <span className="pointer-events-none absolute right-5 text-xs text-muted-foreground">
              ▾
            </span>
          </div>

          {/* Clear */}

          <button
            type="button"
            onClick={clearFilters}
            className="flex items-center justify-center gap-2 rounded-full border-2 border-accent-foreground bg-accent-foreground px-6 py-3 text-xs tracking-wider text-background transition-all hover:bg-background hover:text-accent-foreground active:scale-95"
          >
            <RotateCcw size={15} />
            CLEAR
          </button>
        </form>
      </div>
    </div>
  );
};

export default Filterbar;
