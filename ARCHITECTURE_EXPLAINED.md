# Why Do We Need Layer 3 (API Routes)? 🤔

## The Problem

You have a **Client Component** (`"use client"`) that needs to fetch data, but:

1. **API Keys Must Stay Secret** 🔐
   - Your Propstack API key should NEVER be exposed to the browser
   - If you call `fetchPropertiesFromAPI` directly from a client component, the API key would be in the client bundle (visible to anyone)

2. **Server-Side Functions Can't Run in Browser** 🚫
   - `getProperties()` uses `fetchPropertiesFromAPI()` which uses `next: { revalidate: 300 }` (server-side caching)
   - This only works on the server, not in the browser

3. **CORS Issues** 🌐
   - Browsers block direct API calls to external domains (like `api.propstack.de`)
   - You need a server to proxy the request

---

## The Solution: API Route Layer

The API Route (`app/api/properties/route.ts`) acts as a **bridge**:

```
┌─────────────────────────────────────────┐
│  Client Component (Browser)             │
│  - Can't access API keys               │
│  - Can't use server-side features      │
└──────────────┬──────────────────────────┘
               │
               │ HTTP Request
               │ (no API key exposed)
               ▼
┌─────────────────────────────────────────┐
│  API Route (Server)                     │
│  /api/properties/route.ts               │
│  - Has access to API keys               │
│  - Calls getProperties()                │
│  - Returns data to client               │
└──────────────┬──────────────────────────┘
               │
               │ Calls service layer
               ▼
┌─────────────────────────────────────────┐
│  Service Layer (Server)                 │
│  getProperties()                        │
│  - Business logic                       │
│  - Data transformation                  │
└──────────────┬──────────────────────────┘
               │
               │ Calls API client
               ▼
┌─────────────────────────────────────────┐
│  API Client (Server)                    │
│  fetchPropertiesFromAPI()               │
│  - Makes HTTP request to Propstack     │
│  - Uses API key (server-side only)     │
└─────────────────────────────────────────┘
```

---

## Two Ways to Fetch Data

### Option 1: Server Component (Simpler, No API Route Needed)

```typescript
// app/[locale]/properties/page.tsx
// NO "use client" - this is a Server Component

import { getProperties } from "@/lib/services/propertyService";

export default async function PropertiesPage({ params }) {
  // Directly call service - runs on server
  const properties = await getProperties({ locale: "en" });
  
  return <PropertyList properties={properties} />;
}
```

**Pros:**
- ✅ Simpler - no API route needed
- ✅ Faster - data fetched on server
- ✅ SEO friendly
- ✅ API keys stay secure

**Cons:**
- ❌ Can't use React hooks (useState, useEffect)
- ❌ No real-time updates without page refresh
- ❌ Less interactive

---

### Option 2: Client Component + API Route (More Interactive)

```typescript
// app/[locale]/properties/page.tsx
"use client"; // Client Component

import { useProperties } from "@/hooks/useProperties";

export default function PropertiesPage() {
  // Hook calls /api/properties (which calls getProperties on server)
  const { properties, loading, error } = useProperties();
  
  return <PropertyList properties={properties} />;
}
```

**Pros:**
- ✅ Can use React hooks
- ✅ Real-time updates
- ✅ Loading states
- ✅ Can refetch without page refresh

**Cons:**
- ❌ More complex (needs API route)
- ❌ Slower initial load (client-side fetch)
- ❌ API route needed

---

## Why You're Not Using It Yet

Looking at your code:

```typescript
// app/[locale]/properties/page.tsx
const { properties, loading, error, refetch } = useProperties(); // ✅ Hook is called
// BUT...
const filteredProperties = filterProperties(allProperties, filters); // ❌ Using mock data!
```

**You're calling the hook but not using the data!** 

You should do:

```typescript
const { properties, loading, error } = useProperties();
const filteredProperties = filterProperties(properties, filters); // Use real data!
```

---

## Simplified Architecture (If You Don't Need Interactivity)

If you don't need real-time updates or interactive features, you can **skip the API route** and use a Server Component:

```typescript
// app/[locale]/properties/page.tsx
import { getProperties } from "@/lib/services/propertyService";

export default async function PropertiesPage({ params }) {
  const { locale } = await params;
  const properties = await getProperties({ locale });
  
  return <PropertyListClient initialProperties={properties} />;
}
```

This way:
- ✅ No API route needed
- ✅ Simpler architecture
- ✅ Still secure (API keys on server)
- ✅ Still uses service layer for business logic

---

## Summary

**Layer 3 (API Routes) is ONLY needed if:**
- You have a Client Component that needs to fetch data
- You need real-time updates/interactivity
- You want to keep API keys secure

**You can skip Layer 3 if:**
- You use Server Components
- You don't need real-time updates
- You're okay with page refreshes for new data

**In your case:** You're using a Client Component, so you DO need the API route. But you're not actually using the fetched data yet - you're still using `allProperties` (mock data).

