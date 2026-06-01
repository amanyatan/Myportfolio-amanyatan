"use client";
import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export const LampContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "relative flex min-h-[40vh] flex-col items-center justify-center overflow-hidden w-full rounded-md z-0",
        className
      )}
    >
      <div className="relative flex w-full items-center justify-center isolate z-0 ">
        {/* Flickering Lamp Sphere */}
        <motion.div
          initial={{ opacity: 0.3 }}
          whileInView={{ opacity: [0.3, 0.7, 0.4, 0.8, 0.5, 0.9] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          className="absolute z-30 h-[8rem] w-[15rem] -translate-y-8 rounded-full bg-amber-400 opacity-50 blur-[3rem]"
        ></motion.div>

      </div>

      <div className="relative z-50 flex flex-col items-center px-5 mt-12">
        {children}
      </div>
    </div>
  );
};
