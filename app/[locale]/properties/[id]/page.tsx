import { notFound } from "next/navigation";
import { PropertyGallery } from "@/components/properties/PropertyGallery";
import { PropertyDetails } from "@/components/properties/PropertyDetails";
import { PropertyMap } from "@/components/properties/PropertyMap";
import { PropertyStats } from "@/components/properties/PropertyStats";
import { ContactForm } from "@/components/properties/ContactForm";
import { BackButton } from "@/components/ui/back-button";
import { MapPin } from "lucide-react";
import { allProperties } from "@/lib/data/properties";
import { getPropertyExtras } from "@/lib/data/mockPropertyExtras";
import { formatPrice } from "@/lib/utils/formatPrice";
import type { Property } from "@/types/property";

// Mock function - replace with actual API call
const getProperty = async (id: string): Promise<Property | null> => {
  const property = allProperties.find((p) => p.id === Number(id));
  return property || null;
};

interface PropertyPageProps {
  params: Promise<{ id: string; locale: string }>;
}

const PropertyPage = async ({ params }: PropertyPageProps) => {
  const { id, locale } = await params;
  const property = await getProperty(id);

  if (!property) {
    notFound();
  }

  const propertyExtras = getPropertyExtras(property.id);
  const galleryImages = [property.image, ...propertyExtras.galleryImages];

  return (
    <div className="container mx-auto px-4 py-8">
      <BackButton />

      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{property.title}</h1>
        <div className="flex items-center gap-1 text-muted-foreground mb-4">
          <MapPin className="h-5 w-5" />
          <span className="text-lg">{property.location}</span>
        </div>
        <PropertyStats
          beds={property.beds}
          baths={property.baths}
          sqm={property.sqm}
          size="lg"
          showLabels
        />
        <p className="text-3xl font-bold text-primary mt-4">
          {formatPrice(property.price, property.currency, locale)}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Gallery and Details */}
        <div className="lg:col-span-2 space-y-8">
          <PropertyGallery images={galleryImages} title={property.title} />
          <PropertyDetails property={property} />
          {property.coordinates && (
            <PropertyMap
              lat={property.coordinates.lat}
              lng={property.coordinates.lng}
              title={property.title}
            />
          )}
        </div>

        {/* Right Column - Contact Form */}
        <div className="lg:col-span-1">
          <ContactForm
            propertyId={property.id}
            propertyTitle={property.title}
          />
        </div>
      </div>
    </div>
  );
};

export default PropertyPage;
