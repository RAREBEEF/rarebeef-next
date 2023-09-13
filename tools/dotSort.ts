const dotSort = (
  dots: Array<{ id: string; distance: number }>
): Array<{ id: string; distance: number }> => {
  if (dots.length < 2) return dots;

  const center = Math.round(dots.length / 2),
    left = dotSort(dots.slice(0, center)),
    right = dotSort(dots.slice(center)),
    merged: Array<{ id: string; distance: number }> = [];

  let indexL = 0,
    indexR = 0;

  while (indexL < left.length && indexR < right.length) {
    const distanceL = left[indexL].distance,
      distanceR = right[indexR].distance;

    if (distanceL <= distanceR) {
      merged.push(left[indexL]);
      indexL += 1;
    } else {
      merged.push(right[indexR]);
      indexR += 1;
    }
  }

  return merged.concat(left.slice(indexL), right.slice(indexR));
};

export default dotSort;
