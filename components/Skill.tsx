import { SkillPropType } from "../types";
import styles from "./Skill.module.scss";
import React, { MouseEvent, useEffect, useRef } from "react";
import classNames from "classnames";
import Blender from "../public/skills/blender-brands.svg";
import Three from "../public/skills/three-brands.svg";
import react from "../public/skills/react-brands.svg";
import Next from "../public/skills/next-brands.svg";
import reactNative from "../public/skills/react-native-brands.svg";
import Redux from "../public/skills/redux-brands.svg";
import TypeScript from "../public/skills/ts-brands.svg";
import JavaScript from "../public/skills/js-brands.svg";
import Firebase from "../public/skills/firebase-brands.svg";
import Sass from "../public/skills/sass-brands.svg";
import HTML from "../public/skills/html5-brands.svg";
import Netlify from "../public/skills/netlify-brands.svg";
import CSS from "../public/skills/css3-alt-brands.svg";
import Illustrator from "../public/skills/ai-brands.svg";
import Tailwindcss from "../public/skills/tailwindcss-brands.svg";
import reactQuery from "../public/skills/react-query-brands.svg";
import Vercel from "../public/skills/vercel-brands.svg";
import Image from "next/image";

const Skill: React.FC<SkillPropType> = ({ skill }) => {
  const skillRef = useRef<HTMLDivElement>(null);
  const srcs = {
    "Three.js": Three,
    React: react,
    Next,
    "React Query": reactQuery,
    "React Native": reactNative,
    Redux,
    Blender,
    TypeScript,
    Firebase,
    JavaScript,
    Sass,
    HTML,
    CSS,
    Netlify,
    Illustrator,
    Tailwindcss,
    Vercel,
  };

  const skillMouseMoveHandler = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    const position = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - position.left - position.width / 2) * 0.3;
    const y = (e.clientY - position.top - position.height / 2) * 0.3;

    e.currentTarget.style.transform = `translate(${x}px, ${y}px)`;
    e.currentTarget.style.transition = `all 0s`;
  };

  const skillMouseOutHandler = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    e.currentTarget.style.transform = `translate(0px, 0px)`;
    e.currentTarget.style.transition = `all 0.5s cubic-bezier(0.68, -0.6, 0.32, 1.6)`;
  };

  return (
    <li className={styles.container}>
      <div
        onMouseMove={skillMouseMoveHandler}
        onMouseOut={skillMouseOutHandler}
        ref={skillRef}
        className={styles["skill"]}
      >
        <div className={styles["skill__img"]}>
          <Image src={srcs[skill]} alt={skill} layout="responsive" />
        </div>
        <div className={classNames(styles["skill__tooltip"])}>
          <span className={styles["tooltip-text"]}>{skill}</span>
        </div>
      </div>
    </li>
  );
};

export default Skill;
