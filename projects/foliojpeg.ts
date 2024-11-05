import { projectDataType } from "../types";
import img1 from "../public/screenshots/folio-jpeg.png";
import img2 from "../public/screenshots/folio-jpeg-profile.png";
import img3 from "../public/screenshots/folio-jpeg-edit.png";
import img4 from "../public/screenshots/folio-jpeg-img.png";
import img5 from "../public/screenshots/folio-jpeg-upload.png";

const data: projectDataType = {
  name: ["folio.JPEG"],
  header: {
    title: ["folio.JPEG"],
    subTitle: ["Photo Sharing SNS"],
  },
  imgs: [img1, img2, img3, img4, img5],
  summary: {
    name: "folio.JPEG",
    date: "2024.04.21 ~",
    headCount: 1,
  },
  description:
    "folio.JPEG는 핀터레스트를 벤치마킹한 이미지 공유형 소셜미디어입니다.\n Masonry Grid(세로방향 정렬 그리드)를 기반으로한 이미지 목록부터 이미지 업로드, 팔로우와 좋아요, 댓글 등 소셜미디어의 기본 기능과 이를 위한 웹 푸시 알림 기능을 구현하였습니다.\n 또한 Google의 Gemini AI를 접목해 업로드한 이미지를 분석하고 키워드와 대표 색상 등을 추출하거나 이미지에 대한 피드백, 부적절성 검사 등의 기능을 구현하였습니다.",
  skills: [
    "HTML",
    "TypeScript",
    "Next",
    "Recoil",
    "Tailwindcss",
    "Firebase",
    "Vercel",
  ],
  links: {
    github: "https://github.com/RAREBEEF/folio.jpeg",
    project: {
      icon: "/logos/folio-jpeg.png",
      href: "https://folio-jpeg.com/",
    },
    others: [],
  },
  testAccount: {
    id: "test@test.com",
    pw: "test123",
  },
};

export default data;
