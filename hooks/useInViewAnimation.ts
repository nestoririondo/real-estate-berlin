import { useRef } from "react";
import { useInView } from "framer-motion";

type UseInViewOptions = Parameters<typeof useInView>[1];
type MarginType = NonNullable<UseInViewOptions>["margin"];

/**
 * Hook to simplify common animation setup with useInView
 * @param margin - Margin for intersection observer (default: "-100px")
 * @param once - Whether to trigger only once (default: true)
 * @returns Object with ref and isInView boolean
 */
export const useInViewAnimation = (
  margin: MarginType = "-100px",
  once: boolean = true
) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin });
  return { ref, isInView };
};

