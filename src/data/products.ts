export interface Product {
  id: number;
  name: string;
  price: string;
  description: string;
  category: string;
  image: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "The Voyager Tote",
    price: "$450",
    description: "Hand-stitched from full-grain Italian leather, the Voyager Tote is designed for the modern professional. Spacious enough for a laptop yet elegant enough for evening events.",
    category: "Tote",
    image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&q=80&w=2787"
  },
  {
    id: 2,
    name: "Saddle Crossbody",
    price: "$320",
    description: "A timeless classic reimagined. The Saddle Crossbody features our signature brass hardware and an adjustable strap for effortless versatility.",
    category: "Crossbody",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=2669&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Artisan Satchel",
    price: "$580",
    description: "Inspired by vintage postal bags, the Artisan Satchel combines rugged durability with refined aesthetics. Perfect for your daily commute.",
    category: "Satchel",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=2574&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "Weekender Duffle",
    price: "$890",
    description: "Travel in style with our Weekender Duffle. Crafted to age beautifully, developing a unique patina with every journey you take.",
    category: "Duffle",
    image: "https://images.unsplash.com/photo-1476703993278-8569b071aa0e?q=80&w=2670&auto=format&fit=crop"
  },
  {
    id: 5,
    name: "Midnight Clutch",
    price: "$210",
    description: "Sleek, minimal, and sophisticated. The Midnight Clutch is the perfect companion for your evening attire, holding just the essentials.",
    category: "Clutch",
    image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?q=80&w=2671&auto=format&fit=crop"
  }
];
