import { Business } from "@/types/business";

export const businesses: Business[] = [
  {
    id: "aya-flowers",
    name: "Aya Flowers",
    category: "Flowers",
    rating: 4.9,
    reviewCount: 284,
    views: 3520,
    phone: "...",
    whatsapp: "...",
    address: "...",
    city: "...",
    state: "...",
    isOpen: true,
    description: "...",
    services: [
      "Bouquets",
      "Wedding Decoration",
      "Birthday Decoration"
    ],
    images: [],
  },
  {
    id: "style-expres",
    name: "Style Expres",
    category: "Salon",
    rating: 4.8,
    reviewCount: 192,
    views: 2175,
    phone: "9876543210",
    whatsapp: "9876543210",
    address: "Kadugodi",
    city: "Bangalore",
    state: "Karnataka",
    isOpen: true,
    description: "Professional salon services for men and women.",
    services: ["Haircut", "Facial", "Hair Spa"],
    images: [],
  },
];