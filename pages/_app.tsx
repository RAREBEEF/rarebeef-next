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

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
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
