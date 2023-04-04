import { projectDataType } from "../types";
import img1 from "../public/screenshots/place-review.png";
import img2 from "../public/screenshots/place-review-write.png";
import img3 from "../public/screenshots/place-review-login.png";
import img4 from "../public/screenshots/place-review-responsive.png";

const data: projectDataType = {
  name: ["PlaceReview"],
  header: {
    title: ["Place", "Review"],
    subTitle: ["with", "Kakao Map"],
  },
  imgs: [img1, img2, img3, img4],
  summary: { name: "Place Review", date: "2022.03.15 ~ 04.08", headCount: 1 },
  description:
    "장소 리뷰 웹 애플리케이션입니다.\n주소 및 상호명으로 위치를 검색하고 해당 위치에 대한 리뷰를 작성할 수 있습니다. Kakao map과 Firebase, 그리고 Redux 등 여러 기술을 한데 모아서 다뤄보고자 진행하게 된 프로젝트입니다.\nKakao map과 같은 본격적인 API를 처음 다뤄보는 것이기에 잘할 수 있을지 반신반의 했지만 공식 문서의 도움으로 원하는 기능을 구현할 수 있었습니다.\n공식 문서의 필요성을 딱히 느끼지 못했던 이전까지는 공식 문서에 대해 막연한 거부감을 갖고 있었으나 이번 프로젝트를 계기로 그러한 거부감을 없앨 수 있었고 이후 프로젝트부터는 여러 공식 문서를 참고하며 진행해오고 있습니다.",
  skills: ["HTML", "TypeScript", "React", "Redux", "Sass", "Firebase"],
  links: {
    github: "https://github.com/RAREBEEF/place-review",
    velog:
      "https://velog.io/@drrobot409/%EC%9E%A5%EC%86%8C-%EB%A6%AC%EB%B7%B0-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8-%EB%A7%8C%EB%93%A4%EA%B8%B0",
    project: {
      icon: "/logos/place-review-icon.png",
      href: "https://placereview.netlify.app/",
    },
  },
  testAccount: {
    id: "test",
    pw: "test",
  },
};

export default data;
