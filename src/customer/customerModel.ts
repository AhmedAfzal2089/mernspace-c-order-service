import mongoose from "mongoose";
import { Address, Customer } from "./customerTypes";

const addressesSchema = new mongoose.Schema<Address>(
  {
    text: {
      type: String,
      required: true,
    },
    isDefault: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  {
    _id: false,
  },
);

const customerSchema = new mongoose.Schema<Customer>(
  {
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    addresses: {
      type: [addressesSchema],
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Customer", customerSchema);
