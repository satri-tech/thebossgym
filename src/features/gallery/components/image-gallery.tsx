'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useInView } from 'framer-motion';
import { AspectRatio } from '@/core/components/gallery-animations/aspect-ratio';
import { GALLERY_IMAGES, type GalleryImage } from '@/constants/gallery';

interface ImageGalleryProps {
	images: GalleryImage[];
}

export function ImageGallery({ images }: ImageGalleryProps) {
	// Distribute images across columns for masonry layout
	const columns = 4;
	const imageColumns: typeof images[] = Array.from({ length: columns }, () => []);
	
	images.forEach((image, index) => {
		imageColumns[index % columns].push(image);
	});

	return (
		<div className="relative flex min-h-screen w-full flex-col items-center justify-center px-4 pb-24">
			<div className="mx-auto grid w-full max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
				{imageColumns.map((columnImages, colIndex) => (
					<div key={colIndex} className="grid gap-6">
						{columnImages.map((image) => {
							// Use actual image dimensions for true aspect ratio
							const ratio = image.width / image.height;

							return (
								<AnimatedImage
									key={image.id}
									alt={image.alt}
									src={image.src}
									ratio={ratio}
								/>
							);
						})}
					</div>
				))}
			</div>
		</div>
	);
}

interface AnimatedImageProps {
	alt: string;
	src: string;
	className?: string;
	ratio: number;
}

function AnimatedImage({ alt, src, ratio }: AnimatedImageProps) {
	const ref = React.useRef(null);
	const isInView = useInView(ref, { once: true });
	const [isLoading, setIsLoading] = React.useState(true);

	return (
		<AspectRatio
			ref={ref}
			ratio={ratio}
			className="bg-neutral-900 relative size-full rounded-lg"
		>
			<Image
				alt={alt}
				src={src}
				fill
				sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
				className={cn(
					'rounded-lg object-cover opacity-0 transition-all duration-1000 ease-in-out',
					{
						'opacity-100': isInView && !isLoading,
					},
				)}
				onLoad={() => setIsLoading(false)}
			/>
		</AspectRatio>
	);
}
