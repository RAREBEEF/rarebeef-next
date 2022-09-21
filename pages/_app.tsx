import type { AppProps } from "next/app";
import { useEffect } from "react";
import { Provider } from "react-redux";
import store from "../redux/store";
import "../styles/global.scss";
import "swiper/scss";
import "swiper/scss/pagination";
import "swiper/scss/effect-coverflow";
import Layout from "../components/Layout";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const rootEl = document.getElementById("root");

    setTimeout(() => {
      if ("serviceWorker" in navigator) {
        window.addEventListener("load", function () {
          this.navigator.serviceWorker.register("/sw.js").then(
            function (registration) {
              console.log(
                "Service Worker registration successfull with scope: ",
                registration.scope
              );
            },
            function (err) {
              console.log("Service Worker registration failed: ", err);
            }
          );
        });
      }

      if (!rootEl) {
        return;
      }

      rootEl.style.height = "auto";
      rootEl.style.overflow = "visible";
    }, 1000);
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
}

export default MyApp;
