"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

interface DisclaimerProps {
  /**
   * The disclaimer text to display
   */
  text?: string;
  /**
   * Duration in milliseconds to show the skeleton before revealing text
   */
  loadingDuration?: number;
  /**
   * Additional class names for the disclaimer container
   */
  className?: string;
  /**
   * Maximum width of the disclaimer
   */
  maxWidth?: string;
}

/**
 * A centered disclaimer component with skeleton loading effect
 */
export default function Disclaimer({
  text = "This is a disclaimer message. By using this service, you agree to our terms and conditions. Please read carefully before proceeding.",
  loadingDuration = 2000,
  className,
  maxWidth = "max-w-3xl", // Changed from max-w-2xl to match the chart component
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
                <div className="h-6 bg-gray-300 rounded w-3/4 animate-pulse"></div>
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
              <h2 className="text-xl font-semibold text-foreground">Disclaimer</h2>
              <div className="mt-8 px-4 max-w-2xl text-gray-700 text-sm text-center">
                <p className="text-justify">
                  ...
                </p>
                <p className="mt-2">
                  For more details, please see our{" "}
                  <a
                    href="https://github.com/chigwell/fine-tune-app/blob/main/TERMS.md"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    Terms
                  </a>{" "}
                  and{" "}
                  <a
                    href="https://github.com/chigwell/fine-tune-app/blob/main/PRIVACY.md"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    Privacy Policy
                  </a>.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}