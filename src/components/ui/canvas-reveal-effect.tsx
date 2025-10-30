"use client";
import { motion } from "motion/react";

export const CanvasRevealEffect = ({
  animationSpeed = 4,
  colors = [[59, 130, 246], [139, 92, 246]],
  containerClassName = "",
}: {
  animationSpeed?: number;
  dotSize?: number;
  colors?: number[][];
  containerClassName?: string;
}) => {
  return (
    <motion.div
      className={`absolute inset-0 ${containerClassName}`}
      style={{
        background: `radial-gradient(circle, rgba(${colors[0].join(",")}, 0.6) 0%, rgba(${colors[1].join(",")}, 0.2) 100%)`,
      }}
      animate={{ opacity: [0.3, 0.8, 0.3] }}
      transition={{
        duration: animationSpeed,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};
