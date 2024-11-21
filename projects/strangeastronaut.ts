import { projectDataType } from "../types";

const data: projectDataType = {
  name: ["StrangeAstronaut"],
  header: {
    title: ["Strange", "Astronaut"],
    subTitle: ["Chrome Extension"],
  },
  summary: {
    name: "Strange Astronaut",
    date: "2023.10.06 ~ ",
    headCount: 1,
  },
  description:
    "마우스를 따라다니는 캐릭터를 생성하는 크롬 확장프로그램입니다.\n페이팔 결제를 연동한 홈페이지와 익스텐션 상호 간에 통신을 구축하여 결제 여부 등을 주고 받을 수 있도록 구현하였습니다.",
  skills: ["HTML", "TypeScript", "React", "Sass"],
  links: {
    project: {
      icon: "/logos/strange-astronaut.png",
      href: "https://strange-astronaut.rarebeef.co.kr/",
    },
    others: [
      {
        icon: "/icons/chrome-webstore-brands.svg",
        href: "https://chromewebstore.google.com/detail/empty-title/fhbjpkjhalgkhlfbhcbnejkgbnjnmjmn",
      },
    ],
  },
};

export default data;
