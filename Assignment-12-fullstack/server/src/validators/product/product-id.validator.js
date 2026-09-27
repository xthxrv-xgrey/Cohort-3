import ApiError from "../../core/ApiError.js";
import asyncHandler from "../../core/asyncHandler.js";
import { ProductModel } from "../../models/product.model.js";

export const productIdValidator = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    throw new ApiError(400, "Product ID is required.");
  }

  const product = await ProductModel.findById(id);

  if (!product) {
    throw new ApiError(404, "Product not found.");
  }

  req.product = product;

  next();
});
