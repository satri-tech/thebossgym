import { z } from "zod";

export const createServiceSchema = z.object({
  icon: z.string().min(1, "Icon is required").trim(),
  title: z.string().min(1, "Title cannot be empty").max(100, "Title must be less than 100 characters").trim(),
  description: z.string().min(1, "Description cannot be empty").trim(),
  image: z.string().min(1, "Image is required").trim(),
  order: z.number().int("Order must be an integer").nonnegative("Order must be a positive number").optional(),
  features: z.array(z.object({
    feature: z.string().min(1, "Feature cannot be empty").trim(),
    order: z.number().int("Order must be an integer").nonnegative("Order must be a positive number"),
  })).optional().default([]),
});

export const updateServiceSchema = z.object({
  icon: z.string().min(1, "Icon cannot be empty").trim().optional(),
  title: z.string().min(1, "Title cannot be empty").max(100, "Title must be less than 100 characters").trim().optional(),
  description: z.string().min(1, "Description cannot be empty").trim().optional(),
  image: z.string().trim().optional(),
  order: z.number().int("Order must be an integer").nonnegative("Order must be a positive number").optional(),
}).refine((data) => Object.keys(data).length > 0, {
  message: "At least one field must be provided",
});

export type CreateServiceInput = z.infer<typeof createServiceSchema>;
export type UpdateServiceInput = z.infer<typeof updateServiceSchema>;
