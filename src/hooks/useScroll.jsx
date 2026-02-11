import { useRef } from 'react';

export const useHorizontalScroll = () => {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft -= 200;
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += 200;
    }
  };

  return {
    scrollRef,
    scrollLeft,
    scrollRight,
  };
};