export interface PaymentOptions {
  currency?: "pkr";
  amount: number;
  orderId: string;
  tenantId: string;
  idempotenencyKey?: string;
}
type GatewayPaymentStatus = "no_payment_required" | "paid" | "unpaid";
interface PaymentSession {
  id: string;
  paymentUrl: string;
  paymentStatus: GatewayPaymentStatus;
}

export interface CustomMetaData {
  orderId: string;
}

export interface VerifiedSession {
  id: string;
  metadata: CustomMetaData;
  paymentStatus: GatewayPaymentStatus;
}

export interface PaymentGW {
  createSession: (options: PaymentOptions) => Promise<PaymentSession>;
  getSession: (id: string) => Promise<VerifiedSession>;
}
