import { z } from "zod";

export const createTestimonialSchema = z.object({
  name: z.string().min(1, "Name cannot be empty").max(100, "Name must be less than 100 characters").trim(),
  position: z.string().min(1, "Position cannot be empty").max(100, "Position must be less than 100 characters").trim(),
  image: z.string().optional().nullable(),
  comment: z.string().min(1, "Comment cannot be empty").trim(),
});

export const updateTestimonialSchema = z.object({
  name: z.string().min(1, "Name cannot be empty").max(100, "Name must be less than 100 characters").trim().optional(),
  position: z.string().min(1, "Position cannot be empty").max(100, "Position must be less than 100 characters").trim().optional(),
  image: z.string().optional().nullable(),
  comment: z.string().min(1, "Comment cannot be empty").trim().optional(),
}).refine((data) => Object.keys(data).length > 0, {
  message: "At least one field must be provided",
});

export type CreateTestimonialInput = z.infer<typeof createTestimonialSchema>;
export type UpdateTestimonialInput = z.infer<typeof updateTestimonialSchema>;
