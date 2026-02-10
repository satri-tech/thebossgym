"use client";

import { useState } from "react";
import { ContactInfo, UpdateContactInfoInput } from "../types/types";
import { Button } from "@/core/components/ui/button";
import { Input } from "@/core/components/ui/input";
import { Label } from "@/core/components/ui/label";
import { Textarea } from "@/core/components/ui/textarea";
import { Card } from "@/core/components/ui/card";
import { Loader2 } from "lucide-react";

interface ContactInfoFormProps {
  contactInfo: ContactInfo | null;
  onSubmit: (data: UpdateContactInfoInput) => Promise<any>;
  isLoading?: boolean;
}

export function ContactInfoForm({
  contactInfo,
  onSubmit,
  isLoading = false,
}: ContactInfoFormProps) {
  const [formData, setFormData] = useState<UpdateContactInfoInput>({
    phone: contactInfo?.phone || "",
    phoneLabel: contactInfo?.phoneLabel || "",
    address: contactInfo?.address || "",
    addressLabel: contactInfo?.addressLabel || "",
    email: contactInfo?.email || "",
    emailLabel: contactInfo?.emailLabel || "",
    instagram: contactInfo?.instagram || "",
    facebook: contactInfo?.facebook || "",
    linkedin: contactInfo?.linkedin || "",
    twitter: contactInfo?.twitter || "",
    youtube: contactInfo?.youtube || "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value === "" ? null : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await onSubmit(formData);
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Contact Details Section */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-6">Contact Details</h2>
        <div className="space-y-6">
          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="e.g., +977-1-1234567"
              disabled={isLoading || isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phoneLabel">Phone Label</Label>
            <Textarea
              id="phoneLabel"
              name="phoneLabel"
              value={formData.phoneLabel}
              onChange={handleChange}
              placeholder="e.g., Get in touch with our team for immediate assistance."
              disabled={isLoading || isSubmitting}
              rows={2}
            />
          </div>

          {/* Address */}
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="e.g., Lakeside, Pokhara, Nepal"
              disabled={isLoading || isSubmitting}
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="addressLabel">Address Label</Label>
            <Textarea
              id="addressLabel"
              name="addressLabel"
              value={formData.addressLabel}
              onChange={handleChange}
              placeholder="e.g., Come visit our state-of-the-art facility in Pokhara."
              disabled={isLoading || isSubmitting}
              rows={2}
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g., info@bossgym.com"
              disabled={isLoading || isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="emailLabel">Email Label</Label>
            <Textarea
              id="emailLabel"
              name="emailLabel"
              value={formData.emailLabel}
              onChange={handleChange}
              placeholder="e.g., Send us an email and we'll respond within 24 hours."
              disabled={isLoading || isSubmitting}
              rows={2}
            />
          </div>
        </div>
      </Card>

      {/* Social Media Section */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-6">Social Media Links</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="instagram">Instagram</Label>
            <Input
              id="instagram"
              name="instagram"
              value={formData.instagram || ""}
              onChange={handleChange}
              placeholder="https://instagram.com/..."
              disabled={isLoading || isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="facebook">Facebook</Label>
            <Input
              id="facebook"
              name="facebook"
              value={formData.facebook || ""}
              onChange={handleChange}
              placeholder="https://facebook.com/..."
              disabled={isLoading || isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="linkedin">LinkedIn</Label>
            <Input
              id="linkedin"
              name="linkedin"
              value={formData.linkedin || ""}
              onChange={handleChange}
              placeholder="https://linkedin.com/..."
              disabled={isLoading || isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="twitter">Twitter/X</Label>
            <Input
              id="twitter"
              name="twitter"
              value={formData.twitter || ""}
              onChange={handleChange}
              placeholder="https://twitter.com/..."
              disabled={isLoading || isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="youtube">YouTube</Label>
            <Input
              id="youtube"
              name="youtube"
              value={formData.youtube || ""}
              onChange={handleChange}
              placeholder="https://youtube.com/..."
              disabled={isLoading || isSubmitting}
            />
          </div>
        </div>
      </Card>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isLoading || isSubmitting}
        className="w-full"
      >
        {isSubmitting || isLoading ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Saving...
          </>
        ) : (
          "Save Contact Information"
        )}
      </Button>
    </form>
  );
}
