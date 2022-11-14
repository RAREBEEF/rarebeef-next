import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import store from "../redux/store";
import "../styles/global.scss";
import "swiper/scss";
import "swiper/scss/pagination";
import "swiper/scss/effect-coverflow";
import Layout from "../components/Layout";
import Head from "next/head";
import InitLoading from "../components/InitLoading";

function MyApp({ Component, pageProps }: AppProps) {
  const [init, setInit] = useState<boolean>(false);

  useEffect(() => {
    const initTimer = setTimeout(() => {
      const root = document.getElementById("__next");
      if (root) {
        root.style.height = "fit-content";
        root.style.overflow = "visible";
      }
      setInit(true);
    }, 3000);

    return () => {
      clearTimeout(initTimer);
    };
  }, []);
  return (
    <Provider store={store}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <InitLoading init={init} />
    </Provider>
  );
}

export default MyApp;
