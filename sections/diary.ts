import { sectionDataType } from "../types";

const data: sectionDataType = {
  name: ["Diary"],
  header: {
    title: ["Diary"],
    subTitle: ["With", "Next.js"],
  },
  imgs: [
    "/screenshots/diary-calendar.png",
    "/screenshots/diary-responsive.png",
    "/screenshots/diary-diary.png",
    "/screenshots/diary-write.png",
    "/screenshots/diary-period.png",
  ],
  summary: {
    name: "Diary",
    date: "2022.08.23 ~ 2022.09.19",
    headCount: 1,
  },
  description:
    "하루를 기록하는 일기장 웹 애플리케이션입니다.\n설치 가능한 PWA로 개발하였으며 Next.js를 활용한 첫 프로젝트입니다.\n처음 생각과는 다르게 달력 알고리즘을 작성한 부분이 가장 재밌었던 프로젝트입니다.\n달력은 빈 칸을 포함한 최대 칸 수인 42칸(7일*6주 차)을 모두 배열에 저장한 뒤 7개씩 끊어서 <tr><td/></tr> 구조로 반환하여 각 월에 맞게 테이블 구조로 생성하였습니다. 또한 공휴일 api를 통해 공휴일도 구분할 수 있도록 하였습니다.",
  skills: ["HTML", "TypeScript", "Next", "Redux", "Sass", "Firebase"],
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
