import { X, Plus, Minus } from "lucide-react";
import { Link } from "react-router";
import { useCart } from "../../hooks/useCart.js";

const CartProductCard = ({ product }) => {
  const {
    increaseQuantityCartProduct,
    decreaseQuantityCartProduct,
    removeCartProduct,
  } = useCart();
  return (
    <>
      <div className="flex flex-row justify-between">
        {/* Left */}
        <div className="flex flex-row p-4">
          <Link
            className="h-50 w-50 overflow-hidden flex justify-center items-center border-2 border-border rounded-2xl"
            to={`/product/${product.id}`}
          >
            <img src={product.image} alt="" className="h-4/5" />
          </Link>
          <div className="p-8 flex flex-col gap-4">
            <p className="uppercase font-sans text-xs text-muted-foreground font-semibold tracking-widest">
              {product.category}
            </p>
            <Link
              to={`/product/${product.id}`}
              className="font-serif text-2xl tracking-widest"
            >
              {product.title}
            </Link>
            <p className="text-muted-foreground text-sm">
              ${product.price} each.
            </p>
          </div>
        </div>
        {/* Right */}
        <div className="h-full flex flex-col justify-center items-center gap-8">
          <button
            onClick={() => removeCartProduct(product.id)}
            className="text-muted-foreground self-end px-4"
          >
            <X size={"18px"} />
          </button>
          <div className="flex flex-row border-2 border-border gap-4 py-2 px-4 rounded-4xl items-center">
            <button onClick={() => decreaseQuantityCartProduct(product.id)}>
              <Minus size={"18px"} />
            </button>
            <div>{product.quantity}</div>
            <button onClick={() => increaseQuantityCartProduct(product.id)}>
              <Plus size={"18px"} />
            </button>
          </div>
          <span className="font-serif">
            ${(product.price * product.quantity).toFixed(2)}
          </span>
        </div>
      </div>
      <hr />
    </>
  );
};

export default CartProductCard;
