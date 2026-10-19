// integrations/payments/razorpay.ts — Razorpay payment gateway stub

// TODO: npm install razorpay @types/razorpay
// Docs: https://razorpay.com/docs/payments/server-integration/nodejs/

export interface CreateOrderInput {
  amount: number; // in paise (100 = 1 INR)
  currency?: string;
  receipt: string;
}

export interface RazorpayOrder {
  id: string;
  amount: number;
  currency: string;
  receipt: string;
  status: string;
}

export const razorpayService = {
  async createOrder(input: CreateOrderInput): Promise<RazorpayOrder> {
    // TODO: const razorpay = new Razorpay({ key_id: env.RAZORPAY_KEY_ID, key_secret: env.RAZORPAY_KEY_SECRET });
    // return razorpay.orders.create({ amount: input.amount, currency: input.currency ?? 'INR', receipt: input.receipt });

    // Stub response
    return {
      id: `order_stub_${Date.now()}`,
      amount: input.amount,
      currency: input.currency ?? 'INR',
      receipt: input.receipt,
      status: 'created',
    };
  },

  verifySignature(orderId: string, paymentId: string, signature: string): boolean {
    // TODO: Use crypto.createHmac to verify Razorpay signature
    console.info('[Razorpay stub] verifySignature called', { orderId, paymentId, signature });
    return true;
  },
};
