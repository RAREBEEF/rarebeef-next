import classNames from "classnames";
import { ReactElement, useEffect, useState } from "react";
import { HeaderPropType } from "../types";
import styles from "./ProjectHeader.module.scss";
import { useRouter } from "next/router";

const ProjectHeader: React.FC<HeaderPropType> = ({
  title,
  subTitle,
  classes,
}): ReactElement => {
  const router = useRouter();
  const [navigatingCurApp, setNavigatingCurApp] = useState<boolean>(false);

  useEffect(() => {
    const navigatingCurApp = sessionStorage.getItem("navigatingCurApp");

    setNavigatingCurApp(navigatingCurApp === "true");
  }, []);

  const onBackButtonClick = () => {
    if (navigatingCurApp) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <hgroup
      className={classNames(
        styles.header,
        classes?.map((item: string): string => styles[item])
      )}
    >
      <button className={styles["back"]} onClick={onBackButtonClick}>
        <div className={styles["arrow-wrapper"]}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            width="16px"
            height="16px"
            style={{ transform: "rotate(-90deg)" }}
          >
            <path
              fill="#fefefe"
              d="M256 0C114.6 0 0 114.6 0 256c0 141.4 114.6 256 256 256s256-114.6 256-256C512 114.6 397.4 0 256 0zM390.6 310.6c-12.5 12.5-32.75 12.5-45.25 0L256 221.3L166.6 310.6c-12.5 12.5-32.75 12.5-45.25 0s-12.5-32.75 0-45.25l112-112C239.6 147.1 247.8 144 256 144s16.38 3.125 22.62 9.375l112 112C403.1 277.9 403.1 298.1 390.6 310.6z"
            />
          </svg>
        </div>
        {navigatingCurApp ? "뒤로가기" : "홈으로"}
      </button>
      <h2 className={styles["title"]}>
        {typeof title === "string"
          ? title
          : title.map((title: string, index: number) => (
              <span
                key={index}
                className={classNames(
                  styles[`title__break${index}`],
                  styles["title__break"]
                )}
              >
                {title}
                &nbsp;
              </span>
            ))}
      </h2>
      {subTitle && (
        <h3 className={styles["sub-title"]}>
          {typeof subTitle === "string"
            ? subTitle
            : subTitle.map((title: string, index: number) => (
                <span
                  key={index}
                  className={classNames(
                    styles[`sub-title__break${index}`],
                    styles["sub-title__break"]
                  )}
                >
                  {title}
                  &nbsp;
                </span>
              ))}
        </h3>
      )}
    </hgroup>
  );
};

export default ProjectHeader;
