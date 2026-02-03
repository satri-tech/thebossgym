import {
  Building,
  Settings,
  Users,
  LayoutDashboard,
  Info,
  Briefcase,
  UserCog,
  Image,
  HelpCircle,
  MessageSquare,
  Contact,
  BarChart3,
  Wallet,
} from "lucide-react";

export const headerData = {
  name: "The Boss Gym",
  logo: Building,
  description: "Super Admin Panel",
};

export const navAdminheaderData = {
  name: "The Boss Gym",
  logo: Building,
  description: "Admin Panel",
};

export const superAdminSidebarLinks = {
  items: [
    {
      title: "Users",
      url: "/super-admin",
      icon: Users,
    },
    {
      title: "Settings",
      url: "/super-admin/settings",
      icon: Settings,
    },
  ],
};

export const adminSidebarLinks = {
  items: [
    {
      title: "Dashboard",
      url: "/admin",
      icon: LayoutDashboard,
    },
    {
      title: "Stats",
      url: "/admin/stats",
      icon: BarChart3,
    },
    {
      title: "About Us",
      url: "/admin/about",
      icon: Info,
    },
    {
      title: "Facilities",
      url: "/admin/facilities",
      icon: Building,
    },
    {
      title: "Services",
      url: "/admin/services",
      icon: Briefcase,
    },
    {
      title: "Trainers",
      url: "/admin/trainers",
      icon: UserCog,
    },
    {
      title: "Pricing",
      url: "/admin/pricing",
      icon: Wallet,
    },
    {
      title: "Gallery",
      url: "/admin/gallery",
      icon: Image,
    },
    {
      title: "FAQ",
      url: "/admin/faq",
      icon: HelpCircle,
    },
    {
      title: "Testimonials",
      url: "/admin/testimonials",
      icon: MessageSquare,
    },
    {
      title: "Contact",
      url: "/admin/contact",
      icon: Contact,
      items: [
        {
          title: "Messages",
          url: "/admin/contact/messages",
          icon: MessageSquare,
        },
        {
          title: "Information",
          url: "/admin/contact/info",
          icon: Info,
        },
      ],
    },
    {
      title: "Settings",
      url: "/admin/settings",
      icon: Settings,
    },
  ],
};
