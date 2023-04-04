import { projectDataType } from "../types";
import img1 from "../public/screenshots/palette-vault.png";
import img2 from "../public/screenshots/palette-vault-pwa.png";
import img3 from "../public/screenshots/palette-vault-pwa2.png";
import img4 from "../public/screenshots/palette-vault-empty.png";
import img5 from "../public/screenshots/palette-vault-new.png";

const data: projectDataType = {
  name: ["PaletteVault"],
  header: {
    title: ["Palette", "Vault"],
    subTitle: ["Progressive", "Web", "App"],
  },
  imgs: [img1, img2, img3, img4, img5],
  summary: {
    name: "Palette Vault",
    date: "2022.07.18 ~ 2022.07.25",
    headCount: 1,
  },
  description:
    "나만의 팔레트를 저장할 수 있는 색상 저장소입니다.\n팔레트는 Firebase에 업로드되며 데이터의 양이 많아질 것에 대비해 쿼리 커서를 이용하여 필요에 따라 조금씩 끊어서 불러올 수 있도록 하였습니다. PWA를 목표로 개발을 진행하였습니다.\nHTML <input>의 type 중 color의 존재를 미리 알지 못해 나중에서야 추가하게 되었고, 무언가를 만들기 전에 이미 지원하는 기능이 아닌지에 대해 먼저 생각 해보는 습관을 갖게 되었습니다.",
  skills: [
    "HTML",
    "TypeScript",
    "React",
    "Redux",
    "Sass",
    "Firebase",
    "Netlify",
  ],
  links: {
    github: "https://github.com/RAREBEEF/palette-vault",
    velog:
      "https://velog.io/@drrobot409/React-Ts-Firebase-%EC%83%89%EC%83%81-%EC%A0%80%EC%9E%A5%EC%86%8C-%EB%A7%8C%EB%93%A4%EA%B8%B0",
    project: {
      icon: "/logos/palette-vault-icon.png",
      href: "https://palettevault.netlify.app",
    },
  },
  testAccount: {
    id: "test",
    pw: "test",
  },
};

export default data;
