/* eslint-disable eqeqeq */
/* eslint-disable no-mixed-operators */
import React, { ReactElement, useCallback, useRef, useState } from "react";
import classNames from "classnames";
import styles from "./ClockApp.module.scss";
import gsap from "gsap";

const ClockApp = (): ReactElement => {
  const [vh, setVh] = useState<number>();
  const [time, setTime] = useState<Array<any>>([
    "00",
    "00",
    "00",
    "0000",
    "00",
    "00",
    "0",
  ]);
  const [show, setShow] = useState<"alarm" | "date">("date");
  const [select, setSelect] = useState<number>(3);
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [alarm, setAlarm] = useState<any>({
    h: "",
    m: "",
    s: "",
    active: false,
    ring: false,
  });
  // const [alarmSound] = useState<any>(
  //   <audio src={require("../audios/alarm-sound.wav")} />
  // );

  const focusRef = useRef<any>(null);

  React.useEffect(() => {
    setVh(window.innerHeight * 0.01);
  }, []);

  React.useEffect(() => {
    // alarmSound.loop = true;

    const windowResizeHandler = (e: Event) => {
      e.preventDefault();

      setVh(window.innerHeight * 0.01);
    };

    window.addEventListener("resize", windowResizeHandler);

    document.documentElement.style.setProperty("--vh", `${vh}px`);

    const timeUpdate = setInterval(() => {
      const date = new Date();

      setTime([
        date.getHours() < 10 ? `0${date.getHours()}` : date.getHours(),
        date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes(),
        date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds(),
        date.getFullYear(),
        date.getMonth() < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1,
        date.getDate() < 10 ? `0${date.getDate()}` : date.getDate(),
        date.getDay(),
      ]);

      if (alarm.active) {
        if (
          (alarm.h == time[0] || (alarm.h == "" && time[0] == "00")) &&
          (alarm.m == time[1] || (alarm.m == "" && time[1] == "00")) &&
          (alarm.s == time[2] || (alarm.s == "" && time[2] == "00"))
        ) {
          setAlarm((prevAlarm: any) => ({ ...prevAlarm, ring: true }));
          // alarmSound.play();
        }
      }
    }, 100);

    return () => {
      clearInterval(timeUpdate);
      window.removeEventListener("resize", windowResizeHandler);
    };
  });

  const clickAnimation = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.target, 0.1, {
      repeat: 1,
      yoyo: true,
      translateY: "10vmin",
    });
  }, []);

  const nextClick = (e: React.MouseEvent<HTMLDivElement>) => {
    clickAnimation(e);

    if (!!alarm.active) {
      setSelect(select === 3 ? 0 : select + 1);
    }

    if (
      parseInt(alarm.h) >= 24 ||
      parseInt(alarm.m) >= 60 ||
      parseInt(alarm.s) >= 60
    ) {
      setAlarm((prevAlarm: any) => ({ ...prevAlarm, h: "", m: "", s: "" }));
    }
  };

  const prevClick = (e: React.MouseEvent<HTMLDivElement>) => {
    clickAnimation(e);

    if (!!alarm.active) {
      setSelect(select === 0 ? 3 : select - 1);
    }

    if (
      parseInt(alarm.h) >= 24 ||
      parseInt(alarm.m) >= 60 ||
      parseInt(alarm.s) >= 60
    ) {
      setAlarm((prevAlarm: any) => ({ ...prevAlarm, h: "", m: "", s: "" }));
    }
  };

  const selectClick = (e: React.MouseEvent<HTMLDivElement>) => {
    clickAnimation(e);

    if (select === 3) {
      setAlarm((prevAlarm: any) => ({
        ...prevAlarm,
        active: !prevAlarm.active,
      }));
    } else if (!isFocus) {
      setIsFocus(true);
      focusRef.current.focus();
      select === 0 && setAlarm((prevAlarm: any) => ({ ...prevAlarm, h: "" }));
      select === 1 && setAlarm((prevAlarm: any) => ({ ...prevAlarm, m: "" }));
      select === 2 && setAlarm((prevAlarm: any) => ({ ...prevAlarm, s: "" }));
    } else {
      setIsFocus(false);
      focusRef.current.blur();
    }
  };

  const dateClick = () => {
    setShow("date");
  };

  const alarmClick = () => {
    setShow("alarm");
  };

  const hourInput = (e: any) => {
    if (!e.target.value) {
      return;
    }

    if (isNaN(parseInt(e.target.value))) {
      setAlarm((prevAlarm: any) => ({ ...prevAlarm, h: "" }));
    } else {
      setAlarm((prevAlarm: any) => ({ ...prevAlarm, h: e.target.value }));
    }
  };

  const minuteInput = (e: any) => {
    if (!e.target.value) {
      return;
    }

    if (isNaN(parseInt(e.target.value))) {
      setAlarm((prevAlarm: any) => ({ ...prevAlarm, m: "" }));
    } else {
      setAlarm((prevAlarm: any) => ({ ...prevAlarm, m: e.target.value }));
    }
  };

  const secondInput = (e: any) => {
    if (!e.target.value) {
      return;
    }

    if (isNaN(parseInt(e.target.value))) {
      setAlarm((prevAlarm: any) => ({ ...prevAlarm, s: "" }));
    } else {
      setAlarm((prevAlarm: any) => ({ ...prevAlarm, s: e.target.value }));
    }
  };

  const stopRinging = () => {
    setAlarm((prevAlarm: any) => ({ ...prevAlarm, ring: false }));
    // alarmSound.pause();
    // alarmSound.currentTime = 0;
  };

  return (
    <div
      className={classNames(styles["clock-wrapper"])}
      // style={{ height: "calc(var(--vh, 1vh) * 100)" }}
    >
      <div
        className={classNames(
          styles["btn-wrapper"],
          alarm.ring && styles["ring"]
        )}
      >
        <div
          className={classNames(
            styles["btn"],
            styles["btn--date"],
            show === "date" && styles["active"]
          )}
          onClick={dateClick}
        >
          Clock
        </div>
        <div
          className={classNames(
            styles["btn"],
            styles["btn--alarm"],
            show === "alarm" && styles["active"]
          )}
          onClick={alarmClick}
        >
          Alarm
        </div>
        <div
          className={classNames(
            styles["btn"],
            styles["btn--alarm-off"],
            alarm.ring && styles["active"]
          )}
          onClick={stopRinging}
        >
          STOP
        </div>
        <div
          className={classNames(
            styles["btn"],
            styles["btn--prev"],
            !(show === "alarm") && styles["active"]
          )}
          onClick={prevClick}
        >
          PREV
        </div>
        <div
          className={classNames(
            styles["btn"],
            styles["btn--select"],
            !(show === "alarm") && styles["active"]
          )}
          onClick={selectClick}
        >
          SELECT
        </div>
        <div
          className={classNames(
            styles["btn"],
            styles["btn--next"],
            !(show === "alarm") && styles["active"]
          )}
          onClick={nextClick}
        >
          NEXT
        </div>
      </div>
      <div
        className={classNames(styles["clock"], alarm.ring && styles["ring"])}
      >
        <div className={classNames(styles["day"])}>
          <div
            className={classNames(
              time[6] === 0 && show === "date" && styles["active"]
            )}
          >
            SUN
          </div>
          <div
            className={classNames(
              time[6] === 1 && show === "date" && styles["active"]
            )}
          >
            MON
          </div>
          <div
            className={classNames(
              time[6] === 2 && show === "date" && styles["active"]
            )}
          >
            TUE
          </div>
          <div
            className={classNames(
              time[6] === 3 && show === "date" && styles["active"]
            )}
          >
            WED
          </div>
          <div
            className={classNames(
              time[6] === 4 && show === "date" && styles["active"]
            )}
          >
            THU
          </div>
          <div
            className={classNames(
              time[6] === 5 && show === "date" && styles["active"]
            )}
          >
            FRI
          </div>
          <div
            className={classNames(
              time[6] === 6 && show === "date" && styles["active"]
            )}
          >
            SAT
          </div>
        </div>
        <div className={classNames(styles["date-time-wrapper"])}>
          <div
            className={classNames(
              styles["date"],
              show === "alarm" && styles["alarm"]
            )}
          >
            <span
              className={classNames(
                styles["toggle-alarm"],
                alarm.active && styles["active"],
                show === "alarm" && select === 3 && styles["select"]
              )}
            >
              ON
            </span>
            {show === "date" && ` ${time[3]} / ${time[4]} / ${time[5]}`}
            {show === "alarm" && " 0000 / 00 / 00"}
          </div>
          {show === "date" ? (
            <div
              className={classNames(
                styles["time"],
                // show === "alarm" && styles["active"]
                show !== "date" && styles["active"]
              )}
            >
              {show === "date" && `${time[0]}:${time[1]}:${time[2]}`}
            </div>
          ) : (
            <div
              className={classNames(
                styles["alarm__timer"],
                alarm.active && styles["active"]
              )}
            >
              <input
                className={classNames(select === 0 && styles["select"])}
                type="text"
                placeholder="00"
                maxLength={2}
                ref={select === 0 ? focusRef : null}
                value={alarm.h}
                onChange={hourInput}
              ></input>
              :
              <input
                className={classNames(select === 1 && styles["select"])}
                type="text"
                placeholder="00"
                maxLength={2}
                ref={select === 1 ? focusRef : null}
                value={alarm.m}
                onChange={minuteInput}
              ></input>
              :
              <input
                className={classNames(select === 2 && styles["select"])}
                type="text"
                placeholder="00"
                maxLength={2}
                ref={select === 2 ? focusRef : null}
                value={alarm.s}
                onChange={secondInput}
              ></input>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClockApp;
