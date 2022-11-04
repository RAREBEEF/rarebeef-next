/* eslint-disable @next/next/no-img-element */
import classNames from "classnames";
import { ButtonPropType } from "../types";
import styles from "./Button.module.scss";

/**
 * @param text 버튼 내용
 * @param onClick onClick 리스너
 * @param classes 클래스 배열
 * @param icon 아이콘 경로
 * @param href 링크 경로
 *  */ 
const Button: React.FC<ButtonPropType> = ({
  text,
  onClick,
  classes,
  icon,
  href,
}) => {
  return href ? (
    <a
      onClick={onClick}
      href={href}
      className={classNames(
        styles.button,
        classes?.map((item: string): string => styles[item])
      )}
      target="_blank"
      rel="noreferrer"
    >
      {icon && <img src={icon} alt={text} className={styles.icon} />}
      {text}
    </a>
  ) : (
    <button
      onClick={onClick}
      className={classNames(
        styles.button,
        classes?.map((item: string): string => styles[item])
      )}
    >
      {icon && (
        <img src={icon} alt={text} className={styles.icon} onClick={onClick} />
      )}
      {text}
    </button>
  );
};

export default Button;
