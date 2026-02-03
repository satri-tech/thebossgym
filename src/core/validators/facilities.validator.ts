import { z } from "zod";

export const createFacilitiesSchema = z.object({
  title: z.string().min(1, "Title cannot be empty").max(100, "Title must be less than 100 characters").trim(),
  description: z.string().min(1, "Description cannot be empty").trim(),
  image: z.string().min(1, "Image is required").trim(),
});

export const updateFacilitiesSchema = z.object({
  title: z.string().min(1, "Title cannot be empty").max(100, "Title must be less than 100 characters").trim().optional(),
  description: z.string().min(1, "Description cannot be empty").trim().optional(),
  image: z.string().min(1, "Image cannot be empty").trim().optional(),
}).refine((data) => Object.keys(data).length > 0, {
  message: "At least one field must be provided",
});

export type CreateFacilitiesInput = z.infer<typeof createFacilitiesSchema>;
export type UpdateFacilitiesInput = z.infer<typeof updateFacilitiesSchema>;
