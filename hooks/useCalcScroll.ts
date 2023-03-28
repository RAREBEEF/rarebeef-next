/**
 * @return clacScroll function
 * */
const useCalcScroll = () => {
  /**
   * @param container scroll container
   * @param stickyEl sticky content
   * @returns fixed가 시작될 때 0, 끝날 때 1
   */
  const calcScroll = (container: HTMLElement, stickyEl: HTMLElement) => {
    // (뷰포트 상단 기준 컨테이너 top의 y 위치) / (ref 높이 - sticy요소(content) 높이),
    // 스크롤을 내리면 컨테이너 top의 y 위치는 계속 위로 올라가고 sticky 요소의 위치는 그대로이다.
    let x =
      (container.getBoundingClientRect().top /
        (container.clientHeight - stickyEl.clientHeight)) *
      -1;

    return x;
  };

  return calcScroll;
};

export default useCalcScroll;
