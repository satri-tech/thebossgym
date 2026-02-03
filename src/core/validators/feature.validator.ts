import { z } from "zod";

export const createFeatureSchema = z.object({
  name: z.string().min(1, "Name cannot be empty").max(100, "Name must be less than 100 characters").trim(),
  displayName: z.string().min(1, "Display name cannot be empty").max(200, "Display name must be less than 200 characters").trim(),
  description: z.string().trim().optional().nullable(),
  displayOrder: z.number().int("Display order must be an integer").nonnegative("Display order must be non-negative").optional().default(0),
  isActive: z.boolean().optional().default(true),
});

export const updateFeatureSchema = z.object({
  name: z.string().min(1, "Name cannot be empty").max(100, "Name must be less than 100 characters").trim().optional(),
  displayName: z.string().min(1, "Display name cannot be empty").max(200, "Display name must be less than 200 characters").trim().optional(),
  description: z.string().trim().optional().nullable(),
  displayOrder: z.number().int("Display order must be an integer").nonnegative("Display order must be non-negative").optional(),
  isActive: z.boolean().optional(),
}).refine((data) => Object.keys(data).length > 0, {
  message: "At least one field must be provided",
});

export type CreateFeatureInput = z.infer<typeof createFeatureSchema>;
export type UpdateFeatureInput = z.infer<typeof updateFeatureSchema>;
