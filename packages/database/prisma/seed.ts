import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const categories = [
  { name: "Flowers", slug: "flowers", icon: "💐" },
  { name: "Salon", slug: "salon", icon: "✂️" },
  { name: "Tailor", slug: "tailor", icon: "🧵" },
  { name: "Grocery", slug: "grocery", icon: "🛒" },
  { name: "Restaurant", slug: "restaurant", icon: "🍴" },
  { name: "Electrician", slug: "electrician", icon: "🔧" },
  { name: "Pharmacy", slug: "pharmacy", icon: "💊" },
  { name: "Bakery", slug: "bakery", icon: "🍰" },
];

const businesses = [
  {
    name: "Cut N Cute Studio",
    slug: "cut-n-cute-studio",
    description: "Unisex salon in Kodihalli offering haircuts, colour, spa treatments and grooming services.",
    address: "Kodihalli, Bengaluru, Karnataka",
    neighbourhood: "Kodihalli",
    latitude: 12.9611,
    longitude: 77.6484,
    phone: "+91 82170 09543",
    whatsapp: "+91 82170 09543",
    rating: 4.8,
    reviewCount: 210,
    isPremium: true,
    coverEmoji: "✂️",
    categorySlug: "salon",
  },
  {
    name: "Cut N Cute Men Salon",
    slug: "cut-n-cute-men-salon",
    description: "Men's-only grooming brand — precision cuts, beard styling, and spa.",
    address: "Bengaluru, Karnataka",
    neighbourhood: "Kodihalli",
    latitude: 12.9310008,
    longitude: 77.6975567,
    phone: "+91 82170 09543",
    whatsapp: "+91 82170 09543",
    rating: 4.9,
    reviewCount: 515,
    isPremium: true,
    coverEmoji: "💈",
    categorySlug: "salon",
  },
  {
    name: "Aya Flowers",
    slug: "aya-flowers",
    description: "Premium florist specialising in bespoke bouquets and event florals.",
    address: "Whitefield, Bengaluru, Karnataka",
    neighbourhood: "Whitefield",
    latitude: 12.9698,
    longitude: 77.7499,
    phone: "+91 90000 00001",
    whatsapp: "",
    rating: 4.9,
    reviewCount: 88,
    isPremium: false,
    coverEmoji: "💐",
    categorySlug: "flowers",
  },
  {
    name: "Style Express",
    slug: "style-express",
    description: "Neighbourhood salon known for quick, reliable service.",
    address: "Kadugodi, Bengaluru, Karnataka",
    neighbourhood: "Kadugodi",
    latitude: 12.9926,
    longitude: 77.766,
    phone: "+91 90000 00002",
    whatsapp: "",
    rating: 4.6,
    reviewCount: 64,
    isPremium: false,
    coverEmoji: "✂️",
    categorySlug: "salon",
  },
  {
    name: "Fresh Mart",
    slug: "fresh-mart",
    description: "Daily-needs grocery store with fresh produce and essentials.",
    address: "Belathur, Bengaluru, Karnataka",
    neighbourhood: "Belathur",
    latitude: 12.9814,
    longitude: 77.757,
    phone: "+91 90000 00003",
    whatsapp: "",
    rating: 4.5,
    reviewCount: 132,
    isPremium: false,
    coverEmoji: "🛒",
    categorySlug: "grocery",
  },
  {
    name: "Master Tailors",
    slug: "master-tailors",
    description: "Custom stitching, alterations, and made-to-measure formalwear.",
    address: "HAL 2nd Stage, Bengaluru, Karnataka",
    neighbourhood: "HAL 2nd Stage",
    latitude: 12.9601,
    longitude: 77.6484,
    phone: "+91 90000 00004",
    whatsapp: "",
    rating: 4.7,
    reviewCount: 47,
    isPremium: false,
    coverEmoji: "🧵",
    categorySlug: "tailor",
  },
  {
    name: "Spice Route Kitchen",
    slug: "spice-route-kitchen",
    description: "Multi-cuisine restaurant with dine-in and home delivery.",
    address: "Marathahalli, Bengaluru, Karnataka",
    neighbourhood: "Marathahalli",
    latitude: 12.9569,
    longitude: 77.7011,
    phone: "+91 90000 00005",
    whatsapp: "",
    rating: 4.4,
    reviewCount: 301,
    isPremium: true,
    coverEmoji: "🍴",
    categorySlug: "restaurant",
  },
  {
    name: "QuickFix Electricals",
    slug: "quickfix-electricals",
    description: "On-call electricians for home and office repairs.",
    address: "Indiranagar, Bengaluru, Karnataka",
    neighbourhood: "Indiranagar",
    latitude: 12.9719,
    longitude: 77.6412,
    phone: "+91 90000 00006",
    whatsapp: "",
    rating: 4.3,
    reviewCount: 58,
    isPremium: false,
    coverEmoji: "🔧",
    categorySlug: "electrician",
  },
];

async function main() {
  console.log("Seeding categories...");
  const categoryMap: Record<string, string> = {};
  for (const c of categories) {
    const created = await prisma.category.upsert({
      where: { slug: c.slug },
      update: {},
      create: c,
    });
    categoryMap[c.slug] = created.id;
  }

  console.log("Seeding businesses...");
  for (const b of businesses) {
    const { categorySlug, ...data } = b;
    await prisma.business.upsert({
      where: { slug: b.slug },
      update: {},
      create: {
        ...data,
        category: { connect: { id: categoryMap[categorySlug] } },
        reviews: {
          create: [
            { rating: 5, comment: "Great experience, highly recommend!", authorName: "Priya S." },
            { rating: 4, comment: "Good service, will visit again.", authorName: "Rahul K." },
          ],
        },
      },
    });
  }

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
