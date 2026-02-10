export type MembershipTier = "BASIC" | "STANDARD" | "PREMIUM";
export type BillingCycle = "MONTHLY" | "YEARLY";

export interface PlanFeature {
  id: string;
  planId: string;
  text: string;
  isIncluded: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MembershipPlan {
  id: string;
  tier: MembershipTier;
  billingCycle: BillingCycle;
  price: number;
  name: string;
  description: string | null;
  isPopular: boolean;
  displayOrder: number;
  isActive: boolean;
  features: PlanFeature[];
  createdAt: string;
  updatedAt: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  createdAt: string;
  updatedAt: string;
}
