# Implementation Examples

## Example 1: Server Component (Recommended for Initial Load)

```typescript
// app/[locale]/properties/page.tsx
import { getProperties } from "@/lib/services/propertyService";
import { PropertyList } from "@/components/properties/PropertyList";

interface PropertiesPageProps {
  params: Promise<{ locale: string }>;
}

// This is a Server Component - runs on the server
export default async function PropertiesPage({ params }: PropertiesPageProps) {
  const { locale } = await params;
  
  // Fetch data on the server
  const properties = await getProperties({
    locale: locale === "de" ? "de" : "en",
    status: "8814,8815", // Online or "In Vermarktung" status IDs
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">
        Properties ({properties.length})
      </h1>
      <PropertyList properties={properties} />
    </div>
  );
}
```

**Pros**:
- ✅ Fast - data fetched on server
- ✅ SEO friendly
- ✅ API keys stay secure
- ✅ No loading state needed

---

## Example 2: Client Component with Hook (For Interactivity)

```typescript
// app/[locale]/properties/page.tsx
"use client";

import { useProperties } from "@/hooks/useProperties";
import { PropertyList } from "@/components/properties/PropertyList";
import { PropertyFilter } from "@/components/properties/PropertyFilter";
import { useState } from "react";

export default function PropertiesPage() {
  const [filters, setFilters] = useState({});
  
  // Use the hook to fetch data
  const { properties, loading, error, refetch } = useProperties({
    locale: "en",
    status: "8814,8815",
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <button onClick={refetch}>Refresh</button>
      <PropertyList properties={properties} />
    </div>
  );
}
```

**Pros**:
- ✅ Can refetch without page reload
- ✅ Real-time updates
- ✅ Better for interactive features

---

## Example 3: Hybrid Approach (Best of Both Worlds)

```typescript
// app/[locale]/properties/page.tsx (Server Component)
import { getProperties } from "@/lib/services/propertyService";
import { PropertyListClient } from "@/components/properties/PropertyListClient";

export default async function PropertiesPage({ params }) {
  const { locale } = await params;
  
  // Initial data from server (fast, SEO-friendly)
  const initialProperties = await getProperties({
    locale: locale === "de" ? "de" : "en",
    status: "8814,8815",
  });

  return (
    <PropertyListClient 
      initialProperties={initialProperties}
      locale={locale}
    />
  );
}
```

```typescript
// components/properties/PropertyListClient.tsx (Client Component)
"use client";

import { useProperties } from "@/hooks/useProperties";
import { useState } from "react";

export function PropertyListClient({ 
  initialProperties, 
  locale 
}) {
  const [filters, setFilters] = useState({});
  
  // Use hook for real-time updates
  const { properties, loading, refetch } = useProperties({
    locale,
    status: "8814,8815",
  });

  // Use initial data while loading
  const displayProperties = loading ? initialProperties : properties;

  return (
    <div>
      <button onClick={refetch}>Refresh</button>
      <PropertyList properties={displayProperties} />
    </div>
  );
}
```

**Pros**:
- ✅ Fast initial load (server)
- ✅ Real-time updates (client)
- ✅ SEO friendly
- ✅ Great UX

---

## Data Flow Diagram

```
┌─────────────────────────────────────────┐
│  User visits /properties                │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  Server Component (page.tsx)            │
│  - Calls getProperties()                │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  Service Layer (propertyService.ts)     │
│  - Applies business logic               │
│  - Transforms data                      │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  API Client (propstack.ts)              │
│  - Makes HTTP request                   │
│  - Handles authentication               │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  Propstack API                          │
│  - Returns property data                │
└─────────────────────────────────────────┘
```

---

## Key Takeaways

1. **Layer 1 (API)**: Just makes HTTP requests
2. **Layer 2 (Service)**: Applies business logic and transforms data
3. **Layer 3 (Route/Component)**: Decides where to fetch (server vs client)
4. **Layer 4 (Hook)**: Manages client-side state
5. **Layer 5 (UI)**: Displays the data

Each layer has a single responsibility, making the code:
- ✅ Easy to test
- ✅ Easy to maintain
- ✅ Easy to change (e.g., switch APIs)
- ✅ Type-safe
- ✅ Reusable

