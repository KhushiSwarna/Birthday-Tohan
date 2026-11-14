"use client";

import { forwardRef, useId } from "react";

export type BirthdayStep = 0 | 1 | 2 | 3 | 4;
export type BirthdayAction =
  "closing" | "blowing" | "cutting" | "eating" | null;

const BirthdayOwl = forwardRef<
  SVGSVGElement,
  {
    candlesOut: boolean;
    wink: boolean;
    step: BirthdayStep;
    action: BirthdayAction;
    dancing: boolean;
    laptopClosed: boolean;
  }
>(function BirthdayOwl(
  { candlesOut, wink, step, action, dancing, laptopClosed },
  ref,
) {
  const id = useId().replace(/:/g, "");
  const cut = step >= 2 || action === "cutting";
  return (
    <svg
      ref={ref}
      viewBox="0 0 800 610"
      fill="none"
      className={`birthday-owl ${candlesOut ? "wish-made" : ""} ${wink ? "is-winking" : ""} ${action ? `is-${action}` : ""} ${cut ? "cake-is-cut" : ""} ${step >= 3 ? "cake-is-eaten" : ""} ${step === 4 ? "disco-scene" : ""} ${dancing ? "is-dancing" : ""} ${laptopClosed ? "laptop-closed" : "laptop-open"}`}
      data-step={step}
      data-laptop={laptopClosed ? "closed" : "open"}
      data-action={action ?? "idle"}
      aria-hidden="true"
    >
      <defs>
        <mask id={`${id}-cake-rest`}>
          <rect x="270" y="375" width="260" height="155" fill="white" />
          <path d="M400 415 470 393 515 416V510L400 520Z" fill="black" />
        </mask>
        <pattern
          id={`${id}-dance-tiles`}
          width="70"
          height="40"
          patternUnits="userSpaceOnUse"
        >
          <rect width="70" height="40" fill="#c0a7df" />
          <rect width="35" height="20" fill="#f6c7b4" />
          <rect x="35" y="20" width="35" height="20" fill="#f6c7b4" />
        </pattern>
        <clipPath id={`${id}-hat-clip`}>
          <path d="m425 146 44-118 66 107Z" />
        </clipPath>
        <pattern
          id={`${id}-candle-stripe`}
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
        <g className="dance-floor">
          <path
            d="M170 515H630L720 600H80Z"
            fill={`url(#${id}-dance-tiles)`}
            stroke="#9880ae"
            strokeWidth="2"
          />
          <path d="M170 515H630" stroke="#fff8eb" strokeWidth="5" />
        </g>
        <g className="disco-ball">
          <path d="M360-25v65" stroke="#8c7896" strokeWidth="2" />
          <circle cx="360" cy="72" r="34" fill="#e1d6ec" />
          <path
            d="M326 72h68m-63-17h58m-58 34h58M360 38c-23 18-23 50 0 68m0-68c23 18 23 50 0 68m0-68v68"
            stroke="#a18cb2"
            strokeWidth="2"
          />
          <path
            d="m319 35 4 10 10 4-10 4-4 10-4-10-10-4 10-4Z"
            fill="#fff8eb"
            stroke="none"
          />
        </g>
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
        <g className="owl-character">
          <path
            className="owl-foot owl-foot-left"
            d="M288 516c-31-5-46 8-43 20 2 10 44 13 66 3"
            fill="#e8a35a"
          />
          <path
            className="owl-foot owl-foot-right"
            d="M487 516c31-5 46 8 43 20-2 10-44 13-66 3"
            fill="#e8a35a"
          />
          <path
            className="owl-wing owl-wing-left"
            d="M257 283c-58 54-71 143-34 170 23 17 56-35 79-68"
            fill="#b77a52"
          />
          <path
            className="owl-wing owl-wing-right"
            d="M543 283c58 54 71 143 34 170-23 17-56-35-79-68"
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
          <g className="normal-beak">
            <path d="m384 282 16 25 16-25q-16-12-32 0Z" fill="#eda44f" />
          </g>
          <g className="blow-beak">
            <ellipse cx="400" cy="289" rx="15" ry="11" fill="#eda44f" />
            <ellipse
              cx="400"
              cy="291"
              rx="7"
              ry="5"
              fill="#69483b"
              strokeWidth="2"
            />
          </g>
          <g className="yum-beak">
            <path d="m382 281 18 16 18-16q-18-14-36 0Z" fill="#eda44f" />
            <path d="M384 298q16 25 32 0Z" fill="#69483b" />
            <path d="M394 309q6-6 12 0" stroke="#ee947c" strokeWidth="4" />
          </g>
          <g className="cake-crumbs" fill="#ef977f" stroke="none">
            <circle cx="380" cy="310" r="4" />
            <circle cx="422" cy="306" r="3" />
            <circle cx="430" cy="316" r="4" />
          </g>
          <g className="party-hat">
            <path d="m425 146 44-118 66 107Z" fill="#ffd366" />
            <g
              clipPath={`url(#${id}-hat-clip)`}
              stroke="#ec806b"
              strokeWidth="18"
            >
              <path d="m431 81 81 40m-80-11 81 40m-65-99 63 32" />
            </g>
            <path d="m425 146 44-118 66 107Z" />
            <path d="m420 147 119-13" stroke="#332b36" strokeWidth="9" />
            <circle cx="469" cy="27" r="13" fill="#b9b0dc" />
          </g>
          <path
            className="belly-feathers"
            d="m371 352 6 7 6-7m28 0 6 7 6-7m-30 9 6 7 6-7"
            stroke="#bb9165"
            strokeWidth="3"
          />
          <g className="owl-headphones">
            <path
              d="M267 230c-8-142 274-142 266 0"
              stroke="#70567f"
              strokeWidth="15"
            />
            <path
              d="M273 209c0-111 254-111 254 0"
              stroke="#b9b0dc"
              strokeWidth="8"
            />
            <rect
              x="245"
              y="209"
              width="35"
              height="68"
              rx="16"
              fill="#b9b0dc"
            />
            <rect
              x="520"
              y="209"
              width="35"
              height="68"
              rx="16"
              fill="#b9b0dc"
            />
          </g>
        </g>
        <g className="owl-breath">
          <path
            d="M388 311q-15 16-30 7m42-5v19m12-21q15 16 30 7"
            stroke="#9eb2c9"
            strokeWidth="4"
          />
          <path
            d="M374 333q-15 15-28 5m80-5q15 15 28 5"
            stroke="#9eb2c9"
            strokeWidth="3"
          />
        </g>
        <g className="cake">
          <ellipse cx="400" cy="526" rx="150" ry="18" fill="#a5b98e" />
          <g
            className="cake-body"
            mask={cut ? `url(#${id}-cake-rest)` : undefined}
          >
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
          </g>
          <g className="candles">
            {[340, 400, 460].map((x, i) => (
              <g key={x}>
                <rect
                  x={x - 6}
                  y={i === 1 ? 347 : 357}
                  width="12"
                  height={i === 1 ? 57 : 49}
                  rx="3"
                  fill={`url(#${id}-candle-stripe)`}
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
          </g>
          <path
            d="m335 478 8 5m21-8 8 5m21-3 8 2m20-5 8-3m20-7 8-4"
            stroke="#ffe5cf"
            strokeWidth="4"
          />
          <path
            className="cake-cut-line"
            d="m400 415 70-22m-70 22v99"
            stroke="#9b6557"
            strokeWidth="3"
          />
          <g className="cake-inside">
            <path
              d="M400 415 470 393v82q-21 28-70 39Z"
              fill="#f5dfb5"
              stroke="#9b6557"
              strokeWidth="2"
            />
            <path
              d="m402 453 66-22m-66 54 66-23"
              stroke="#dfb49b"
              strokeWidth="3"
            />
          </g>
          <g className="cake-slice">
            <path d="m400 440 108-21v78q-43 23-108 17Z" fill="#ef977f" />
            <path d="m400 415 70-22q28 8 38 26l-108 21Z" fill="#fff2d7" />
            <path
              d="M400 443q12 13 18-3 11 12 18-4 11 11 17-4 10 10 17-3 12 8 17-5l21-5"
              fill="#fff2d7"
            />
            <path d="m402 479 104-22" stroke="#c66d5d" />
            <path d="m438 410 7 2m14-9 4 3" stroke="#a5b98e" strokeWidth="4" />
          </g>
        </g>
        <g className="laptop">
          <ellipse
            cx="400"
            cy="543"
            rx="162"
            ry="12"
            fill="#d4c7bd"
            stroke="none"
          />
          <g className="laptop-lid">
            <rect
              x="270"
              y="354"
              width="260"
              height="165"
              rx="13"
              fill="#8f899d"
            />
            <rect
              x="282"
              y="367"
              width="236"
              height="138"
              rx="6"
              fill="#eae4ee"
              strokeWidth="2"
            />
            <circle cx="400" cy="361" r="2" fill="#332b36" stroke="none" />
            <path d="M283 389h234" stroke="#c4b7cd" strokeWidth="2" />
            <circle cx="294" cy="378" r="3" fill="#ee947c" stroke="none" />
            <circle cx="305" cy="378" r="3" fill="#ffd366" stroke="none" />
            <circle cx="316" cy="378" r="3" fill="#a5b98e" stroke="none" />
            <rect
              x="301"
              y="405"
              width="84"
              height="10"
              rx="4"
              fill="#b5a7c3"
              stroke="none"
            />
            <path
              d="M301 432h158m-158 15h181m-181 15h130"
              stroke="#c6bccc"
              strokeWidth="6"
            />
            <text
              x="400"
              y="492"
              textAnchor="middle"
              fontFamily="Fredoka Variable, sans-serif"
              fontSize="13"
              fill="#716177"
              stroke="none"
            >
              just one more email…
            </text>
          </g>
          <path
            d="M270 515h260l34 18q-3 10-22 10H258q-19 0-22-10Z"
            fill="#b9b0c5"
          />
          <path
            d="M237 533h326m-199-18-5 12h82l-5-12"
            stroke="#82798d"
            strokeWidth="2"
          />
        </g>
        <g className="laptop-closing-hand">
          <path
            d="M549 315q21 29-13 67l-36-8q-9-12 5-17l19-3-6-20Z"
            fill="#b77a52"
          />
          <path d="m504 369 21 4" stroke="#80573f" strokeWidth="2" />
        </g>
        <g className="knife-hand">
          <path d="M555 346q-27 19-48 47l-18-10q14-42 41-63Z" fill="#b77a52" />
          <path d="m500 361-11 72q22 8 26-7l4-57Z" fill="#e5e7e5" />
          <path d="m501 331 5 35 16-2-1-36q-14-11-20 3Z" fill="#b9b0dc" />
        </g>
        <g
          className="music-notes"
          fill="#9273ae"
          stroke="#70567f"
          strokeWidth="2"
        >
          <path
            d="M199 226v-45l34-8v45m-34-24 34-8"
            fill="none"
            strokeWidth="4"
          />
          <ellipse cx="191" cy="229" rx="9" ry="6" />
          <ellipse cx="225" cy="221" rx="9" ry="6" />
          <path d="M593 201v-38l22 7" fill="none" strokeWidth="4" />
          <ellipse cx="585" cy="204" rx="9" ry="6" />
        </g>
        <g className="yum-bubble">
          <path
            d="M563 335q-5-12 7-23 2-15 19-14 15-10 28 2 18-2 20 15 13 13-2 25-5 16-23 11-17 10-29-2l-25 9Z"
            fill="#fff0bf"
            strokeWidth="2"
          />
          <text
            x="599"
            y="333"
            textAnchor="middle"
            fontFamily="Fredoka Variable, sans-serif"
            fontSize="19"
            fill="#69483b"
            stroke="none"
          >
            yum!
          </text>
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
