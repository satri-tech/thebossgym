import { z } from "zod";

const MembershipTierEnum = z.enum(["BASIC", "STANDARD", "PREMIUM"]);
const BillingCycleEnum = z.enum(["MONTHLY", "YEARLY"]);

const priceSchema = z.union([z.string(), z.number()]).transform((val) => {
  const num = typeof val === "string" ? parseInt(val, 10) : val;
  if (isNaN(num) || num <= 0) {
    throw new Error("Price must be a positive number");
  }
  return num;
});

export const createMembershipPlanSchema = z.object({
  tier: MembershipTierEnum,
  billingCycle: BillingCycleEnum,
  price: priceSchema,
  name: z.string().min(1, "Name cannot be empty").max(100, "Name must be less than 100 characters").trim(),
  description: z.string().trim().optional().nullable(),
  isPopular: z.boolean().optional().default(false),
  displayOrder: z.number().optional(), // Optional - will be calculated on backend
  isActive: z.boolean().optional().default(true),
  features: z.array(z.object({
    text: z.string().min(1, "Feature text is required"),
    isIncluded: z.boolean().optional().default(true),
  })).optional().default([]),
});

export const updateMembershipPlanSchema = z.object({
  tier: MembershipTierEnum.optional(),
  billingCycle: BillingCycleEnum.optional(),
  price: priceSchema.optional(),
  name: z.string().min(1, "Name cannot be empty").max(100, "Name must be less than 100 characters").trim().optional(),
  description: z.string().trim().optional().nullable(),
  isPopular: z.boolean().optional(),
  isActive: z.boolean().optional(),
}).refine((data) => Object.keys(data).length > 0, {
  message: "At least one field must be provided",
});

export type CreateMembershipPlanInput = z.infer<typeof createMembershipPlanSchema>;
export type UpdateMembershipPlanInput = z.infer<typeof updateMembershipPlanSchema>;
