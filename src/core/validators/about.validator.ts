import { z } from "zod";

export const updateAboutSchema = z.object({
  tag: z.string().min(1, "Tag cannot be empty").max(100, "Tag must be less than 100 characters").trim().optional(),
  heading: z.string().min(1, "Heading cannot be empty").max(200, "Heading must be less than 200 characters").trim().optional(),
  highlight: z.string().min(1, "Highlight cannot be empty").max(100, "Highlight must be less than 100 characters").trim().optional(),
  description: z.string().min(1, "Description cannot be empty").trim().optional(),
  buttonText: z.string().min(1, "Button text cannot be empty").max(50, "Button text must be less than 50 characters").trim().optional(),
  buttonLink: z.string().min(1, "Button link cannot be empty").max(200, "Button link must be less than 200 characters").trim().optional(),
  image: z.string().url("Image must be a valid URL").optional().nullable(),
}).refine((data) => Object.keys(data).length > 0, {
  message: "At least one field must be provided",
});

export type UpdateAboutInput = z.infer<typeof updateAboutSchema>;
