import React, {
  ReactElement,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import SectionHeader from "./SectionHeader";
import styles from "./ReactNative.module.scss";
import { Canvas } from "@react-three/fiber";
import classNames from "classnames";
import Skill from "./Skill";
import Button from "./Button";
import Loading from "./Loading";
import Phones from "../scenes/Phones";
import dayjs, { Dayjs } from "dayjs";

const ReactNative = (): ReactElement => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyElRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [latestCommit, setLatestCommit] = useState<any>(null);

  useEffect(() => {
    const cardsScrollTrigger = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add(styles["active"]);
      });
    });

    if (cardRefs.current.length === 0) return;
    cardRefs.current.forEach((card) => {
      if (!card) return;
      cardsScrollTrigger.observe(card);
    });
  }, []);

  const getCommits = useCallback(async () => {
    const auth = window.btoa("RAREBEEF:" + process.env.NEXT_PUBLIC_TOKEN);

    await fetch(`https://api.github.com/repos/RAREBEEF/Todo-app/commits`, {
      method: "GET",
      headers: {
        Authorization: "Basic " + auth,
      },
    })
      .then((result) => result.json())
      .then((data) => {
        setLatestCommit(data[0]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    getCommits();
  }, [getCommits]);

  const calcDateDiff = (): string | null => {
    if (!latestCommit) return null;

    const updateDate: Dayjs = dayjs(latestCommit.commit.committer.date);
    const today: Dayjs = dayjs();
    const rtf = new Intl.RelativeTimeFormat("ko", { numeric: "auto" });
    return rtf.format(-today.diff(updateDate, "day"), "day");
  };

  return (
    <section className={styles.container} ref={containerRef}>
      <SectionHeader
        title={["ToDo", "&", "Weather", "App"]}
        subTitle={["with", "React", "Native"]}
        classes={["ReactNative"]}
      />
      <main ref={stickyElRef} className={styles.content}>
        <Suspense fallback={<Loading />}>
          <Canvas className={styles.canvas} dpr={[1, 1.2]}>
            <Phones containerRef={containerRef} stickyElRef={stickyElRef} />
          </Canvas>
        </Suspense>
        <div
          ref={(el) => (cardRefs.current[0] = el)}
          className={classNames(styles.summary, styles.card)}
        >
          <h3 className={styles["card__title"]}>Project summary</h3>
          <div className={styles["summary-wrapper"]}>
            <h4 className={styles["summary__sub-title"]}>???????????????</h4>
            <p
              className={classNames(
                styles["card__content"],
                styles["summary__text"]
              )}
            >
              ToDo & Wheater
            </p>
          </div>
          <div className={styles["summary-wrapper"]}>
            <h4 className={styles["summary__sub-title"]}>?????? ??????</h4>
            <p
              className={classNames(
                styles["card__content"],
                styles["summary__text"]
              )}
            >
              2022.05.30 ~ 06.03
            </p>
          </div>
          <div className={styles["summary-wrapper"]}>
            <h4 className={styles["summary__sub-title"]}>??????</h4>
            <p
              className={classNames(
                styles["card__content"],
                styles["summary__text"]
              )}
            >
              {
                "ToDo??? ?????? ????????? ???????????????????????????.\nReact Native??? Expo??? ????????? ??????????????? ?????????????????????. ToDo ????????? Drag & Drop, Progress bar ?????? ????????? ??????????????? ?????? ????????? geoLocation, weather api ?????? ????????? ?????????????????????.\n?????? ???????????? ???????????? ?????? ?????? 3D ????????? Three.js??? ?????? ????????? ?????? ????????? ???????????????."
              }
            </p>
          </div>
          {/* <div className={styles["summary-wrapper"]}>
            <h4 className={styles["summary__sub-title"]}>?????? ??????</h4>
            <p
              className={classNames(
                styles["card__content"],
                styles["summary__text"]
              )}
            >
              1???
            </p>
          </div> */}
        </div>
        {/* <div
          ref={(el) => (cardRefs.current[1] = el)}
          className={classNames(styles.description, styles.card)}
        >
          <h3 className={styles["card__title"]}>Description</h3>
          <p className={classNames(styles["card__content"])}>
            {
              "ToDo??? ?????? ????????? ???????????????????????????.\nReact Native??? Expo??? ????????? ??????????????? ?????????????????????. ToDo ????????? Drag & Drop, Progress bar ?????? ????????? ??????????????? ?????? ????????? geoLocation, weather api ?????? ????????? ?????????????????????.\n?????? ???????????? ???????????? ?????? ?????? 3D ????????? Three.js??? ?????? ????????? ?????? ????????? ???????????????."
            }
          </p>
        </div> */}
        <div
          ref={(el) => (cardRefs.current[1] = el)}
          className={classNames(styles.skills, styles.card)}
        >
          <h3 className={styles["card__title"]}>Skills</h3>
          <ul className={classNames(styles["card__content"])}>
            <Skill skill="JavaScript" />
            <Skill skill="React Native" />
            <Skill skill="Blender" />
            <Skill skill="Three.js" />
          </ul>
        </div>
        <div
          ref={(el) => (cardRefs.current[2] = el)}
          className={classNames(styles.update, styles.card)}
        >
          <hgroup>
            <h3 className={styles["card__title"]}>Latest update</h3>
            <h4
              className={classNames(
                styles["update__date-diff"],
                styles["card__title"]
              )}
            >
              {calcDateDiff() + " ????????? ??????"}
            </h4>
          </hgroup>
          {latestCommit ? (
            <ul className={classNames(styles["card__content"])}>
              <a href={latestCommit.html_url} target="_blank" rel="noreferrer">
                <h5 className={styles["update__message"]}>
                  {latestCommit.commit.message}
                </h5>
                <span className={styles["update__date"]}>
                  {dayjs(latestCommit.commit.committer.date).format(
                    "YYYY.MM.DD HH:mm"
                  )}
                </span>
              </a>
            </ul>
          ) : (
            <p>??? ??? ??????</p>
          )}
        </div>
        <div
          ref={(el) => (cardRefs.current[3] = el)}
          className={classNames(styles.links, styles.card)}
        >
          <h3 className={styles["card__title"]}>Links</h3>
          <div className={classNames(styles["card__content"])}>
            <ul className={styles["link__list"]}>
              <li>
                <Button
                  icon="/icons/github-square-brands.svg"
                  href="https://github.com/RAREBEEF/Todo-app"
                  classes={["Home__project-link"]}
                />
              </li>
              <li>
                <Button
                  icon="/icons/velog-square.svg"
                  href="https://velog.io/@drrobot409/React-Native-Expo-ToDo%EC%95%B1-%EB%A7%8C%EB%93%A4%EA%B8%B0"
                  classes={["Home__project-link"]}
                />
              </li>
            </ul>
          </div>
        </div>
      </main>
    </section>
  );
};

export default ReactNative;
