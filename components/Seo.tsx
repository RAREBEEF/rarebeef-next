import Head from "next/head";

interface Props {
  title?: string;
  description?: string;
}

const Seo: React.FC<Props> = ({
  title = "",
  description = "현재까지 진행한 웹 개발 프로젝트를 모아둔 프론트엔드 포트폴리오입니다. 데이터 분석과 관련하여 파이썬을 공부하던 중 개발에 눈을 뜨게 되었습니다. 직접 작성한 코드 몇 줄이 눈 앞에 시각화되고 작동되는 점에서 재미를 느꼈습니다. 이후 HTML과 CSS를 이용해 간단한 웹사이트를 클론 코딩 해보는 과정을 거치며 흥미가 커졌고 본격적으로 자바스크립트 공부를 시작하며 웹 개발 독학을 시작하는 계기가 되었습니다. 리액트 기반, 파이어베이스를 활용한 프로젝트를 주로 진행하였으며 최근에는 3D와 PWA에 흥미를 갖고 있습니다.",
}) => {
  return (
    <Head>
      <title>{`RAREBEEF${title && " │ " + title}`}</title>
      <meta name="description" content={description} />
    </Head>
  );
};

export default Seo;
