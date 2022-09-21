import { sectionDataType } from "../types";

const data: sectionDataType = {
  name: ["PlaceReview"],
  header: {
    title: ["Place", "Review"],
    subTitle: ["with", "Kakao Map"],
  },
  imgs: [
    "/screenshots/place-review.png",
    "/screenshots/place-review-write.png",
    "/screenshots/place-review-login.png",
    "/screenshots/place-review-responsive.png",
  ],
  summary: { name: "Place Review", date: "2022.03.15 ~ 04.08", headCount: 1 },
  description:
    "카카오맵을 이용한 장소 리뷰 웹 애플리케이션입니다.\n주소 및 상호명으로 위치를 검색하고 해당 위치에 대한 리뷰를 작성할 수 있습니다. Kakao map과 Firebase, 그리고 Redux 등 여러 기술을 한데 모아서 다뤄보고자 진행하게 된 프로젝트입니다.",
  skills: ["HTML", "TypeScript", "React", "Redux", "Sass", "Firebase"],
  links: [
    {
      icon: "/icons/github-square-brands.svg",
      href: "https://github.com/RAREBEEF/place-review",
    },
    {
      icon: "/icons/velog-square.svg",
      href: "https://velog.io/@drrobot409/%EC%9E%A5%EC%86%8C-%EB%A6%AC%EB%B7%B0-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8-%EB%A7%8C%EB%93%A4%EA%B8%B0",
    },
    {
      icon: "/logos/place-review-icon.png",
      href: "https://rarebeef.github.io/place-review/",
    },
  ],
};

export default data;
