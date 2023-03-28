import React, {
  ReactElement,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import ProjectHeader from "./ProjectHeader";
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
  const [latestCommit, setLatestCommit] = useState<any>(null);

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
      <ProjectHeader
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
        <div className={classNames(styles.summary, styles.card)}>
          <h3 className={styles["card__title"]}>Project summary</h3>
          <div className={styles["summary-wrapper"]}>
            <h4 className={styles["summary__sub-title"]}>프로젝트명</h4>
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
            <h4 className={styles["summary__sub-title"]}>개발 기간</h4>
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
            <h4 className={styles["summary__sub-title"]}>내용</h4>
            <p
              className={classNames(
                styles["card__content"],
                styles["summary__text"]
              )}
            >
              {
                "ToDo와 날씨 모바일 애플리케이션입니다.\nReact Native와 Expo를 사용해 프로젝트를 진행하였습니다. ToDo 앱에는 Drag & Drop, Progress bar 등의 기능을 구현하였고 날씨 앱에는 geoLocation, weather api 등의 기능을 구현하였습니다.\n앱이 배포까지 이뤄지지 못한 대신 3D 모델과 Three.js로 앱의 모습을 대신 표현해 보았습니다."
              }
            </p>
          </div>
        </div>
        <div className={classNames(styles.skills, styles.card)}>
          <h3 className={styles["card__title"]}>Skills</h3>
          <ul className={classNames(styles["card__content"])}>
            <Skill skill="JavaScript" />
            <Skill skill="React Native" />
            <Skill skill="Blender" />
            <Skill skill="Three.js" />
          </ul>
        </div>
        <div className={classNames(styles.update, styles.card)}>
          <hgroup>
            <h3 className={styles["card__title"]}>Latest update</h3>
            <h4
              className={classNames(
                styles["update__date-diff"],
                styles["card__title"]
              )}
            >
              {calcDateDiff() + " 마지막 커밋"}
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
            <p>알 수 없음</p>
          )}
        </div>
        <div className={classNames(styles.links, styles.card)}>
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
