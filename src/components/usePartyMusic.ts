"use client";

import { useEffect, useRef, useState } from "react";

// An original little birthday loop, synthesized locally. No audio downloads.
const melody = [
  76, 79, 81, 79, 76, 74, 72, 0, 74, 76, 79, 76, 74, 72, 69, 0, 72, 76, 79, 81,
  79, 76, 74, 0, 74, 79, 83, 81, 79, 76, 72, 0,
];
const roots = [48, 48, 45, 45, 53, 53, 55, 55];

export default function usePartyMusic(enabled: boolean, dancing: boolean) {
  const groove = useRef(dancing);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    groove.current = dancing;
  }, [dancing]);

  useEffect(() => {
    if (!enabled) return;
    let context: AudioContext;
    try {
      context = new AudioContext();
    } catch {
      return;
    }
    const volume = context.createGain();
    volume.gain.value = 0.24;
    volume.connect(context.destination);
    let note = 0;
    let next = 0;
    let disposed = false;
    const frequency = (midi: number) => 440 * 2 ** ((midi - 69) / 12);

    const tone = (
      midi: number,
      time: number,
      duration: number,
      level: number,
      type: OscillatorType,
    ) => {
      if (!midi) return;
      const oscillator = context.createOscillator();
      const envelope = context.createGain();
      oscillator.type = type;
      oscillator.frequency.value = frequency(midi);
      envelope.gain.setValueAtTime(0, time);
      envelope.gain.linearRampToValueAtTime(level, time + 0.012);
      envelope.gain.exponentialRampToValueAtTime(0.001, time + duration);
      oscillator.connect(envelope);
      envelope.connect(volume);
      oscillator.start(time);
      oscillator.stop(time + duration + 0.02);
      oscillator.onended = () => {
        oscillator.disconnect();
        envelope.disconnect();
      };
    };

    const kick = (time: number) => {
      const oscillator = context.createOscillator();
      const envelope = context.createGain();
      oscillator.frequency.setValueAtTime(125, time);
      oscillator.frequency.exponentialRampToValueAtTime(42, time + 0.13);
      envelope.gain.setValueAtTime(groove.current ? 0.4 : 0.2, time);
      envelope.gain.exponentialRampToValueAtTime(0.001, time + 0.16);
      oscillator.connect(envelope);
      envelope.connect(volume);
      oscillator.start(time);
      oscillator.stop(time + 0.17);
      oscillator.onended = () => {
        oscillator.disconnect();
        envelope.disconnect();
      };
    };

    const tick = () => {
      if (context.state !== "running" || disposed) return;
      if (next < context.currentTime) next = context.currentTime + 0.04;
      while (next < context.currentTime + 0.12) {
        tone(melody[note % melody.length], next, 0.22, 0.23, "triangle");
        if (note % 2 === 0) {
          tone(
            roots[Math.floor(note / 4) % roots.length],
            next,
            0.28,
            0.36,
            "sine",
          );
          kick(next);
        }
        if (groove.current && note % 2) tone(91, next, 0.045, 0.055, "square");
        note++;
        next += 60 / 112 / 2;
      }
    };
    const activate = () => {
      if (disposed || context.state === "closed") return;
      void context
        .resume()
        .then(() => {
          if (!disposed) {
            setPlaying(context.state === "running");
            tick();
          }
        })
        .catch(() => {});
    };
    const visibility = () => {
      if (context.state === "closed") return;
      if (document.hidden) void context.suspend().catch(() => {});
      else activate();
    };
    context.onstatechange = () => {
      if (!disposed) setPlaying(context.state === "running");
    };
    // Try autoplay; normal browser policy may defer it until the first tap.
    activate();
    const scheduler = window.setInterval(tick, 50);
    document.addEventListener("pointerdown", activate, {
      capture: true,
      passive: true,
    });
    document.addEventListener("keydown", activate, true);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      disposed = true;
      window.clearInterval(scheduler);
      document.removeEventListener("pointerdown", activate, true);
      document.removeEventListener("keydown", activate, true);
      document.removeEventListener("visibilitychange", visibility);
      context.onstatechange = null;
      if (context.state !== "closed") void context.close().catch(() => {});
    };
  }, [enabled]);
  return enabled && playing;
}
