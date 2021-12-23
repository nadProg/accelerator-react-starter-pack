
type directionType = 'increase' | 'decrease';

export const getChangeArrayIndex = <T>(array: T[] | null, direction: directionType) => (prevIndex: number | null) => {
  if (!array || !array.length) {
    return null;
  }

  if (prevIndex === null) {
    return 0;
  }

  if (direction === 'increase') {
    const newIndex = prevIndex + 1;

    if (newIndex >= array.length) {
      return 0;
    }

    return newIndex;
  }

  const newIndex = prevIndex - 1;

  if (newIndex < 0) {
    return array.length - 1;
  }

  return newIndex;
};
