import { ChangeEvent, useEffect, useState } from "react";
import styles from "./StrangeAstronautConsole.module.scss";
import { useRouter } from "next/router";
import Loading from "./Loading";
import Image from "next/image";

const StrangeAstronautConsole = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [currentSkin, setCurrentSkin] = useState<string>("default");
  const skins = ["default", "glitch", "black", "blue", "red", "green", "pink"];

  // 저장된 스킨 불러오기
  useEffect(() => {
    const storedSkin = window.localStorage.getItem("skin") || "default";
    setCurrentSkin(storedSkin);
  }, []);

  // 스킨 변경
  const onSkinChange = (e: ChangeEvent<HTMLInputElement>) => {
    const currentScroll = window.scrollY;
    setLoading(true);
    const {
      target: { value },
    } = e;
    setCurrentSkin(value);
    window.localStorage.setItem("skin", value);
    router.replace("/projects/strangeastronaut" + "?skin=" + value).then(() => {
      setLoading(false);
      window.scrollTo({ top: currentScroll });
    });
  };

  return (
    <div className={styles.container}>
      <h3>Astronauts</h3>
      <ul className={styles["skin-list"]}>
        {skins.map((skin, i) => (
          <li key={i} className={styles["skin-card"]}>
            <label>
              {/* <div className={styles["skin-img-wrapper"]}> */}
              <Image
                src={`/images/astronauts/${skin}_character_right${
                  skin === "glitch" ? "_1" : ""
                }.png`}
                alt={"skin " + skin}
                width="80"
                height="80"
              />
              {/* </div> */}
              <div className={styles["skin-name"]}>{skin.toUpperCase()}</div>
              <input
                type="radio"
                name="skin"
                value={skin}
                onChange={onSkinChange}
                checked={skin === currentSkin}
              />
            </label>
          </li>
        ))}
      </ul>
      {loading && (
        <div className={styles.loading}>
          <p className={styles["loading-text"]}>스킨을 변경하는 중</p>
        </div>
      )}
    </div>
  );
};

export default StrangeAstronautConsole;
