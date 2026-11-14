"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ArrowRight, RotateCcw, Volume2, VolumeX } from "lucide-react";
import BirthdayOwl from "./BirthdayOwl";
import PartyFireworks from "./PartyFireworks";
import PartyDecorations from "./PartyDecorations";

export default function AfterHours() {
  const stage = useRef<HTMLDivElement>(null);
  const owl = useRef<SVGSVGElement>(null);
  const audio = useRef<AudioContext | null>(null);
  const celebration = useRef<gsap.core.Timeline | null>(null);
  const winkTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const candleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [wishes, setWishes] = useState(0);
  const [candlesOut, setCandlesOut] = useState(false);
  const [sound, setSound] = useState(false);
  const [gift, setGift] = useState(false);
  const [wink, setWink] = useState(false);
  const madeWish = wishes > 0;

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap.from(".birthday-title > span", {
          y: 45,
          opacity: 0,
          rotate: -3,
          duration: 0.85,
          stagger: 0.12,
          ease: "back.out(1.4)",
        });
        gsap.from(".party-illustration", {
          y: 35,
          opacity: 0,
          duration: 1,
          delay: 0.25,
          ease: "power3.out",
        });
      }, stage);
      return () => ctx.revert();
    });
    return () => {
      mm.revert();
      celebration.current?.kill();
      if (winkTimer.current) clearTimeout(winkTimer.current);
      if (candleTimer.current) clearTimeout(candleTimer.current);
      if (audio.current && audio.current.state !== "closed")
        void audio.current.close();
    };
  }, []);

  const toggleSound = () => {
    if (sound && audio.current && audio.current.state !== "closed")
      void audio.current.close();
    setSound(!sound);
  };

  const chime = () => {
    if (!sound) return;
    try {
      if (audio.current && audio.current.state !== "closed")
        void audio.current.close();
      const ctx = new AudioContext();
      audio.current = ctx;
      [523.25, 659.25, 783.99, 1046.5].forEach((note, i) => {
        const oscillator = ctx.createOscillator();
        const gain = ctx.createGain();
        oscillator.type = "sine";
        oscillator.frequency.value = note;
        gain.gain.setValueAtTime(0, ctx.currentTime + i * 0.12);
        gain.gain.linearRampToValueAtTime(
          0.075,
          ctx.currentTime + i * 0.12 + 0.03,
        );
        gain.gain.exponentialRampToValueAtTime(
          0.001,
          ctx.currentTime + i * 0.12 + 0.9,
        );
        oscillator.connect(gain);
        gain.connect(ctx.destination);
        oscillator.start(ctx.currentTime + i * 0.12);
        oscillator.stop(ctx.currentTime + i * 0.12 + 1);
        if (i === 3)
          oscillator.onended = () => {
            if (ctx.state !== "closed") void ctx.close();
          };
      });
    } catch {
      /* The party works with sound off, too. */
    }
  };

  const makeWish = () => {
    if (candleTimer.current) clearTimeout(candleTimer.current);
    if (madeWish) {
      setCandlesOut(false);
      candleTimer.current = setTimeout(() => setCandlesOut(true), 700);
    } else setCandlesOut(true);
    setWishes((v) => v + 1);
    chime();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    celebration.current?.kill();
    const pieces = stage.current?.querySelectorAll(".confetti-piece") ?? [];
    const decorations =
      stage.current?.querySelectorAll(".extra-balloon, .backdrop-sparkle") ??
      [];
    const bunting =
      stage.current?.querySelectorAll(".party-bunting, .party-streamer") ?? [];
    celebration.current = gsap
      .timeline()
      .fromTo(
        bunting,
        { y: -160, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          stagger: 0.08,
          ease: "back.out(1.3)",
        },
        0,
      )
      .fromTo(
        decorations,
        { scale: 0.3, y: 140, opacity: 0 },
        {
          scale: 1,
          y: 0,
          opacity: 1,
          duration: 1.1,
          stagger: 0.05,
          ease: "back.out(1.5)",
        },
        0.15,
      )
      .fromTo(
        stage.current?.querySelector(".party-illustration") ?? [],
        { y: 0, rotate: -1.5 },
        {
          y: -12,
          rotate: 1.5,
          duration: 0.3,
          yoyo: true,
          repeat: 1,
          ease: "power1.inOut",
        },
        0,
      )
      .fromTo(
        pieces,
        { y: -80, x: 0, opacity: 1, rotate: 0 },
        {
          y: () => window.innerHeight + 100,
          x: (i) => (i % 2 ? 1 : -1) * (30 + (i % 7) * 14),
          rotate: (i) => (i % 2 ? 1 : -1) * (180 + i * 11),
          duration: 2.8,
          stagger: 0.025,
          ease: "power1.out",
          onComplete: () => {
            gsap.set(pieces, { opacity: 0 });
          },
        },
        0,
      );
  };

  const winkAtYou = () => {
    setWink(true);
    if (winkTimer.current) clearTimeout(winkTimer.current);
    winkTimer.current = setTimeout(() => setWink(false), 800);
  };

  return (
    <div
      ref={stage}
      className={`birthday-page ${madeWish ? "party-on" : ""}`}
      onPointerMove={(e) => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
          return;
        const box = owl.current?.getBoundingClientRect();
        if (!box) return;
        gsap.to(owl.current?.querySelector(".owl-pupil") ?? [], {
          x: Math.max(
            -9,
            Math.min(9, (e.clientX - box.left - box.width / 2) / 35),
          ),
          y: Math.max(
            -6,
            Math.min(6, (e.clientY - box.top - box.height / 2) / 40),
          ),
          duration: 0.3,
          overwrite: true,
        });
      }}
    >
      <PartyDecorations visible={madeWish} />
      <PartyFireworks celebration={wishes} />
      <header className="party-header">
        <a
          href="#birthday"
          className="party-logo"
          aria-label="Tohan's birthday party"
        >
          <svg
            width="30"
            height="32"
            viewBox="0 0 30 32"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="m4 28 10-24 13 24Z"
              fill="#ffd366"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path d="m9 17 13 8m-9-16 5 4" stroke="#e87e69" strokeWidth="4" />
            <circle
              cx="14"
              cy="4"
              r="3"
              fill="#b9b0dc"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
          <span>
            THE BIRTHDAY SHIFT<span className="logo-star">✳</span>
          </span>
        </a>
        <button
          className="party-sound"
          onClick={toggleSound}
          aria-pressed={sound}
          aria-label={sound ? "Mute party sound" : "Enable party sound"}
        >
          {sound ? (
            <Volume2 size={19} aria-hidden="true" />
          ) : (
            <VolumeX size={19} aria-hidden="true" />
          )}
          <span>Sound {sound ? "on" : "off"}</span>
        </button>
      </header>
      <main id="birthday" className="birthday-main">
        <div className="top-doodle" aria-hidden="true">
          <svg width="115" height="42" viewBox="0 0 115 42" fill="none">
            <path
              d="M3 23q23-30 44-10T92 9m-3-6 6 7-9 5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <span>okay, close the laptop.</span>
        </div>
        <h1 className="birthday-title">
          <span className="greeting">HAPPY BIRTHDAY</span>{" "}
          <span className="birthday-name">TOHAN BHAIYA</span>
        </h1>
        <div className="party-scene">
          <div className="scribble scribble-left">
            <span>
              our favourite
              <br />
              night owl.
            </span>
            <svg
              width="70"
              height="67"
              viewBox="0 0 70 67"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M9 4c-7 31 5 54 47 51m-9-7 10 7-10 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div className="party-illustration">
            <BirthdayOwl ref={owl} candlesOut={candlesOut} wink={wink} />
            <button
              className="owl-hitbox"
              aria-label="Give the birthday owl a wink"
              onClick={winkAtYou}
            />
            <button
              className="cake-hitbox"
              aria-label={
                madeWish
                  ? "Make another birthday wish"
                  : "Blow out the birthday candles"
              }
              onClick={makeWish}
            />
          </div>
          <div className={`gift-wrap ${gift ? "gift-open" : ""}`}>
            <div className="gift-note" role="status" aria-live="polite">
              {gift ? (
                <>
                  Best. Bhaiya. Ever.<span>Love, your people ♡</span>
                </>
              ) : null}
            </div>
            <button
              className="gift-button"
              onClick={() => setGift(!gift)}
              aria-expanded={gift}
              aria-label={
                gift ? "Close birthday present" : "Open birthday present"
              }
            >
              <svg viewBox="0 0 130 130" fill="none" aria-hidden="true">
                <g
                  stroke="#332b36"
                  strokeWidth="3"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                >
                  <path d="m27 57 79-5 5 61-80 5Z" fill="#b9b0dc" />
                  <path d="m60 55 20-1 4 62-20 1Z" fill="#fff0ce" />
                  <g className="gift-lid">
                    <path d="m21 46 87-6 2 20-87 6Z" fill="#b9b0dc" />
                    <path d="m59 44 20-1 1 19-20 2Z" fill="#fff0ce" />
                    <path
                      d="M68 43C31 40 29 13 47 20c11 4 19 20 21 23Zm0 0c36-8 34-34 18-25-10 6-16 22-18 25Z"
                      fill="#fff0ce"
                    />
                  </g>
                  <path d="m38 95 6 3m47-21 5 4m-6 17 5-1" stroke="#8b7bae" />
                </g>
              </svg>
            </button>
            <span className="gift-caption">a little something ↗</span>
          </div>
        </div>
        <div className="wish-zone">
          <p className="wish-instruction" role="status" aria-live="polite">
            {madeWish
              ? candlesOut
                ? "Wish made. Party mode: ON!"
                : "Another wish. Make it a good one."
              : "Make a wish. We’ll handle the confetti."}
          </p>
          <button className="wish-button" onClick={makeWish}>
            {madeWish ? (
              <>
                <RotateCcw size={20} aria-hidden="true" />
                ONE MORE WISH?
              </>
            ) : (
              <>
                MAKE A WISH
                <ArrowRight size={21} aria-hidden="true" />
              </>
            )}
          </button>
          <span className="cake-hint">
            {madeWish
              ? "Here’s to your happiest year yet. ♡"
              : "psst… you can tap the cake, too."}
          </span>
        </div>
      </main>
      <footer className="party-footer">
        <span>Leaders don’t sleep.</span>
        <span>But today? They eat cake.</span>
        <svg
          width="50"
          height="27"
          viewBox="0 0 50 27"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="m5 14 7 7L42 5m-29 2-8 2m13-8-1 7m27 11-6-2"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </footer>
      <div className="party-confetti" aria-hidden="true">
        {Array.from({ length: 56 }, (_, i) => (
          <i
            key={i}
            className={`confetti-piece confetti-${i % 5}`}
            style={{
              left: `${(i * 37 + 11) % 100}%`,
              width: i % 3 ? 8 : 12,
              height: i % 2 ? 16 : 9,
              borderRadius: i % 4 === 0 ? "50%" : "2px",
            }}
          />
        ))}
      </div>
    </div>
  );
}
