"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

// Define the partner logos interface with separate light and dark logos
interface PartnerLogo {
  id: string;
  name: string;
  logoLight: string; // Logo for light theme
  logoDark: string;  // Logo for dark theme
  url?: string;
}

// Sample partner logos - replace with your actual partner logos
const partnerLogos: PartnerLogo[] = [
  {
    id: "1",
    name: "React",
    logoLight: "/logos/React-icon.svg.png",
    logoDark: "/logos/React-icon.svg.png",
    url: "https://react.dev/"
  },
  {
    id: "2",
    name: "Cloudflare",
    logoLight: "/logos/cloudflare-color.svg",
    logoDark: "/logos/cloudflare-color.svg",
    url: "https://www.cloudflare.com"
  },
  {
    id: "5",
    name: "Google",
    logoLight: "/logos/Google_Symbol_0.svg",
    logoDark: "/logos/Google_Symbol_0.svg",
    url: "https://cloud.google.com/vertex-ai"
  },
  {
    id: "6",
    name: "Docker",
    logoLight: "/logos/62a9c7c08ff6441a2952dad3.png",
    logoDark: "/logos/62a9c7c08ff6441a2952dad3.png",
    url: "https://www.docker.com/"
  },
  {
    id: "7",
    name: "google-ai-studio",
    logoLight: "/logos/google-gemini-icon.svg",
    logoDark: "/logos/google-gemini-icon.svg",
    url: "https://aistudio.google.com/"
  },
  {
    id: "8",
    name: "FastAPI",
    logoLight: "/logos/Fastapi-Icon--Streamline-Svg-Logos.svg",
    logoDark: "/logos/Fastapi-Icon--Streamline-Svg-Logos.svg",
    url: "https://fastapi.tiangolo.com/"
  },
  {
    id: "9",
    name: "Ollama",
    logoLight: "/logos/ollama.svg",
    logoDark: "/logos/ollama.webp",
    url: "https://ollama.com"
  },
];

export default function PartnerLogosTicker() {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Get the current theme, defaulting to system theme if not explicitly set
  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDarkTheme = currentTheme === "dark";

  useEffect(() => {
    setMounted(true);
  }, []);

  // Duplicate the logos to create a seamless loop
  const duplicatedLogos = [...partnerLogos, ...partnerLogos];

  // Theme-based styling
  const tickerBg = isDarkTheme ? "bg-slate-900/50" : "bg-white/50";

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className={`w-full py-12 md:py-16 overflow-hidden ${tickerBg} backdrop-blur-sm`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2" >
              Thanks to
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Fine-tune.app works based on:
            </p>
          </div>
          <div className="h-16 flex items-center justify-center">
            <div className="animate-pulse bg-muted rounded w-32 h-8"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full py-12 md:py-16 overflow-hidden ${tickerBg} backdrop-blur-sm`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Powered by an Incredible Tech Ecosystem
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Fine-tune.app is proud to build upon the innovations of these leading open-source projects and platforms.
          </p>
        </div>

        <div className="relative overflow-hidden">
          <div className="flex animate-scroll">
            {duplicatedLogos.map((logo, index) => (
              <div
                key={`${logo.id}-${index}`}
                className="flex-shrink-0 mx-4 md:mx-8 lg:mx-12 h-12 md:h-16 flex items-center justify-center"
              >
                {logo.url ? (
                  <a
                    href={logo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="opacity-60 hover:opacity-100 transition-opacity duration-300"
                    aria-label={logo.name}
                  >
                    <img
                      src={isDarkTheme ? logo.logoDark : logo.logoLight}
                      alt={logo.name}
                      style={{ width: logo.name === "OpenAI" ? '65px' : '50px', height: '75%', maxWidth: '75px' }}
                      className="h-full w-auto max-w-[180px] object-contain"
                    />
                  </a>
                ) : (
                  <div className="opacity-60">
                    <img
                      src={isDarkTheme ? logo.logoDark : logo.logoLight}
                      alt={logo.name}
                      style={{ width: logo.name === "OpenAI" ? '65px' : '50px', height: '75%', maxWidth: '75px' }}
                      className="h-full w-auto max-w-[180px] object-contain"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 30s linear infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-scroll {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}