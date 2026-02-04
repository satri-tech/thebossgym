import { z } from "zod";

const socialMediaSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Title cannot be empty").trim(),
  link: z.string().url("Link must be a valid URL").trim(),
  icon: z.string().trim().optional().nullable(),
});

export const createTrainerSchema = z.object({
  fullname: z.string().min(1, "Full name cannot be empty").max(100, "Full name must be less than 100 characters").trim(),
  position: z.string().max(100, "Position must be less than 100 characters").trim().optional().nullable(),
  experience: z.string().max(100, "Experience must be less than 100 characters").trim().optional().nullable(),
  description: z.string().trim().optional().nullable(),
  image: z.string().trim().optional().nullable(),
  socialMedia: z.array(socialMediaSchema).optional().default([]),
});

export const updateTrainerSchema = z.object({
  fullname: z.string().min(1, "Full name cannot be empty").max(100, "Full name must be less than 100 characters").trim().optional(),
  position: z.string().max(100, "Position must be less than 100 characters").trim().optional().nullable(),
  experience: z.string().max(100, "Experience must be less than 100 characters").trim().optional().nullable(),
  description: z.string().trim().optional().nullable(),
  image: z.string().trim().optional().nullable(),
  socialMedia: z.array(socialMediaSchema).optional(),
}).refine((data) => Object.keys(data).length > 0, {
  message: "At least one field must be provided",
});

export type CreateTrainerInput = z.infer<typeof createTrainerSchema>;
export type UpdateTrainerInput = z.infer<typeof updateTrainerSchema>;
