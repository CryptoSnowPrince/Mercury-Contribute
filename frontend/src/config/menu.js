import { global } from "./global";

export const menuItems = [
  {
    label: "HOME",
    link: "/",
    self: true,
  },
  {
    label: "ABOUT",
    link: "#about",
    self: true,
  },
  {
    label: "MY NFTS",
    link: "https://opensea.io",
    target: "_blank"
  },
  {
    label: "OPENSEA",
    link: 'https://opensea.io/collection/hpths777inu-trumpos/',
    target: "_blank"
  },
  {
    label: "WHITEPAPER",
    link: `${global.PUBLIC_URL}/whitepaper.pdf`,
    target: "_blank"
  },
  {
    label: "SOCIALS",
    link: "#socials",
    self: true,
  }
];
