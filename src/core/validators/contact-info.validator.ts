import { z } from "zod";

export const contactInfoValidator = z.object({
  phone: z.string().min(1, "Phone number is required"),
  phoneLabel: z.string().default("Get in touch with our team for immediate assistance."),
  address: z.string().min(1, "Address is required"),
  addressLabel: z.string().default("Come visit our state-of-the-art facility in Pokhara."),
  email: z.string().email("Invalid email address"),
  emailLabel: z.string().default("Send us an email and we'll respond within 24 hours."),
  instagram: z.string().url("Invalid URL").or(z.literal("")).nullable().optional(),
  facebook: z.string().url("Invalid URL").or(z.literal("")).nullable().optional(),
  linkedin: z.string().url("Invalid URL").or(z.literal("")).nullable().optional(),
  twitter: z.string().url("Invalid URL").or(z.literal("")).nullable().optional(),
  youtube: z.string().url("Invalid URL").or(z.literal("")).nullable().optional(),
});

export const contactInfoUpdateValidator = z.object({
  phone: z.string().min(1, "Phone number is required").optional(),
  phoneLabel: z.string().optional(),
  address: z.string().min(1, "Address is required").optional(),
  addressLabel: z.string().optional(),
  email: z.string().email("Invalid email address").or(z.literal("")).optional(),
  emailLabel: z.string().optional(),
  instagram: z.string().url("Invalid URL").or(z.literal("")).nullable().optional(),
  facebook: z.string().url("Invalid URL").or(z.literal("")).nullable().optional(),
  linkedin: z.string().url("Invalid URL").or(z.literal("")).nullable().optional(),
  twitter: z.string().url("Invalid URL").or(z.literal("")).nullable().optional(),
  youtube: z.string().url("Invalid URL").or(z.literal("")).nullable().optional(),
});
