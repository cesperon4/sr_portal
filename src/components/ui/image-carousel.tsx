import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageCarouselProps {
  images: (string | null)[];
  title: string | null | undefined;
}
export function ImageCarousel({ images, title }: ImageCarouselProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((i) => (i + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((i) => (i - 1 + images.length) % images.length);
  };

  return (
    <div>
      {images.length > 0 && (
        <div className="relative w-full flex items-center justify-center mb-4">
          <div className="relative w-full h-96 rounded-xl overflow-hidden mx-auto shadow-md border border-gray-300 dark:border-gray-700">
            <Image
              src={images[currentImageIndex] || "/police_img.jpg"}
              alt={title ? `${title + currentImageIndex}` : "Post image"}
              fill
              className="object-cover w-full h-full"
            />
          </div>

          {/* Navigation buttons */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-3 bg-black/50 text-white p-2 rounded-full hover:bg-black transition"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-3 bg-black/50 text-white p-2 rounded-full hover:bg-black transition"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}

          {/* Image Counter */}
          {images.length > 1 && (
            <p className="absolute bottom-3 right-3 text-xs bg-black/60 text-white px-2 py-1 rounded-lg">
              {currentImageIndex + 1}/{images.length}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default ImageCarousel;
