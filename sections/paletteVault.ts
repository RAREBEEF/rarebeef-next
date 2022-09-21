import { sectionDataType } from "../types";

const data: sectionDataType = {
  name: ["PaletteVault"],
  header: {
    title: ["Palette", "Vault"],
    subTitle: ["Progressive", "Web", "App"],
  },
  imgs: [
    "/screenshots/palette-vault.png",
    "/screenshots/palette-vault-pwa.png",
    "/screenshots/palette-vault-pwa2.png",
    "/screenshots/palette-vault-empty.png",
    "/screenshots/palette-vault-new.png",
  ],
  summary: {
    name: "Palette Vault",
    date: "2022.07.18 ~ 2022.07.25",
    headCount: 1,
  },
  description:
    "나만의 팔레트를 저장할 수 있는 색상 저장소입니다.\n팔레트는 Firebase에 업로드되며 데이터의 양이 많아질 것에 대비해 쿼리 커서를 이용하여 필요에 따라 조금씩 끊어서 불러올 수 있도록 하였습니다. PWA를 목표로 개발을 진행하였으며 PWA에 대한 학습이 진행됨에 따라 차츰 업데이트 해나갈 예정입니다.",
  skills: ["HTML", "TypeScript", "React", "Redux", "Sass", "Firebase"],
  links: [
    {
      icon: "/icons/github-square-brands.svg",
      href: "https://github.com/RAREBEEF/palette-vault",
    },
    {
      icon: "/icons/velog-square.svg",
      href: "https://velog.io/@drrobot409/React-Ts-Firebase-%EC%83%89%EC%83%81-%EC%A0%80%EC%9E%A5%EC%86%8C-%EB%A7%8C%EB%93%A4%EA%B8%B0",
    },
    {
      icon: "/logos/palette-vault-icon.png",
      href: "https://palettevault.netlify.app",
    },
  ],
};

export default data;
