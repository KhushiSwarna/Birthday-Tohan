"use client";

import { useEffect, useRef } from "react";

type Spark = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  age: number;
  life: number;
  color: string;
  size: number;
  star: boolean;
};

export default function PartyFireworks({
  celebration,
}: {
  celebration: number;
}) {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const element = canvas.current;
    if (
      !element ||
      !celebration ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const context = element.getContext("2d");
    if (!context) return;
    let width = innerWidth;
    let height = innerHeight;
    const resize = () => {
      width = innerWidth;
      height = innerHeight;
      const ratio = Math.min(devicePixelRatio || 1, 2);
      element.width = width * ratio;
      element.height = height * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);
    element.dataset.active = "true";
    const colors = [
      "#db7664",
      "#9477bb",
      "#699782",
      "#e4ac39",
      "#6d98b8",
      "#d989a4",
    ];
    const bursts = [
      { x: 0.15, y: 0.22, at: 0, fired: false },
      { x: 0.86, y: 0.3, at: 0.25, fired: false },
      { x: 0.08, y: 0.57, at: 0.8, fired: false },
      { x: 0.9, y: 0.65, at: 1.1, fired: false },
      { x: 0.32, y: 0.12, at: 1.6, fired: false },
      { x: 0.7, y: 0.16, at: 1.85, fired: false },
      { x: 0.15, y: 0.38, at: 2.5, fired: false },
      { x: 0.85, y: 0.44, at: 2.8, fired: false },
    ];
    const sparks: Spark[] = [];
    const start = performance.now();
    let previous = start;
    let frame = 0;

    const draw = (now: number) => {
      const elapsed = (now - start) / 1000;
      const dt = Math.min((now - previous) / 1000, 0.04);
      previous = now;
      context.clearRect(0, 0, width, height);
      for (const [index, burst] of bursts.entries()) {
        const age = elapsed - burst.at;
        const x = width * burst.x;
        const y = height * burst.y;
        if (age >= 0 && age < 0.5) {
          const progress = 1 - (1 - age / 0.5) ** 2;
          const bottom = Math.min(height + 20, y + height * 0.45);
          const rocketY = bottom + (y - bottom) * progress;
          context.globalAlpha = 0.7;
          context.strokeStyle = colors[index % colors.length];
          context.lineWidth = 2;
          context.beginPath();
          context.moveTo(x, rocketY + 32);
          context.lineTo(x, rocketY);
          context.stroke();
          context.beginPath();
          context.arc(x, rocketY, 3.5, 0, Math.PI * 2);
          context.fillStyle = context.strokeStyle;
          context.fill();
        }
        if (age >= 0.5 && !burst.fired) {
          burst.fired = true;
          const speed = width < 700 ? 95 : 170;
          for (let i = 0; i < 54; i++) {
            const angle = (i / 54) * Math.PI * 2;
            const velocity = speed * (0.55 + (i % 5) * 0.12);
            sparks.push({
              x,
              y,
              vx: Math.cos(angle) * velocity,
              vy: Math.sin(angle) * velocity,
              age: 0,
              life: 1.5 + (i % 4) * 0.16,
              color: colors[(index + (i % 2)) % colors.length],
              size: i % 9 === 0 ? 5 : 2.3,
              star: i % 9 === 0,
            });
          }
        }
        if (age >= 0.5 && age < 1) {
          context.globalAlpha = (1 - (age - 0.5) * 2) * 0.3;
          context.strokeStyle = colors[index % colors.length];
          context.lineWidth = 1.5;
          context.beginPath();
          context.arc(
            x,
            y,
            10 + (age - 0.5) * (width < 700 ? 120 : 230),
            0,
            Math.PI * 2,
          );
          context.stroke();
        }
      }
      for (let i = sparks.length - 1; i >= 0; i--) {
        const spark = sparks[i];
        spark.age += dt;
        if (spark.age >= spark.life) {
          sparks.splice(i, 1);
          continue;
        }
        spark.x += spark.vx * dt;
        spark.y += spark.vy * dt;
        spark.vy += 35 * dt;
        spark.vx *= Math.exp(-0.8 * dt);
        spark.vy *= Math.exp(-0.45 * dt);
        context.globalAlpha = Math.max(0, 1 - spark.age / spark.life) * 0.9;
        context.strokeStyle = spark.color;
        context.fillStyle = spark.color;
        context.lineWidth = spark.star ? 1.8 : 2;
        context.beginPath();
        context.moveTo(spark.x - spark.vx * 0.09, spark.y - spark.vy * 0.09);
        context.lineTo(spark.x, spark.y);
        context.stroke();
        context.beginPath();
        if (spark.star) {
          const size = spark.size;
          context.moveTo(spark.x, spark.y - size);
          context.lineTo(spark.x + size * 0.3, spark.y - size * 0.3);
          context.lineTo(spark.x + size, spark.y);
          context.lineTo(spark.x + size * 0.3, spark.y + size * 0.3);
          context.lineTo(spark.x, spark.y + size);
          context.lineTo(spark.x - size * 0.3, spark.y + size * 0.3);
          context.lineTo(spark.x - size, spark.y);
          context.lineTo(spark.x - size * 0.3, spark.y - size * 0.3);
          context.closePath();
        } else context.arc(spark.x, spark.y, spark.size, 0, Math.PI * 2);
        context.fill();
      }
      context.globalAlpha = 1;
      if (elapsed < 6) frame = requestAnimationFrame(draw);
      else {
        context.clearRect(0, 0, width, height);
        element.dataset.active = "false";
      }
    };
    frame = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      context.clearRect(0, 0, width, height);
      element.dataset.active = "false";
    };
  }, [celebration]);

  return (
    <canvas
      ref={canvas}
      className="party-fireworks"
      data-celebration={celebration}
      aria-hidden="true"
    />
  );
}
