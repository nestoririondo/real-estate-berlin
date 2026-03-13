"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogOverlay, DialogPortal, DialogTitle } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PropertyGalleryProps {
  images: string[];
  title: string;
}

// Generate a simple blur placeholder (light gray)
const blurDataURL = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==";

const PropertyGallery = ({ images, title }: PropertyGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const thumbnailScrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const preloadedImagesRef = useRef<Set<number>>(new Set());

  const preloadImage = useCallback((index: number) => {
    if (index < 0 || index >= images.length) return;
    if (preloadedImagesRef.current.has(index)) return;

    const img = new window.Image();
    img.src = `/_next/image?url=${encodeURIComponent(images[index])}&w=828&q=65`;
    preloadedImagesRef.current.add(index);
  }, [images]);

  // Preload all images on mount
  useEffect(() => {
    images.forEach((_, index) => preloadImage(index));
  }, [images, preloadImage]);

  const goToImage = (index: number) => {
    if (index === selectedImage) return;
    setIsLoading(true);
    setSelectedImage(index);
    preloadImage((index + 1) % images.length);
    preloadImage((index - 1 + images.length) % images.length);
  };

  const nextImage = () => goToImage((selectedImage + 1) % images.length);
  const prevImage = () => goToImage((selectedImage - 1 + images.length) % images.length);

  // Preload images when dialog opens
  useEffect(() => {
    if (isDialogOpen) {
      // Preload current, next, and previous images
      preloadImage(selectedImage);
      preloadImage((selectedImage + 1) % images.length);
      preloadImage((selectedImage - 1 + images.length) % images.length);
    }
  }, [isDialogOpen, selectedImage, images.length, preloadImage]);

  const checkScrollButtons = () => {
    if (!thumbnailScrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = thumbnailScrollRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
  };

  const scrollThumbnails = (direction: "left" | "right") => {
    if (!thumbnailScrollRef.current) return;
    const scrollAmount = 240; // Scroll by approximately 3 thumbnails (80px + 12px gap)
    const currentScroll = thumbnailScrollRef.current.scrollLeft;
    const newScroll = direction === "left" 
      ? currentScroll - scrollAmount 
      : currentScroll + scrollAmount;
    
    thumbnailScrollRef.current.scrollTo({
      left: newScroll,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    checkScrollButtons();
    const scrollContainer = thumbnailScrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", checkScrollButtons);
      // Check on resize
      window.addEventListener("resize", checkScrollButtons);
      return () => {
        scrollContainer.removeEventListener("scroll", checkScrollButtons);
        window.removeEventListener("resize", checkScrollButtons);
      };
    }
  }, [images]);

  // Scroll to selected thumbnail when it changes
  useEffect(() => {
    if (!thumbnailScrollRef.current) return;
    const thumbnailWidth = 80; // w-20 = 80px
    const gap = 12; // gap-3 = 12px
    const scrollPosition = selectedImage * (thumbnailWidth + gap) - (thumbnailScrollRef.current.clientWidth / 2) + (thumbnailWidth / 2);
    
    thumbnailScrollRef.current.scrollTo({
      left: Math.max(0, scrollPosition),
      behavior: "smooth",
    });
  }, [selectedImage]);

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div
        className="relative w-full h-[500px] rounded-sm overflow-hidden group cursor-pointer bg-muted"
        onClick={() => setIsDialogOpen(true)}
      >
        <Image
          src={images[selectedImage]}
          alt={`${title} - Image ${selectedImage + 1}`}
          fill
          className={`object-cover transition-opacity duration-300 ${isLoading ? "opacity-50" : "opacity-100"}`}
          sizes="(max-width: 768px) 100vw, 828px"
          placeholder="blur"
          blurDataURL={blurDataURL}
          priority={selectedImage === 0}
          quality={65}
          onLoad={() => setIsLoading(false)}
        />
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="h-8 w-8 rounded-full border-4 border-white/30 border-t-white animate-spin" />
          </div>
        )}
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

      {/* Thumbnail Scrollable Strip with Navigation Buttons */}
      <div className="relative">
        {/* Left Scroll Button */}
        {canScrollLeft && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-background/90 hover:bg-background shadow-lg border border-border h-9 w-9 rounded-sm"
            onClick={() => scrollThumbnails("left")}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
        )}
        
        {/* Right Scroll Button */}
        {canScrollRight && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-background/90 hover:bg-background shadow-lg border border-border h-9 w-9 rounded-sm"
            onClick={() => scrollThumbnails("right")}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        )}

        {/* Scrollable Thumbnail Container */}
        <div 
          ref={thumbnailScrollRef}
          className={`overflow-x-auto scrollbar-hide scroll-smooth ${canScrollLeft ? "pl-10" : ""} ${canScrollRight ? "pr-10" : ""}`}
          style={{ 
            WebkitOverflowScrolling: "touch", // Smooth scrolling on iOS/iPad
            scrollbarWidth: "none", // Firefox
            msOverflowStyle: "none", // IE/Edge
          }}
        >
          <div className="flex gap-3 min-w-max py-1">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => goToImage(index)}
                className={cn(
                  "relative w-20 h-20 shrink-0 rounded-sm overflow-hidden border-2 transition-all",
                  selectedImage === index
                    ? "border-primary"
                    : "border-transparent hover:border-primary/50"
                )}
              >
                <Image
                  src={image}
                  alt={`${title} - Thumbnail ${index + 1}`}
                  fill
                  className="object-cover transition-opacity duration-200"
                  sizes="80px"
                  placeholder="blur"
                  blurDataURL={blurDataURL}
                  loading={index < 6 ? "eager" : "lazy"}
                  onMouseEnter={() => {
                    // Preload on hover for faster main image switching
                    if (index !== selectedImage) {
                      preloadImage(index);
                    }
                  }}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Full Screen Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogPortal>
          <DialogOverlay className="bg-black/70! backdrop-blur-sm" />
          <DialogContent
            className="max-w-none! w-screen! h-screen! p-0! bg-transparent! border-none! flex flex-col m-0! rounded-none! top-0! left-0! translate-x-0! translate-y-0! inset-0! pointer-events-none"
            showCloseButton={false}
          >
            <DialogTitle className="sr-only">{title} - Gallery</DialogTitle>

            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-50 text-white hover:bg-white/20 bg-black/50 h-12 w-12 rounded-sm pointer-events-auto"
              onClick={() => setIsDialogOpen(false)}
            >
              <X className="h-6 w-6" />
            </Button>

            {/* Main Image Area */}
            <div
              className="relative w-full flex-1 pointer-events-auto bg-black"
              onClick={() => setIsDialogOpen(false)}
            >
              <Image
                src={images[selectedImage]}
                alt={`${title} - Image ${selectedImage + 1}`}
                fill
                className="object-contain transition-opacity duration-300"
                sizes="100vw"
                priority
                quality={80}
                placeholder="blur"
                blurDataURL={blurDataURL}
                onLoad={() => setIsLoading(false)}
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
                className="absolute top-6 left-1/2 -translate-x-1/2 text-white text-base bg-black/70 px-4 py-2 rounded-sm"
                onClick={(e) => e.stopPropagation()}
              >
                {selectedImage + 1} / {images.length}
              </div>
            </div>

          {/* Thumbnails Strip */}
          <div
            className="w-full bg-black/70 backdrop-blur-sm p-6 border-t border-white/20 pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex gap-3 justify-center overflow-x-auto max-w-7xl mx-auto">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => goToImage(index)}
                  className={cn(
                    "relative w-24 h-24 shrink-0 rounded-sm overflow-hidden border-2 transition-all",
                    selectedImage === index
                      ? "border-white"
                      : "border-transparent hover:border-white/50 opacity-60 hover:opacity-100"
                  )}
                >
                  <Image
                    src={image}
                    alt={`${title} - Thumbnail ${index + 1}`}
                    fill
                    className="object-cover transition-opacity duration-200"
                    sizes="96px"
                    placeholder="blur"
                    blurDataURL={blurDataURL}
                    loading="lazy"
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

