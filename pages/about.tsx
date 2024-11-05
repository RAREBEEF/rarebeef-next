import styles from "./about.module.scss";
import React, { useEffect, useState } from "react";
import classNames from "classnames";
import ProjectHeader from "../components/ProjectHeader";
import { ProfilePropType } from "../types";
import Skill from "../components/Skill";
import Footer from "../components/Footer";
import Seo from "../components/Seo";
import { useRouter } from "next/router";

const About: React.FC<ProfilePropType> = () => {
  const [age, setAge] = useState<number>(0);
  const { push } = useRouter();

  useEffect(() => {
    const date = new Date();

    setAge(
      date.getMonth() < 9 || (date.getMonth() === 9 && date.getDate() < 6)
        ? date.getFullYear() - 1998
        : date.getFullYear() - 1997
    );
  }, []);

  return (
    <main className={styles.container}>
      <Seo
        title="ABOUT"
        description="이름 : 송의영 / 생년월일: 1998.10.06 / 스킬 : HTML5 CSS3 JavaScript TypeScript React Next.js Scss Tailwindcss Redux Three.js Firebase Netlify Illustrator"
      />
      <ProjectHeader
        title={["About", "me"]}
        subTitle={["Junior Developer"]}
        classes={["Profile"]}
      />

      <div className={styles.content}>
        <section className={styles.section} id="name">
          <h4 className={styles.header}>Name</h4>
          <span className={styles.text}>
            <span>소고기는레어</span> <span>(본명 : 송의영)</span>
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
                <Skill skill="Tailwindcss" />
                <Skill skill="React Query" />
                <Skill skill="Redux" />
                <Skill skill="Recoil" />
                <Skill skill="Three.js" />
                <Skill skill="Firebase" />
                <Skill skill="Netlify" />
                <Skill skill="Vercel" />
              </ul>
            </li>
            <li>
              <h5 className={styles["sub-header"]}>Design</h5>
              <ul className={styles["skills__design"]}>
                <Skill skill="Illustrator" />
              </ul>
            </li>
          </ul>
        </section>
        <section className={classNames(styles.section, styles.plan)}>
          <h4 className={styles.header}>Future plans</h4>
          <ol>
            <li id={"first-plan"} className={styles["sub-header"]}>
              1. PWA
            </li>
            <li id={"second-plan"} className={styles["sub-header"]}>
              2. Next.js 13
            </li>
          </ol>
        </section>
      </div>
      <Footer />
    </main>
  );
};

export default About;
