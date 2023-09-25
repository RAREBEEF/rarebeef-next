import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "../redux/store";
import "../styles/global.scss";
import "swiper/scss";
import "swiper/scss/pagination";
import "swiper/scss/effect-coverflow";
import Layout from "../components/Layout";
import Head from "next/head";
import { useEffect } from "react";

const App = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    return () => {
      sessionStorage.removeItem("start");
    };
  }, []);

  useEffect(() => {
    if (navigator.userAgent.indexOf("KAKAO") !== -1)
      window.confirm(
        "인앱 브라우저를 지원하지 않아 정상적인 진행이 어려울 수 있습니다.\n기본 브라우저에서 페이지를 여시겠습니까?"
      ) && window.open("https://www.rarebeef.co.kr/", "_system");
  }, []);

  return (
    <Provider store={store}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
};

export default App;
