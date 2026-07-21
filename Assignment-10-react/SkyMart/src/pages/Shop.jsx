import { Link } from "react-router";
import { MoveRight } from "lucide-react";
import { useState, useContext, useEffect } from "react";
import { ProductContext } from "../context/ProductContext.jsx";
import ProductCard from "../components/card/ProductCard.jsx";
import Filterbar from "../components/ui/Filterbar.jsx";

const Shop = () => {
  const { allProducts } = useContext(ProductContext);

  const [filteredProducts, setFilteredProducts] = useState([]);

  // Stores all products one first run as null
  useEffect(() => {
    if (allProducts) setFilteredProducts(allProducts);
  }, [allProducts]);

  return (
    <div className="min-h-[92vh] py-4 overflow-y-scroll hide-scrollbar flex flex-col gap-4">
      <div className="pt-20 flex flex-col gap-4">
        <p className="font-sans text-xs text-muted-foreground font-semibold tracking-widest">
          THE COLLECTION
        </p>
        <h1 className="font-serif text-8xl">
          Everything, <span className="italic">considered</span>.
        </h1>
        <p className="text-sm text-muted-foreground max-w-100">
          Filter by department, sort by taste, or search for something specific.
          Every piece is available now.
        </p>
      </div>

      <Filterbar setFilteredProducts={setFilteredProducts} />
      <div className="grid gap-4 py-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Shop;
