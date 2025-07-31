"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React from "react";

export const BackgroundGradient = ({
  children,
  className,
  containerClassName,
  animate = true,
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  animate?: boolean;
}) => {
  const mouseX = React.useRef(0);
  const mouseY = React.useRef(0);

  React.useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouseX.current = event.clientX;
      mouseY.current = event.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      className={cn(
        "relative h-full w-full",
        containerClassName
      )}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-violet-500 to-pink-500 opacity-20"
        animate={
          animate
            ? {
                scale: [1, 1.2, 1],
                rotate: [0, 90, 0],
                borderRadius: ["20%", "20%", "50%", "50%", "20%"],
              }
            : {}
        }
        transition={
          animate
            ? {
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
              }
            : {}
        }
      />
      <div className={cn("relative z-10", className)}>{children}</div>
    </div>
  );
}; 