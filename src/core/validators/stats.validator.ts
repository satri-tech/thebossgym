import { z } from "zod";

export const createStatsSchema = z.object({
  label: z
    .string()
    .min(1, "Label cannot be empty")
    .max(100, "Label must be less than 100 characters")
    .trim(),
  value: z
    .string()
    .min(1, "Value cannot be empty")
    .max(50, "Value must be less than 50 characters")
    .trim(),
  order: z
    .number()
    .int("Order must be an integer")
    .nonnegative("Order must be a positive number")
    .optional()
    .default(0),
});

export const updateStatsSchema = z
  .object({
    label: z
      .string()
      .min(1, "Label cannot be empty")
      .max(100, "Label must be less than 100 characters")
      .trim()
      .optional(),
    value: z
      .string()
      .min(1, "Value cannot be empty")
      .max(50, "Value must be less than 50 characters")
      .trim()
      .optional(),
    order: z
      .number()
      .int("Order must be an integer")
      .nonnegative("Order must be a positive number")
      .optional(),
  })
  .refine((data) => data.label || data.value || data.order !== undefined, {
    message: "At least one field (label, Value, or order) must be provided",
  });

export type CreateStatsInput = z.infer<typeof createStatsSchema>;
export type UpdateStatsInput = z.infer<typeof updateStatsSchema>;
