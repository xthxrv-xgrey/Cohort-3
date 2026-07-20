import { useContext } from "react";
import { ProductContext } from "../context/ProductContext.jsx";
import ProductCard from "../components/ProductCard.jsx";

const Products = () => {
  const { products } = useContext(ProductContext);

  // Later you'll pass filteredProducts, searchedProducts, etc.
  const renderProducts = (productsToRender) => {
    if (!productsToRender.length) {
      return (
        <p className="col-span-full text-center text-slate-500">
          No products found.
        </p>
      );
    }

    return productsToRender.map((product) => (
      <ProductCard key={product.id} product={product} />
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6">
        <h1 className="text-3xl font-semibold text-slate-800">
          Explore Products
        </h1>

        <p className="mt-2 text-slate-500">
          Find the best products from SkyMart.
        </p>
      </section>

      {/* Search */}
      <section className="bg-white border border-slate-200 rounded-2xl p-5">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search products..."
            className="flex-1 border border-slate-300 rounded-lg px-4 py-3 outline-none focus:border-emerald-500"
          />

          <button className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition">
            Search
          </button>
        </div>
      </section>

      {/* Products Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {renderProducts(products)}
      </section>
    </div>
  );
};

export default Products;
