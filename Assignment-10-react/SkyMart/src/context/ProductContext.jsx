import { createContext, useEffect, useState } from "react";
import { api } from "../lib/api.js";
import { toast } from "sonner";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get("/products");
        setAllProducts(data);
      } catch (err) {
        toast.error("Failed to fetch products.");
      }
    };

    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        allProducts,
        setAllProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
