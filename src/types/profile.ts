export interface UserProfile {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  bio?: string;
  location?: string;
  website?: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
  preferences: {
    emailNotifications: {
      courseUpdates: boolean;
      newCourses: boolean;
      promotions: boolean;
      achievements: boolean;
    };
    privacy: {
      showProfile: boolean;
      showCourses: boolean;
      showAchievements: boolean;
    };
  };
  paymentMethods: PaymentMethod[];
  billingAddress?: BillingAddress;
  purchaseHistory: PurchaseRecord[];
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal';
  isDefault: boolean;
  card?: {
    brand: string;
    last4: string;
    expiryMonth: number;
    expiryYear: number;
  };
  paypal?: {
    email: string;
  };
}

export interface BillingAddress {
  name: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface PurchaseRecord {
  id: string;
  courseId: string;
  courseName: string;
  amount: number;
  date: string;
  paymentMethod: {
    type: 'card' | 'paypal';
    last4?: string;
    email?: string;
  };
  status: 'completed' | 'refunded' | 'failed';
  invoice?: string;
}
