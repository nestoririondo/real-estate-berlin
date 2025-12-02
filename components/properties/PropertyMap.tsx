"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";

interface PropertyMapProps {
  lat: number;
  lng: number;
  title: string;
  location?: string;
}

const PropertyMap = ({ lat, lng, title, location }: PropertyMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const t = useTranslations("property");

  useEffect(() => {
    if (!mapRef.current) return;

    // Check if Google Maps is already loaded
    if (typeof google !== "undefined" && google.maps) {
      initializeMap();
    } else {
      // Wait for Google Maps to load
      const checkGoogleMaps = setInterval(() => {
        if (typeof google !== "undefined" && google.maps) {
          clearInterval(checkGoogleMaps);
          initializeMap();
        }
      }, 100);

      // Timeout after 10 seconds
      const timeout = setTimeout(() => {
        clearInterval(checkGoogleMaps);
        setError("Failed to load Google Maps");
        setIsLoading(false);
      }, 10000);

      return () => {
        clearInterval(checkGoogleMaps);
        clearTimeout(timeout);
      };
    }

    function initializeMap() {
      if (!mapRef.current) return;

      try {
        // Initialize the map
        const map = new google.maps.Map(mapRef.current, {
          center: { lat, lng },
          zoom: 15,
          mapTypeControl: false,
          streetViewControl: true,
          fullscreenControl: true,
          zoomControl: true,
          styles: [
            {
              featureType: "poi",
              elementType: "labels",
              stylers: [{ visibility: "off" }],
            },
          ],
        });

        // Add a marker
        const marker = new google.maps.Marker({
          position: { lat, lng },
          map,
          title,
          animation: google.maps.Animation.DROP,
        });

        // Add info window
        const infoWindow = new google.maps.InfoWindow({
          content: `<div class="p-2"><strong>${title}</strong></div>`,
        });

        marker.addListener("click", () => {
          infoWindow.open(map, marker);
        });

        setIsLoading(false);
      } catch (err) {
        setError("Failed to initialize map");
        setIsLoading(false);
      }
    }
  }, [lat, lng, title]);

  return (
    <>
      <div>
        <h3 className="text-lg font-semibold mb-2">{t("location")}</h3>
        {location && (
          <p className="text-muted-foreground mb-4">{location}</p>
        )}

        {isLoading && (
          <div className="w-full h-[400px] rounded-lg overflow-hidden flex items-center justify-center bg-muted">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        )}
        {error && (
          <div className="w-full h-[400px] rounded-lg overflow-hidden flex items-center justify-center bg-muted">
            <p className="text-muted-foreground">{error}</p>
          </div>
        )}
        <div
          ref={mapRef}
          className={`w-full h-[400px] rounded-lg overflow-hidden ${
            isLoading || error ? "hidden" : ""
          }`}
        />
      </div>
    </>
  );
};

export { PropertyMap };
