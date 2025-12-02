export interface Service {
  id: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

export const services: Service[] = [
  {
    id: "buy",
    title: "Buy",
    description:
      "Are you interested in buying an apartment in Berlin? Send us your inquiry or your search criteria. We will give you a prompt feedback on the current availability and the offers matching with you!",
    buttonText: "Services",
    buttonLink: "/services",
  },
  {
    id: "sell",
    title: "Sell",
    description:
      "Are you looking to sell your property in Berlin? Let's get in touch! We can provide you a property evaluation and carry out the whole process, supporting you in all aspects related from A to Z.",
    buttonText: "Services",
    buttonLink: "/services",
  },
  {
    id: "renovate",
    title: "Renovate",
    description:
      "Have you purchased an apartment that needs renovation, or do you want to remodel before offering the apartment for sale? We can coordinate and follow all phases of the work, from the initial estimate to the key handover.",
    buttonText: "Services",
    buttonLink: "/services",
  },
  {
    id: "consulting",
    title: "Consulting",
    description:
      "Are you looking for a purchase agent? We will master the strategy for you. Any consulting related service will be discussed and tailored individually.",
    buttonText: "Services",
    buttonLink: "/services",
  },
];
