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
  Activity,
  Dumbbell,
  Heart,
  Users,
  Droplets,
  Lock,
  Music,
  Flame,
  Zap,
  Wind,
  Target,
  TrendingUp,
  Award,
  Smile,
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
  LucideIcon,
} from "lucide-react";
import { cn } from "@/core/lib/utils";

export type IconCategory = "social" | "fitness" | "all";

interface IconOption {
  name: string;
  icon: LucideIcon;
  value: string;
  category: "social" | "fitness";
}

const ALL_ICONS: IconOption[] = [
  // Fitness Icons
  { name: "Activity", icon: Activity, value: "activity", category: "fitness" },
  { name: "Dumbbell", icon: Dumbbell, value: "dumbbell", category: "fitness" },
  { name: "Heart", icon: Heart, value: "heart", category: "fitness" },
  { name: "Users", icon: Users, value: "users", category: "fitness" },
  { name: "Droplets", icon: Droplets, value: "droplets", category: "fitness" },
  { name: "Lock", icon: Lock, value: "lock", category: "fitness" },
  { name: "Music", icon: Music, value: "music", category: "fitness" },
  { name: "Flame", icon: Flame, value: "flame", category: "fitness" },
  { name: "Zap", icon: Zap, value: "zap", category: "fitness" },
  { name: "Wind", icon: Wind, value: "wind", category: "fitness" },
  { name: "Target", icon: Target, value: "target", category: "fitness" },
  { name: "Trending Up", icon: TrendingUp, value: "trending-up", category: "fitness" },
  { name: "Award", icon: Award, value: "award", category: "fitness" },
  { name: "Smile", icon: Smile, value: "smile", category: "fitness" },
  // Social Icons
  { name: "Facebook", icon: Facebook, value: "facebook", category: "social" },
  { name: "Instagram", icon: Instagram, value: "instagram", category: "social" },
  { name: "Twitter", icon: Twitter, value: "twitter", category: "social" },
  { name: "LinkedIn", icon: Linkedin, value: "linkedin", category: "social" },
  { name: "YouTube", icon: Youtube, value: "youtube", category: "social" },
  { name: "GitHub", icon: Github, value: "github", category: "social" },
  { name: "Email", icon: Mail, value: "mail", category: "social" },
  { name: "Website", icon: Globe, value: "globe", category: "social" },
  { name: "WhatsApp", icon: MessageCircle, value: "whatsapp", category: "social" },
  { name: "Phone", icon: Phone, value: "phone", category: "social" },
  { name: "Location", icon: MapPin, value: "map-pin", category: "social" },
  { name: "Link", icon: LinkIcon, value: "link", category: "social" },
];

interface IconPickerProps {
  value?: string | null;
  onChange: (icon: string) => void;
  category?: IconCategory;
  title?: string;
}

export function IconPicker({
  value,
  onChange,
  category = "all",
  title = "Select Icon",
}: IconPickerProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const getFilteredIcons = () => {
    let icons = ALL_ICONS;
    if (category !== "all") {
      icons = icons.filter((icon) => icon.category === category);
    }
    return icons.filter((icon) =>
      icon.name.toLowerCase().includes(search.toLowerCase())
    );
  };

  const selectedIcon = ALL_ICONS.find((icon) => icon.value === value);
  const SelectedIconComponent = selectedIcon?.icon || LinkIcon;
  const filteredIcons = getFilteredIcons();

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
        <span className="text-sm">{selectedIcon?.name || title}</span>
      </Button>

      <Dialog open={open} onOpenChange={setOpen} modal>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Search icons..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
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
