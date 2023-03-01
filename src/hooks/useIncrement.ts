import { useState } from 'react';

type UseIncrementReturnType = [number, () => void];

export const useIncrement = (initialValue: number = 0): UseIncrementReturnType => {
  const [count, setCount] = useState<number>(initialValue);

  function increment(): void {
    setCount(count + 1);
  }

  return [count, increment];
};
