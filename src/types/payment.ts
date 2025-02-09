export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: 'requires_payment_method' | 'requires_confirmation' | 'succeeded' | 'failed';
  clientSecret: string;
}

export interface StripeElements {
  card: {
    mount: (elementId: string) => void;
    unmount: () => void;
    on: (event: string, handler: (event: any) => void) => void;
  };
}

export interface CheckoutSession {
  id: string;
  courseId: string;
  amount: number;
  currency: string;
  status: 'open' | 'complete' | 'expired';
  url: string;
}

export interface PaymentError {
  type: 'card_error' | 'validation_error';
  code?: string;
  message: string;
  param?: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  interval: 'month' | 'year';
  features: string[];
  isPopular?: boolean;
}

export interface Coupon {
  id: string;
  code: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountAmount: number;
  expiresAt?: string;
  maxUses?: number;
  currentUses: number;
  minimumAmount?: number;
  courses?: string[]; // List of course IDs this coupon applies to
}
