import mongoose from "mongoose";
import { ToppingPricingCache } from "../types";

const toppingSchema = new mongoose.Schema<ToppingPricingCache>({
  toppingId: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

export default mongoose.model(
  "ToppingCacheModel",
  toppingSchema,
  "toppingCache",
);
