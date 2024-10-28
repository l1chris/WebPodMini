import { useState } from 'react';

export function useUpdateIndex(maxIndex: number) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const updateIndex = (scrollDirection: string) => {
    setSelectedIndex((prev) => {
      if (scrollDirection === 'counterclockwise') {
        return prev > 0 ? prev - 1 : 0;
      } else if (scrollDirection === 'clockwise') {
        return prev < maxIndex ? prev + 1 : maxIndex;
      }
      return prev;
    });
  };

  return { selectedIndex, updateIndex };
}
