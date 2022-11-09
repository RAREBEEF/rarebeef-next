import { SkillPropType } from "../types";
import styles from "./Skill.module.scss";
import React, { useEffect, useRef, useState } from "react";
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
import Image from "next/image";

const Skill: React.FC<SkillPropType> = ({ skill }) => {
  const [showInfoWindow, setShowInfoWindow] = useState<boolean>(false);

  const srcs = {
    "Three.js": Three,
    React: react,
    Next,
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
  };

  useEffect(() => {
    const skills = document.querySelectorAll(`.${styles["skill"]}`);

    if (!skills) {
      return;
    }

    skills.forEach((skill: any) => {
      skill.addEventListener("mousemove", (e: any) => {
        const position = skill.getBoundingClientRect();
        const x = (e.clientX - position.left - position.width / 2) * 0.3;
        const y = (e.clientY - position.top - position.height / 2) * 0.3;

        skill.style.transform = `translate(${x}px, ${y}px)`;
        skill.style.transition = `all 0s`;
      });

      skill.addEventListener("mouseout", () => {
        skill.style.transform = `translate(0px, 0px)`;
        skill.style.transition = `all 0.5s cubic-bezier(0.68, -0.6, 0.32, 1.6)`;
      });
    });

    const windowScrollListener = () => {
      setShowInfoWindow(false);
    };

    window.addEventListener("scroll", windowScrollListener);

    return () => {
      skills.forEach((skill: any) => {
        skill.removeEventListener("mousemove", (e: any) => {
          const position = skill.getBoundingClientRect();
          const x = (e.clientX - position.left - position.width / 2) * 0.3;
          const y = (e.clientY - position.top - position.height / 2) * 0.3;

          skill.style.transform = `translate(${x}px, ${y}px)`;
          skill.style.transition = `all 0s`;
        });

        skill.removeEventListener("mouseout", () => {
          skill.style.transition = `all 0.5s cubic-bezier(0.68, -0.6, 0.32, 1.6);`;
        });
      });

      window.removeEventListener("scroll", windowScrollListener);
    };
  }, []);

  return (
    <li className={styles.container}>
      <div className={styles["skill"]}>
        <div className={styles["skill__img"]}>
          <Image src={srcs[skill]} alt={skill} />
        </div>

        <div
          className={classNames(
            styles["skill__tooltip"],
            showInfoWindow && styles.show
          )}
        >
          <span className={styles["tooltip-text"]}>{skill}</span>
        </div>
      </div>
    </li>
  );
};

export default Skill;
