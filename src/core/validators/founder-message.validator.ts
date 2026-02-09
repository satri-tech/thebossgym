import { z } from "zod";

export const updateFounderMessageSchema = z.object({
  title: z.string().min(1, "Title cannot be empty").max(200, "Title must be less than 200 characters").trim().optional(),
  description: z.string().min(1, "Description cannot be empty").trim().optional(),
  founderName: z.string().min(1, "Founder name cannot be empty").max(100, "Founder name must be less than 100 characters").trim().optional(),
  founderPosition: z.string().min(1, "Founder position cannot be empty").max(100, "Founder position must be less than 100 characters").trim().optional(),
  founderImage: z.string().min(1, "Founder image path cannot be empty").optional().nullable(),
}).refine((data) => Object.keys(data).length > 0, {
  message: "At least one field must be provided",
});

export type UpdateFounderMessageInput = z.infer<typeof updateFounderMessageSchema>;
