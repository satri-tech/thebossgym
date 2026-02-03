import { z } from "zod";

export const createPlanFeatureSchema = z.object({
  planId: z.string().min(1, "Plan ID is required"),
  featureId: z.string().min(1, "Feature ID is required"),
  isIncluded: z.boolean().optional().default(true),
  value: z.string().trim().optional().nullable(),
});

export const updatePlanFeatureSchema = z.object({
  isIncluded: z.boolean().optional(),
  value: z.string().trim().optional().nullable(),
}).refine((data) => data.isIncluded !== undefined || data.value !== undefined, {
  message: "At least one field (isIncluded or value) must be provided",
});

export type CreatePlanFeatureInput = z.infer<typeof createPlanFeatureSchema>;
export type UpdatePlanFeatureInput = z.infer<typeof updatePlanFeatureSchema>;
