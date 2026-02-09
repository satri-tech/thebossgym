# Image Upload Dialog - Refactor Summary

## Overview
Extracted the image upload UI pattern from TrainerDialog into a reusable `ImageUploadDialog` component in core, now used by both Trainers and Testimonials features.

## What Changed

### 1. Created Reusable Component
**File**: `src/core/components/image-upload/ImageUploadDialog.tsx`

Features:
- Circular profile image display with fallback
- Camera icon overlay button
- Remove button (X) for clearing image
- Configurable sizes: `sm`, `md`, `lg`
- File input handling
- Error display
- Loading state
- Customizable labels and fallback images

Props:
```typescript
interface ImageUploadDialogProps {
  imageUrl?: string;                    // Current image URL
  fallbackImage?: string;               // Fallback when no image
  onImageSelect: (file: File) => void;  // Called when file selected
  onImageRemove?: () => void;           // Called when remove clicked
  uploading?: boolean;                  // Loading state
  error?: string;                       // Error message
  label?: string;                       // Help text
  size?: "sm" | "md" | "lg";           // Size variant
}
```

### 2. Updated TrainerDialog
**File**: `src/features/trainers/admin/components/TrainerDialog.tsx`

Changes:
- Removed inline image upload UI code
- Now uses `ImageUploadDialog` component
- Simplified component logic
- Maintains all existing functionality

### 3. Updated TestimonialDialog
**File**: `src/features/testimonials/admin/components/TestimonialDialog.tsx`

Changes:
- Replaced custom image upload UI with `ImageUploadDialog`
- Now uses server action for image upload
- Cleaner, more consistent UI
- Better error handling

### 4. Updated Exports
**File**: `src/core/components/image-upload/index.ts`

Added export:
```typescript
export { ImageUploadDialog } from "./ImageUploadDialog";
```

## Usage Example

```tsx
import { ImageUploadDialog } from "@/core/components/image-upload";

export function MyComponent() {
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleImageSelect = async (file: File) => {
    setUploading(true);
    // Upload logic here
    setUploading(false);
  };

  return (
    <ImageUploadDialog
      imageUrl={imageUrl}
      fallbackImage="/uploads/default.jpg"
      onImageSelect={handleImageSelect}
      onImageRemove={() => setImageUrl("")}
      uploading={uploading}
      label="Click to upload image"
      size="md"
    />
  );
}
```

## Size Variants

### Small (sm)
- Container: 96px × 96px
- Icon: 48px
- Camera: 32px

### Medium (md) - Default
- Container: 128px × 128px
- Icon: 64px
- Camera: 40px

### Large (lg)
- Container: 160px × 160px
- Icon: 80px
- Camera: 48px

## Features

✅ Reusable across features
✅ Consistent UI/UX
✅ Configurable sizes
✅ Error handling
✅ Loading states
✅ Remove functionality
✅ Fallback images
✅ Responsive design
✅ TypeScript support

## Files Modified
- `src/features/trainers/admin/components/TrainerDialog.tsx`
- `src/features/testimonials/admin/components/TestimonialDialog.tsx`
- `src/core/components/image-upload/index.ts`

## Files Created
- `src/core/components/image-upload/ImageUploadDialog.tsx`

## Benefits

1. **DRY Principle**: No duplicate image upload UI code
2. **Consistency**: Same UI/UX across features
3. **Maintainability**: Single source of truth for image upload UI
4. **Reusability**: Easy to use in other features
5. **Flexibility**: Configurable sizes and labels
6. **Type Safety**: Full TypeScript support

## Next Steps

This component can now be used in other features that need image uploads:
- Services
- Facilities
- Gallery
- Any other feature requiring image uploads
