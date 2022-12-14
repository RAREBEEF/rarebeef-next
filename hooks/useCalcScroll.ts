import { legacy_createStore } from "redux";

/**
 * @return clacScroll function
 * */
const useCalcScroll = () => {
  /**
   * @param ref scroll container
   * @returns fixed가 시작될 때 0, 끝날 때 1
   */
  const calcScroll = (container: any, stickyEl: any) => {
    // (뷰포트 상단 기준 section top의 y 위치) / (ref 높이 - sticy요소(content) 높이),
    let x =
      (container.getBoundingClientRect().top /
        (container.clientHeight - stickyEl.clientHeight)) *
      -1;

    return x;
  };

  return calcScroll;
};

export default useCalcScroll;
