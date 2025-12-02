"use client";

import * as React from "react";
import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { LanguageSelector } from "@/components/LanguageSelector";
import { cn } from "@/lib/utils";

// Simple logo component for the navbar
const Logo = (props: React.SVGAttributes<SVGElement>) => {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 324 323"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...(props as any)}
    >
      <rect
        x="88.1023"
        y="144.792"
        width="151.802"
        height="36.5788"
        rx="18.2894"
        transform="rotate(-38.5799 88.1023 144.792)"
        fill="currentColor"
      />
      <rect
        x="85.3459"
        y="244.537"
        width="151.802"
        height="36.5788"
        rx="18.2894"
        transform="rotate(-38.5799 85.3459 244.537)"
        fill="currentColor"
      />
    </svg>
  );
};

// Hamburger icon component
const HamburgerIcon = ({
  className,
  ...props
}: React.SVGAttributes<SVGElement>) => (
  <svg
    className={cn("pointer-events-none", className)}
    width={16}
    height={16}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
    {...(props as any)}
  >
    <path
      d="M4 12L20 12"
      className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
    />
    <path
      d="M4 12H20"
      className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
    />
    <path
      d="M4 12H20"
      className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
    />
  </svg>
);

// Types
export interface NavbarNavItem {
  href?: string;
  label: string;
  active?: boolean;
}

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  logo?: React.ReactNode;
  logoHref?: string;
}

export const NavBar = React.forwardRef<HTMLElement, NavbarProps>(
  ({ className, logo = <Logo />, logoHref = "#", ...props }, ref) => {
    const [isMobile, setIsMobile] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [shouldAnimate, setShouldAnimate] = useState(false);
    const containerRef = useRef<HTMLElement>(null);
    const pathname = usePathname();
    const t = useTranslations("nav");
    const locale = useLocale();

    // Build navigation links with locale
    const navigationLinks: NavbarNavItem[] = [
      { href: `/${locale}`, label: t("home") },
      { href: `/${locale}/properties`, label: t("properties") },
      { href: `/${locale}#about`, label: t("about") },
      { href: `/${locale}#contact`, label: t("contact") },
    ];

    const handleCloseMenu = () => {
      setIsClosing(true);
      setShouldAnimate(false);
      setTimeout(() => {
        setIsMenuOpen(false);
        setIsClosing(false);
      }, 300); // Match animation duration
    };

    const handleOpenMenu = () => {
      setIsMenuOpen(true);
      // Trigger animation on next frame
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setShouldAnimate(true);
        });
      });
    };

    useEffect(() => {
      if (typeof window === "undefined") return;

      const checkWidth = () => {
        if (containerRef.current) {
          const width = containerRef.current.offsetWidth;
          setIsMobile(width < 768); // 768px is md breakpoint
        }
      };

      checkWidth();

      if (typeof ResizeObserver !== "undefined") {
        const resizeObserver = new ResizeObserver(checkWidth);
        if (containerRef.current) {
          resizeObserver.observe(containerRef.current);
        }

        return () => {
          resizeObserver.disconnect();
        };
      }
    }, []);

    // Combine refs
    const combinedRef = React.useCallback(
      (node: HTMLElement | null) => {
        containerRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref]
    );
    return (
      <header
        ref={combinedRef}
        className={cn(
          "sticky top-0 z-[60] w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 md:px-6 [&_*]:no-underline",
          className
        )}
        {...(props as any)}
      >
        <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between gap-4">
          {/* Left side */}
          <div className="flex items-center gap-2">
            {/* Mobile menu */}
            {isMobile && (
              <>
                {/* Hamburger button - placeholder in normal flow */}
                <div className="h-9 w-9">
                  <button
                    onClick={() => isMenuOpen ? handleCloseMenu() : handleOpenMenu()}
                    aria-expanded={isMenuOpen}
                    className="group h-9 w-9 flex items-center justify-center hover:bg-accent hover:text-accent-foreground rounded-md transition-colors relative"
                  >
                    <HamburgerIcon />
                  </button>
                </div>

                {/* Backdrop overlay, menu, and floating hamburger - rendered via portal */}
                {typeof document !== 'undefined' && createPortal(
                  <>
                    {(isMenuOpen || isClosing) && (
                      <>
                        {/* Backdrop - covers entire page */}
                        <div
                          className={cn(
                            "fixed inset-0 bg-black/30 z-[55] transition-opacity duration-300",
                            isClosing ? "opacity-0" : "animate-in fade-in"
                          )}
                          onClick={handleCloseMenu}
                        />

                        {/* Dropdown menu */}
                        <div
                          className={cn(
                            "fixed left-0 right-0 top-16 z-[56] bg-background shadow-lg border-b transition-transform duration-300 ease-out origin-top scale-y-0",
                            shouldAnimate && !isClosing && "scale-y-100"
                          )}
                        >
                          {navigationLinks.map((link) => {
                            const isActive = link.href === pathname;
                            return (
                              <Link
                                key={link.href}
                                href={link.href || "#"}
                                onClick={handleCloseMenu}
                                className={cn(
                                  "block w-full text-left px-6 py-4 text-lg font-semibold hover:bg-accent transition-colors border-b last:border-b-0",
                                  isActive && "bg-accent text-accent-foreground"
                                )}
                              >
                                {link.label}
                              </Link>
                            );
                          })}
                        </div>
                      </>
                    )}

                    {/* Floating hamburger button - always on top */}
                    <button
                      onClick={() => isMenuOpen ? handleCloseMenu() : handleOpenMenu()}
                      aria-expanded={isMenuOpen}
                      className="group fixed top-4 left-4 h-9 w-9 flex items-center justify-center hover:bg-accent hover:text-accent-foreground rounded-md transition-colors z-[60] bg-background"
                    >
                      <HamburgerIcon />
                    </button>
                  </>,
                  document.body
                )}
              </>
            )}
            {/* Main nav */}
            <div className="flex items-center gap-6">
              <Link
                href={logoHref}
                className="flex items-center space-x-2 text-primary hover:text-primary/90 transition-colors cursor-pointer"
              >
                <div className="text-2xl">{logo}</div>
                <span className="hidden font-bold text-xl sm:inline-block">
                  shadcn.io
                </span>
              </Link>
              {/* Navigation menu */}
              {!isMobile && (
                <NavigationMenu className="flex">
                  <NavigationMenuList className="gap-1">
                    {navigationLinks.map((link, index) => {
                      const isActive = link.href === pathname || link.active;
                      return (
                        <NavigationMenuItem key={index}>
                          <NavigationMenuLink asChild>
                            <Link
                              href={link.href || "#"}
                              className={cn(
                                "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 cursor-pointer relative",
                                "before:absolute before:bottom-0 before:left-0 before:right-0 before:h-0.5 before:bg-primary before:scale-x-0 before:transition-transform before:duration-300 hover:before:scale-x-100",
                                isActive && "before:scale-x-100 text-primary"
                              )}
                              data-active={isActive}
                            >
                              {link.label}
                            </Link>
                          </NavigationMenuLink>
                        </NavigationMenuItem>
                      );
                    })}
                  </NavigationMenuList>
                </NavigationMenu>
              )}
            </div>
          </div>
          {/* Right side */}
          <div className="flex items-center gap-3">
            <LanguageSelector />
          </div>
        </div>
      </header>
    );
  }
);
