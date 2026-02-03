export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  tags: string[];
}

export const GALLERY_TAGS = [
  "All",
  "Equipment",
  "Training",
  "Facilities",
  "Members",
  "Events",
] as const;

// Add your actual image dimensions here (width x height)
const BASE_IMAGES: GalleryImage[] = [
  {
    id: "gym-1",
    src: "/image1.webp",
    alt: "Gym facility view 1",
    width: 640,
    height: 1138,
    tags: ["Equipment", "Facilities"],
  },
  {
    id: "gym-2",
    src: "/image2.webp",
    alt: "Gym facility view 2",
    width: 640,
    height: 360,
    tags: ["Training", "Members"],
  },
  {
    id: "gym-3",
    src: "/imsge3.webp",
    alt: "Gym facility view 3",
    width: 640,
    height: 1138,
    tags: ["Facilities", "Equipment"],
  },
  {
    id: "gym-4",
    src: "/image4.webp",
    alt: "Gym facility view 4",
    width: 640,
    height: 1138,
    tags: ["Training", "Equipment", "Events"],
  },
  {
    id: "gym-5",
    src: "/image5.webp",
    alt: "Gym facility view 5",
    width: 640,
    height: 1138,
    tags: ["Members", "Events"],
  },
  {
    id: "gym-6",
    src: "/image6.webp",
    alt: "Gym facility view 6",
    width: 640,
    height: 1138,
    tags: ["Facilities", "Training"],
  },
  {
    id: "gym-7",
    src: "/image7.webp",
    alt: "Gym facility view 7",
    width: 640,
    height: 1138,
    tags: ["Events", "Members"],
  },
];

// Repeat images to create a fuller gallery
export const GALLERY_IMAGES: GalleryImage[] = Array.from(
  { length: 10 },
  (_, repeatIndex) =>
    BASE_IMAGES.map((img) => ({
      ...img,
      id: `${img.id}-${repeatIndex}`,
    }))
).flat();
