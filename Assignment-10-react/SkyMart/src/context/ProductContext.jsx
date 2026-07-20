import { createContext, useEffect, useState } from "react";
import { api } from "../services/api.js";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  // Stores all products
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const response = await api.get("https://fakestoreapi.com/products");

      setProducts(response.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

// sample data
// [{
//       id: 1,
//       title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
//       price: 109.95,
//       description:
//         "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
//       category: "men's clothing",
//       image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
//       rating: {
//         rate: 3.9,
//         count: 120,
//       },
//     }]
