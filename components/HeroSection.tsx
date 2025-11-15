"use client";

import { Button } from "@/components/ui/buttonShadcn";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  CheckCircle,
  Layers,
  Zap,
  DownloadCloud,
  Server,
} from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { Pill } from "@/components/ui/pill";
import { CountUp } from "@/components/vui/text/CountUp";
import { getDynamicStats } from "@/lib/ComponentCounter";
import { version as vuiVersion } from "@/lib/version";
import { useTheme } from "next-themes";
import * as THREE from "three";

export default function HeroSectionWithWaves() {
  const [isMobile, setIsMobile] = useState(false);
  const [countVisitors, setCountVisitors] = useState(128);
  const [requestCount, setRequestCount] = useState(165);
  const [mounted, setMounted] = useState(false);
  const [galaxyLoaded, setGalaxyLoaded] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const { theme, systemTheme } = useTheme();


  useEffect(() => {
    setMounted(true);
  }, []);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Theme handling
  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDarkTheme = currentTheme === "dark";

  // THREE.js galaxy background
  useEffect(() => {
    if (!mounted) return;
    if (typeof window === "undefined") return;
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });

    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0); // transparent so gradient shows through

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      sizes.width / sizes.height,
      0.1,
      1000,
    );
    camera.position.z = 50;
    scene.add(camera);

    // Layers can be tweaked for dark/light theme if needed
    const layers = [
      { color: new THREE.Color("#26c9f7"), size: isMobile ? 0.6 : 0.8, depth: 100 },
      { color: new THREE.Color("#1467cd"), size: isMobile ? 0.5 : 0.6, depth: 150 },
      { color: new THREE.Color("#1f33b9"), size: isMobile ? 0.4 : 0.5, depth: 200 },
    ];

    const particleGroups: THREE.Points[] = [];

    layers.forEach((layer) => {
      const particleCount = 800;
      const positions = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount; i += 1) {
        positions[i * 3] = (Math.random() - 0.5) * 200;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 200;
        positions[i * 3 + 2] = -Math.random() * layer.depth;
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3),
      );

      const material = new THREE.PointsMaterial({
        color: layer.color,
        size: layer.size,
        sizeAttenuation: true,
        transparent: true,
        opacity: isDarkTheme ? 0.9 : 0.7,
      });

      const points = new THREE.Points(geometry, material);
      particleGroups.push(points);
      scene.add(points);
    });

    let targetX = 0;
    let targetY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    const onMouseMove = (event: MouseEvent) => {
      targetX = (event.clientX - windowHalfX) * 0.05;
      targetY = (event.clientY - windowHalfY) * 0.05;
    };

    window.addEventListener("mousemove", onMouseMove);

    let animationId = 0;

    const animate = () => {
      animationId = window.requestAnimationFrame(animate);

      particleGroups.forEach((group, i) => {
        group.rotation.y += 0.0005 + i * 0.0002;
        group.rotation.x += 0.0003 + i * 0.0001;
      });

      camera.position.x += (targetX - camera.position.x) * 0.05;
      camera.position.y += (-targetY - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();
    setGalaxyLoaded(true);

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", onMouseMove);

      particleGroups.forEach((group) => {
        group.geometry.dispose();
        (group.material as THREE.Material).dispose();
        scene.remove(group);
      });

      renderer.dispose();
      setGalaxyLoaded(false);
    };
  }, [mounted, isDarkTheme, isMobile]);

  // Theme-based fallback background
  const fallbackBackground = isDarkTheme
    ? "bg-gradient-to-br from-slate-900 to-slate-800"
    : "bg-gradient-to-br from-white to-gray-100";

  const loadingIndicatorColor = isDarkTheme
    ? "border-white"
    : "border-gray-800";

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden -mt-16 md:-mt-20">
      {/* Fallback background */}
      <div className={`absolute inset-0 ${fallbackBackground} z-0`} />

      {/* Galaxy canvas background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-10 w-full h-full"
      />

      {/* Loading indicator */}
      {!galaxyLoaded && (
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div
            className={`${
              isMobile ? "w-6 h-6" : "w-8 h-8"
            } border-2 ${loadingIndicatorColor} border-t-transparent rounded-full animate-spin`}
          />
        </div>
      )}

      {/* Hero content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-30 pt-40 md:pt-40">
        <div className="max-w-5xl mx-auto text-center">
          {/* Main Headline */}
          <div className="space-y-6 md:space-y-8 mb-8 md:mb-12">
            <Pill
              icon={<Sparkles className="w-3 h-3 md:w-4 md:h-4" />}
              status="active"
              className="mb-6 md:mb-8 bg-background/50 backdrop-blur-sm text-xs md:text-sm text-muted-foreground"
            >
              {`Fine-tune.app: Now with No-Code Model Ownership`}
            </Pill>

            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight leading-[0.9] px-2">
              <span className="bg-gradient-to-r from-[#26c9f7] via-[#1467cd] to-[#1f33b9] bg-clip-text text-transparent">
                  Fine-tune.app
                </span>
              <br />
              <span className="bg-gradient-to-r from-primary via-primary to-primary/60 bg-clip-text text-transparent text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
                Own Your AI Model
              </span>
            </h1>

            <p
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4"
              style={{ marginBottom: "0" }}
            >
              Easily fine-tune and own 270M parameter models with our intuitive, no-code platform.
              <span className="text-foreground font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text">
                {" "}
              </span>
              <span className="text-foreground font-semibold bg-gradient-to-r from-secondary to-primary bg-clip-text">
                {" "}
              </span>
              <span className="text-foreground font-semibold bg-gradient-to-r from-secondary to-primary bg-clip-text">
                {" "}
              </span>
            </p>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
              Create a specialized AI asset for your business in just a few clicks.
            </p>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-12 md:mb-16 max-w-4xl mx-auto px-4">
            <div className="p-4 md:p-6 rounded-2xl border bg-card/50 backdrop-blur-sm">
              <Layers className="w-6 h-6 md:w-8 md:h-8 text-primary mx-auto mb-3 md:mb-4" />
              <h3 className="font-semibold mb-2 text-sm md:text-base">
                No-Code Fine-Tuning
              </h3>
              <p className="text-xs md:text-sm text-muted-foreground">
                Upload your data and fine-tune a 270M model through a simple interface. No coding skills needed.
              </p>
            </div>
            <div className="p-4 md:p-6 rounded-2xl border bg-card/50 backdrop-blur-sm">
              <Zap className="w-6 h-6 md:w-8 md:h-8 text-primary mx-auto mb-3 md:mb-4" />
              <h3 className="font-semibold mb-2 text-sm md:text-base">
                Own Your AI Asset
              </h3>
              <p className="text-xs md:text-sm text-muted-foreground">
                Take full ownership of your fine-tuned model. Deploy it anywhere, from the cloud to edge devices.
              </p>
            </div>
            <div className="p-4 md:p-6 rounded-2xl border bg-card/50 backdrop-blur-sm sm:col-span-2 md:col-span-1">
              <DownloadCloud className="w-6 h-6 md:w-8 md:h-8 text-primary mx-auto mb-3 md:mb-4" />
              <h3 className="font-semibold mb-2 text-sm md:text-base">
                Compact & Powerful Models
              </h3>
              <p className="text-xs md:text-sm text-muted-foreground">
                Use 270M parameter models, perfect for specialized tasks with high efficiency and low latency.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
