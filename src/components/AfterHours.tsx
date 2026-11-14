"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import {
  ArrowRight,
  CakeSlice,
  Check,
  Flame,
  Music2,
  Pause,
  Play,
  RotateCcw,
  Utensils,
  Volume2,
  VolumeX,
} from "lucide-react";
import BirthdayOwl, {
  type BirthdayAction,
  type BirthdayStep,
} from "./BirthdayOwl";
import BirthdayGift from "./BirthdayGift";
import PartyFireworks from "./PartyFireworks";
import PartyDecorations from "./PartyDecorations";
import usePartyMusic from "./usePartyMusic";

const steps = [
  { label: "Blow candles", short: "Blow", Icon: Flame },
  { label: "Cut the cake", short: "Cut", Icon: CakeSlice },
  { label: "Take a bite", short: "Eat", Icon: Utensils },
  { label: "Let’s dance", short: "Dance", Icon: Music2 },
];

export default function AfterHours() {
  const stage = useRef<HTMLDivElement>(null);
  const owl = useRef<SVGSVGElement>(null);
  const celebration = useRef<gsap.core.Timeline | null>(null);
  const timers = useRef(new Set<ReturnType<typeof setTimeout>>());
  const locked = useRef(false);
  const [step, setStep] = useState<BirthdayStep>(0);
  const [action, setAction] = useState<BirthdayAction>(null);
  const [candlesOut, setCandlesOut] = useState(false);
  const [wishes, setWishes] = useState(0);
  const [sound, setSound] = useState(true);
  const [dancing, setDancing] = useState(false);
  const [wink, setWink] = useState(false);
  const [round, setRound] = useState(0);
  const playing = usePartyMusic(sound, dancing);
  const busy = action !== null;

  useEffect(() => {
    const pending = timers.current;
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
      pending.forEach(clearTimeout);
      pending.clear();
    };
  }, []);

  const after = (ms: number, callback: () => void) => {
    const timer = setTimeout(() => {
      timers.current.delete(timer);
      callback();
    }, ms);
    timers.current.add(timer);
  };

  const burst = () => {
    setWishes((v) => v + 1);
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

  const finish = (next: BirthdayStep) => {
    setStep(next);
    setAction(null);
    locked.current = false;
  };
  const doStep = (index: number) => {
    if (locked.current || index !== step || step === 4) return;
    if (step === 3) {
      setStep(4);
      setDancing(true);
      burst();
      return;
    }
    locked.current = true;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (step === 0) {
      setAction("blowing");
      after(reduced ? 180 : 650, () => {
        setCandlesOut(true);
        burst();
      });
      after(reduced ? 350 : 1250, () => finish(1));
    } else if (step === 1) {
      setAction("cutting");
      after(reduced ? 350 : 1450, () => finish(2));
    } else {
      setAction("eating");
      after(reduced ? 350 : 1800, () => finish(3));
    }
  };

  const reset = () => {
    timers.current.forEach(clearTimeout);
    timers.current.clear();
    celebration.current?.kill();
    gsap.set(stage.current?.querySelectorAll(".confetti-piece") ?? [], {
      opacity: 0,
    });
    locked.current = false;
    setAction(null);
    setStep(0);
    setCandlesOut(false);
    setDancing(false);
    setWishes(0);
    setWink(false);
    setRound((v) => v + 1);
  };
  const winkAtYou = () => {
    setWink(true);
    after(800, () => setWink(false));
  };
  const message =
    action === "blowing"
      ? "Foooooo… make it a good wish."
      : action === "cutting"
        ? "Steady wings. Very important slice."
        : action === "eating"
          ? "Nom. Nom. Nom."
          : [
              "First, make a wish.",
              "Wish made. Time for cake.",
              "A slice for the birthday boy.",
              "Okay. Now we dance.",
              dancing ? "Night owl. Party animal." : "Taking a tiny breather.",
            ][step];
  const phase =
    action ??
    (
      [
        "ready",
        "candles-out",
        "cake-cut",
        "cake-eaten",
        dancing ? "dancing" : "paused",
      ] as const
    )[step];

  return (
    <div
      ref={stage}
      className={`birthday-page ${wishes ? "party-on" : ""} ${step === 4 ? "dance-party" : ""} ${step === 4 && !dancing ? "dance-paused" : ""}`}
      data-phase={phase}
      data-music-state={playing ? "playing" : sound ? "waiting" : "muted"}
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
      <div className="dance-light dance-light-left" aria-hidden="true" />
      <div className="dance-light dance-light-right" aria-hidden="true" />
      <PartyDecorations visible={wishes > 0} />
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
          onClick={() => setSound((v) => !v)}
          aria-pressed={sound}
          aria-label={sound ? "Turn music off" : "Turn music on"}
        >
          {sound ? (
            <Volume2 size={19} aria-hidden="true" />
          ) : (
            <VolumeX size={19} aria-hidden="true" />
          )}
          <span>Music {sound ? "on" : "off"}</span>
          <span
            className={`music-indicator ${playing ? "music-playing" : ""}`}
            aria-hidden="true"
          >
            <i />
            <i />
            <i />
          </span>
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
          <span>
            {step === 4
              ? "work mode off. party mode on."
              : "okay, close the laptop."}
          </span>
        </div>
        <h1 className="birthday-title">
          <span className="greeting">HAPPY BIRTHDAY</span>{" "}
          <span className="birthday-name">TOHAN BHAIYA</span>
        </h1>
        <div className="party-scene">
          <div className="scribble scribble-left">
            <span>
              {step === 4 ? (
                <>
                  he’s got
                  <br />
                  moves.
                </>
              ) : (
                <>
                  our favourite
                  <br />
                  night owl.
                </>
              )}
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
            <BirthdayOwl
              ref={owl}
              step={step}
              action={action}
              candlesOut={candlesOut}
              wink={wink}
              dancing={dancing}
            />
            <button
              className="owl-hitbox"
              aria-label="Give the birthday owl a wink"
              onClick={winkAtYou}
            />
            <button
              className="cake-hitbox"
              disabled={busy || step === 4}
              aria-label={
                step < 4
                  ? steps[step].label + " by tapping the cake"
                  : "Birthday cake — all steps complete"
              }
              onClick={() => doStep(step)}
            />
          </div>
          <BirthdayGift key={round} />
        </div>
        <div className="wish-zone">
          <p
            className="wish-instruction"
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            {message}
          </p>
          <button
            className="wish-button"
            disabled={busy}
            aria-busy={busy}
            onClick={() => (step === 4 ? setDancing((v) => !v) : doStep(step))}
          >
            {step === 4 ? (
              <>
                {dancing ? (
                  <Pause size={19} aria-hidden="true" />
                ) : (
                  <Play size={19} aria-hidden="true" />
                )}
                {dancing ? "Pause the dance" : "Keep dancing"}
              </>
            ) : (
              <>
                {busy
                  ? {
                      blowing: "Making a wish…",
                      cutting: "Slicing…",
                      eating: "Nom nom…",
                    }[action!]
                  : steps[step].label}
                <ArrowRight size={21} aria-hidden="true" />
              </>
            )}
          </button>
          <nav className="birthday-steps" aria-label="Birthday party steps">
            {steps.map(({ short, label, Icon }, i) => (
              <button
                key={short}
                className={`step-button ${i < step ? "step-complete" : ""} ${i === step ? "step-next" : ""}`}
                disabled={busy || i !== step}
                aria-label={`Step ${i + 1}: ${label}${i < step ? " (complete)" : ""}`}
                aria-current={i === step ? "step" : undefined}
                onClick={() => doStep(i)}
              >
                {i < step ? (
                  <Check size={15} aria-hidden="true" />
                ) : (
                  <Icon size={15} aria-hidden="true" />
                )}
                <span>{short}</span>
              </button>
            ))}
          </nav>
          {step > 0 ? (
            <button className="start-again" onClick={reset} disabled={busy}>
              <RotateCcw size={13} aria-hidden="true" />
              Start again
            </button>
          ) : (
            <span className="cake-hint">
              one little button. four birthday moments.
            </span>
          )}
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
