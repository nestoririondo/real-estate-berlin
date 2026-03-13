export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  image: string;
}

export const services: Service[] = [
  {
    id: "buy",
    title: "Buy",
    shortDescription: "Find your perfect apartment in Berlin — from family homes to investment properties, we guide you from first viewing to closing.",
    description:
      "Stop renting and start owning — your ideal apartment in Berlin is closer than you think. Whether you're searching for a family home or a stylish pied-à-terre in your favourite neighbourhood, we match you with the right property from our exclusive portfolio. Subscribe to our newsletter and get access to brand-new listings before they ever appear online.",
    image: "/buy.jpg",
  },
  {
    id: "sell",
    title: "Sell",
    shortDescription: "From accurate valuation to smooth closing — we manage your sale with a tailored strategy and our full multilingual network behind it.",
    description:
      "Selling your property is more than a transaction — it's a personal decision that deserves a personal approach. We offer an accurate, market-driven valuation alongside a carefully crafted sales strategy tailored to your goals. Our multilingual network and years of Berlin expertise ensure maximum exposure and the best possible outcome, every step of the way.",
    image: "/berlin-4577624_1920.jpg",
  },
  {
    id: "renovate",
    title: "Renovate",
    shortDescription: "We connect you with trusted firms and oversee every phase — from design and estimates to materials and key handover.",
    description:
      "Buying a property that needs work, or refreshing one before re-letting or reselling? We connect you with trusted renovation firms we have collaborated with for years and oversee every phase — from the initial design and cost estimates to material selection and final key handover. You stay informed throughout, in your language, without the stress.",
    image: "/front-page-ashtray-book-cushion-decoration-298842.jpg",
  },
  {
    id: "consulting",
    title: "Consulting",
    shortDescription: "Expert advice on Berlin's regulations, property documents, and international markets — tailored individually to your situation.",
    description:
      "From navigating Berlin's regulatory landscape — redevelopment areas, rent controls, notice periods — to reviewing property documentation and offering a clear second opinion, we are here to advise you individually. We also support buyers with international ambitions: thanks to our network in Spain, Italy, Portugal and beyond, we can help you turn a dream property abroad into a reality.",
    image: "/consulting.jpg",
  },
];
