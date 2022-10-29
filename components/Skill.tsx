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
  const infoWindowRef = useRef<HTMLDivElement>(null);

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

  const onMouseEnter = (e: any): void => {
    if (!e.target.alt) {
      return;
    }

    setShowInfoWindow(true);
  };

  const onTouch = (e: any): void => {
    if (!e.target.alt) {
      return;
    }

    setShowInfoWindow(true);

    const currentRef = infoWindowRef.current;

    if (!currentRef) {
      return;
    }

    const x = e.clientX;
    const y = e.clientY;
    currentRef.style.transform = `translate(${x}px, ${y}px)`;
  };

  const onMouseMove = (e: any): void => {
    if (!infoWindowRef.current || !showInfoWindow) {
      return;
    }

    const currentRef = infoWindowRef.current;

    const x = e.clientX;
    const y = e.clientY;
    currentRef.style.transform = `translate(${x}px, ${y}px)`;
  };

  const onMouseLeave = (): void => {
    setShowInfoWindow(false);
  };

  useEffect(() => {
    const skills = document.querySelectorAll(`.${styles["img--skill"]}`);

    if (!skills) {
      return;
    }

    skills.forEach((skill: any): void => {
      skill.addEventListener("mousemove", (e: any): void => {
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

    const windowScrollListener = (): void => {
      setShowInfoWindow(false);
    };

    window.addEventListener("scroll", windowScrollListener);

    return () => {
      skills.forEach((skill: any) => {
        skill.removeEventListener("mousemove", (e: any): void => {
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
    <li className={styles.container} onMouseMove={onMouseMove}>
      <div
        ref={infoWindowRef}
        className={classNames(
          styles["info-window"],
          showInfoWindow && styles.show
        )}
      >
        <span className={styles["info-text"]}>{skill}</span>
      </div>
      <div className={styles["img--skill"]}>
        <Image
          src={srcs[skill]}
          alt={skill}
          onMouseEnter={onMouseEnter}
          onTouchStart={onTouch}
          onMouseLeave={onMouseLeave}
        />
      </div>
    </li>
  );
};

export default Skill;
