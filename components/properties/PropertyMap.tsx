"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";

interface PropertyMapProps {
  lat?: number;
  lng?: number;
  title: string;
  location?: string;
  address?: {
    street?: string;
    house_number?: string;
    zip_code?: string;
    city?: string;
    country?: string;
  };
}

const PropertyMap = ({ lat, lng, title, location, address }: PropertyMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  const t = useTranslations("property");

  useEffect(() => {
    if (!mapRef.current) return;

    // Build address string for geocoding
    const buildAddressString = (): string | null => {
      if (location) return location;
      
      if (address) {
        const parts = [
          address.street,
          address.house_number,
          address.zip_code,
          address.city,
          address.country,
        ].filter(Boolean);
        
        return parts.length > 0 ? parts.join(", ") : null;
      }
      
      return null;
    };

    const geocodeAddress = async (addressString: string): Promise<{ lat: number; lng: number } | null> => {
      if (typeof google === "undefined" || !google.maps) {
        return null;
      }

      return new Promise((resolve) => {
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ address: addressString }, (results, status) => {
          if (status === "OK" && results && results[0]) {
            const location = results[0].geometry.location;
            resolve({
              lat: location.lat(),
              lng: location.lng(),
            });
          } else {
            resolve(null);
          }
        });
      });
    };

    const initializeMap = async () => {
      if (!mapRef.current) return;

      try {
        let mapLat = lat;
        let mapLng = lng;

        // If no coordinates, try to geocode the address
        if (!mapLat || !mapLng) {
          const addressString = buildAddressString();
          if (addressString) {
            const geocoded = await geocodeAddress(addressString);
            if (geocoded) {
              mapLat = geocoded.lat;
              mapLng = geocoded.lng;
              setCoordinates(geocoded);
            } else {
              setError("Could not find location");
              setIsLoading(false);
              return;
            }
          } else {
            setError("No location information available");
            setIsLoading(false);
            return;
          }
        }

        // Initialize the map
        const map = new google.maps.Map(mapRef.current, {
          center: { lat: mapLat, lng: mapLng },
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
          position: { lat: mapLat, lng: mapLng },
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
    };

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
  }, [lat, lng, title, location, address]);

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
