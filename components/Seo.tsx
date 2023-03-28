import Head from "next/head";

interface Props {
  title?: string;
  description?: string;
  url?: string;
  img?: string;
}

const Seo: React.FC<Props> = ({
  title = "",
  img = "./logo1200x630.png",
  url = "https://rarebeef.co.kr",
  description = "RAREBEEF의 프론트엔드 포트폴리오입니다. RAREBEEF라는 이름은 제가 오래전부터 사용해 온 닉네임 '소고기는레어'에서 비롯되었습니다. 리액트와 파이어베이스를 활용한 프로젝트를 주로 진행하였습니다.",
}) => {
  return (
    <Head>
      <title>{`RAREBEEF${title && " │ " + title}`}</title>
      <meta name="description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="ko_KR" />
      <meta property="og:site_name" content="RAREBEEF's Portfolio" />
      <meta property="og:title" content={`RAREBEEF${title && " │ " + title}`} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={img} />
      <meta property="og:url" content={url} />
      <meta property="twitter:card" content="summary" />
      <meta property="twitter:url" content={url} />
      <meta
        property="twitter:title"
        content={`RAREBEEF${title && " │ " + title}`}
      />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={img} />
    </Head>
  );
};

export default Seo;
