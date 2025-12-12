import { motion, useInView, Variants } from "framer-motion";
import { useRef, ReactNode, CSSProperties } from "react";

type AnimationType = 
  | "fadeUp" 
  | "fadeDown" 
  | "fadeLeft" 
  | "fadeRight" 
  | "scaleUp" 
  | "scaleRotate" 
  | "slideUp" 
  | "slideLeft" 
  | "slideRight"
  | "flipX"
  | "flipY"
  | "bounce"
  | "rotate3D"
  | "perspective";

interface ScrollRevealProps {
  children: ReactNode;
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  threshold?: number;
}

const animationVariants: Record<AnimationType, Variants> = {
  fadeUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  },
  fadeDown: {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 }
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -25 },
    visible: { opacity: 1, x: 0 }
  },
  fadeRight: {
    hidden: { opacity: 0, x: 25 },
    visible: { opacity: 1, x: 0 }
  },
  scaleUp: {
    hidden: { opacity: 0, scale: 0.97 },
    visible: { opacity: 1, scale: 1 }
  },
  scaleRotate: {
    hidden: { opacity: 0, scale: 0.95, rotate: -3 },
    visible: { opacity: 1, scale: 1, rotate: 0 }
  },
  slideUp: {
    hidden: { opacity: 0, y: 30, scale: 0.99 },
    visible: { opacity: 1, y: 0, scale: 1 }
  },
  slideLeft: {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 }
  },
  slideRight: {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 }
  },
  flipX: {
    hidden: { opacity: 0, rotateX: 25 },
    visible: { opacity: 1, rotateX: 0 }
  },
  flipY: {
    hidden: { opacity: 0, rotateY: 25 },
    visible: { opacity: 1, rotateY: 0 }
  },
  bounce: {
    hidden: { opacity: 0, y: 25, scale: 0.97 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 25
      }
    }
  },
  rotate3D: {
    hidden: { opacity: 0, rotateX: 12, rotateY: -12, scale: 0.97 },
    visible: { opacity: 1, rotateX: 0, rotateY: 0, scale: 1 }
  },
  perspective: {
    hidden: { opacity: 0, rotateX: 10, y: 15, scale: 0.98 },
    visible: { opacity: 1, rotateX: 0, y: 0, scale: 1 }
  }
};

const gpuAcceleratedStyle: CSSProperties = {
  transform: "translateZ(0)",
  willChange: "transform, opacity",
  backfaceVisibility: "hidden",
};

export function ScrollReveal({
  children,
  animation = "fadeUp",
  delay = 0,
  duration = 0.5,
  className = "",
  once = true,
  threshold = 0.1
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { 
    once, 
    margin: "-30px",
    amount: threshold
  });

  const variants = animationVariants[animation];
  const needs3D = animation.includes("3D") || animation.includes("flip") || animation === "perspective";

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      className={className}
      style={{ 
        ...gpuAcceleratedStyle,
        perspective: needs3D ? "1000px" : undefined,
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({
  children,
  className = "",
  staggerDelay = 0.1
}: {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          }
        }
      }}
      className={className}
      style={gpuAcceleratedStyle}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
  animation = "fadeUp"
}: {
  children: ReactNode;
  className?: string;
  animation?: AnimationType;
}) {
  const variants = animationVariants[animation];

  return (
    <motion.div
      variants={variants}
      transition={{
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      className={className}
      style={gpuAcceleratedStyle}
    >
      {children}
    </motion.div>
  );
}
