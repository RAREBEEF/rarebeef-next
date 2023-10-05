import styles from "./index.module.scss";
import NextImage from "next/legacy/image";
import { MouseEvent, useEffect, useRef, useState } from "react";
import useCalcScroll from "../hooks/useCalcScroll";
import gsap from "gsap";
import Link from "next/link";
import Footer from "../components/Footer";
import Seo from "../components/Seo";
import classNames from "classnames";
import PROJECT_LIST from "../public/json/projectList.json";

const ProjectList = () => {
  const [start, setStart] = useState<boolean>(true);
  const [startObserve, setStartObserve] = useState<boolean>(false);
  const stickyRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<Array<HTMLElement>>([]);
  const calcScroll = useCalcScroll();

  useEffect(() => {
    const item = sessionStorage.getItem("start");

    if (!item) {
      setStart(false);
    } else {
      setStart(JSON.parse(item) as boolean);
    }
  }, []);

  useEffect(() => {
    if (
      !stickyRef.current ||
      !containerRef.current ||
      !listRef.current ||
      !startObserve
    )
      return;

    const scrollTrigger = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles["active"]);
          } else {
            entry.target.classList.remove(styles["active"]);
          }
        });
      },
      { threshold: 0 }
    );

    const cards = cardRefs.current;

    cards.forEach((card) => scrollTrigger.observe(card));

    return () => {
      cards.forEach((card) => scrollTrigger.unobserve(card));
    };
  }, [startObserve]);

  useEffect(() => {
    if (!stickyRef.current || !containerRef.current || !listRef.current) return;

    const sticky = stickyRef.current;
    const container = containerRef.current;
    const list = listRef.current;

    const scollProgress = calcScroll(container, sticky) - 0.5;

    gsap
      .to(list, {
        translateX: `${-scollProgress * Math.sqrt(200 ** 2 * 2)}vh`, // 컨테이너와 리스트의 높이가 400vh일 때, 그 절반인 200vh 정사각형의 대각선 길이 구하기
        translateY: `${-scollProgress * 200}vh`, // 컨테이너와 리스트 높이의 절반
      })
      .then(() => setStartObserve(true));

    const windowScrollHandler = () => {
      if (
        !stickyRef.current ||
        !containerRef.current ||
        !listRef.current ||
        !start
      )
        return;

      const sticky = stickyRef.current;
      const container = containerRef.current;
      const list = listRef.current;

      const scollProgress = calcScroll(container, sticky) - 0.5;

      gsap.to(list, {
        translateX: `${-scollProgress * Math.sqrt(200 ** 2 * 2)}vh`,
        translateY: `${-scollProgress * 200}vh`,
      });
    };

    window.addEventListener("scroll", windowScrollHandler);

    return () => {
      window.removeEventListener("scroll", windowScrollHandler);
    };
  }, [calcScroll, start]);

  const onStartClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setStart((prev) => {
      sessionStorage.setItem("start", JSON.stringify(!prev));
      return !prev;
    });
  };

  const projectGenerator = (projectList: {
    [key in string]: { icon: string; path: string };
  }) => {
    return Object.entries(projectList).map((project, i) => {
      return (
        <li
          key={i}
          ref={(el) => {
            if (el) cardRefs.current[i] = el;
          }}
          className={styles.active}
        >
          <Link href={`/projects/${project[1].path}`}>
            <span className={styles["project-list__item__icon-wrapper"]}>
              <NextImage
                priority
                src={project[1].icon}
                layout="fill"
                objectFit="contain"
                alt={project[1].path}
              />
            </span>
            <span className={styles["project-list__item__title"]}>
              {project[0]}
            </span>
          </Link>
        </li>
      );
    });
  };

  return (
    <article
      ref={containerRef}
      className={classNames(styles.container, start && styles.start)}
    >
      <Seo
        description={`현재까지 진행한 프론트엔드 프로젝트를 정리해 둔 포트폴리오입니다. ${Object.keys(
          PROJECT_LIST
        ).join(", ")} 등의 프로젝트를 진행하였습니다.`}
        url={`https://rarebeef.co.kr/`}
      />
      <div className={styles.title}>
        <div className={styles["title_author"]}>RAREBEEF&apos;s</div>
        <h1 className={styles["title_main"]}>
          <span className={styles.frontend}>FRONT-END</span> PORTFOLIO
        </h1>
        <button onClick={onStartClick}>CLICK TO CONTINUE</button>
      </div>
      <div ref={stickyRef} className={styles["list-wrapper"]}>
        <ul
          ref={listRef}
          className={styles.list}
          style={{
            transform: `translateX(${Math.sqrt(
              200 ** 2 * 2
            )}vh) translateY(200vh) rotateX(-45deg) rotateZ(-45deg)`,
          }}
        >
          {projectGenerator(PROJECT_LIST)}
        </ul>
      </div>
      <div className={styles.footer}>
        <Footer />
      </div>
    </article>
  );
};

export default ProjectList;
