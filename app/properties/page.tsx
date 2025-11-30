"use client";

import { useState } from "react";
import { PropertyFilter } from "@/components/properties/PropertyFilter";
import { PropertyCard } from "@/components/properties/PropertyCard";
import type { PropertyFilterValues } from "@/types/filter";
import type { Property } from "@/types/property";
import { filterProperties } from "@/lib/utils/propertyFilter";
import { PropertyType } from "@/types/enums";
import { DEFAULT_FILTERS } from "@/constants/filterDefaults";

const allProperties: Property[] = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1640432342662-70534bc21f0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCZXJsaW4lMjBhbHRiYXUlMjBidWlsZGluZ3xlbnwxfHx8fDE3NTk5MTE5Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    price: "€750,000",
    title: "Elegant Altbau Apartment",
    location: "Prenzlauer Berg",
    beds: 3,
    baths: 2,
    sqm: 95,
    isNew: true,
    type: PropertyType.BUY,
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1751998816246-c63d182770c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBhcGFydG1lbnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NTk4NjMwMDF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    price: "€1,200,000",
    title: "Luxury Penthouse",
    location: "Charlottenburg",
    beds: 4,
    baths: 3,
    sqm: 150,
    isNew: false,
    type: PropertyType.BUY,
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1664813954641-1ffcb7b55fd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBCZXJsaW4lMjBhcGFydG1lbnR8ZW58MXx8fHwxNzU5OTExOTI5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    price: "€580,000",
    title: "Modern Loft Space",
    location: "Kreuzberg",
    beds: 2,
    baths: 1,
    sqm: 80,
    isNew: true,
    type: PropertyType.RENT,
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1707299231603-6c0a93e0f7fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwbGl2aW5nJTIwcm9vbXxlbnwxfHx8fDE3NTk4OTM0MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    price: "€890,000",
    title: "Spacious Family Home",
    location: "Mitte",
    beds: 3,
    baths: 2,
    sqm: 120,
    isNew: false,
    type: PropertyType.BUY,
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1569613003769-58b298f206e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCZXJsaW4lMjBzdHJlZXQlMjB2aWV3fGVufDF8fHx8MTc1OTkxMTkyOXww&ixlib=rb-4.1.0&q=80&w=1080",
    price: "€620,000",
    title: "Charming Courtyard Apartment",
    location: "Friedrichshain",
    beds: 2,
    baths: 1,
    sqm: 75,
    isNew: false,
    type: PropertyType.RENT,
  },
  {
    id: 6,
    image:
      "https://images.unsplash.com/photo-1640432342662-70534bc21f0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCZXJsaW4lMjBhbHRiYXUlMjBidWlsZGluZ3xlbnwxfHx8fDE3NTk5MTE5Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    price: "€1,450,000",
    title: "Premium Corner Unit",
    location: "Charlottenburg",
    beds: 4,
    baths: 3,
    sqm: 140,
    isNew: true,
    type: PropertyType.BUY,
  },
];

const Properties = () => {
  const [filters, setFilters] = useState<PropertyFilterValues>(DEFAULT_FILTERS);

  const filteredProperties = filterProperties(allProperties, filters);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Properties</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filter Sidebar */}
        <div className="lg:col-span-1">
          <PropertyFilter filters={filters} onFilterChange={setFilters} />
        </div>

        {/* Properties Grid */}
        <div className="lg:col-span-3">
          <p className="text-muted-foreground mb-6">
            Showing {filteredProperties.length} of {allProperties.length}{" "}
            properties
          </p>
          {filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg mb-2">
                No properties match your filters
              </p>
              <p className="text-sm text-muted-foreground">
                Try adjusting your search criteria
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Properties;
