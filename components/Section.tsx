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

const Section: React.FC<SectionPropType> = ({ data }): ReactElement => {
  const screenshotsRef = useRef<HTMLDivElement>(null);
  const [latestCommit, setLatestCommit] = useState<any>(null);
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

    data.skills.forEach((skill, i) => {
      skillReturn.push(<Skill skill={skill} key={i} />);
    });

    return skillReturn;
  };

  useEffect(() => {
    if (!data.imgs) {
      return;
    }

    const windowScrollListener = () => {
      if (!screenshotsRef.current) {
        return;
      }

      let scrollDegree =
        screenshotsRef.current.getBoundingClientRect().top - window.innerHeight;

      if (
        scrollDegree < 100 &&
        !screenshotsRef.current.classList.contains(styles.active)
      ) {
        screenshotsRef.current.classList.add(styles.active);
      } else if (
        scrollDegree >= 100 &&
        screenshotsRef.current.classList.contains(styles.active)
      ) {
        screenshotsRef.current.classList.remove(styles.active);
      }
    };

    window.addEventListener("scroll", _.throttle(windowScrollListener, 200));

    return () => {
      window.removeEventListener(
        "scroll",
        _.throttle(windowScrollListener, 200)
      );
    };
  }, [data.imgs]);

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
                <div className={styles["swiper__navigation"]}>
                  <img
                    className={classNames(styles["swiper__arrow"], "nav--prev")}
                    src="/icons/angle-left-solid.svg"
                    alt="Previous screenshot"
                  />
                </div>
                <div className={styles["swiper__navigation"]}>
                  <img
                    className={classNames(styles["swiper__arrow"], "nav--next")}
                    src="/icons/angle-left-solid.svg"
                    alt="Next screenshot"
                  />
                </div>
              </div>
              {swiperGeneroator()}
            </Swiper>
          </div>
        )}
        {data.app && <data.app />}
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
        <div className={classNames(styles.description, styles.card)}>
          <h3 className={styles["card__title"]}>Description</h3>
          <p className={classNames(styles["card__content"])}>
            {data.description}
          </p>
        </div>
        <div className={classNames(styles.skills, styles.card)}>
          <h3 className={styles["card__title"]}>Skills</h3>
          <ul className={classNames(styles["card__content"])}>
            {skillGeneroator()}
          </ul>
        </div>

        {latestCommit && (
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
          </div>
        )}

        <div className={classNames(styles.links, styles.card)}>
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
