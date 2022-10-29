import type { AppProps } from "next/app";
import { useEffect } from "react";
import { Provider } from "react-redux";
import store from "../redux/store";
import "../styles/global.scss";
import "swiper/scss";
import "swiper/scss/pagination";
import "swiper/scss/effect-coverflow";
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const loadEnd = setTimeout(() => {
      const rootEl = document.getElementById("__next");

      if (!rootEl) {
        return;
      }

      rootEl.style.height = "auto";
      rootEl.style.overflow = "visible";
    }, 200);

    return () => {
      clearTimeout(loadEnd);
    };
  }, []);

  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
