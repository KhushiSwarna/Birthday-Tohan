"use client";

import { useState } from "react";

export default function BirthdayGift() {
  const [open, setOpen] = useState(false);
  return (
    <div className={`gift-wrap ${open ? "gift-open" : ""}`}>
      <div className="gift-note" role="status" aria-live="polite">
        {open ? (
          <>
            Best. Bhaiya. Ever.<span>Love, your people ♡</span>
          </>
        ) : null}
      </div>
      <button
        className="gift-button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Close birthday present" : "Open birthday present"}
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
  );
}
