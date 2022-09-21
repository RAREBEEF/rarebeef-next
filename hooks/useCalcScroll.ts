// (뷰포트 상단 기준 section top의 y 위치) / (contianer높이 - sticy요소(content) 높이)
// fixed 시작 시점이 0,
// fixed가 해제될 때 100이 된다.

const useCalcScroll = (sectionRef: any) => {
  const { current: section } = sectionRef;

  const calcScroll = (containerHeight: number) => {
    return (
      (section.getBoundingClientRect().top /
        (window.innerHeight * containerHeight -
          section.childNodes[1].clientHeight)) *
      -1
    );
  };

  return calcScroll;
};

export default useCalcScroll;
