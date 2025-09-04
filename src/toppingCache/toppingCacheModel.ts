import mongoose from "mongoose";
import { ToppingPricingCache } from "../types";

const toppingCacheSchama = new mongoose.Schema<ToppingPricingCache>(
  {
    toppingId: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    tenantId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

toppingCacheSchama.index({ toppingId: 1 }, { unique: true });
export default mongoose.model(
  "ToppingCacheModel",
  toppingCacheSchama,
  "toppingCache",
);
