import { notFound } from "next/navigation";
import { PropertyGallery } from "@/components/properties/PropertyGallery";
import { PropertyDetails } from "@/components/properties/PropertyDetails";
import { ContactForm } from "@/components/properties/ContactForm";
import { Bed, Bath, Square, MapPin } from "lucide-react";
import { allProperties } from "@/lib/data/properties";
import type { Property } from "@/types/property";

// Mock function - replace with actual API call
const getProperty = async (id: string): Promise<Property | null> => {
  const property = allProperties.find((p) => p.id === Number(id));
  return property || null;
};

interface PropertyPageProps {
  params: Promise<{ id: string }>;
}

const PropertyPage = async ({ params }: PropertyPageProps) => {
  const { id } = await params;
  const property = await getProperty(id);

  if (!property) {
    notFound();
  }

  // Generate additional images for gallery (in real app, these would come from API)
  const galleryImages = [
    property.image,
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
    "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800",
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{property.title}</h1>
        <div className="flex items-center gap-1 text-muted-foreground mb-4">
          <MapPin className="h-5 w-5" />
          <span className="text-lg">{property.location}</span>
        </div>
        <div className="flex items-center gap-6 text-lg">
          <div className="flex items-center gap-2">
            <Bed className="h-5 w-5" />
            <span>{property.beds} Bedrooms</span>
          </div>
          <div className="flex items-center gap-2">
            <Bath className="h-5 w-5" />
            <span>{property.baths} Bathrooms</span>
          </div>
          <div className="flex items-center gap-2">
            <Square className="h-5 w-5" />
            <span>{property.sqm}m²</span>
          </div>
        </div>
        <p className="text-3xl font-bold text-primary mt-4">{property.price}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Gallery and Details */}
        <div className="lg:col-span-2 space-y-8">
          <PropertyGallery images={galleryImages} title={property.title} />
          <PropertyDetails property={property} />
        </div>

        {/* Right Column - Contact Form */}
        <div className="lg:col-span-1">
          <ContactForm propertyId={property.id} propertyTitle={property.title} />
        </div>
      </div>
    </div>
  );
};

export default PropertyPage;

