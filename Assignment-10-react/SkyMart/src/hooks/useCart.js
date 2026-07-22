import { useContext } from "react";
import { CartContext } from "../context/CartContext.jsx";
import { AuthContext } from "../context/AuthContext.jsx";
import { toast } from "sonner";

export const useCart = () => {
  const { cart, setCart } = useContext(CartContext);
  const { currentUser } = useContext(AuthContext);

  const addToCart = (product) => {
    setCart((prevCart) => ({
      ...prevCart,
      [currentUser]: {
        ...(prevCart[currentUser] || {}),
        [product.id]: {
          ...product,
          quantity: (prevCart[currentUser]?.[product.id]?.quantity || 0) + 1,
        },
      },
    }));
  };

  const increaseQuantityCartProduct = (productId) => {
    setCart((prevCart) => ({
      ...prevCart,
      [currentUser]: {
        ...prevCart[currentUser],
        [productId]: {
          ...prevCart[currentUser][productId],
          quantity: prevCart[currentUser][productId].quantity + 1,
        },
      },
    }));
  };

  const decreaseQuantityCartProduct = (productId) => {
    setCart((prevCart) => {
      const userCart = prevCart[currentUser] || {};
      const product = userCart[productId];

      if (!product) return prevCart;

      if (product.quantity === 1) {
        toast.info(`${product.title} removed from your cart`);

        const { [productId]: _, ...remainingProducts } = userCart;

        return {
          ...prevCart,
          [currentUser]: remainingProducts,
        };
      }

      return {
        ...prevCart,
        [currentUser]: {
          ...userCart,
          [productId]: {
            ...product,
            quantity: product.quantity - 1,
          },
        },
      };
    });
  };

  const removeCartProduct = (productId) => {
    setCart((prevCart) => {
      const userCart = prevCart[currentUser] || {};
      const product = userCart[productId];

      if (!product) return prevCart;

      toast.info(`${product.title} removed from your cart`);

      const { [productId]: _, ...remainingProducts } = userCart;

      return {
        ...prevCart,
        [currentUser]: remainingProducts,
      };
    });
  };

  const clearCart = cart[currentUser]
    ? () => setCart((prevCart) => ({ ...prevCart, [currentUser]: {} }))
    : null;

  const totalCartValue = Object.values(cart[currentUser] || {})
    .reduce(
      (total, product) => total + Number(product.price) * product.quantity,
      0,
    )
    .toFixed(2);

  const isInCart = (productId) => {
    return !!cart?.[currentUser]?.[productId];
  };

  const itemsInCart = Object.keys(cart?.[currentUser] || {}).length;

  return {
    cart,
    addToCart,
    increaseQuantityCartProduct,
    decreaseQuantityCartProduct,
    removeCartProduct,
    clearCart,
    totalCartValue,
    isInCart,
    itemsInCart,
  };
};
