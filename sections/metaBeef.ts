import { sectionDataType } from "../types";
import img1 from "../public/screenshots/meta-beef.png";
import img2 from "../public/screenshots/meta-beef-posts.png";
import img3 from "../public/screenshots/meta-beef-login.png";

const data: sectionDataType = {
  name: ["MetaBeef"],
  header: {
    title: ["Meta", "Beef"],
    subTitle: ["with", "Firebase"],
  },
  imgs: [img1, img2, img3],
  summary: { name: "Meta Beef", date: "2022.01.26 ~ 02.24", headCount: 1 },
  description:
    "간단한 SNS 웹 애플리케이션입니다.\n사진과 짧은 글을 업로드하고 좋아요를 남기는 등의 SNS 기능을 구현하였습니다. Firebase를 활용한 첫 프로젝트이며 프론트엔드 독학을 진행하던 저에게 Front-Back 간의 통신을 이해하는데 큰 도움을 준 프로젝트입니다.",
  skills: ["HTML", "JavaScript", "React", "Sass", "Firebase"],
  links: {
    github: "https://github.com/RAREBEEF/meta-beef",
    velog:
      "https://velog.io/@drrobot409/React-SNS-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8-%EB%A7%8C%EB%93%A4%EA%B8%B0",
    project: {
      icon: "/logos/meta-beef-icon.png",
      href: "https://rarebeef.github.io/meta-beef",
    },
  },
  testAccount: {
    id: "test",
    pw: "test",
  },
};

export default data;
