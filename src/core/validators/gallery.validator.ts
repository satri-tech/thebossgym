import { z } from "zod";

export const createGalleryImageSchema = z.object({
  imageUrl: z.string().min(1, "Image URL is required"),
  alt: z.string().min(1, "Alt text is required").max(200, "Alt text must be less than 200 characters").trim(),
  width: z.number().int().positive("Width must be a positive number"),
  height: z.number().int().positive("Height must be a positive number"),
  tags: z.array(z.string()).min(1, "At least one tag is required"),
});

export const updateGalleryImageSchema = z.object({
  imageUrl: z.string().min(1, "Image URL is required").optional(),
  alt: z.string().min(1, "Alt text is required").max(200, "Alt text must be less than 200 characters").trim().optional(),
  width: z.number().int().positive("Width must be a positive number").optional(),
  height: z.number().int().positive("Height must be a positive number").optional(),
  tags: z.array(z.string()).min(1, "At least one tag is required").optional(),
}).refine((data) => Object.keys(data).length > 0, {
  message: "At least one field must be provided",
});

export type CreateGalleryImageInput = z.infer<typeof createGalleryImageSchema>;
export type UpdateGalleryImageInput = z.infer<typeof updateGalleryImageSchema>;
