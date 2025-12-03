export interface BusinessHours {
  [key: number]: {
    open?: number; // Hour in 24-hour format (0-23)
    close?: number; // Hour in 24-hour format (0-23)
    closed?: boolean;
  };
}

// Business hours configuration
// Day of week: 0 = Sunday, 1 = Monday, ..., 6 = Saturday
export const BUSINESS_HOURS: BusinessHours = {
  0: { closed: true }, // Sunday: Closed
  1: { open: 9, close: 18 }, // Monday: 9:00 AM - 6:00 PM
  2: { open: 9, close: 18 }, // Tuesday: 9:00 AM - 6:00 PM
  3: { open: 9, close: 18 }, // Wednesday: 9:00 AM - 6:00 PM
  4: { open: 9, close: 18 }, // Thursday: 9:00 AM - 6:00 PM
  5: { open: 9, close: 18 }, // Friday: 9:00 AM - 6:00 PM
  6: { open: 10, close: 14 }, // Saturday: 10:00 AM - 2:00 PM
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
 */
export const formatBusinessHours = (locale: string = "en"): string[] => {
  const formatTime = (hour: number): string => {
    const period = hour >= 12 ? "PM" : "AM";
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${displayHour}:00 ${period}`;
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
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${displayHour}:00 ${period}`;
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

