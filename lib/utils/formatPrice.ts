/**
 * Format a price value with currency symbol and locale-specific formatting
 * @param price - The numeric price value
 * @param currency - Currency code (default: "EUR")
 * @param locale - Locale for formatting (default: "de-DE" for German formatting)
 * @returns Formatted price string
 */
export const formatPrice = (
  price: number,
  currency: string = "EUR",
  locale: string = "de-DE"
): string => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};
