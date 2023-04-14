import styles from "./index.module.scss";
import NextImage, { StaticImageData } from "next/legacy/image";
import simpleMemo from "../../public/logos/simple-memo-icon.png";
import digitalClock from "../../public/logos/clock-icon.png";
import metaBeef from "../../public/logos/meta-beef-icon.png";
import memoryTest from "../../public/logos/memory-test-icon.png";
import reactNative from "../../public/skills/react-native-brands.svg";
import paletteVault from "../../public/logos/palette-vault-icon.png";
import diary from "../../public/logos/diary-icon.png";
import splatoon from "../../public/logos/splatoon-icon.svg";
import raebef from "../../public/logos/raebef-icon.svg";
import { useEffect, useRef, useState } from "react";
import useCalcScroll from "../../hooks/useCalcScroll";
import gsap from "gsap";
import Link from "next/link";
import Footer from "../../components/Footer";
import Seo from "../../components/Seo";
import Button from "../../components/Button";
import { getMessaging, getToken } from "firebase/messaging";
import classNames from "classnames";
import * as FB from "../../fb";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";

const PROJECT_LIST = {
  Raebef: { icon: raebef, path: "raebef" },
  Splatoon3: { icon: splatoon, path: "splatoon3" },
  Diary: { icon: diary, path: "diary" },
  "Palette Vault": { icon: paletteVault, path: "palettevault" },
  "Memory Test": { icon: memoryTest, path: "memorytest" },
  "To Do, Weather": { icon: reactNative, path: "reactnative" },
  "Meta Beef": { icon: metaBeef, path: "metabeef" },
  "Digital Clock": { icon: digitalClock, path: "digitalclock" },
  "Simple Memo": { icon: simpleMemo, path: "simplememo" },
};

