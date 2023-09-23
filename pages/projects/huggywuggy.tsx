/* eslint-disable @next/next/no-img-element */
import React, { ReactElement, useRef } from "react";
import styles from "./huggywuggy.module.scss";
import ProjectHeader from "../../components/ProjectHeader";
import Skill from "../../components/Skill";
import classNames from "classnames";
import Button from "../../components/Button";
import { SectionPropType } from "../../types";
import _ from "lodash";
import data from "../../projects/huggywuggy";
import Seo from "../../components/Seo";
import img from "../../public/logos/huggy_wuggy.svg";

const Project: React.FC<SectionPropType> = (): ReactElement => {
  const screenshotsRef = useRef<HTMLDivElement>(null);

  const skillGeneroator = (): Array<any> => {
    const skillReturn: Array<any> = [];
    const { skills } = data;

    skills.forEach((skill, i) => {
      skillReturn.push(<Skill skill={skill} key={i} />);
    });

    return skillReturn;
  };

  return (
    <main>
      <Seo
        title="HUGGY WUGGY"
        description="간단한 아이디어를 구현하며 Canvas API의 사용법에 대해 익혀 보았습니다. 캔버스에 고정 좌표를 생성하고 네 개의 점(손발)을 인접한 고정 좌표로 이동시켜 마치 팔다리가 움직이는 것 같은 애니메이션을 구현하는 아이디어입니다. 그리고 그 위에 캐릭터의 모습을 덧씌워 캐릭터가 벽을 타고 이동하는 장면을 연출해 보았습니다. 점의 위치를 몸통 기준 사분면으로 구분하고 거리순으로 정렬하여 각 손발의 활동 반경을 자연스럽게 유지하였고 마우스를 가리키는 손과 플래시라이트의 각도를 계산하는 등 여러 부분에서 디테일을 높이기 위해 노력해 보았습니다."
        url={`https://rarebeef.co.kr/projects/reactnative`}
        img={img.src}
      />
      <article
        className={classNames(
          styles.container,
          data.name.map((item: string): string => styles[item]),
          data.name[0] === "Clock" && styles.clock
        )}
      >
        <ProjectHeader
          title={data.header.title}
          subTitle={data.header.subTitle}
          classes={data.name}
        />
        {/* <div className={styles["get-huggy-wrapper"]}>
          <button className={styles["get-huggy-btn"]}>
            다른 페이지에서도 효과 켜기
          </button>
        </div> */}
        <div className={styles.content}>
          <div className={styles["content__left"]}>
            {/* <div className={styles["children-wrapper"]} ref={screenshotsRef}>
              <HuggyWuggy />
            </div> */}
          </div>
          <div className={styles["content__left"]}></div>
          <div className={styles["content__right"]}>
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
                <h4 className={styles["summary__sub-title"]}>내용</h4>
                <p
                  className={classNames(
                    styles["card__content"],
                    styles["summary__text"]
                  )}
                >
                  {data.description}
                </p>
              </div>
            </div>
            <div className={classNames(styles.skills, styles.card)}>
              <h3 className={styles["card__title"]}>Skills</h3>
              <ul className={classNames(styles["card__content"])}>
                {skillGeneroator()}
              </ul>
            </div>
            <div className={classNames(styles.links, styles.card)}>
              <h3 className={styles["card__title"]}>Links</h3>
              <div className={styles["card__content"]}>
                <ul className={styles["link__list"]}>
                  {data.links.github && (
                    <li>
                      <Button
                        icon="/icons/github-square-brands.svg"
                        href={data.links.github}
                        classes={["Home__project-link"]}
                      />
                    </li>
                  )}
                  {data.links.velog && (
                    <li>
                      <Button
                        icon="/icons/velog-square.svg"
                        href={data.links.velog}
                        classes={["Home__project-link"]}
                      />
                    </li>
                  )}
                  {data.links.project && (
                    <li>
                      <Button
                        icon={data.links.project.icon}
                        href={data.links.project.href}
                        classes={["Home__project-link"]}
                      />
                    </li>
                  )}
                </ul>
                {data.testAccount && (
                  <div className={styles["test-account"]}>
                    <h4 className={styles["links__sub-title"]}>Test account</h4>
                    <ul className={styles["test-account__list"]}>
                      <li>
                        <span>ID : {data.testAccount.id}</span>
                      </li>
                      <li>
                        <span>PW : {data.testAccount.pw}</span>
                      </li>
                    </ul>
                    <p>혹은 가상의 이메일로 가입하셔도 됩니다.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
};

export default Project;
