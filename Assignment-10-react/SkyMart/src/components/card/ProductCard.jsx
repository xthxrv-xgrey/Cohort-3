import { Link } from "react-router";
import { ArrowUpRight, ShoppingBag, Star } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { useCart } from "../../hooks/useCart.js";

const ProductCard = ({ product }) => {
  const [inCart, setInCart] = useState(false);
  const { isInCart, addToCart } = useCart();

  useEffect(() => {
    setInCart(isInCart(product.id));
  }, []);

  const handleCartClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!inCart) {
      toast.success("Added to your cart!");
      setInCart(true);
      addToCart(product);
    }
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="group flex flex-col overflow-hidden border border-border bg-card transition-all duration-500 hover:-translate-y-1 hover:border-primary/40"
    >
      {/* Image */}
      <div className="relative flex h-80 items-center justify-center overflow-hidden bg-surface p-8">
        <img
          src={product.image}
          alt={product.title}
          className="h-full object-contain transition-transform duration-700 group-hover:scale-110"
        />

        {/* Hover CTA */}
        <div className="absolute bottom-4 right-4 flex translate-y-4 items-center gap-2 rounded-full bg-background px-4 py-2 text-xs font-semibold opacity-0 shadow-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          View Product
          <ArrowUpRight size={16} />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        {/* Category */}
        <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
          {product.category}
        </p>

        {/* Title */}
        <h3 className="mt-3 line-clamp-2 font-serif text-3xl leading-tight">
          {product.title}
        </h3>

        {/* Rating */}
        <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
          <Star size={16} className="fill-ochre text-ochre" />
          <span>{product.rating.rate}</span>
          <span>•</span>
          <span>{product.rating.count} reviews</span>
        </div>

        {/* Footer */}
        <div className="mt-auto pt-6">
          <div className="mb-5 flex items-end justify-between">
            <p className="font-serif text-4xl">${product.price.toFixed(2)}</p>

            <span className="text-sm font-medium text-primary opacity-0 transition-all duration-300 group-hover:opacity-100">
              Explore →
            </span>
          </div>

          <button
            onClick={handleCartClick}
            className={`flex w-full items-center justify-center gap-2 rounded-full border px-5 py-3 text-sm font-medium transition-all duration-300 ${
              inCart
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-background hover:border-primary hover:bg-primary hover:text-primary-foreground"
            }`}
          >
            <ShoppingBag size={18} />

            {inCart ? "Added to Cart" : "Add to Cart"}
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