const ProjectList = () => {
  const [startObserve, setStartObserve] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const stickyRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<Array<HTMLElement>>([]);
  const calcScroll = useCalcScroll();

  // 푸시 허용 요청 이력 체크
  useEffect(() => {
    const permission = localStorage.getItem("notificationPermission");
    switch (permission) {
      case "true":
        setShowModal(false);
        break;
      case "false":
        setShowModal(false);
        break;
      default:
        setShowModal(true);
    }
  }, []);

  const uploadToken = async (currentToken: string) => {
    const docRef = doc(FB.db, "subscribe", "tokens");
    await updateDoc(docRef, {
      list: arrayUnion(currentToken),
    })
      .then(() => {
        localStorage.setItem("notificationPermission", "true");
      })
      .catch((error) => {
        console.log(error);
        window.alert(
          "서버 연결에 실패하였습니다.\n잠시 후 다시 시도해 주세요."
        );
        return;
      });
  };

  // 푸시 허용 요청
  const requestPermission = () => {
    // 우선 모달 닫고
    setShowModal(false);

    Notification.requestPermission().then((permission) => {
      if (permission !== "granted") {
        // 푸시 거부 시
        localStorage.setItem("notificationPermission", "false");
      } else {
        // 푸시 허용 시
        const messaging = getMessaging();

        getToken(messaging, {
          // 토큰 생성
          vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY,
        })
          .then(async (currentToken) => {
            if (!currentToken) {
              // 토큰 생성 불가
              window.alert(
                "푸시 토큰 생성에 실패하였습니다.\n잠시 후 다시 시도해 주세요."
              );
              return;
            } else {
              // 인증 후 토큰 업로드
              const auth = FB.getAuth();

              if (!auth.currentUser) {
                await FB.signInAnonymously(auth)
                  .then(() => {
                    uploadToken(currentToken);
                  })
                  .catch((error) => {
                    console.log(error);
                    window.alert(
                      "익명 인증에 실패하였습니다.\n잠시 후 다시 시도해 주세요."
                    );
                  });
              } else {
                uploadToken(currentToken);
              }
            }
          })
          .catch((error) => {
            window.alert(
              "푸시 등록 중 문제가 발생하였습니다.\n잠시 후 다시 시도해 주세요."
            );
            console.log("An error occurred while retrieving token. ", error);
            return;
          });
      }
    });
  };

  // 푸시 거부
  const denyPermission = () => {
    localStorage.setItem("notificationPermission", "false");
    setShowModal(false);
  };

  useEffect(() => {
    if (
      !stickyRef.current ||
      !containerRef.current ||
      !listRef.current ||
      !startObserve
    )
      return;

    const scrollTrigger = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles["active"]);
          } else {
            entry.target.classList.remove(styles["active"]);
          }
        });
      },
      { threshold: 0 }
    );

    cardRefs.current.forEach((card) => scrollTrigger.observe(card));
  }, [startObserve]);

  useEffect(() => {
    if (
      !stickyRef.current ||
      !containerRef.current ||
      !listRef.current ||
      showModal
    )
      return;

    const sticky = stickyRef.current;
    const container = containerRef.current;
    const list = listRef.current;

    const scollProgress = calcScroll(container, sticky) - 0.5;

    gsap
      .to(list, {
        translateX: `${-scollProgress * Math.sqrt(200 ** 2 * 2)}vh`, // 컨테이너와 리스트의 높이가 400vh일 때, 그 절반인 200vh 정사각형의 대각선 길이 구하기
        translateY: `${-scollProgress * 200}vh`, // 컨테이너와 리스트 높이의 절반
      })
      .then(() => setStartObserve(true));

    const windowScrollHandler = () => {
      if (!stickyRef.current || !containerRef.current || !listRef.current)
        return;

      const sticky = stickyRef.current;
      const container = containerRef.current;
      const list = listRef.current;

      const scollProgress = calcScroll(container, sticky) - 0.5;

      gsap.to(list, {
        translateX: `${-scollProgress * Math.sqrt(200 ** 2 * 2)}vh`,
        translateY: `${-scollProgress * 200}vh`,
      });
    };

    window.addEventListener("scroll", windowScrollHandler);

    return () => {
      window.removeEventListener("scroll", windowScrollHandler);
    };
  }, [calcScroll, showModal]);

  const projectGenerator = (projectList: {
    [key in string]: { icon: StaticImageData; path: string };
  }) => {
    return Object.entries(projectList).map((project, i) => (
      <li
        key={i}
        ref={(el) => {
          if (el) cardRefs.current[i] = el;
        }}
        className={styles.active}
      >
        <Link href={`/projects/${project[1].path}`}>
          <span className={styles["project-list__item__icon"]}>
            <NextImage
              priority
              src={project[1].icon}
              layout="responsive"
              alt={project[1].path}
            />
          </span>
          <span className={styles["project-list__item__title"]}>
            {project[0]}
          </span>
        </Link>
      </li>
    ));
  };

  return (
    <article
      ref={containerRef}
      className={classNames(
        styles.container,
        showModal && styles["show-modal"]
      )}
    >
      <Seo
        title="PROJECTS"
        description={`현재까지 진행한 프로젝트 목록입니다. ${Object.keys(
          PROJECT_LIST
        ).join(
          ", "
        )} 등의 프로젝트를 진행하였습니다. 리액트와 파이어베이스 기반의 프로젝트가 주를 이루고 있습니다.`}
        url={`https://rarebeef.co.kr/projects`}
      />
      <div ref={stickyRef} className={styles["list-wrapper"]}>
        <ul
          ref={listRef}
          className={styles.list}
          style={{
            transform: `translateX(${Math.sqrt(
              200 ** 2 * 2
            )}vh) translateY(200vh) rotateX(-45deg) rotateZ(-45deg)`,
          }}
        >
          {projectGenerator(PROJECT_LIST)}
        </ul>
      </div>
      <div className={styles.footer}>
        <Footer />
      </div>
      {showModal && (
        <section className={styles["request-permission"]}>
          <div className={styles["request-permission__modal"]}>
            <p>
              푸시를 통해 새로운 프로젝트 알림을 받아보실 수 있습니다.
              <br />
              푸시 알림을 허용하시겠습니까?
            </p>
            <div className={styles["request-permission__modal__btn-wrapper"]}>
              <Button text="허용" onClick={requestPermission} />
              <Button text="거부" onClick={denyPermission} />
            </div>
          </div>
        </section>
      )}
    </article>
  );
};

export default ProjectList;