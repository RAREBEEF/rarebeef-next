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
      sessionStorage.clear();
    };
  }, []);

  return (
    <Provider store={store}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="color-scheme" content="light" />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: light)"
          content="white"
        />
        {/* <meta
          name="theme-color"
          media="(prefers-color-scheme: dark)"
          content="#181818"
        /> */}
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
};

export default App;
