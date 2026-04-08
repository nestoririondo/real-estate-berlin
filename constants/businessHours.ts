export interface BusinessHours {
  [key: number]: {
    open?: number; // Hour in 24-hour format (0-23)
    close?: number; // Hour in 24-hour format (0-23)
    closed?: boolean;
  };
}

// Business hours configuration
// Day of week: 0 = Sunday, 1 = Monday, ..., 6 = Saturday
// Fractional hours: 9.5 = 9:30, 17.5 = 17:30, etc.
export const BUSINESS_HOURS: BusinessHours = {
  0: { closed: true }, // Sunday: Closed
  1: { open: 9.5, close: 17.5 }, // Monday: 9:30 AM - 5:30 PM
  2: { open: 9.5, close: 17.5 }, // Tuesday: 9:30 AM - 5:30 PM
  3: { open: 9.5, close: 17.5 }, // Wednesday: 9:30 AM - 5:30 PM
  4: { open: 9.5, close: 17.5 }, // Thursday: 9:30 AM - 5:30 PM
  5: { open: 9.5, close: 17.5 }, // Friday: 9:30 AM - 5:30 PM
  6: { open: 11, close: 16 }, // Saturday: 11:00 AM - 4:00 PM
};

/**
 * Check if the business is currently open based on current time
 */
export const isBusinessOpen = (): boolean => {
  const now = new Date();
  const day = now.getDay();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const currentTime = hours + minutes / 60;

  const dayHours = BUSINESS_HOURS[day];

  if (!dayHours || dayHours.closed || dayHours.open === undefined || dayHours.close === undefined) {
    return false;
  }

  return currentTime >= dayHours.open && currentTime < dayHours.close;
};

/**
 * Format business hours for display
 * @param _locale - Locale parameter (reserved for future use)
 */
export const formatBusinessHours = (_locale: string = "en"): string[] => {
  // Locale parameter reserved for future localization support
  void _locale;
  const formatTime = (hour: number): string => {
    const period = hour >= 12 ? "PM" : "AM";
    const h = Math.floor(hour);
    const m = Math.round((hour - h) * 60);
    const displayHour = h > 12 ? h - 12 : h === 0 ? 12 : h;
    return `${displayHour}:${m.toString().padStart(2, "0")} ${period}`;
  };

  const days = [
    "Monday - Friday",
    "Saturday",
    "Sunday",
  ];

  const hours = [
    `${formatTime(BUSINESS_HOURS[1].open!)} - ${formatTime(BUSINESS_HOURS[1].close!)}`,
    `${formatTime(BUSINESS_HOURS[6].open!)} - ${formatTime(BUSINESS_HOURS[6].close!)}`,
    "Closed",
  ];

  return days.map((day, index) => `${day}: ${hours[index]}`);
};

/**
 * Get formatted business hours as an array of strings for display
 */
export const getBusinessHoursDisplay = (): Array<{ day: string; hours: string }> => {
  const formatTime = (hour: number): string => {
    const period = hour >= 12 ? "PM" : "AM";
    const h = Math.floor(hour);
    const m = Math.round((hour - h) * 60);
    const displayHour = h > 12 ? h - 12 : h === 0 ? 12 : h;
    return `${displayHour}:${m.toString().padStart(2, "0")} ${period}`;
  };

  return [
    {
      day: "Monday - Friday",
      hours: `${formatTime(BUSINESS_HOURS[1].open!)} - ${formatTime(BUSINESS_HOURS[1].close!)}`,
    },
    {
      day: "Saturday",
      hours: `${formatTime(BUSINESS_HOURS[6].open!)} - ${formatTime(BUSINESS_HOURS[6].close!)}`,
    },
    {
      day: "Sunday",
      hours: "Closed",
    },
  ];
};

