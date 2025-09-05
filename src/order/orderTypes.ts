import mongoose from "mongoose";
import { CartItem } from "../types";

// If we donot assign a value to the enum then it became numerical type so when we use in model it gives error so we are assigning value

export enum PaymentMode {
  CARD = "card",
  CASH = "cash",
}
export enum OrderStatus {
  RECEIVED = "received",
  CONFIRMED = "confirmed",
  PREPARING = "preparing",
  READY_FOR_DELIVERY = "read_for_delivery",
  OUT_FOR_DELIVERY = "out_for_delivery",
  DELIVERED = "delivered",
}

export enum PaymentStatus {
  PENDING = "pending",
  PAID = "paid",
  FAILED = "failed",
}

export interface Order {
  cart: CartItem[];
  customerId: mongoose.Types.ObjectId;
  total: number;
  discount: number;
  taxes: number;
  deliveryCharges: number;
  address: string;
  tenantId: string;
  comment?: string;
  paymentMode: PaymentMode;
  orderStatus: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentId?: string;
}
