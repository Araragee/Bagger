export interface Product {
  id: number;
  name: string;
  price: string;
  description: string;
  category: string;
  type: 'Bag' | 'Shoe';
  image: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "The Voyager Tote",
    price: "$450",
    description: "Hand-stitched from full-grain Italian leather, the Voyager Tote is designed for the modern professional. Spacious enough for a laptop yet elegant enough for evening events.",
    category: "Tote",
    type: "Bag",
    image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&q=80&w=2787"
  },
  {
    id: 2,
    name: "Saddle Crossbody",
    price: "$320",
    description: "A timeless classic reimagined. The Saddle Crossbody features our signature brass hardware and an adjustable strap for effortless versatility.",
    category: "Crossbody",
    type: "Bag",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=2669&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Artisan Satchel",
    price: "$580",
    description: "Inspired by vintage postal bags, the Artisan Satchel combines rugged durability with refined aesthetics. Perfect for your daily commute.",
    category: "Satchel",
    type: "Bag",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=2574&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "Weekender Duffle",
    price: "$890",
    description: "Travel in style with our Weekender Duffle. Crafted to age beautifully, developing a unique patina with every journey you take.",
    category: "Duffle",
    type: "Bag",
    image: "https://images.unsplash.com/photo-1547949003-9792a18a2601?q=80&w=2670&auto=format&fit=crop"
  },
  {
    id: 5,
    name: "Midnight Clutch",
    price: "$210",
    description: "Sleek, minimal, and sophisticated. The Midnight Clutch is the perfect companion for your evening attire, holding just the essentials.",
    category: "Clutch",
    type: "Bag",
    image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?q=80&w=2671&auto=format&fit=crop"
  },
  {
    id: 6,
    name: "Oxford Brogue",
    price: "$350",
    description: "Classic styling meets modern comfort. Our Oxford Brogues are hand-lasted and feature intricate detailing for a sophisticated look.",
    category: "Oxford",
    type: "Shoe",
    image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=2670&auto=format&fit=crop"
  },
  {
    id: 7,
    name: "Chelsea Boot",
    price: "$420",
    description: "The essential boot for any wardrobe. Our Chelsea Boots are crafted from soft calfskin and feature a durable rubber sole for all-day wear.",
    category: "Boot",
    type: "Shoe",
    image: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?q=80&w=2670&auto=format&fit=crop"
  },
  {
    id: 8,
    name: "Monk Strap Derby",
    price: "$380",
    description: "Make a statement with our Monk Strap Derbies. The single-strap design offers a unique twist on a traditional silhouette.",
    category: "Derby",
    type: "Shoe",
    image: "https://images.unsplash.com/photo-1605733513597-a8f8341084e6?q=80&w=2670&auto=format&fit=crop"
  },
  {
    id: 9,
    name: "Tuscan Loafer",
    price: "$310",
    description: "Slip into comfort and style with the Tuscan Loafer. Made from buttery-soft suede with a classic penny keeper detail.",
    category: "Loafer",
    type: "Shoe",
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=2574&auto=format&fit=crop"
  },
  {
    id: 10,
    name: "Equestrian Tall Boot",
    price: "$650",
    description: "A striking silhouette inspired by heritage riding boots. Expertly crafted in deep mahogany leather with subtle brass accent buckles.",
    category: "Boot",
    type: "Shoe",
    image: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?q=80&w=2670&auto=format&fit=crop"
  },
  {
    id: 11,
    name: "The Riviera Briefcase",
    price: "$720",
    description: "Elevate your workwear. The Riviera Briefcase features dual compartments, a padded laptop sleeve, and a sleek, structured profile.",
    category: "Briefcase",
    type: "Bag",
    image: "https://images.unsplash.com/photo-1554342872-034a06541bad?q=80&w=2670&auto=format&fit=crop"
  },
  {
    id: 12,
    name: "Milano Backpack",
    price: "$550",
    description: "A refined take on the classic backpack. The Milano combines practical functionality with luxurious pebbled leather and polished zippers.",
    category: "Backpack",
    type: "Bag",
    image: "https://images.unsplash.com/photo-1622560480654-d96214fdc887?q=80&w=2576&auto=format&fit=crop"
  }
];
