import styles from "./index.module.scss";
import Footer from "../components/Footer";
import Seo from "../components/Seo";
import PROJECT_LIST from "../public/json/projectList.json";
import _ from "lodash";
import ProjectList from "../components/ProjectList";
import HomeStart from "../components/HomeStart";
import HomeCanvas from "../components/HomeCanvas";
import { useEffect, useRef, useState } from "react";

const Home = () => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const windowScrollHandler = () => {
      const container = containerRef.current;

      if (!container) return;

      setScrollProgress(
        window.scrollY / (container.scrollHeight - window.innerHeight)
      );
    };
    window.addEventListener("scroll", windowScrollHandler);

    return () => {
      window.removeEventListener("scroll", windowScrollHandler);
    };
  }, []);

  return (
    // 전체 컨테이너
    <article ref={containerRef} className={styles.container}>
      {/* <div>
        <HomeCanvas scrollProgress={scrollProgress} entered={true} />
      </div> */}

      <Seo
        description={`현재까지 진행한 프론트엔드 프로젝트를 정리해 둔 포트폴리오입니다. ${Object.keys(
          PROJECT_LIST
        ).join(", ")} 등의 프로젝트를 진행하였습니다.`}
        url={`https://rarebeef.co.kr/`}
      />
      {/* 첫번째 sticky */}
      <HomeStart />

      {/* 두 번째 sticky */}
      <ProjectList />

      {/* 세 번째 sticky */}
      {/* <section
        style={{
          height: "200vh",
        }}
      >
        <div
          style={{
            zIndex: 1,
            height: "100vh",
            position: "sticky",
            border: "3px solid blue",
            opacity: 0.5,
            top: 0,
            background: "yellow",
          }}
        ></div>
      </section> */}
      {/* 네 번째 sticky */}
      {/* <section
        style={{
          height: "200vh",
        }}
      >
        <div
          style={{
            zIndex: 1,
            height: "100vh",
            position: "sticky",
            border: "3px solid blue",
            opacity: 0.5,
            top: 0,
            background: "green",
          }}
        ></div>
      </section> */}
      {/*  */}
      <div className={styles.footer}>
        <Footer />
      </div>
    </article>
  );
};

export default Home;
