const colors = ["#ee947c", "#b9b0dc", "#ffd366", "#a5b98e"];

export default function PartyDecorations({ visible }: { visible: boolean }) {
  return (
    <div
      className={`party-decorations ${visible ? "decorations-visible" : ""}`}
      aria-hidden="true"
    >
      {["left", "right"].map((side) => (
        <svg
          key={side}
          className={`party-bunting bunting-${side}`}
          viewBox="0 0 700 150"
          fill="none"
        >
          <path d="M-20 7Q350 190 720 7" stroke="#8e7770" strokeWidth="2" />
          {Array.from({ length: 10 }, (_, i) => {
            const x = 10 + i * 70;
            const y = 7 + Math.sin(((i + 0.25) / 10) * Math.PI) * 89;
            return (
              <path
                key={i}
                d={`m${x} ${y} 43 9-28 42Z`}
                fill={colors[i % 4]}
                stroke="#64505c"
                strokeWidth="1.5"
              />
            );
          })}
        </svg>
      ))}
      {colors.map((color, i) => (
        <svg
          key={color}
          className={`extra-balloon extra-balloon-${i}`}
          viewBox="0 0 100 220"
          fill="none"
        >
          <path
            d="M50 113c-22 31 19 51-2 79-6 8-6 16-4 25"
            stroke="#9d8c89"
            strokeWidth="1.7"
          />
          <ellipse
            cx="50"
            cy="60"
            rx="37"
            ry="51"
            fill={color}
            stroke="#66525c"
            strokeWidth="2"
          />
          <path
            d="m49 111-6 10 15-1Z"
            fill={color}
            stroke="#66525c"
            strokeWidth="2"
          />
          <path
            d="M30 30q-12 12-10 26"
            stroke="#fff8eb"
            strokeOpacity=".7"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </svg>
      ))}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          className={`backdrop-sparkle backdrop-sparkle-${i}`}
          viewBox="0 0 70 70"
          fill="none"
        >
          <path
            d="m35 5 7 23 23 7-23 7-7 23-7-23-23-7 23-7Z"
            fill={colors[i % 4]}
            stroke="#806e75"
            strokeWidth="1.5"
          />
          <path
            d="m59 9 3 6 6 3-6 3-3 6-3-6-6-3 6-3Z"
            fill={colors[(i + 1) % 4]}
          />
        </svg>
      ))}
      <svg
        className="party-streamer streamer-left"
        viewBox="0 0 80 300"
        fill="none"
      >
        <path
          d="M42-10c-66 40 61 59 0 92S-9 133 42 164s-35 49 0 83 0 40-8 56"
          stroke="#b9b0dc"
          strokeWidth="8"
          strokeLinecap="round"
        />
      </svg>
      <svg
        className="party-streamer streamer-right"
        viewBox="0 0 80 300"
        fill="none"
      >
        <path
          d="M42-10c-66 40 61 59 0 92S-9 133 42 164s-35 49 0 83 0 40-8 56"
          stroke="#ee947c"
          strokeWidth="8"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
