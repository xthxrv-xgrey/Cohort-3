import { createContext, useContext } from "react";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { users, setUsers, currentUser } = useContext(AuthContext);

  // Current user's cart
  const cart = currentUser ? users[currentUser]?.cart || {} : {};

  // Add product to cart
  const addToCart = (product) => {
    if (!currentUser) return;

    setUsers((prev) => {
      const user = prev[currentUser];
      const newCart = { ...user.cart };

      if (newCart[product.id]) {
        newCart[product.id].quantity++;
      } else {
        newCart[product.id] = {
          ...product,
          quantity: 1,
        };
      }

      return {
        ...prev,
        [currentUser]: {
          ...user,
          cart: newCart,
        },
      };
    });
  };

  // Remove product completely
  const removeFromCart = (id) => {
    if (!currentUser) return;

    setUsers((prev) => {
      const user = prev[currentUser];
      const newCart = { ...user.cart };

      delete newCart[id];

      return {
        ...prev,
        [currentUser]: {
          ...user,
          cart: newCart,
        },
      };
    });
  };

  // Increase quantity
  const increaseQuantity = (id) => {
    if (!currentUser) return;

    setUsers((prev) => {
      const user = prev[currentUser];

      return {
        ...prev,
        [currentUser]: {
          ...user,
          cart: {
            ...user.cart,
            [id]: {
              ...user.cart[id],
              quantity: user.cart[id].quantity + 1,
            },
          },
        },
      };
    });
  };

  // Decrease quantity
  const decreaseQuantity = (id) => {
    if (!currentUser) return;

    setUsers((prev) => {
      const user = prev[currentUser];
      const newCart = { ...user.cart };

      if (newCart[id].quantity === 1) {
        delete newCart[id];
      } else {
        newCart[id] = {
          ...newCart[id],
          quantity: newCart[id].quantity - 1,
        };
      }

      return {
        ...prev,
        [currentUser]: {
          ...user,
          cart: newCart,
        },
      };
    });
  };

  // Empty cart
  const clearCart = () => {
    if (!currentUser) return;

    setUsers((prev) => ({
      ...prev,
      [currentUser]: {
        ...prev[currentUser],
        cart: {},
      },
    }));
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
