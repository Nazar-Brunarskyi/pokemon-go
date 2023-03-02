import { useState, useCallback } from 'react';

type UseIncrementReturnType = [number, (valueToSet?: number) => void];

export const useIncrement = (initialValue: number = 0): UseIncrementReturnType => {
  const [count, setCount] = useState<number>(initialValue);

  const increment = (valueToSet?: number): void => {
    if (valueToSet) {
      setCount(valueToSet)
    } else {
      setCount(count + 1);
    }
  }

  return [count, increment];
};
