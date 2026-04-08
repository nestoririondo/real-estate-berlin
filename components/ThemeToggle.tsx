"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const PALETTES = [
  {
    name: "light",
    label: "Gold Light",
    bg: "#F5F0E8",
    primary: "#C9A436",
  },
  {
    name: "theme-pearl",
    label: "Pearl",
    bg: "#F2F0EC",
    primary: "#2E5266",
  },
  {
    name: "theme-beige",
    label: "Beige",
    bg: "#DDD0C8",
    primary: "#C9963A",
  },
  {
    name: "dark",
    label: "Night",
    bg: "#1B1B2A",
    primary: "#C9A436",
  },
  {
    name: "theme-navy",
    label: "Navy",
    bg: "#0A1828",
    primary: "#BFA181",
  },
  {
    name: "theme-cognac",
    label: "Cognac",
    bg: "#181510",
    primary: "#C8883A",
  },
];

const ThemeToggle = ({ className }: { className?: string }) => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={cn("flex items-center gap-1.5", className)}>
        {PALETTES.map((p) => (
          <div
            key={p.name}
            className="h-5 w-5 rounded-full border border-white/20 opacity-50"
            style={{ background: p.bg }}
          />
        ))}
      </div>
    );
  }

  const activeTheme = theme === "system" ? (resolvedTheme || "dark") : theme;

  return (
    <div className={cn("flex items-center gap-1.5", className)} role="group" aria-label="Choose color palette">
      {PALETTES.map((p) => {
        const isActive = activeTheme === p.name;
        return (
          <button
            key={p.name}
            onClick={() => setTheme(p.name)}
            aria-label={p.label}
            title={p.label}
            className={cn(
              "relative h-5 w-5 rounded-full transition-all duration-200 cursor-pointer",
              "border-2",
              isActive
                ? "scale-125 shadow-md"
                : "opacity-60 hover:opacity-90 hover:scale-110 border-transparent"
            )}
            style={{
              background: p.bg,
              borderColor: isActive ? p.primary : "transparent",
              boxShadow: isActive ? `0 0 0 1px ${p.primary}` : undefined,
            }}
          >
            {/* Inner dot showing primary/accent colour */}
            <span
              className="absolute inset-[4px] rounded-full"
              style={{ background: p.primary }}
            />
          </button>
        );
      })}
    </div>
  );
};

export { ThemeToggle };
