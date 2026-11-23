"use client";

import { useCallback, useEffect, useState, type RefObject } from "react";

/** Toggles the browser fullscreen state of the element behind `targetRef`. */
export function useFullscreen(targetRef: RefObject<HTMLElement | null>) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const onChange = () => setIsFullscreen(document.fullscreenElement === targetRef.current && targetRef.current !== null);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, [targetRef]);

  const toggle = useCallback(() => {
    const target = targetRef.current;
    if (!target) return;
    if (document.fullscreenElement) {
      void document.exitFullscreen().catch(() => undefined);
    } else {
      void target.requestFullscreen?.().catch(() => undefined);
    }
  }, [targetRef]);

  return { isFullscreen, toggle };
}
