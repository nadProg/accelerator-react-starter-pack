import { Direction } from '../constants/common';
import { DirectionType } from '../types/common';

export const getChangeArrayIndex =
  <T>(items: T[] | null, direction: DirectionType) =>
    (prevIndex: number | null) => {
      if (!items || !items.length) {
        return null;
      }

      if (prevIndex === null) {
        return 0;
      }

      if (direction === Direction.Increase) {
        const newIndex = prevIndex + 1;

        if (newIndex >= items.length) {
          return 0;
        }

        return newIndex;
      }

      const newIndex = prevIndex - 1;

      if (newIndex < 0) {
        return items.length - 1;
      }

      return newIndex;
    };

export const createArrayOfObjects = <T>(
  createObject: () => T,
  amount: number,
): T[] => new Array(amount).fill(null).map(() => createObject());

export const asyncDelay = (delay: number): Promise<void> =>
  new Promise<void>((resolve) => setTimeout(() => resolve(), delay));
