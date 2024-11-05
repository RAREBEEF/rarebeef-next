import { MouseEvent, useEffect, useRef, useState } from "react";
import PROJECT_LIST from "../public/json/projectList.json";
import useCalcScroll from "../hooks/useCalcScroll";
import _ from "lodash";
import styles from "./ProjectList.module.scss";
import Link from "next/link";
import NextImage from "next/image";
import classNames from "classnames";
import gsap from "gsap";
import hookImage from "../public/images/fishing-hook.png";

const ProjectList = () => {
  const [entered, setEntered] = useState<boolean>(false);
  const [headerAway, setHeaderAway] = useState<boolean>(false);
  const [startObserve, setStartObserve] = useState<boolean>(false);
  const stickyItemRef = useRef<HTMLDivElement>(null);
  const stickyContainerRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const cardRefs = useRef<Array<HTMLElement>>([]);
  const calcScroll = useCalcScroll();
  const [activeList, setActiveList] = useState<Array<boolean>>(
    new Array(Object.keys(PROJECT_LIST).length).fill(true)
  );
  const [cardMouseOver, setCardMouseOver] = useState<boolean>(false);
  const [device, setDevice] = useState<"mobile" | "pc">("mobile");

  // 디바이스 환경 체크
  useEffect(() => {
    if (!entered) return;

    const checkDevice = () => {
      const userAgent = navigator.userAgent;
      const isMobile = userAgent.match(
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
      );
      if (isMobile) {
        const stickyItem = stickyItemRef.current;
        gsap.to(stickyItem, {
          translateX: 0,
          translateY: 0,
          scale: 1,
        });
      }
      setDevice(isMobile ? "mobile" : "pc");
    };
    window.addEventListener("resize", checkDevice);
    checkDevice();

    return () => {
      window.removeEventListener("resize", checkDevice);
    };
  }, [setDevice, entered]);

  // 화면 진입 감지
  useEffect(() => {
    if (!stickyContainerRef.current) {
      return;
    }
    const stickyContainer = stickyContainerRef.current;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio === 0) {
          setEntered(false);
        } else {
          setEntered(true);
        }
      });
    });

    observer.observe(stickyContainer);
  }, []);

  // 마우스 이동 시 프로젝트 리스트 효과
  const onMouseMove = (e: MouseEvent<HTMLElement>) => {
    if (device === "mobile" || !entered) return;

    const innerWidth = window.innerWidth;
    const innerHeight = window.innerHeight;
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const mouseXFromCenter = (mouseX / innerWidth - 0.5) * 100;
    const mouseYFromCenter = (mouseY / innerHeight - 0.5) * 100;

    const projectListSection = stickyItemRef.current;

    gsap.to(projectListSection, {
      duration: 0.7,
      delay: 0.1,
      translateX: -mouseXFromCenter + "px",
      translateY: -mouseYFromCenter + "px",
      scale: cardMouseOver ? 1.2 : 1,
      transformOrigin: `${mouseX}px ${mouseY}px`,
    });

    // gsap.to(projectListSection, {
    //   duration: 0.3,
    //   delay: 0,
    //   scale: cardMouseOver ? 1.2 : 1,
    // });
  };

  // 프로젝트 리스트 카드 옵저버
  useEffect(() => {
    if (!listRef.current || !startObserve || !entered) return;

    const scrollTrigger = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          const targetIndex = parseInt(entry.target.id);

          setActiveList((prev) => {
            const newList = _.cloneDeep(prev);

            if (entry.isIntersecting) {
              newList[targetIndex] = true;
            } else if (!entry.isIntersecting) {
              newList[targetIndex] = false;
            }

            return newList;
          });
        });
      },
      { threshold: 0.3 }
    );

    const cards = cardRefs.current;

    cards.forEach((card) => scrollTrigger.observe(card));

    return () => {
      cards.forEach((card) => scrollTrigger.unobserve(card));
    };
  }, [startObserve, entered]);

  useEffect(() => {
    if (
      !entered ||
      !listRef.current ||
      !stickyContainerRef.current ||
      !stickyItemRef.current
    )
      return;

    const windowScrollHandler = () => {
      const list = listRef.current;
      const stickyContainer = stickyContainerRef.current;
      const stickyItem = stickyItemRef.current;
      if (!listRef.current || !stickyContainer || !stickyItem) return;

      const scrollProgress = calcScroll(stickyContainer, stickyItem);

      if (scrollProgress > 0.05) {
        setHeaderAway(true);
      } else {
        setHeaderAway(false);
      }

      if (scrollProgress < 0) {
        gsap.to(stickyContainer, {
          translateY: `${-100 * scrollProgress}vh`,
          duration: 0.7,
          ease: "back",
        });
      } else {
        gsap.to(stickyContainer, {
          translateY: "0",
          duration: 0,
        });
      }

      gsap
        .to(list, {
          translateX: `${-(scrollProgress - 0.5) * Math.sqrt(200 ** 2 * 2)}vh`, // 컨테이너와 리스트의 높이가 400vh일 때, 그 절반인 200vh 정사각형의 대각선 길이 구하기
          translateY: `${-(scrollProgress - 0.5) * 200}vh`, // 컨테이너와 리스트 높이의 절반
        })
        .then(() => setStartObserve(true));
    };

    windowScrollHandler();

    window.addEventListener("scroll", windowScrollHandler);

    return () => {
      window.removeEventListener("scroll", windowScrollHandler);
    };
  }, [calcScroll, entered, headerAway]);

  const projectGenerator = (projectList: {
    [key in string]: { icon: string; path: string };
  }) => {
    const onMouseEnter = () => {
      setCardMouseOver(true);
      // const tl = gsap.timeline();
      // tl.to("." + styles.list, {
      //   filter: "blur(0px)",
      //   duration: 0,
      // });
      // tl.to("." + styles.list, {
      //   filter: "blur(3px)",
      //   duration: 0.3,
      // });
      // tl.to("." + styles.list, {
      //   filter: "blur(0px)",
      //   duration: 0.4,
      // });
    };
    const onMouseLeave = () => {
      setCardMouseOver(false);
    };

    return Object.entries(projectList).map((project, i) => {
      return (
        <li
          key={i}
          ref={(el) => {
            if (el) cardRefs.current[i] = el;
          }}
          id={`${i}`}
          className={activeList[i] ? styles.active : ""}
        >
          <div
            onMouseEnter={device === "mobile" ? () => {} : onMouseEnter}
            onMouseLeave={device === "mobile" ? () => {} : onMouseLeave}
            className={styles["project-list__item"]}
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
          </div>
        </li>
      );
    });
  };

  return (
    <section
      ref={stickyContainerRef}
      onMouseMove={onMouseMove}
      className={classNames(
        styles.container,
        headerAway && styles.headerAway,
        device === "mobile" && styles.mobile
      )}
    >
      {/* <div className={styles.hook}>
        <div className={styles.white}></div>

        <NextImage src={hookImage} height={50} width={50} alt="fishing hook" />
        <div className={styles.black}>
          <NextImage
            src={hookImage}
            height={50}
            width={50}
            alt="fishing hook"
          />
        </div>
      </div> */}
      <div className={styles.title}>
        {/* <div className={styles["title_author"]}>RAREBEEF&apos;s</div> */}
        <h1 className={styles["title_main"]}>
          <div>PROJECT</div> <div>LIST</div>
        </h1>
        {/* <div className={styles["scroll-to-continue"]}>SCROLL TO CONTINUE</div> */}
      </div>
      <div
        ref={stickyItemRef}
        className={classNames(
          styles["list-wrapper"],
          cardMouseOver && styles["zoom-in"]
        )}
      >
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
    </section>
  );
};

export default ProjectList;
