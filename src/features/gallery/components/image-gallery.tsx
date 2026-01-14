'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useInView } from 'framer-motion';
import { AspectRatio } from '@/core/components/gallery-animations/aspect-ratio';

export function ImageGallery() {
	return (
		<div className="relative flex min-h-screen w-full flex-col items-center justify-center  px-4 pb-10">
			<div className="mx-auto grid w-full max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-4">

				{Array.from({ length: 4 }).map((_, col) => (
					<div key={col} className="grid gap-6">
						{Array.from({ length: 20 }).map((_, index) => {
							const isPortrait = Math.random() > 0.5;
							const width = isPortrait ? 1080 : 1920;
							const height = isPortrait ? 1920 : 1080;
							const ratio = isPortrait ? 9 / 16 : 16 / 9;

							return (
								<AnimatedImage
									key={`${col}-${index}`}
									alt={`Image ${col}-${index}`}
									src={`https://picsum.photos/seed/${col}-${index}/${width}/${height}`}
									ratio={ratio}
									placeholder={`https://placehold.co/${width}x${height}/`}
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
	placeholder?: string;
	ratio: number;
}

function AnimatedImage({ alt, src, ratio, placeholder }: AnimatedImageProps) {
	const ref = React.useRef(null);
	const isInView = useInView(ref, { once: true });
	const [isLoading, setIsLoading] = React.useState(true);

	const [imgSrc, setImgSrc] = React.useState(src);

	const handleError = () => {
		if (placeholder) {
			setImgSrc(placeholder);
		}
	};

	return (
		<AspectRatio
			ref={ref}
			ratio={ratio}
			className="bg-neutral-900 relative size-full rounded-lg"
		>
			<Image
				alt={alt}
				src={imgSrc}
				fill
				sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
				className={cn(
					'rounded-lg object-cover opacity-0 transition-all duration-1000 ease-in-out',
					{
						'opacity-100': isInView && !isLoading,
					},
				)}
				onLoad={() => setIsLoading(false)}
				onError={handleError}
			/>
		</AspectRatio>
	);
}
