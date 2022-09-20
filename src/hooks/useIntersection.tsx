import { useEffect, useState, useCallback } from 'react';

type UseIntersectionArgs = {
  callback: () => void;
  threshold?: number;
};

const useIntersection = ({ callback, threshold = 0.5 }: UseIntersectionArgs) => {
  const [target, setTarget] = useState<HTMLElement | null | undefined>(null);

  const onIntersect: IntersectionObserverCallback = ([entry], observer) => {
    if (entry.isIntersecting) {
      observer.unobserve(entry.target);
    }
  };

  useEffect(() => {
    if (!target) return;

    const observer = new IntersectionObserver(onIntersect, { threshold: threshold });
    observer.observe(target);

    return () => observer.disconnect();
  }, [target]);

  return [target, setTarget];
};

export default useIntersection;
