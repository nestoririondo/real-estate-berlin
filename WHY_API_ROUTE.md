# Why Do We Need the API Route Layer? 🤔

## The Problem You're Facing

You have a **Client Component** (`"use client"`) that needs data, but:

### ❌ Can't Do This (Security Issue):
```typescript
"use client";

// This would expose your API key to the browser! 🚨
const apiKey = process.env.NEXT_PUBLIC_PROPSTACK_API_KEY;
fetch("https://api.propstack.de/v2/properties", {
  headers: { "X-API-Key": apiKey } // ❌ Visible in browser!
});
```

### ❌ Can't Do This (Server-Only Feature):
```typescript
"use client";

// This won't work - next: { revalidate } only works on server
const response = await fetch(url, {
  next: { revalidate: 300 } // ❌ Only works in Server Components
});
```

### ❌ Can't Do This (Direct Service Call):
```typescript
"use client";

// This won't work - getProperties() uses server-side features
import { getProperties } from "@/lib/services/propertyService";
const properties = await getProperties(); // ❌ Server-only!
```

---

## The Solution: API Route (Layer 3)

The API Route acts as a **secure bridge** between your client and the server:

```
Browser (Client Component)
    ↓
    Calls: /api/properties (your own API)
    ↓
Server (API Route)
    ↓
    Calls: getProperties() (service layer)
    ↓
    Calls: fetchPropertiesFromAPI() (API client)
    ↓
Propstack API
```

**Why this works:**
- ✅ API key stays on server (never sent to browser)
- ✅ Server-side caching works
- ✅ No CORS issues
- ✅ Client can fetch data safely

---

## Your Current Code Issue

You're calling the hook but **not using the data**:

```typescript
// ❌ WRONG - You're fetching but not using it!
const { properties, loading, error } = useProperties();
const filteredProperties = filterProperties(allProperties, filters); // Using mock data!
```

**Should be:**
```typescript
// ✅ CORRECT - Use the fetched data
const { properties, loading, error } = useProperties();
const filteredProperties = filterProperties(properties, filters); // Use real data!
```

---

## When You DON'T Need Layer 3

If you use a **Server Component** instead:

```typescript
// app/[locale]/properties/page.tsx
// NO "use client" - this is a Server Component

import { getProperties } from "@/lib/services/propertyService";

export default async function PropertiesPage({ params }) {
  // Directly call service - runs on server ✅
  const properties = await getProperties({ locale: "en" });
  
  // Pass to client component for interactivity
  return <PropertyListClient initialProperties={properties} />;
}
```

**Benefits:**
- ✅ No API route needed
- ✅ Simpler architecture
- ✅ Faster (server-side fetch)
- ✅ Still secure (API keys on server)

**Trade-off:**
- ❌ Less interactive (no real-time updates without page refresh)

---

## Summary

**Layer 3 (API Route) is needed because:**
1. You're using a Client Component (`"use client"`)
2. Client components can't directly call server-side functions
3. API keys must stay on the server
4. You need a secure way to fetch data from the client

**You could skip Layer 3 if:**
- You convert to a Server Component
- You don't need real-time updates
- You're okay with page refreshes

**But right now:** You need it because you're using a Client Component!

