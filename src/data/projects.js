const screenshot = (url) =>
  `https://image.thum.io/get/width/1200/crop/900/png/noanimate/maxAge/24/${url}`;

export const projects = [
  {
    id: "suranga-gems",
    index: "01",
    title: "Suranga Gems",
    category: "Luxury brand website",
    type: "Client Project",
    status: "Live client website",
    year: "2026",
    liveUrl: "https://surangagems.com",
    image: "/projects/suranga-gems-real.jpeg",
    imageAlt:
      "Live homepage preview of the Suranga Gems website",
    description:
      "A mobile-first brand website created for a natural gemstone business operating across Sri Lanka and Madagascar.",
    tags: ["Strategy", "UI/UX", "React", "Development"],
    challenge:
      "Build a credible digital presence that presents the founder, gemstone sourcing relationships, and international business story without turning the website into a conventional online shop.",
    approach:
      "The experience uses editorial typography, gemstone-led imagery, focused storytelling, and a mobile-first structure designed for business contacts who primarily browse on phones.",
    outcome:
      "A live public website that gives Suranga Gems a polished destination for introductions, referrals, enquiries, and founder-led brand storytelling.",
  },
  {
    id: "bgs-agristock",
    index: "02",
    title: "BGS AgriStock",
    category: "Inventory management system",
    type: "Internal Business Product",
    status: "Live deployed application",
    year: "2026",
    liveUrl:
      "https://bgs-frontend-production.up.railway.app",
    image: screenshot(
      "https://bgs-frontend-production.up.railway.app",
    ),
    imageAlt:
      "Live preview of the deployed BGS AgriStock application",
    description:
      "A deployed inventory system designed around the daily workflow of a local fertilizer and agricultural-products business.",
    tags: ["Product Design", "Dashboard", "React", "Database"],
    challenge:
      "The business depended on notebook records and could not quickly identify low-stock products across its growing agricultural inventory.",
    approach:
      "The system was structured around practical actions such as updating stock, reviewing reports, adding products, and monitoring inventory health through clear dashboard interfaces.",
    outcome:
      "A working internal application that improves stock visibility and reduces dependence on manual checking and handwritten records.",
  },
  {
    id: "nuvea-glow",
    index: "03",
    title: "Nuvéa Glow",
    category: "Skincare storefront demo",
    type: "Storefront Demo",
    status: "Live reusable demo",
    year: "2026",
    liveUrl: "https://nuvea-glow.netlify.app/",
    image: screenshot("https://nuvea-glow.netlify.app/"),
    imageAlt:
      "Live homepage preview of the Nuvéa Glow skincare storefront demo",
    description:
      "A live, reusable storefront demo created for social-first skincare and beauty businesses.",
    tags: ["Brand Direction", "Storefront", "Mobile-first", "UI Design"],
    challenge:
      "Many beauty sellers build demand through social platforms but do not have a polished website that explains the brand, products, and purchasing journey.",
    approach:
      "The demo combines feminine editorial typography, product storytelling, mobile-first layouts, and clear conversion paths that can be adapted to different beauty brands.",
    outcome:
      "A deployed storefront concept that demonstrates how an independent skincare business can move from social-only selling to a more credible branded experience.",
  },
];
