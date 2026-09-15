export interface Banner {
  id: number;
  image: string;
  eyebrow: string;
  title: string;
  link: string;
}

export const banners: Banner[] = [
  {
    id: 1,
    image: "/collections/man.jpg",
    eyebrow: "MEN'S EDIT",
    title: "EVERYDAY ESSENTIALS",
    link: "/collections/men",
  },
  {
    id: 2,
    image: "/collections/accessoriesWomen.jpg",
    eyebrow: "ACCESSORIES",
    title: "THE FINISHING TOUCH",
    link: "/collections/accessories",
  },
  {
    id: 3,
    image: "/collections/women.jpg",
    eyebrow: "NEW IN",
    title: "THE EVERYDAY EDIT",
    link: "/collections/women",
  },
  {
    id: 4,
    image: "/collections/womenforban.jpg",
    eyebrow: "WOMEN'S EDIT",
    title: "EFFORTLESSLY YOURS",
    link: "/collections/women",
  },
  {
    id: 5,
    image: "/collections/womenStore.jpg",
    eyebrow: "NEW SEASON",
    title: "EVERYDAY, ELEVATED",
    link: "/collections",
  },
];