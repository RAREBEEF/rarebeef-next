import { Html, Head, Main, NextScript } from "next/document";
const Document = () => {
  return (
    <Html>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/reset-css@5.0.1/reset.min.css"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Gowun+Dodum&family=Raleway:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <link rel="manifest" href="/manifest.json" />

        <link
          rel="apple-touch-icon-precomposed"
          sizes="57x57"
          href="/logos/apple-touch-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon-precomposed"
          sizes="114x114"
          href="/logos/apple-touch-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon-precomposed"
          sizes="72x72"
          href="/logos/apple-touch-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon-precomposed"
          sizes="144x144"
          href="/logos/apple-touch-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon-precomposed"
          sizes="60x60"
          href="/logos/apple-touch-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon-precomposed"
          sizes="120x120"
          href="/logos/apple-touch-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon-precomposed"
          sizes="76x76"
          href="/logos/apple-touch-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon-precomposed"
          sizes="152x152"
          href="/logos/apple-touch-icon-152x152.png"
        />
        <link
          rel="icon"
          type="image/png"
          href="/logos/favicon-196x196.png"
          sizes="196x196"
        />
        <link
          rel="icon"
          type="image/png"
          href="/logos/favicon-96x96.png"
          sizes="96x96"
        />
        <link
          rel="icon"
          type="image/png"
          href="/logos/favicon-32x32.png"
          sizes="32x32"
        />
        <link
          rel="icon"
          type="image/png"
          href="/logos/favicon-16x16.png"
          sizes="16x16"
        />
        <link
          rel="icon"
          type="image/png"
          href="/logos/favicon-128.png"
          sizes="128x128"
        />
        <meta name="application-name" content="&nbsp;" />
        <meta name="msapplication-TileColor" content="#FFFFFF" />
        <meta
          name="msapplication-TileImage"
          content="/logos/mstile-144x144.png"
        />
        <meta
          name="msapplication-square70x70logo"
          content="/logos/mstile-70x70.png"
        />
        <meta
          name="msapplication-square150x150logo"
          content="/logos/mstile-150x150.png"
        />
        <meta
          name="msapplication-wide310x150logo"
          content="/logos/mstile-310x150.png"
        />
        <meta
          name="msapplication-square310x310logo"
          content="/logos/mstile-310x310.png"
        />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />
        <meta
          name="description"
          content="RAREBEEF의 프론트엔드 포트폴리오입니다. RAREBEEF라는 이름은 제가 오래전부터 사용해 온 닉네임 '소고기는레어'에서 비롯되었습니다. 리액트와 파이어베이스를 활용한 프로젝트를 주로 진행하였으며 요즘은 PWA에 흥미를 갖고 있습니다."
        />
        <meta name="author" content="RAREBEEF" />
        <meta
          httpEquiv="Cache-Control"
          content="no-cache, no-store, must-revalidate"
        />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="ko_KR" />
        <meta property="og:site_name" content="RAREBEEF's Portfolio" />
        <meta property="og:title" content="RAREBEEF's Portfolio" />
        <meta
          property="og:description"
          content="RAREBEEF의 프론트엔드 포트폴리오를 확인해 보세요."
        />
        <meta property="og:image" content="./logo1200x630.png" />
        <meta property="og:image:width" content="512" />
        <meta property="og:image:height" content="512" />
        <meta property="og:url" content="https://rarebeef.co.kr" />
        <meta property="twitter:card" content="summary" />
        <meta property="twitter:url" content="https://rarebeef.co.kr" />
        <meta property="twitter:title" content="RAREBEEF's Portfolio" />
        <meta
          property="twitter:description"
          content="RAREBEEF의 프론트엔드 포트폴리오를 확인해 보세요."
        />
        <meta property="twitter:image" content="./logo512.png" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
        <base href="/" />
      </Head>
      <body>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
