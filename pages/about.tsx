import styles from "./about.module.scss";
import React, { useEffect, useState } from "react";
import classNames from "classnames";
import SectionHeader from "../components/SectionHeader";
import { ProfilePropType } from "../types";
import Skill from "../components/Skill";
import Footer from "../components/Footer";
import Seo from "../components/Seo";

const About: React.FC<ProfilePropType> = () => {
  const [age, setAge] = useState<number>(0);

  useEffect(() => {
    const date = new Date();

    setAge(
      date.getMonth() < 10 || (date.getMonth() === 10 && date.getDate() < 6)
        ? date.getFullYear() - 1998
        : date.getFullYear() - 1997
    );
  }, []);

  return (
    <main className={styles.container}>
      <Seo
        title="ABOUT"
        description="RAREBEEF의 About 페이지입니다. RAREBEEF에 대해 알아보세요. 이름 : 송의영 / 생년월일: 1998.10.06 / 스킬 : HTML5 CSS3 JavaScript TypeScript React Next.js Scss Redux Three.js Firebase Netlify Illustrator Blender"
      />
      <SectionHeader
        title={["About", "me"]}
        subTitle={["Junior Developer"]}
        classes={["Profile"]}
      />

      <div className={styles.content}>
        <section className={styles.section} id="name">
          <h4 className={styles.header}>Name</h4>
          <span className={styles.text}>
            소고기는레어 <span>(본명 : 송의영)</span>
          </span>
        </section>
        <section className={styles.section} id="birth-date">
          <h4 className={styles.header}>Birth date</h4>
          <span className={styles.text}>
            1998년 10월 6일<span>({age}살)</span>
          </span>
        </section>
        <section className={styles.section}>
          <h4 className={styles.header}>Skills</h4>
          <ul>
            <li>
              <h5 className={styles["sub-header"]}>Front-end</h5>
              <ul className={styles["skills__front-end"]}>
                <Skill skill="HTML" />
                <Skill skill="CSS" />
                <Skill skill="JavaScript" />
                <Skill skill="TypeScript" />
                <Skill skill="React" />
                <Skill skill="Next" />
                <Skill skill="Sass" />
                <Skill skill="Redux" />
                <Skill skill="Three.js" />
                <Skill skill="Firebase" />
                <Skill skill="Netlify" />
              </ul>
            </li>
            <li>
              <h5 className={styles["sub-header"]}>Design</h5>
              <ul className={styles["skills__design"]}>
                <Skill skill="Illustrator" />
                <Skill skill="Blender" />
              </ul>
            </li>
          </ul>
        </section>
        <section className={classNames(styles.section, styles.plan)}>
          <h4 className={styles.header}>Future plans</h4>
          <ol>
            <li id={"first-plan"} className={styles["sub-header"]}>
              1. React VR
            </li>
            <li id={"second-plan"} className={styles["sub-header"]}>
              2. PWA
            </li>
          </ol>
        </section>
      </div>
      <Footer />
    </main>
  );
};

export default About;
