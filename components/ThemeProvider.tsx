"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes";

const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem={true}
      themes={["light", "dark", "theme-beige", "theme-pearl", "theme-navy", "theme-cognac"]}
      disableTransitionOnChange={false}
      storageKey="real-estate-berlin-theme"
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
};

export { ThemeProvider };

