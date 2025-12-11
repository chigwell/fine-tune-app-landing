"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface DisclaimerProps {
  text?: string;
  loadingDuration?: number;
  className?: string;
  maxWidth?: string;
}

/**
 * A centered disclaimer component with skeleton loading effect
 * for fine-tune.app / dash.fine-tune.app
 */
export default function Disclaimer({
  text,
  loadingDuration = 2000,
  className,
  maxWidth = "max-w-3xl",
}: DisclaimerProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, loadingDuration);

    return () => clearTimeout(timer);
  }, [loadingDuration]);

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <motion.div
        className={cn(
          "w-full",
          maxWidth,
          "bg-card border border-border/50 rounded-2xl p-6 shadow-lg backdrop-blur-sm",
          className
        )}
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="skeleton"
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="h-6 bg-[#cbd5e0] rounded w-3/4 animate-pulse" />
            </motion.div>
          ) : (
            <motion.div
              key="content"
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-xl font-semibold bg-gradient-to-r from-[#3D9AC6] via-[#5EB6E0] to-[#83CEF2] bg-clip-text text-transparent">
                Disclaimer
              </h2>
              <div className="mt-8 px-4 max-w-2xl text-muted-foreground text-sm text-center leading-relaxed">
                <p className="text-justify">
                  <b>fine-tune.app</b> (including{" "}
                  <code>dash.fine-tune.app</code> and{" "}
                  <code>api.fine-tune.app</code>) is an experimental MVP built
                  for the Google London Hackathon on{" "}
                  <b>15&nbsp;November&nbsp;2025</b>. It is a prototype and not a
                  production-ready service.
                </p>
                <p className="text-justify">
                  Functionality, limits, and behaviour may change at any time,
                  or the service may be modified, interrupted, or shut down
                  without notice. Data may be lost, jobs may fail, and models or
                  artefacts may be removed at any point.
                </p>
                <p className="text-justify">
                  This tool helps you orchestrate fine-tuning workflows, but{" "}
                  <b>you are fully responsible</b> for all data, prompts,
                  configuration, model choices, and outputs. You must check and
                  validate everything before using it in any real product,
                  workflow, or decision-making.
                </p>
                <p className="text-justify">
                  No guarantees are provided regarding correctness, safety,
                  fitness for a particular purpose, or availability of any model
                  or endpoint. Costs and usage of external providers (e.g. GPU
                  time, API calls, storage) remain entirely your responsibility.
                </p>
                <p className="text-justify">
                  By using this MVP, you acknowledge that you do so{" "}
                  <b>at your own risk</b>, that the authors and contributors are
                  not liable for any losses, damages, or issues arising from its
                  use, and that you will not rely on it as a critical or
                  primary system in any environment.
                </p>
                {text && (
                  <p className="text-justify mt-2 opacity-80">{text}</p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
