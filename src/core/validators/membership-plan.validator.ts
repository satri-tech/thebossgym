import { z } from "zod";

const MembershipTierEnum = z.enum(["BASIC", "STANDARD", "PREMIUM"]);
const BillingCycleEnum = z.enum(["MONTHLY", "YEARLY"]);

export const createMembershipPlanSchema = z.object({
  tier: MembershipTierEnum,
  billingCycle: BillingCycleEnum,
  price: z.number().int("Price must be an integer").positive("Price must be positive"),
  name: z.string().min(1, "Name cannot be empty").max(100, "Name must be less than 100 characters").trim(),
  description: z.string().trim().optional().nullable(),
  isPopular: z.boolean().optional().default(false),
  displayOrder: z.number().int("Display order must be an integer").nonnegative("Display order must be non-negative").optional().default(0),
  isActive: z.boolean().optional().default(true),
  features: z.array(z.object({
    featureId: z.string().min(1, "Feature ID is required"),
    isIncluded: z.boolean().optional().default(true),
    value: z.string().trim().optional().nullable(),
  })).optional().default([]),
});

export const updateMembershipPlanSchema = z.object({
  price: z.number().int("Price must be an integer").positive("Price must be positive").optional(),
  name: z.string().min(1, "Name cannot be empty").max(100, "Name must be less than 100 characters").trim().optional(),
  description: z.string().trim().optional().nullable(),
  isPopular: z.boolean().optional(),
  displayOrder: z.number().int("Display order must be an integer").nonnegative("Display order must be non-negative").optional(),
  isActive: z.boolean().optional(),
}).refine((data) => Object.keys(data).length > 0, {
  message: "At least one field must be provided",
});

export type CreateMembershipPlanInput = z.infer<typeof createMembershipPlanSchema>;
export type UpdateMembershipPlanInput = z.infer<typeof updateMembershipPlanSchema>;
