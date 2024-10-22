/**
 * @return clacScroll function
 * */
const useCalcScroll = () => {
  /**
   * @param container scroll container
   * @param stickyEl sticky content
   * @returns fixed가 시작될 때 0, 끝날 때 1
   */
  // const calcScroll = (
  //   container: HTMLElement,
  //   stickyEls: Array<HTMLElement>
  // ) => {
  //   const progresses = [0, 0, 0];

  //   for (let i = 0; i < stickyEls.length; i++) {
  //     const sticky = stickyEls[i];

  //     const stickyHeight = sticky.offsetHeight;
  //     const viewportHeight = window.innerHeight;
  //     const stickyTop = sticky.getBoundingClientRect().top;

  //     let progress =
  //       (viewportHeight - stickyTop) / (viewportHeight + stickyHeight);

  //     progress = Math.min(Math.max(progress, 0), 1);
  //     progresses[i] = progress;
  //   }

  //   return progresses;
  // };
  const calcScroll = (container: HTMLElement, stickyEl: HTMLElement) => {
    const containerTop = container.getBoundingClientRect().top;

    // (뷰포트 상단 기준 컨테이너 top의 y 위치) / (ref 높이 - sticky요소(content) 높이),
    // 스크롤을 내리면 컨테이너 top의 y 위치는 계속 위로 올라가고 sticky 요소의 위치는 그대로이다.
    let y =
      (container.getBoundingClientRect().top /
        (container.clientHeight - stickyEl.clientHeight)) *
      -1;
    return y;

    // let yy =
    //   (container.getBoundingClientRect().top /
    //     (container.clientHeight - stickyEl.getBoundingClientRect().top)) *
    //   -1;

    // 총 스크롤 높이
    const scrollHeight = document.documentElement.scrollHeight;
    // 현재 스크롤 위치
    const scrollY = window.scrollY;
    const offsetTop = stickyEl.offsetTop;
    // 뷰포트 상단과 stickyEl 상단 사이의 거리(현재값)
    const stickyFromTop = stickyEl.getBoundingClientRect().top;
    // 뷰포트 상단과 stickyEl 하단 사이의 거리(현재값)
    const stickyFromBottom = stickyEl.getBoundingClientRect().bottom;
    // stickyEl의 높이
    const stickyHeight = stickyEl.clientHeight;
    // 뷰포트 높이
    const viewportHeight = window.innerHeight;
    // stickyEl이 유지되는 길이
    const stickyDuration = stickyHeight - viewportHeight;
    const stickyStartWhen = stickyFromTop;
    const stickyEndWhen = stickyHeight - viewportHeight + stickyStartWhen;

    // console.log(
    //   `
    //   ${offsetTop}
    // sticky duration : ${stickyDuration}
    // sticky start when : ${stickyStartWhen}
    // sticky end when : ${stickyEndWhen}
    // ${1 - (stickyStartWhen + stickyDuration) / stickyDuration}
    //       `
    // );

    // if () {
    //   console.log(0);
    //   return 0;
    // } else {
    //   console.log("붙음");
    // }

    return Math.max(
      Math.min(1 - (stickyStartWhen + stickyDuration) / stickyDuration, 1),
      0
    );

    // console.log(
    //   `
    // sticky duration : ${stickyDuration}
    // sticky start when : ${stickyStartWhen}
    // sticky end when : ${stickyEndWhen}
    // ${1 - (stickyStartWhen + stickyDuration) / stickyDuration}

    //       `
    // );

    // // if () {
    // //   console.log(0);
    // //   return 0;
    // // } else {
    // //   console.log("붙음");
    // // }

    // return Math.max(
    //   Math.min(1 - (stickyStartWhen + stickyDuration) / stickyDuration, 1),
    //   0
    // );
  };

  return calcScroll;
};

export default useCalcScroll;
