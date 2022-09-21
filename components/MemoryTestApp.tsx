import React, { useCallback, useEffect, useMemo, useState } from "react";
import styles from "./MemoryTestApp.module.scss";
import gsap from "gsap";
import classNames from "classnames";

function MemoryTestApp() {
  // 최초 시작
  const [start, setStart] = useState<boolean>(false);
  // 카드 엘리먼트 배열
  const [cardEls, setCardEls] = useState<any>([]);
  // 각 카드의 key 역할을 할 아이템을 담은 배열
  const cards = useMemo(
    () => Array.from(new Array(cardEls.length), (x, i) => i + 1),
    [cardEls]
  );
  // 현재 라운드
  const [round, setRound] = useState<number>(1);
  // 목숨
  const [life, setLife] = useState<number>(1);
  // 화면에 출력할 라운드
  const [displayRound, setDisplayRound] = useState<number>(0);
  // 난이도(보드 크기)
  const [difficulty, setDifficulty] = useState<number>(3);
  // 라운드 시작 여부(클릭 가능 여부 결정)
  const [roundRunning, setRoundRunning] = useState<boolean>(false);
  // 정답
  const [answer, setAnswer] = useState<Array<string | number>>([""]);
  // 정답 개수
  const [answerCount, setAnswerCount] = useState<number>(1);
  // 클릭 횟수
  const [clickCount, setClickCount] = useState<number>(0);
  // 클릭된 카드
  const [clickedCards, setClickedCards] = useState<Array<string>>([]);
  // 실패 여부
  const [isFail, setIsFail] = useState<boolean>(false);
  // 성공 여부
  const [isSuccess, setIsSuccesss] = useState<boolean>(false);
  // 게임 클리어
  const [gameClear, setGameClear] = useState<boolean>(false);
  // 라운드 시작 카운트다운
  const [countdown, setCountdown] = useState<number>(4);
  // 게임오버 카운트다운 클리너
  const [endCountdownClear, setEndCountdownClear] = useState<any>(() => {});
  // 난이도업 딜레이 타이머 클리너
  const [difficultyUpDelayClear, setDifficultyUpDelayClear] = useState<any>(
    () => {}
  );
  // gsap
  const [animations, setAnimations] = useState<Array<any>>([]);

  // 게임 클리어
  const clear = useCallback(() => {
    setGameClear(true);
    setStart(false);
    setRoundRunning(false);
  }, []);

  // 재시작
  const restart = () => {
    cardEls.forEach((el: any) => {
      el.style.backgroundColor = "whitesmoke";
      el.style.boxShadow = "none";
      el.style.borderColor = "whitesmoke";
    });
    setGameClear(false);
    setDisplayRound(0);
    setClickedCards([]);
    setClickCount(0);
    setRound(1);
    setLife(1);
    setAnswerCount(1);
    setDifficulty(3);
    setIsFail(false);
    setStart(false);
    setCountdown(4);
  };

  // 다음 라운드 진행 전 초기화
  const nextRound = useCallback(() => {
    clearTimeout(endCountdownClear);
    setClickCount(0);
    setClickedCards([]);
    setCountdown(4);
    setRoundRunning(false);
    setLife(1);
    setRound((prev) => prev + 1);
    setAnswerCount((prev) => prev + 1);
  }, [endCountdownClear]);

  // 게임오버
  const gameover = useCallback(() => {
    cardEls.forEach((el: any) => {
      if (answer.indexOf(el.id) !== -1 && clickedCards.indexOf(el.id) === -1) {
        el.style.backgroundColor = "whitesmoke";
        el.style.boxShadow = "0px 0px 15px orange, 0px 0px 30px whitesmoke";
        el.style.borderColor = "orange";
      } else if (answer.indexOf(el.id) !== -1) {
        el.style.backgroundColor = "whitesmoke";
        el.style.boxShadow = "0px 0px 15px #48cae4, 0px 0px 30px whitesmoke";
        el.style.borderColor = "#48cae4";
      } else if (
        answer.indexOf(el.id) === -1 &&
        clickedCards.indexOf(el.id) !== -1
      ) {
        el.style.backgroundColor = "whitesmoke";
        el.style.boxShadow = "0px 0px 15px #bf1f1f, 0px 0px 30px whitesmoke";
        el.style.borderColor = "#bf1f1f";
      }
    });
    setIsFail(true);
    setRoundRunning(false);
    setClickCount(0);
  }, [answer, cardEls, clickedCards]);

  // 카드 클릭 함수
  const onCardClick = useCallback(
    (e: any) => {
      // 라운드 시작 전 or 중복 클릭
      if (!roundRunning || clickedCards.indexOf(e.target.id) !== -1) {
        return;
      }

      setClickedCards((prev) => [...prev, e.target.id]);

      // 디버그용;
      // if (e.target.id === "1") {
      // clear();
      // setIsSuccesss(true);

      // nextRound();
      //   return;
      // }

      // 오답일 경우 & 오답 아닐 경우
      if (answer.indexOf(e.target.id) === -1) {
        e.target.style.backgroundColor = "whitesmoke";
        e.target.style.boxShadow =
          "0px 0px 15px #bf1f1f, 0px 0px 30px whitesmoke";
        e.target.style.borderColor = "#bf1f1f";

        if (life !== 0) {
          setLife(0);
        } else {
          gameover();
          clearTimeout(endCountdownClear);
        }

        return;
      } else {
        e.target.style.backgroundColor = "whitesmoke";
        e.target.style.boxShadow =
          "0px 0px 15px #48cae4, 0px 0px 30px whitesmoke";
        e.target.style.borderColor = "#48cae4";
      }

      // 클릭수와 정답개수가 동일하면 다음 라운드, 아닐 경우 계속 클릭 진행
      if (clickCount + 1 === answer.length) {
        setIsSuccesss(true);

        // 난이도 업일 경우 1초 딜레이 후 라운드 진행
        if (round === 4 || round === 12 || round === 24) {
          const difficultyUpDelay = setTimeout(() => {
            nextRound();
          }, 1000);

          setDifficultyUpDelayClear(difficultyUpDelay);

          return;
        }

        // 클리어
        if (round === 49) {
          clear();

          return;
        }

        nextRound();
      } else {
        setClickCount((prev) => prev + 1);
      }
    },
    [
      answer,
      clear,
      clickCount,
      clickedCards,
      endCountdownClear,
      gameover,
      life,
      nextRound,
      round,
      roundRunning,
    ]
  );

  // 라운드 시간제한
  const endCountdown = useCallback((time: number) => {
    const endTimer = setTimeout(() => {
      gameover();
    }, time);

    setEndCountdownClear(endTimer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 난이도 업
  const changeDifficulty = useCallback(
    (num: number) => {
      cardEls.forEach((el: any) => {
        el.style.backgroundColor = "whitesmoke";
        el.style.boxShadow = "none";
        el.style.borderColor = "whitesmoke";
      });

      setAnswerCount(1);
      setDifficulty(num);
    },
    [cardEls]
  );

  // 라운드 시작
  const roundStart = useCallback(() => {
    if (!start) {
      return;
    }

    // 난이도 업일 경우 타이머에 시간 추가용 변수
    let delay = 0;

    // 난이도 업
    if (round === 5) {
      delay = 1000;
      setCountdown(5);
      changeDifficulty(4);
      setDisplayRound(5);
    } else if (round === 13) {
      delay = 1000;
      setCountdown(5);
      changeDifficulty(5);
      setDisplayRound(13);
    } else if (round === 25) {
      delay = 1000;
      setCountdown(5);
      changeDifficulty(6);
      setDisplayRound(25);
    }

    // 라운드 준비
    const prepareTimer = setTimeout(() => {
      setIsSuccesss(false);

      // 난이도 업이 아니면 여기서 displayRound 증가.
      // 난이도 업이면 위에서 직접 증가시키기 때문에 skip
      if (round !== 5 && round !== 13 && round !== 21) {
        setDisplayRound((prev) => prev + 1);
      }

      // 색상 초기화
      cardEls.forEach((el: any) => {
        el.style.backgroundColor = "whitesmoke";
        el.style.boxShadow = "none";
        el.style.borderColor = "whitesmoke";
      });

      // 정답 생성
      const newAnswer = [...cards].map((card) => card.toString());
      for (
        let i = difficulty ** 2 - answerCount, j = difficulty ** 2 - 1;
        i !== 0;
        i--, j--
      ) {
        const pick = Math.round(Math.random() * j);
        newAnswer.splice(pick, 1);
      }

      setAnswer(newAnswer);

      // 정답 표시
      cardEls.forEach((el: any) => {
        if (newAnswer.indexOf(el.id) !== -1) {
          el.style.backgroundColor = "whitesmoke";
          el.style.boxShadow = "0px 0px 15px #48cae4, 0px 0px 30px whitesmoke";
          el.style.borderColor = "#48cae4";
        } else {
          el.style.backgroundColor = "black";
          el.style.borderColor = "black";
        }
      });
    }, 1000 + delay);

    // 시작 카운트다운(출력용)
    const countdown = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    //  정답 표시 색상 초기화
    const colorTimer = setTimeout(() => {
      cardEls.forEach((el: any) => {
        el.style.backgroundColor = "whitesmoke";
        el.style.boxShadow = "none";
        el.style.borderColor = "whitesmoke";
      });
    }, 3000 + delay);

    // 시작 카운트다운(계산용)
    const startTimer = setTimeout(() => {
      setRoundRunning(true);
      setCountdown(0);
      clearTimeout(countdown);
    }, 4000 + delay);

    endCountdown(34000 + delay);

    delay = 0;

    return { colorTimer, startTimer, countdown, delayTimer: prepareTimer };
  }, [
    answerCount,
    cardEls,
    cards,
    changeDifficulty,
    difficulty,
    endCountdown,
    round,
    start,
  ]);

  // 카드 엘리먼트 불러오기
  useEffect(() => {
    setCardEls(document.querySelectorAll(".MemoryTest__card"));
  }, [difficulty]);

  // 카드 반짝반짝 효과
  useEffect(() => {
    if (!start && cardEls.length !== 0) {
      const animationArr: Array<any> = [];

      cardEls.forEach((el: any) => {
        animationArr.push(
          gsap.to(el, cardEls.length / 10, {
            repeat: -1,
            yoyo: true,
            delay: parseInt(el.id) / 10,
            backgroundColor: "whitesmoke",
            borderColor: "#48cae4",
            boxShadow: "0px 0px 15px #48cae4, 0px 0px 30px whitesmoke",
          })
        );
      });

      setAnimations((prev) => [...prev, ...animationArr]);
    }
  }, [cardEls, start]);

  // 게임오버 카운트다운 클리어
  useEffect(() => {
    return () => {
      clearTimeout(endCountdownClear);
      clearTimeout(difficultyUpDelayClear);
    };
  });

  // 라운드 시작마다 실행
  useEffect(() => {
    if (!start) {
      return;
    }

    const { colorTimer, startTimer, countdown, delayTimer }: any = roundStart();

    return () => {
      clearTimeout(colorTimer);
      clearTimeout(startTimer);
      clearTimeout(countdown);
      clearTimeout(delayTimer);
    };
  }, [roundStart, start]);

  // 카드 생성 함수
  // n개의 카드를 n줄 생성한다.
  const rowsGenerator = useCallback(() => {
    const rowsReturn: Array<any> = [];

    // 카드 생성기
    const cardsGenerator = (i: number) => {
      const cardsReturn: Array<any> = [];

      for (let j = 1; j <= difficulty; j++) {
        const id = -difficulty + j + difficulty * i;
        cardsReturn.push(
          <div
            id={`${id}`}
            key={`${id}`}
            className={classNames("MemoryTest__card", styles.card)}
            onClick={onCardClick}
          ></div>
        );
      }

      return cardsReturn;
    };

    // 줄 생성기
    for (let i = 1; i <= difficulty; i++) {
      rowsReturn.push(
        <div key={i} className={styles.row}>
          {/* 카드 생성 */}
          {cardsGenerator(i)}
        </div>
      );
    }

    return rowsReturn;
  }, [difficulty, onCardClick]);

  return (
    <div className={styles.container}>
      <main className={styles.wrapper}>
        <div className={styles.header}>
          <div className={styles.round}>Round {displayRound}</div>
          <div className={styles.level}>
            {displayRound >= 25
              ? "Expert"
              : displayRound >= 13
              ? "Hard"
              : displayRound >= 5
              ? "Normal"
              : "Easy"}
          </div>
        </div>
        <div className={styles.content}>
          {(!start || isFail || gameClear) && (
            <div className={styles.start}>
              {(isFail || gameClear) && (
                <div className={styles["result"]}>
                  {gameClear && (
                    <div className={styles["clear"]}>Congratulation!</div>
                  )}
                  <div className={styles["score__text"]}>Score</div>
                  <div className={styles["score__round"]}>{round}</div>
                </div>
              )}
              <span
                className={styles["start__text"]}
                style={{ fontSize: gameClear || isFail ? "5vmin" : "20vmin" }}
                onClick={() => {
                  animations.forEach((el) => {
                    el.kill();
                  });
                  if (isFail || gameClear) {
                    restart();
                  } else {
                    setStart(true);
                  }
                }}
              >
                {isFail || gameClear ? "Restart" : "Start"}
              </span>
            </div>
          )}
          <div className={styles.status}>
            {isFail
              ? ""
              : isSuccess
              ? round !== 5 && round !== 13 && round !== 25
                ? "Success"
                : "Level up"
              : start &&
                (countdown === 0 ? "Click!" : countdown !== 4 && countdown)}
          </div>
          <div className={styles.board}>{rowsGenerator()}</div>
        </div>
      </main>
    </div>
  );
}

export default MemoryTestApp;
