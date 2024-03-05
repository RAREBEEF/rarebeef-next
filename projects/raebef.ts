import { projectDataType } from "../types";
import img1 from "../public/screenshots/raebef.png";
import img2 from "../public/screenshots/raebef-login.png";
import img3 from "../public/screenshots/raebef-products.png";
import img4 from "../public/screenshots/raebef-filter.png";
import img5 from "../public/screenshots/raebef-cart.png";
import img6 from "../public/screenshots/raebef-orders.png";

const data: projectDataType = {
  name: ["Raebef"],
  header: {
    title: ["Raebef"],
    subTitle: ["E-commerce"],
  },
  imgs: [img1, img2, img3, img4, img5, img6],
  summary: {
    name: "Raebef",
    date: "2022.11.24 ~ 2023.03.22",
    headCount: 1,
  },
  description:
    "의류 쇼핑몰 웹사이트입니다.\n필터를 이용한 제품 탐색 기능과 리액트 쿼리의 무한 스크롤, 스크롤 복원 등을 구현하였습니다.\n또한 토스 페이먼츠의 결제 api(테스트 결제)를 적용함으로써 제품의 탐색부터 장바구니, 그리고 결제에 이르기까지 유저의 제품 주문 프로세스의 전반적인 부분을 구현하였습니다.\nUX를 개선하고자 일부 페이지에 스켈레톤 로더 방식을 적용하였고 제품 페이지는 정적으로 빌드해 SEO를 우선시하는 동시에 on-demand revalidate를 적용하여 제품의 수정과 삭제, 그리고 품절 여부에 대한 상태 업데이트가 가능하도록 구현하였습니다.",
  skills: [
    "HTML",
    "TypeScript",
    "Next",
    "React Query",
    "Tailwindcss",
    "Vercel",
  ],
  links: {
    github: "https://github.com/RAREBEEF/raebef",
    velog:
      "https://velog.io/@drrobot409/Next.js-react-query-%EC%87%BC%ED%95%91%EB%AA%B0-%EB%A7%8C%EB%93%A4%EA%B8%B0",
    project: {
      icon: "/logos/raebef-icon.svg",
      href: "https://raebef.vercel.app/",
    },
    others: [],
  },
  testAccount: {
    id: "test@test.com",
    pw: "test123",
  },
};

export default data;
