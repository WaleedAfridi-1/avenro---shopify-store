interface NavSection {
  title: string;
  items: string[];
}

interface NavProps {
  title: string;
  link: string;
  image? : string
  chevronIcon: boolean;
  sections?: NavSection[];
}

export const navigation: NavProps[] = [
  {
    title: "NEW IN",
    link: "#new-in",
    chevronIcon: false,
  },

  {
    title: "MEN",
    image : "/desktop_nav/men.png",
    link: "#men",
    chevronIcon: true,
    sections: [
      {
        title: "CLOTHING",
        items: [
          "T-Shirts",
          "Shirts",
          "Hoodies",
          "Sweatshirts",
          "Trousers",
          "Jackets",
        ],
      },
      {
        title: "COLLECTIONS",
        items: ["New Arrivals", "Best Sellers", "Everyday Essentials"],
      },
    ],
  },

  {
    title: "WOMEN",
    link: "#women",
    image : '/desktop_nav/women.png',
    chevronIcon: true,
    sections: [
      {
        title: "CLOTHING",
        items: [
          "T-Shirts",
          "Tops",
          "Hoodies",
          "Sweatshirts",
          "Trousers",
          "Jackets",
        ],
      },
      {
        title: "COLLECTIONS",
        items: ["New Arrivals", "Best Sellers", "Everyday Essentials"],
      },
    ],
  },

  {
    title: "ACCESSORIES",
    link: "#accessories",
    chevronIcon: true,
    image : "/desktop_nav/accessories.png",
    sections: [
      {
        title: "ACCESSORIES",
        items: ["Caps", "Bags", "Wallets", "Belts", "Sunglasses"],
      },
      {
        title: "COLLECTIONS",
        items: ["New Arrivals", "Best Sellers", "Everyday Essentials"],
      },
    ],
  },

  {
    title: "BEST SELLERS",
    link: "#best-seller",
    chevronIcon: false,
  },

  {
    title: "SALE",
    link: "#sale",
    chevronIcon: false,
  },
];