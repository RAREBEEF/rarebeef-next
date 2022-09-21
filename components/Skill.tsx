import { SkillPropType } from "../types";
import styles from "./Skill.module.scss";
import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";

const Skill: React.FC<SkillPropType> = ({ skill }) => {
  const [showInfoWindow, setShowInfoWindow] = useState<boolean>(false);
  const infoWindowRef = useRef<HTMLDivElement>(null);

  const srcs = {
    "Three.js": "/skills/three-brands.svg",
    React: "/skills/react-brands.svg",
    Next: "/skills/next-brands.svg",
    "React Native": "/skills/react-native-brands.svg",
    Redux: "/skills/redux-brands.svg",
    Blender: "/skills/blender-brands.svg",
    TypeScript: "/skills/ts-brands.svg",
    Firebase: "/skills/firebase-brands.svg",
    JavaScript: "/skills/js-brands.svg",
    Sass: "/skills/sass-brands.svg",
    HTML: "/skills/html5-brands.svg",
    CSS: "/skills/css3-alt-brands.svg",
    Netlify: "/skills/netlify-brands.svg",
    Illustrator: "/skills/ai-brands.svg",
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
      <img
        className={styles["img--skill"]}
        src={srcs[skill]}
        alt={skill}
        onMouseEnter={onMouseEnter}
        onTouchStart={onTouch}
        onMouseLeave={onMouseLeave}
      />
    </li>
  );
};

export default Skill;
