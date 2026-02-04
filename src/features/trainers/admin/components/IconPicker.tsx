"use client";

import { useState } from "react";
import { Button } from "@/core/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/core/components/ui/dialog";
import { Input } from "@/core/components/ui/input";
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  Github,
  Mail,
  Globe,
  MessageCircle,
  Phone,
  MapPin,
  Link as LinkIcon,
} from "lucide-react";
import { cn } from "@/core/lib/utils";

const SOCIAL_ICONS = [
  { name: "Facebook", icon: Facebook, value: "facebook" },
  { name: "Instagram", icon: Instagram, value: "instagram" },
  { name: "Twitter", icon: Twitter, value: "twitter" },
  { name: "LinkedIn", icon: Linkedin, value: "linkedin" },
  { name: "YouTube", icon: Youtube, value: "youtube" },
  { name: "GitHub", icon: Github, value: "github" },
  { name: "Email", icon: Mail, value: "mail" },
  { name: "Website", icon: Globe, value: "globe" },
  { name: "WhatsApp", icon: MessageCircle, value: "whatsapp" },
  { name: "Phone", icon: Phone, value: "phone" },
  { name: "Location", icon: MapPin, value: "map-pin" },
  { name: "Link", icon: LinkIcon, value: "link" },
];

interface IconPickerProps {
  value?: string | null;
  onChange: (icon: string) => void;
}

export function IconPicker({ value, onChange }: IconPickerProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const selectedIcon = SOCIAL_ICONS.find((icon) => icon.value === value);
  const SelectedIconComponent = selectedIcon?.icon || LinkIcon;

  const filteredIcons = SOCIAL_ICONS.filter((icon) =>
    icon.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (iconValue: string) => {
    onChange(iconValue);
    setOpen(false);
  };

  return (
    <>
      <Button
        type="button"
        variant="outline"
        onClick={() => setOpen(true)}
        className="w-full justify-start gap-2"
      >
        <SelectedIconComponent className="h-4 w-4" />
        <span className="text-sm">{selectedIcon?.name || "Select Icon"}</span>
      </Button>

      <Dialog open={open} onOpenChange={setOpen} modal>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Select Social Media Icon</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Search icons..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="grid grid-cols-4 gap-2 max-h-[300px] overflow-y-auto">
              {filteredIcons.map((icon) => {
                const IconComponent = icon.icon;
                return (
                  <button
                    key={icon.value}
                    type="button"
                    onClick={() => handleSelect(icon.value)}
                    className={cn(
                      "flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all hover:bg-muted",
                      value === icon.value
                        ? "border-primary bg-primary/5"
                        : "border-transparent"
                    )}
                  >
                    <IconComponent className="h-5 w-5" />
                    <span className="text-xs text-center">{icon.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
