import { useEffect, useRef } from "react";

export function useWindowResize(onResize: () => void) {
  const resizeRef = useRef<() => void>(onResize);

  useEffect(() => {
    resizeRef.current = onResize;
  });

  useEffect(() => {
    window.addEventListener("resize", resizeRef.current);
    if (window.onorientationchange !== undefined) {
      window.addEventListener("orientationchange", resizeRef.current);
    }

    return () => {
      window.removeEventListener("resize", resizeRef.current);
      if (window.onorientationchange !== undefined) {
        window.removeEventListener("orientationchange", resizeRef.current);
      }
    };
  }, []);
}
