"use client";

import { useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogOverlay, DialogPortal, DialogTitle } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PropertyGalleryProps {
  images: string[];
  title: string;
}

const PropertyGallery = ({ images, title }: PropertyGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div
        className="relative w-full h-[500px] rounded-lg overflow-hidden group cursor-pointer"
        onClick={() => setIsDialogOpen(true)}
      >
        <Image
          src={images[selectedImage]}
          alt={`${title} - Image ${selectedImage + 1}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 66vw"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors pointer-events-none" />
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-auto"
          onClick={(e) => {
            e.stopPropagation();
            prevImage();
          }}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-auto"
          onClick={(e) => {
            e.stopPropagation();
            nextImage();
          }}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      {/* Thumbnail Grid */}
      <div className="grid grid-cols-5 gap-4">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={cn(
              "relative w-full h-20 rounded-md overflow-hidden border-2 transition-all",
              selectedImage === index
                ? "border-primary"
                : "border-transparent hover:border-primary/50"
            )}
          >
            <Image
              src={image}
              alt={`${title} - Thumbnail ${index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 20vw, 13vw"
            />
          </button>
        ))}
      </div>

      {/* Full Screen Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogPortal>
          <DialogOverlay className="!bg-black/70 backdrop-blur-sm" />
          <DialogContent
            className="!max-w-none !w-screen !h-screen !p-0 !bg-transparent !border-none flex flex-col !m-0 !rounded-none !top-0 !left-0 !translate-x-0 !translate-y-0 !inset-0 pointer-events-none"
            showCloseButton={false}
          >
            <DialogTitle className="sr-only">{title} - Gallery</DialogTitle>

            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-50 text-white hover:bg-white/20 bg-black/50 h-12 w-12 rounded-full pointer-events-auto"
              onClick={() => setIsDialogOpen(false)}
            >
              <X className="h-6 w-6" />
            </Button>

            {/* Main Image Area */}
            <div
              className="relative w-full flex-1 pointer-events-auto"
              onClick={() => setIsDialogOpen(false)}
            >
              <Image
                src={images[selectedImage]}
                alt={`${title} - Image ${selectedImage + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 bg-black/50 h-14 w-14"
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
              >
                <ChevronLeft className="h-8 w-8" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 bg-black/50 h-14 w-14"
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
              >
                <ChevronRight className="h-8 w-8" />
              </Button>
              <div
                className="absolute top-6 left-1/2 -translate-x-1/2 text-white text-base bg-black/70 px-4 py-2 rounded-full"
                onClick={(e) => e.stopPropagation()}
              >
                {selectedImage + 1} / {images.length}
              </div>
            </div>

          {/* Thumbnails Strip */}
          <div
            className="w-full backdrop-blur-sm p-6 border-t border-white/20 pointer-events-auto"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex gap-3 justify-center overflow-x-auto max-w-7xl mx-auto">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={cn(
                    "relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all",
                    selectedImage === index
                      ? "border-white"
                      : "border-transparent hover:border-white/50 opacity-60 hover:opacity-100"
                  )}
                >
                  <Image
                    src={image}
                    alt={`${title} - Thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </button>
              ))}
            </div>
          </div>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </div>
  );
};

export { PropertyGallery };

