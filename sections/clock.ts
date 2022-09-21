import ClockApp from "../components/ClockApp";
import { sectionDataType } from "../types";

const data: sectionDataType = {
  name: ["Clock"],
  header: {
    title: ["Digital", "Clock"],
    subTitle: ["with", "alarm"],
  },
  app: ClockApp,
  summary: { name: "Digital Clock", date: "2022.01.09 ~ 01.19", headCount: 1 },
  description:
    "알람 기능이 있는 디지털 시계입니다.\n평범한 웹의 틀에서 벗어나 새로운 것을 시도해 보고자 진행한 프로젝트이며 리퀴드 크리스탈 폰트를 사용한 디지털 시계를 최대한 비슷한 모습으로 구현해 보았습니다. 시계 상단의 버튼으로 알람을 설정하는 등의 조작이 가능합니다.",
  skills: ["HTML", "TypeScript", "React", "Sass", "Netlify"],
  links: [
    { icon: "/icons/github-square-brands.svg", href: "https://github.com/RAREBEEF/Clock" },
    {
      icon: "/icons/velog-square.svg",
      href: "https://velog.io/@drrobot409/HTML-CSS-JS-%EB%94%94%EC%A7%80%ED%84%B8-%EC%8B%9C%EA%B3%84-%EB%A7%8C%EB%93%A4%EA%B8%B0-feat.-%EC%95%8C%EB%9E%8C",
    },
  ],
};

export default data;
