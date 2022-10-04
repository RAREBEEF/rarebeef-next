import { sectionDataType } from "../types";
import img1 from "../public/screenshots/diary-calendar.png";
import img2 from "../public/screenshots/diary-diary.png";
import img3 from "../public/screenshots/diary-write.png";
import img4 from "../public/screenshots/diary-period.png";
import img5 from "../public/screenshots/diary-responsive.png";

const data: sectionDataType = {
  name: ["Diary"],
  header: {
    title: ["Diary"],
    subTitle: ["With", "Next.js"],
  },
  imgs: [img1, img2, img3, img4, img5],
  summary: {
    name: "Diary",
    date: "2022.08.23 ~ 2022.09.19",
    headCount: 1,
  },
  description:
    "하루를 기록하는 일기장 웹 애플리케이션입니다.\n설치 가능한 PWA로 개발하였으며 Next.js를 활용한 첫 프로젝트입니다.\n처음 생각과는 다르게 달력 알고리즘을 작성한 부분이 가장 재밌었던 프로젝트입니다. 공휴일 API도 활용하여 달력에서 공휴일을 구분할 수 있도록 하였습니다.\n또한 영화 API와 음악 API를 활용해 그 날의 영화와 음악을 검색하여 추가할 수 있도록 하였습니다.",
  skills: [
    "HTML",
    "TypeScript",
    "Next",
    "Redux",
    "Sass",
    "Firebase",
    "Netlify",
  ],
  links: {
    github: "https://github.com/RAREBEEF/diary",
    velog:
      "https://velog.io/@drrobot409/Next.js-%EC%9D%BC%EA%B8%B0%EC%9E%A5-%EB%A7%8C%EB%93%A4%EA%B8%B0",
    project: {
      icon: "/logos/diary-icon.png",
      href: "https://diary-daily.netlify.app/",
    },
  },
};

export default data;
