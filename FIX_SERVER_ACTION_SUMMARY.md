# Fix: Server Action for Image Upload

## Problem
The build error occurred because `uploadFiles.ts` uses Node.js APIs (`fs/promises`, `path`) which cannot be used in client components. The hook was trying to import these functions directly in a client component.

## Solution
Created a server action wrapper to handle all file operations on the server side.

## Changes Made

### 1. Created Server Action
**File**: `src/features/testimonials/admin/actions/uploadTestimonialImage.ts`

Two server functions:
- `uploadTestimonialImage(formData)` - Handles image upload to `public/testimonials/`
- `deleteTestimonialImage(filename)` - Handles image deletion

These functions:
- Run on the server (marked with "use server")
- Have access to Node.js APIs
- Return serializable results to the client
- Handle all file system operations

### 2. Updated Hook
**File**: `src/features/testimonials/admin/hooks/useTestimonials.ts`

Changes:
- Removed direct imports of `uploadSingleFile` and `deleteFiles`
- Added imports of server action functions
- Updated `createTestimonial()` to use server action
- Updated `updateTestimonial()` to use server action
- Updated `deleteTestimonial()` to use server action

### 3. How It Works

**Client Side (Hook)**:
```tsx
// Create FormData with file
const formData = new FormData();
formData.append("file", imageFile);

// Call server action
const uploadResult = await uploadTestimonialImage(formData);

// Get back serializable result
const imageUrl = uploadResult.url;
```

**Server Side (Action)**:
```tsx
"use server";

export async function uploadTestimonialImage(formData: FormData) {
  // Can use Node.js APIs here
  const result = await uploadSingleFile(file, config);
  
  // Return serializable data
  return {
    success: true,
    url: `/testimonials/${filename}`,
  };
}
```

## Benefits
✅ Fixes the build error
✅ Keeps file operations secure on the server
✅ Client components remain clean
✅ No changes needed to UI components
✅ Maintains all functionality

## Files Modified
- `src/features/testimonials/admin/hooks/useTestimonials.ts`

## Files Created
- `src/features/testimonials/admin/actions/uploadTestimonialImage.ts`

## Testing
The build should now complete successfully. All CRUD operations and image uploads will work as expected.
