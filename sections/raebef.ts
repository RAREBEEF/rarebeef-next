import { sectionDataType } from "../types";

const data: sectionDataType = {
  name: ["Raebef"],
  header: {
    title: ["Raebef"],
    subTitle: ["E-commerce"],
  },
  imgs: [],
  summary: {
    name: "Raebef",
    date: "2022.11.24 ~",
    headCount: 1,
  },
  description:
    "쇼핑몰 웹사이트입니다.\n현재 개발 중에 있으며 아래 링크를 통해 개발 중인 사이트를 확인해보실 수 있습니다.",
  skills: ["HTML", "TypeScript", "Next", "Tailwindcss", "Netlify"],
  links: {
    github: "https://github.com/RAREBEEF/raebef",
    project: {
      icon: "/logos/beef.svg",
      href: "https://raebef.netlify.app/",
    },
  },
};

export default data;
