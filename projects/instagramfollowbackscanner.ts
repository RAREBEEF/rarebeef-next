import { projectDataType } from "../types";
import img1 from "../public/screenshots/ifs-1.png";
import img2 from "../public/screenshots/ifs-2.png";
import img3 from "../public/screenshots/ifs-3.png";

const data: projectDataType = {
  name: ["InstagramFollowbackScanner"],
  header: {
    title: ["Instagram", "Followback", "Scanner"],
    subTitle: ["Chrome Extension"],
  },
  imgs: [img1, img2, img3],
  summary: {
    name: "Instagram Followback Scanner",
    date: "2024.10.23 ~ ",
    headCount: 1,
  },
  description:
    "나를 맞팔하지 않는 인스타그램 유저를 찾아내는 크롬 확장프로그램입니다.\nMeta의 graph API를 통해 유저의 팔로잉과 팔로워 목록을 불러와 대조하여 맞팔하지 않는 유저를 찾아냅니다.\n인스타그램 페이지에서 extension의 content script가 graph API를 실행하고, 스캔이 완료되면 브라우저 팝업으로 결과창을 띄우고 window message를 통해 content script에서 결과를 전달받는 방식을 사용하였습니다.",
  skills: ["HTML", "CSS", "JavaScript"],
  links: {
    github: "https://github.com/RAREBEEF/Instagram-Followback-Scanner",
    others: [
      {
        icon: "/icons/chrome-webstore-brands.svg",
        href: "https://chromewebstore.google.com/detail/instagram-followback-scan/ioapdbeebenampepgjabpjinndcoagcf",
      },
    ],
  },
};

export default data;
