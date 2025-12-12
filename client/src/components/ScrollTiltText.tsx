import { useEffect, useState, useRef, ReactNode, useCallback } from "react";

interface ScrollTiltTextProps {
  children: ReactNode;
  className?: string;
  maxSkewX?: number;
  intensity?: number;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
}

let scrollListenerCount = 0;
let lastScrollY = 0;
let rafId: number | null = null;
let cleanupFn: (() => void) | null = null;
const subscribers = new Set<(delta: number, isScrolling: boolean) => void>();
let scrollEndTimeout: ReturnType<typeof setTimeout> | null = null;

function setupGlobalScrollListener() {
  if (cleanupFn !== null) return;
  
  lastScrollY = window.scrollY;
  
  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    const delta = currentScrollY - lastScrollY;
    lastScrollY = currentScrollY;
    
    if (scrollEndTimeout) {
      clearTimeout(scrollEndTimeout);
    }
    
    if (rafId !== null) return;
    
    rafId = requestAnimationFrame(() => {
      subscribers.forEach(callback => callback(delta, true));
      rafId = null;
    });
    
    scrollEndTimeout = setTimeout(() => {
      subscribers.forEach(callback => callback(0, false));
    }, 150);
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  
  cleanupFn = () => {
    window.removeEventListener("scroll", handleScroll);
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
    if (scrollEndTimeout) {
      clearTimeout(scrollEndTimeout);
    }
    cleanupFn = null;
  };
}

function teardownGlobalScrollListener() {
  if (scrollListenerCount === 0 && cleanupFn !== null) {
    cleanupFn();
  }
}

export function ScrollTiltText({
  children,
  className = "",
  maxSkewX = 3,
  intensity = 0.5,
  as: Component = "div"
}: ScrollTiltTextProps) {
  const [isScrolling, setIsScrolling] = useState(false);

  const handleScrollDelta = useCallback((delta: number, scrolling: boolean) => {
    setIsScrolling(scrolling);
  }, []);

  useEffect(() => {
    scrollListenerCount++;
    setupGlobalScrollListener();
    
    subscribers.add(handleScrollDelta);

    return () => {
      subscribers.delete(handleScrollDelta);
      scrollListenerCount--;
      teardownGlobalScrollListener();
    };
  }, [handleScrollDelta]);

  return (
    <Component
      className={className}
      style={{
        fontStyle: isScrolling ? 'italic' : 'normal',
        transition: 'font-style 0.3s ease-out',
      }}
    >
      {children}
    </Component>
  );
}
