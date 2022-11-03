/* eslint-disable @next/next/no-img-element */
import React, {
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./Section.module.scss";
import SectionHeader from "./SectionHeader";
import Skill from "./Skill";
import classNames from "classnames";
import Button from "./Button";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Pagination } from "swiper";
import { SectionPropType } from "../types";
import dayjs, { Dayjs } from "dayjs";
import Image from "next/image";
import _ from "lodash";

const Section: React.FC<SectionPropType> = ({
  data,
  children,
}): ReactElement => {
  const screenshotsRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [latestCommit, setLatestCommit] = useState<any>(null);

  useEffect(() => {
    const scrollTrigger = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting)
            entry.target.classList.add(styles["active"]);
        });
      },
      { threshold: 0.3 }
    );

    if (cardRefs.current.length !== 0)
      cardRefs.current.forEach((card) => {
        if (!card) return;
        scrollTrigger.observe(card);
      });

    if (screenshotsRef.current) scrollTrigger.observe(screenshotsRef.current);
  }, []);

  const swiperGeneroator = (): Array<any> => {
    if (!data.imgs) {
      return [];
    }

    const swiperReturn: Array<any> = [];

    data.imgs.forEach((img, i) => {
      swiperReturn.push(
        <SwiperSlide className={styles["swiper__item"]} key={i}>
          <Image
            src={img}
            alt="Screenshot"
            placeholder="blur"
            layout="responsive"
            priority={i === 0 ? true : false}
          />
        </SwiperSlide>
      );
    });

    return swiperReturn;
  };

  const skillGeneroator = (): Array<any> => {
    const skillReturn: Array<any> = [];
    const { skills } = data;

    skills.forEach((skill, i) => {
      skillReturn.push(<Skill skill={skill} key={i} />);
    });

    return skillReturn;
  };

  const getCommits = useCallback(async () => {
    if (!data.links.github) return;

    const githubHref = data.links.github;
    const repo = githubHref.slice(28);

    if (!repo) return;

    const auth = window.btoa("RAREBEEF:" + process.env.NEXT_PUBLIC_TOKEN);

    await fetch(`https://api.github.com/repos/RAREBEEF/${repo}/commits`, {
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
  }, [data.links.github]);

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
    <section
      className={classNames(
        styles.container,
        data.name.map((item: string): string => styles[item])
      )}
    >
      <SectionHeader
        title={data.header.title}
        subTitle={data.header.subTitle}
        classes={data.name}
      />
      <div className={styles.content}>
        {data.imgs && (
          <div className={styles.screenshots} ref={screenshotsRef}>
            <Swiper
              color="black"
              className={styles["swiper__container"]}
              modules={[Navigation, Pagination, EffectCoverflow, Pagination]}
              navigation={{ nextEl: ".nav--next", prevEl: ".nav--prev" }}
              pagination={{
                clickable: true,
                type: "bullets",
              }}
              slidesPerView={1}
              effect="coverflow"
              coverflowEffect={{
                slideShadows: false,
              }}
              spaceBetween={20}
              grabCursor
              loop={true}
            >
              <div className={styles["swiper__navigation-wrapper"]}>
                <div>
                  <div
                    className={classNames(
                      styles["swiper__navigation"],
                      "nav--prev"
                    )}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      style={{ transform: "rotate(-90deg)" }}
                    >
                      <path
                        fill="#fefefe"
                        d="M256 0C114.6 0 0 114.6 0 256c0 141.4 114.6 256 256 256s256-114.6 256-256C512 114.6 397.4 0 256 0zM390.6 310.6c-12.5 12.5-32.75 12.5-45.25 0L256 221.3L166.6 310.6c-12.5 12.5-32.75 12.5-45.25 0s-12.5-32.75 0-45.25l112-112C239.6 147.1 247.8 144 256 144s16.38 3.125 22.62 9.375l112 112C403.1 277.9 403.1 298.1 390.6 310.6z"
                      />
                    </svg>
                  </div>
                </div>
                <div style={{ transform: "rotate(180deg)" }}>
                  <div
                    className={classNames(
                      styles["swiper__navigation"],
                      "nav--next"
                    )}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      style={{ transform: "rotate(-90deg)" }}
                    >
                      <path
                        fill="#fefefe"
                        d="M256 0C114.6 0 0 114.6 0 256c0 141.4 114.6 256 256 256s256-114.6 256-256C512 114.6 397.4 0 256 0zM390.6 310.6c-12.5 12.5-32.75 12.5-45.25 0L256 221.3L166.6 310.6c-12.5 12.5-32.75 12.5-45.25 0s-12.5-32.75 0-45.25l112-112C239.6 147.1 247.8 144 256 144s16.38 3.125 22.62 9.375l112 112C403.1 277.9 403.1 298.1 390.6 310.6z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              {swiperGeneroator()}
            </Swiper>
          </div>
        )}
        {children}
        <div
          ref={(el) => (cardRefs.current[0] = el)}
          className={classNames(styles.summary, styles.card)}
        >
          <h3 className={styles["card__title"]}>Project summary</h3>
          <div className={styles["summary-wrapper"]}>
            <h4 className={styles["summary__sub-title"]}>프로젝트명</h4>
            <p
              className={classNames(
                styles["card__content"],
                styles["summary__text"]
              )}
            >
              {data.summary.name}
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
              {data.summary.date}
            </p>
          </div>
          <div className={styles["summary-wrapper"]}>
            <h4 className={styles["summary__sub-title"]}>개발 인원</h4>
            <p
              className={classNames(
                styles["card__content"],
                styles["summary__text"]
              )}
            >
              {data.summary.headCount}명
            </p>
          </div>
        </div>
        <div
          ref={(el) => (cardRefs.current[1] = el)}
          className={classNames(styles.description, styles.card)}
        >
          <h3 className={styles["card__title"]}>Description</h3>
          <p className={classNames(styles["card__content"])}>
            {data.description}
          </p>
        </div>
        <div
          ref={(el) => (cardRefs.current[2] = el)}
          className={classNames(styles.skills, styles.card)}
        >
          <h3 className={styles["card__title"]}>Skills</h3>
          <ul className={classNames(styles["card__content"])}>
            {skillGeneroator()}
          </ul>
        </div>
        <div
          ref={(el) => (cardRefs.current[3] = el)}
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

        <div
          ref={(el) => (cardRefs.current[4] = el)}
          className={classNames(styles.links, styles.card)}
        >
          <h3 className={styles["card__title"]}>Links</h3>
          <div className={classNames(styles["card__content"])}>
            {data.links.github && (
              <Button
                icon="/icons/github-square-brands.svg"
                href={data.links.github}
                classes={["Home__project-link"]}
              />
            )}
            {data.links.velog && (
              <Button
                icon="/icons/velog-square.svg"
                href={data.links.velog}
                classes={["Home__project-link"]}
              />
            )}
            {data.links.project && (
              <Button
                icon={data.links.project.icon}
                href={data.links.project.href}
                classes={["Home__project-link"]}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section;
