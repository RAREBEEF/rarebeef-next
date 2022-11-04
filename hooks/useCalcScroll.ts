/**
 * @return clacScroll function
 * */
const useCalcScroll = () => {
  /**
   * @param ref scroll container
   * @returns fixed가 시작될 때 0, 끝날 때 1
   */
  const calcScroll = (ref: any) => {
    const { current: target } = ref;

    // (뷰포트 상단 기준 section top의 y 위치) / (ref 높이 - sticy요소(content) 높이),
    return (
      (target.getBoundingClientRect().top /
        (target.clientHeight - target.childNodes[1].clientHeight)) *
      -1
    );
  };

  return calcScroll;
};

export default useCalcScroll;
