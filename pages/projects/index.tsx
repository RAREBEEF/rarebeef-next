import styles from "./index.module.scss";
import NextImage from "next/legacy/image";
import { useEffect, useRef, useState } from "react";
import useCalcScroll from "../../hooks/useCalcScroll";
import gsap from "gsap";
import Link from "next/link";
import Footer from "../../components/Footer";
import Seo from "../../components/Seo";
import classNames from "classnames";
import PushRequest from "../../components/PushRequest";
import PROJECT_LIST from "../../public/json/projectList.json";

const ProjectList = () => {
  const [startObserve, setStartObserve] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const stickyRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<Array<HTMLElement>>([]);
  const calcScroll = useCalcScroll();

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
    if (
      !stickyRef.current ||
      !containerRef.current ||
      !listRef.current ||
      showModal
    )
      return;

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
      if (!stickyRef.current || !containerRef.current || !listRef.current)
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
  }, [calcScroll, showModal]);

  const projectGenerator = (projectList: {
    [key in string]: { icon: string; path: string };
  }) => {
    return Object.entries(projectList).map((project, i) => {
      // const imgSrc = require(`../../public${project[1].icon}`);
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
      className={classNames(
        styles.container,
        showModal && styles["show-modal"]
      )}
    >
      <Seo
        title="PROJECTS"
        description={`현재까지 진행한 프로젝트 목록입니다. ${Object.keys(
          PROJECT_LIST
        ).join(
          ", "
        )} 등의 프로젝트를 진행하였습니다. 리액트와 파이어베이스 기반의 프로젝트가 주를 이루고 있습니다.`}
        url={`https://rarebeef.co.kr/projects`}
      />
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
      <PushRequest setShowModal={setShowModal} showModal={showModal} />
    </article>
  );
};

export default ProjectList;
