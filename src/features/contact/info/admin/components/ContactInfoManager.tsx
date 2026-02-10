"use client";

import { useContactInfo } from "../hooks/useContactInfo";
import { ContactInfoForm } from "./ContactInfoForm";
import { Skeleton } from "@/core/components/ui/skeleton";
import { Card } from "@/core/components/ui/card";
import { AlertCircle, Phone } from "lucide-react";
import { toast } from "sonner";

export function ContactInfoManager() {
  const { contactInfo, loading, error, updateContactInfo } = useContactInfo();

  const handleSubmit = async (data: any) => {
    const result = await updateContactInfo(data);
    if (result.success) {
      toast.success("Contact information updated successfully");
    } else {
      toast.error("Failed to update contact information", {
        description: result.error,
      });
    }
    return result;
  };

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-destructive/10 text-destructive p-4 rounded-lg flex items-start gap-3">
          <AlertCircle className="h-5 w-5 mt-0.5 shrink-0" />
          <div>
            <p className="font-semibold">Error loading contact information</p>
            <p className="text-sm mt-1">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <Phone className="h-8 w-8" />
          Contact Information
        </h1>
        <p className="text-muted-foreground">
          Manage your gym's contact details and social media links
        </p>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="space-y-8">
          <Card className="p-6">
            <Skeleton className="h-6 w-1/3 mb-6" />
            <div className="space-y-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
            </div>
          </Card>
          <Card className="p-6">
            <Skeleton className="h-6 w-1/3 mb-6" />
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
            </div>
          </Card>
        </div>
      ) : (
        <ContactInfoForm
          contactInfo={contactInfo}
          onSubmit={handleSubmit}
          isLoading={loading}
        />
      )}
    </div>
  );
}
