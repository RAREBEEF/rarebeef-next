import Head from "next/head";

interface Props {
  title?: string;
  description?: string;
}

const Seo: React.FC<Props> = ({
  title = "",
  description = "RAREBEEF의 프론트엔드 포트폴리오입니다. RAREBEEF라는 이름은 제가 오래전부터 사용해 온 닉네임 '소고기는레어'에서 비롯되었습니다. 리액트와 파이어베이스를 활용한 프로젝트를 주로 진행하였으며 요즘은 PWA에 흥미를 갖고 있습니다.",
}) => {
  return (
    <Head>
      <title>RAREBEEF{title && ` | ${title}`}</title>
      <meta name="description" content={description} />
    </Head>
  );
};

export default Seo;
