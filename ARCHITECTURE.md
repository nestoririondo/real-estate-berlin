# API Data Fetching Architecture

## Layer-by-Layer Architecture

### Layer 1: API Client Layer (`lib/api/`)
**Purpose**: Raw API communication - handles HTTP requests, authentication, error handling

**Responsibilities**:
- Make HTTP requests to external APIs
- Handle authentication (API keys, tokens)
- Transform API responses to consistent format
- Handle network errors and retries

**Example Structure**:
```
lib/api/
  ├── propstack.ts          # Propstack API client
  ├── types.ts              # API response types
  └── errors.ts             # Custom error classes
```

**Best Practices**:
- Keep API-specific logic isolated
- Use TypeScript for type safety
- Handle errors gracefully
- Don't expose API keys to client (use server-side)

---

### Layer 2: Data Service Layer (`lib/services/`)
**Purpose**: Business logic and data transformation - converts API data to app models

**Responsibilities**:
- Map API responses to your app's data models
- Apply business rules and transformations
- Combine data from multiple sources if needed
- Cache data when appropriate

**Example Structure**:
```
lib/services/
  ├── propertyService.ts    # Property business logic
  └── mappers.ts            # Data transformation functions
```

**Best Practices**:
- Keep business logic separate from API calls
- Make transformations reusable
- Handle edge cases (missing data, null values)

---

### Layer 3: Server Actions/API Routes (`app/api/` or Server Components)
**Purpose**: Server-side data fetching - secure, cached, SEO-friendly

**Responsibilities**:
- Fetch data on the server (keeps API keys secure)
- Implement caching strategies
- Handle server-side errors
- Provide API endpoints for client components

**Two Approaches**:

#### A. Server Components (Recommended for initial load)
- Fetch data directly in Server Components
- Data is fetched at build time or request time
- No client-side JavaScript needed
- Great for SEO

#### B. API Routes (For client-side fetching)
- Create `/app/api/*/route.ts` endpoints
- Proxy requests to external APIs
- Keep API keys server-side
- Can be called from client components

**Example Structure**:
```
app/
  ├── [locale]/
  │   └── properties/
  │       └── page.tsx          # Server Component (fetches data)
  └── api/
      └── properties/
          └── route.ts           # API Route (for client fetching)
```

---

### Layer 4: Data Hooks (`hooks/`)
**Purpose**: Client-side data fetching with React hooks

**Responsibilities**:
- Fetch data in client components
- Manage loading/error states
- Handle refetching and caching
- Provide reactive data updates

**Example Structure**:
```
hooks/
  ├── useProperties.ts       # Custom hook for properties
  └── useProperty.ts         # Custom hook for single property
```

**Best Practices**:
- Use React Query or SWR for caching/refetching
- Handle loading and error states
- Provide optimistic updates when possible

---

### Layer 5: Presentation Layer (`components/` and `app/`)
**Purpose**: UI components that display data

**Responsibilities**:
- Render data in the UI
- Handle user interactions
- Show loading/error states
- Format data for display

**Example Structure**:
```
components/
  └── properties/
      ├── PropertyCard.tsx
      ├── PropertyList.tsx
      └── PropertyFilter.tsx
```

---

## Recommended Architecture for Your App

### Option 1: Server Components (Best for SEO, Initial Load)
```
┌─────────────────────────────────────┐
│  app/[locale]/properties/page.tsx  │  ← Server Component
│  (Fetches data on server)          │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  lib/services/propertyService.ts    │  ← Business Logic
│  (Transforms API data)               │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  lib/api/propstack.ts                │  ← API Client
│  (Makes HTTP requests)               │
└──────────────────────────────────────┘
```

**Pros**:
- ✅ Fast initial load (no client-side fetch)
- ✅ SEO friendly
- ✅ API keys stay on server
- ✅ Automatic caching with Next.js

**Cons**:
- ❌ No real-time updates
- ❌ Requires page refresh for new data

---

### Option 2: Client Components + API Routes (Best for Interactivity)
```
┌─────────────────────────────────────┐
│  app/[locale]/properties/page.tsx   │  ← Client Component
│  (Uses hooks to fetch data)          │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  hooks/useProperties.ts             │  ← Data Hook
│  (Manages state, loading, errors)    │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  app/api/properties/route.ts         │  ← API Route
│  (Proxies to external API)           │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  lib/api/propstack.ts                │  ← API Client
│  (Makes HTTP requests)               │
└──────────────────────────────────────┘
```

**Pros**:
- ✅ Real-time updates
- ✅ Better UX (loading states, optimistic updates)
- ✅ Can refetch without page refresh
- ✅ API keys stay on server

**Cons**:
- ❌ Slower initial load (client-side fetch)
- ❌ More complex state management

---

### Option 3: Hybrid (Recommended)
**Use Server Components for initial load, Client Components for interactions**

```
Initial Load (Server):
app/[locale]/properties/page.tsx (Server Component)
  → lib/services/propertyService.ts
    → lib/api/propstack.ts

User Interactions (Client):
hooks/useProperties.ts (Client Hook)
  → app/api/properties/route.ts
    → lib/api/propstack.ts
```

**Pros**:
- ✅ Best of both worlds
- ✅ Fast initial load + interactive updates
- ✅ SEO friendly + great UX

---

## Implementation Example

### 1. API Client Layer
```typescript
// lib/api/propstack.ts
export const fetchProperties = async (params) => {
  const response = await fetch(url, {
    headers: { "X-API-Key": process.env.PROPSTACK_API_KEY },
  });
  return response.json();
};
```

### 2. Service Layer
```typescript
// lib/services/propertyService.ts
import { fetchProperties } from "@/lib/api/propstack";
import { mapPropstackToProperty } from "./mappers";

export const getProperties = async () => {
  const data = await fetchProperties();
  return data.map(mapPropstackToProperty);
};
```

### 3. Server Component
```typescript
// app/[locale]/properties/page.tsx
import { getProperties } from "@/lib/services/propertyService";

export default async function PropertiesPage() {
  const properties = await getProperties(); // Fetched on server
  
  return <PropertyList properties={properties} />;
}
```

### 4. Client Hook (Alternative)
```typescript
// hooks/useProperties.ts
export function useProperties() {
  const { data, loading, error } = useSWR(
    "/api/properties",
    fetcher
  );
  return { properties: data, loading, error };
}
```

### 5. API Route (For Client Fetching)
```typescript
// app/api/properties/route.ts
import { getProperties } from "@/lib/services/propertyService";

export async function GET() {
  const properties = await getProperties();
  return Response.json(properties);
}
```

---

## Key Principles

1. **Separation of Concerns**: Each layer has a single responsibility
2. **Type Safety**: Use TypeScript throughout
3. **Error Handling**: Handle errors at each layer appropriately
4. **Caching**: Cache at the right level (server vs client)
5. **Security**: Keep API keys on the server
6. **Performance**: Choose the right approach for each use case

---

## For Your Real Estate App

**Recommended**: Hybrid Approach

1. **Initial Load**: Server Component fetches properties
2. **Filtering/Search**: Client Component with API Route
3. **Real-time Updates**: Use React Query or SWR for caching

This gives you:
- Fast initial page load
- SEO-friendly content
- Interactive filtering
- Real-time updates when needed

