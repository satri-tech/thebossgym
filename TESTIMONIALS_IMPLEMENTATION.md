# Testimonials Feature Implementation

## Overview
Complete testimonials management system with separate admin and landing page components following clean architecture principles.

## Directory Structure

```
src/features/testimonials/
├── admin/
│   ├── components/
│   │   ├── TestimonialsManager.tsx      # Main admin manager component
│   │   ├── TestimonialCard.tsx          # Admin card with edit/delete actions
│   │   ├── TestimonialDialog.tsx        # Create/edit dialog with image upload
│   │   ├── DeleteConfirmDialog.tsx      # Delete confirmation dialog
│   │   └── index.ts
│   └── hooks/
│       └── useTestimonials.ts           # Admin hook for CRUD operations
├── landing/
│   ├── components/
│   │   ├── TestimonialsSection.tsx      # Landing page section
│   │   ├── TestimonialCard.tsx          # Landing card display
│   │   └── index.ts
│   └── hooks/
│       └── useTestimonialsLanding.ts    # Landing page hook (read-only)
├── components/
│   ├── AdminTestimonials.tsx            # Admin entry point
│   └── Testimonials.tsx                 # Carousel component (existing)
├── types/
│   └── types.ts                         # TypeScript interfaces
└── index.ts                             # Feature exports
```

## Features

### Admin Panel (`src/app/admin/testimonials`)
- **Create**: Add new testimonials with image upload
- **Read**: View all testimonials in a grid layout
- **Update**: Edit existing testimonials and replace images
- **Delete**: Remove testimonials with confirmation dialog
- **Image Management**: 
  - Upload to `public/testimonials/`
  - Fallback to `public/testimonials/fallback.jpg`
  - Automatic cleanup of old images on update

### Landing Page
- Display testimonials in a grid layout
- Read-only access to testimonials
- Star ratings display
- Avatar with fallback initials
- Responsive design

## API Integration

### Admin Endpoints
- `GET /api/admin/testimonials` - Fetch all testimonials
- `POST /api/admin/testimonials` - Create testimonial
- `PATCH /api/admin/testimonials/[id]` - Update testimonial
- `DELETE /api/admin/testimonials/[id]` - Delete testimonial

### Landing Endpoints
- `GET /api/testimonials` - Fetch all testimonials (public)

## Image Upload Configuration

Images are stored in `public/testimonials/` with the following settings:
- **Max file size**: 5MB
- **Allowed types**: JPEG, PNG, WebP
- **Fallback image**: `public/testimonials/fallback.jpg`
- **Naming**: UUID-based filenames for uniqueness

## Usage

### Admin Component
```tsx
import { TestimonialsManager } from "@/features/testimonials/admin/components";

export default function TestimonialsPage() {
  return <TestimonialsManager />;
}
```

### Landing Component
```tsx
import { TestimonialsSection } from "@/features/testimonials/landing/components";

export default function HomePage() {
  return (
    <div>
      <TestimonialsSection />
    </div>
  );
}
```

## Hooks

### Admin Hook
```tsx
const {
  testimonials,
  loading,
  error,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  refetch,
} = useTestimonials();
```

### Landing Hook
```tsx
const {
  testimonials,
  loading,
  error,
  refetch,
} = useTestimonialsLanding();
```

## Data Model

```typescript
interface Testimonial {
  id: string;
  name: string;
  position: string;
  image?: string | null;
  comment: string;
  createdAt: string;
}
```

## Validation

Testimonials are validated using Zod schemas:
- **Name**: 1-100 characters
- **Position**: 1-100 characters
- **Image**: Valid URL (optional)
- **Comment**: Non-empty text

## Error Handling

- Network errors are caught and displayed to users
- Validation errors are shown inline in forms
- Toast notifications for success/error feedback
- Graceful fallbacks for missing images

## Styling

- Uses Tailwind CSS and shadcn/ui components
- Responsive grid layout (1 col mobile, 2 cols tablet, 3 cols desktop)
- Loading skeletons for better UX
- Smooth transitions and hover effects

## File Upload Utility

Uses `uploadSingleFile` from `@/core/lib/image/uploadFiles.ts`:
- Validates file type and size
- Generates UUID-based filenames
- Handles file cleanup on updates
- Returns upload results with error handling
