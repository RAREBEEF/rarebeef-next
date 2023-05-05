import { projectDataType } from "../types";
import img1 from "../public/screenshots/splatoon.png";
import img2 from "../public/screenshots/splatoon-slide.png";
import img3 from "../public/screenshots/splatoon-twitter.png";

const data: projectDataType = {
  name: ["Splatoon3"],
  header: {
    title: ["Splatoon 3"],
    subTitle: ["Clone", "Coding"],
  },
  imgs: [img1, img2, img3],
  summary: {
    name: "Splatoon3 homepage clone coding",
    date: "2022.10.13 ~ 2022.10.28",
    headCount: 1,
  },
  description:
    "닌텐도의 스플래툰 3 홈페이지 클론 코딩입니다.\ntailwindcss에 익숙해지는 것을 목표로 프로젝트를 시작했으며 평소 동적 웹 애플리케이션에 치우쳐 있던 프로젝트 주제에서 벗어나 정적 웹 페이지를 제작하기 위해 주제를 선정하였습니다.\ntailwindcss로 간단하게 반응형 디자인을 구현할 수 있었으며 다양한 애니메이션과 인터랙티브, 트위터 임베드 등 새롭게 접하고 배울 점이 많은 프로젝트였습니다.",
  skills: ["HTML", "TypeScript", "Next", "Tailwindcss", "Vercel"],
  links: {
    github: "https://github.com/RAREBEEF/splatoon3-homepage-clone",
    velog:
      "https://velog.io/@drrobot409/Next.js-Tailwindcss-%EC%8A%A4%ED%94%8C%EB%9E%98%ED%88%B03-%ED%99%88%ED%8E%98%EC%9D%B4%EC%A7%80-%ED%81%B4%EB%A1%A0%EC%BD%94%EB%94%A9-pnwnxfv5",
    project: {
      icon: "/logos/splatoon-icon.svg",
      href: "https://splatoon3-clone.vercel.app/",
    },
  },
};

export default data;
