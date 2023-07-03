import { useState, useEffect } from "react";

function debounce(fn, ms) {
  let timer = null;

  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      // eslint-disable-next-line prefer-rest-params
      fn.apply(this, arguments);
    }, ms);
  };
}

export function useWindowDimension() {
  const [dimension, setDimension] = useState([0, 0]);

  useEffect(() => {
    setDimension([window.innerWidth, window.innerHeight]);
    const debouncedResizeHandler = debounce(() => {
      setDimension([window.innerWidth, window.innerHeight]);
    }, 100); // 100ms
    window.addEventListener("resize", debouncedResizeHandler);

    return () => window.removeEventListener("resize", debouncedResizeHandler);
  }, []); // Note this empty array. this effect should run only on mount and unmount

  return dimension
}
