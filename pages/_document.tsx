import { Html, Head, Main, NextScript } from "next/document";
const Document = () => {
  return (
    <Html lang="ko">
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
        <meta name="theme-color" content="#ffffff" />

        <meta name="author" content="RAREBEEF" />
        <meta
          httpEquiv="Cache-Control"
          content="no-cache, no-store, must-revalidate"
        />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
        <base href="/" />
        <meta
          name="google-adsense-account"
          content="ca-pub-1836657352810397"
        ></meta>
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
