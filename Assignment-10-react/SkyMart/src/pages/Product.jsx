import { ArrowLeft, ShoppingBag, Star } from "lucide-react";
import { Link, useParams } from "react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { api } from "../lib/api.js";
import { useCart } from "../hooks/useCart.js";

const Product = () => {
  const { id } = useParams();

  const { addToCart, isInCart } = useCart();

  const [product, setProduct] = useState(null);
  const [inCart, setInCart] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/products/${id}`);
        setProduct(data);
        setInCart(isInCart(data.id));
      } catch (err) {
        toast.error("Failed to fetch product");
      }
    };

    fetchProduct();
  }, [id]);

  const handleCart = () => {
    if (!product || inCart) return;

    addToCart(product);
    setInCart(true);

    toast.success("Added to your cart!");
  };

  if (!product) {
    return (
      <div className="min-h-[92vh] flex items-center justify-center">
        <p className="text-muted-foreground">Loading product...</p>
      </div>
    );
  }

  return (
    <div className="min-h-[92vh] overflow-y-scroll hide-scrollbar py-4">
      <div className="pt-16">
        {/* Back */}
        <Link
          to="/shop"
          className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft
            size={16}
            className="transition-transform duration-300 group-hover:-translate-x-1"
          />
          Back to collection
        </Link>

        <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Product Image */}
          <div className="flex h-[70vh] items-center justify-center border border-border bg-surface p-12">
            <img
              src={product.image}
              alt={product.title}
              className="h-full object-contain transition-transform duration-700 hover:scale-105"
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              {product.category}
            </p>

            <h1 className="mt-5 font-serif text-6xl leading-tight">
              {product.title}
            </h1>

            <div className="mt-6 flex items-center gap-3 text-sm text-muted-foreground">
              <Star size={18} className="fill-ochre text-ochre" />

              <span>{product.rating.rate}</span>

              <span>•</span>

              <span>{product.rating.count} reviews</span>
            </div>

            <p className="mt-8 max-w-xl text-sm leading-relaxed text-muted-foreground">
              {product.description}
            </p>

            <div className="mt-10 flex items-center justify-between border-y border-border py-8">
              <p className="font-serif text-5xl">${product.price.toFixed(2)}</p>

              <button
                onClick={handleCart}
                className={`flex items-center gap-2 rounded-full border px-8 py-4 text-sm font-medium transition-all duration-300 ${
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
        </div>
      </div>
    </div>
  );
};

export default Product;
