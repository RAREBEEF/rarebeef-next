import { projectDataType } from "../types";

const data: projectDataType = {
  name: ["Huggy Wuggy"],
  header: {
    title: ["Huggy", "Wuggy"],
    subTitle: ["Canvas idea"],
  },
  summary: { name: "Huggy Wuggy", date: "2023.08.07 ~ 09.05", headCount: 1 },
  description:
    "간단한 아이디어를 구현하며 Canvas API의 사용법에 대해 익혀 보았습니다.\n캔버스에 고정 좌표를 생성하고 네 개의 점(손발)을 인접한 고정 좌표로 이동시켜 마치 팔다리가 움직이는 것 같은 애니메이션을 구현하는 아이디어입니다. 그리고 그 위에 캐릭터의 모습을 덧씌워 캐릭터가 벽을 타고 이동하는 장면을 연출해 보았습니다.\n점의 위치를 몸통 위치 기준 사분면으로 구분하고 거리순으로 정렬하여 각 손발의 활동 반경을 자연스럽게 유지하였고 마우스를 가리키는 손과 플래시라이트의 각도를 계산하는 등 여러 부분에서 디테일을 높이기 위해 노력해 보았습니다.\n플래시라이트가 존재하는 버전은 링크를 통해 확인하실 수 있습니다.",
  skills: ["HTML", "TypeScript", "React"],
  links: {
    github: "https://github.com/RAREBEEF/interactive",
    velog:
      "https://velog.io/@drrobot409/Canvas-API%EB%A5%BC-%ED%99%9C%EC%9A%A9%ED%95%9C-Interactive-%EC%95%84%EC%9D%B4%EB%94%94%EC%96%B4-%EA%B5%AC%ED%98%84",
    project: {
      icon: "/logos/huggy_wuggy.svg",
      href: "https://interactive-one.vercel.app/huggywuggy",
    },
  },
};

export default data;
