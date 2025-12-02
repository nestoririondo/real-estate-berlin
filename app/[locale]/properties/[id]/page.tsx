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
      {/* Back Button */}
      <div className="mb-6">
        <BackButton />
      </div>

      {/* Two Column Layout - Images/Content Left, Contact Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Gallery and Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Gallery */}
          <PropertyGallery images={galleryImages} title={property.title} />

          {/* Property Header - Title, Price, Location, Stats */}
          <div>
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6 mb-6">
              <div className="flex-1">
                <h1 className="text-4xl font-bold mb-3">{property.title}</h1>
                <div className="flex items-center gap-2 text-muted-foreground text-lg mb-4">
                  <MapPin className="h-5 w-5" />
                  <span>{property.location}</span>
                </div>
                <PropertyStats
                  beds={property.beds}
                  baths={property.baths}
                  sqm={property.sqm}
                  size="lg"
                  showLabels
                />
              </div>
              <div className="lg:text-right">
                <p className="text-4xl font-bold text-primary">
                  {formatPrice(property.price, property.currency, locale)}
                </p>
              </div>
            </div>
          </div>

          {/* Property Details */}
          <PropertyDetails property={property} />

          {/* Property Map */}
          {property.coordinates && (
            <PropertyMap
              lat={property.coordinates.lat}
              lng={property.coordinates.lng}
              title={property.title}
              location={property.location}
            />
          )}
        </div>

        {/* Right Column - Contact Form (Sticky) */}
        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-8">
            <ContactForm
              propertyId={property.id}
              propertyTitle={property.title}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyPage;
