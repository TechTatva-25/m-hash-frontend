"use client";

import React from 'react';
import { cn } from "@/lib/utils";

interface AnimatedBorderProps {
  className?: string;
  duration?: number;
  colorFrom?: string;
  colorTo?: string;
  borderWidth?: number;
  children: React.ReactNode;
}

export const AnimatedBorder = ({
  className,
  duration = 8,
  colorFrom = "#9c40ff",
  colorTo = "#ffaa40",
  borderWidth = 2,
  children
}: AnimatedBorderProps): React.JSX.Element => {
  return (
    <div className={cn("relative", className)}>
      {/* Border effect container */}
      <div
        className="absolute rounded-xl -inset-[1px] animate-border-glow"
        style={{
          background: `linear-gradient(var(--rotate-deg, 0deg), ${colorFrom}, ${colorTo}, ${colorFrom})`,
          backgroundSize: "200% 200%",
          animation: `border-animate ${duration}s linear infinite`,
          padding: `${borderWidth}px`,
          zIndex: 0,
        }}
      />

      {/* Content container */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Add required animation keyframe */}
      <style jsx global>{`
        @keyframes border-animate {
          0% {
            --rotate-deg: 0deg;
            background-position: 0% 50%;
          }
          50% {
            --rotate-deg: 180deg;
            background-position: 100% 50%;
          }
          100% {
            --rotate-deg: 360deg;
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  );
};
