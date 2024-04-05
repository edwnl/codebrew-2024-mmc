import { useEffect, useCallback } from 'react';

const useOnClickAway = (ref, handler, excludedClassName) => {
  const memoizedHandler = useCallback(
    (event) => {
      if (!ref.current || ref.current.contains(event.target) || excludedClassName) {
        return;
      }

      handler(event);
    },
    [ref, handler, excludedClassName]
  );

  useEffect(() => {
    const listener = (event) => memoizedHandler(event);

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [memoizedHandler]);
};

export default useOnClickAway;
