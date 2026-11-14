"use client";

import { forwardRef } from "react";

const BirthdayOwl = forwardRef<
  SVGSVGElement,
  { candlesOut: boolean; wink: boolean }
>(function BirthdayOwl({ candlesOut, wink }, ref) {
  return (
    <svg
      ref={ref}
      viewBox="0 0 800 610"
      fill="none"
      className={`birthday-owl ${candlesOut ? "wish-made" : ""} ${wink ? "is-winking" : ""}`}
      aria-hidden="true"
    >
      <defs>
        <clipPath id="hat-clip">
          <path d="m425 146 44-118 66 107Z" />
        </clipPath>
        <pattern
          id="candle-stripe"
          width="12"
          height="12"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(-25)"
        >
          <rect width="12" height="12" fill="#fff7e5" />
          <rect width="5" height="12" fill="#a5b98e" />
        </pattern>
      </defs>
      <g
        stroke="#332b36"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <ellipse
          cx="400"
          cy="557"
          rx="235"
          ry="17"
          fill="#e9decf"
          stroke="none"
        />
        <g className="balloon balloon-left">
          <path
            d="M130 255c-30 45 20 94-3 144-20 43 2 80-19 115"
            strokeWidth="2"
          />
          <ellipse
            cx="131"
            cy="183"
            rx="52"
            ry="68"
            transform="rotate(-14 131 183)"
            fill="#b9b0dc"
          />
          <path d="m124 249-7 14 19-1Z" fill="#b9b0dc" />
          <path
            d="M109 138c-13 7-19 18-20 29"
            stroke="#e9e4f9"
            strokeWidth="7"
          />
        </g>
        <g className="balloon balloon-right">
          <path d="M674 204c28 52-22 81-4 129s-20 80-1 126" strokeWidth="2" />
          <ellipse
            cx="665"
            cy="139"
            rx="48"
            ry="64"
            transform="rotate(13 665 139)"
            fill="#ff927b"
          />
          <path d="m670 202-6 13 19-3Z" fill="#ff927b" />
          <path
            d="M642 96c-11 8-15 16-16 27"
            stroke="#ffd1bf"
            strokeWidth="7"
          />
        </g>
        <path
          d="M288 516c-31-5-46 8-43 20 2 10 44 13 66 3m176-23c31-5 46 8 43 20-2 10-44 13-66 3"
          fill="#e8a35a"
        />
        <path
          d="M257 283c-58 54-71 143-34 170 23 17 56-35 79-68m241-102c58 54 71 143 34 170-23 17-56-35-79-68"
          fill="#b77a52"
        />
        <path
          d="M260 191 269 115l58 35c43-17 102-17 145 0l58-35 9 76c39 52 32 92 24 132 34 127-2 211-163 212s-197-85-163-212c-8-40-15-80 23-132Z"
          fill="#ca9869"
        />
        <path
          d="m277 157 5 35 29-24m212-11-5 35-29-24"
          stroke="#9b6548"
          strokeWidth="4"
        />
        <ellipse
          cx="400"
          cy="427"
          rx="107"
          ry="103"
          fill="#f5dfb5"
          stroke="none"
        />
        <path
          d="M401 182c-76-62-153-4-151 69 2 63 80 106 150 58 70 48 148 5 150-58 2-73-75-131-149-69Z"
          fill="#ffedc9"
          stroke="none"
        />
        <g className="open-eye">
          <circle cx="326" cy="243" r="49" fill="#fffdf3" />
          <circle cx="474" cy="243" r="49" fill="#fffdf3" />
          <g className="owl-pupil">
            <ellipse
              cx="334"
              cy="246"
              rx="23"
              ry="29"
              fill="#332b36"
              stroke="none"
            />
            <ellipse
              cx="482"
              cy="246"
              rx="23"
              ry="29"
              fill="#332b36"
              stroke="none"
            />
            <circle cx="342" cy="235" r="8" fill="#fffdf3" stroke="none" />
            <circle cx="490" cy="235" r="8" fill="#fffdf3" stroke="none" />
          </g>
        </g>
        <g className="happy-eye">
          <path d="M289 247q37-40 74 0m74 0q37-40 74 0" strokeWidth="7" />
        </g>
        <ellipse
          cx="288"
          cy="293"
          rx="19"
          ry="9"
          fill="#eea08a"
          stroke="none"
        />
        <ellipse
          cx="512"
          cy="293"
          rx="19"
          ry="9"
          fill="#eea08a"
          stroke="none"
        />
        <path d="m384 282 16 25 16-25q-16-12-32 0Z" fill="#eda44f" />
        <path d="m425 146 44-118 66 107Z" fill="#ffd366" />
        <g clipPath="url(#hat-clip)" stroke="#ec806b" strokeWidth="18">
          <path d="m431 81 81 40m-80-11 81 40m-65-99 63 32" />
        </g>
        <path d="m425 146 44-118 66 107Z" />
        <path d="m420 147 119-13" stroke="#332b36" strokeWidth="9" />
        <circle cx="469" cy="27" r="13" fill="#b9b0dc" />
        <path
          d="m371 352 6 7 6-7m28 0 6 7 6-7m-30 9 6 7 6-7"
          stroke="#bb9165"
          strokeWidth="3"
        />
        <g className="cake">
          <ellipse cx="400" cy="526" rx="150" ry="18" fill="#a5b98e" />
          <path d="M289 415v79c0 32 222 32 222 0v-79" fill="#ef977f" />
          <path d="M289 452q111 29 222 0" stroke="#c66d5d" strokeWidth="3" />
          <ellipse cx="400" cy="415" rx="111" ry="29" fill="#fff2d7" />
          <path
            d="M290 416c2 15 10 16 17 16 0 25 23 25 25 4 7 2 15 3 23 4-1 34 26 34 27 2 14 2 28 2 40 1 0 23 24 24 25-2 12-1 23-4 33-7 4 19 24 17 23-7 5-4 8-7 8-11"
            fill="#fff2d7"
          />
          <g strokeWidth="4">
            <path
              d="m319 408 8 3m29-13 3 7m27 15 8-1m24-17 7 4m34-4-5 6m18 11 7-1"
              stroke="#a5b98e"
            />
            <path
              d="m339 415 4 5m36-21 6-2m37 20 5 2m27-26 5 3"
              stroke="#b9b0dc"
            />
          </g>
          {[340, 400, 460].map((x, i) => (
            <g key={x}>
              <rect
                x={x - 6}
                y={i === 1 ? 347 : 357}
                width="12"
                height={i === 1 ? 57 : 49}
                rx="3"
                fill="url(#candle-stripe)"
                strokeWidth="2.5"
              />
              <path d={`M${x} ${i === 1 ? 347 : 357}v-9`} strokeWidth="2" />
              <g
                className="candle-flame"
                style={{ transformOrigin: `${x}px ${i === 1 ? 338 : 348}px` }}
              >
                <path
                  d={`M${x} ${i === 1 ? 309 : 319}c-3 11-15 17-10 26 6 11 23 6 21-3-1-9-8-13-11-23Z`}
                  fill="#ffc450"
                  strokeWidth="2.5"
                />
                <path
                  d={`M${x} ${i === 1 ? 328 : 338}v9`}
                  stroke="#fff6cf"
                  strokeWidth="4"
                />
              </g>
              <g className="candle-smoke">
                <path
                  d={`M${x} ${i === 1 ? 335 : 345}c-12-14 10-20 0-34`}
                  stroke="#9b8e94"
                  strokeWidth="2"
                />
              </g>
            </g>
          ))}
          <path
            d="m335 478 8 5m21-8 8 5m21-3 8 2m20-5 8-3m20-7 8-4"
            stroke="#ffe5cf"
            strokeWidth="4"
          />
        </g>
        <path
          d="m205 89 7 12 14 2-10 10 2 14-13-7-12 7 2-14-10-10 14-2Z"
          fill="#ffd366"
          transform="rotate(-12 205 108)"
        />
        <path
          d="m598 283 6 10 12 2-9 8 2 12-11-5-11 5 2-12-9-8 12-2Z"
          fill="#ffd366"
        />
        <path
          d="m182 347 10 4m-3-15-4 10m425-278 9-8m1 21 9-1m-14-1 3 10"
          stroke="#7d8f69"
        />
        <path
          d="m576 497 10 6m-6-15 4 9m-386-20 9-8m-3 16 9 1"
          stroke="#c284a2"
        />
      </g>
    </svg>
  );
});

export default BirthdayOwl;
