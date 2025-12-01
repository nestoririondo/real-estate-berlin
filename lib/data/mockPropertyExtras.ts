/**
 * Mock extended property details
 * In a real application, this data would come from an API
 */
export interface PropertyExtras {
  yearBuilt: number;
  propertyType: string;
  parking: string;
  garden: string;
  energyRating: string;
  description: string;
  features: string[];
  galleryImages: string[];
}

/**
 * Get mock extended details for a property
 * TODO: Replace with actual API call
 */
export function getPropertyExtras(propertyId: number): PropertyExtras {
  // In a real app, this would be fetched from an API based on propertyId
  return {
    yearBuilt: 1920,
    propertyType: "Apartment",
    parking: "Street parking available",
    garden: "Shared courtyard",
    energyRating: "B",
    description:
      "This elegant Altbau apartment in the heart of Prenzlauer Berg offers a perfect blend of historic charm and modern comfort. The property features high ceilings, original parquet flooring, and large windows that flood the space with natural light. The open-plan living area seamlessly connects to a modern kitchen, while the bedrooms offer peaceful retreats. Located in one of Berlin's most desirable neighborhoods, you'll find excellent restaurants, cafes, and cultural attractions just steps away.",
    features: [
      "High ceilings",
      "Original parquet flooring",
      "Modern kitchen",
      "Balcony access",
      "Elevator",
      "Basement storage",
    ],
    galleryImages: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
    ],
  };
}
