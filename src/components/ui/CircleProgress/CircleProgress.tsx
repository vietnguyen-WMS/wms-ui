import React, { useEffect, useRef, useState } from 'react';
import type { CircleProgressProps } from './CircleProgress.types';

const CircleProgress: React.FC<CircleProgressProps> = ({
  percent = 75,
  date = '05/21',
  size = 320,
  thickness = 12,
  durationMs = 1200,
  strokeColor = '#fff',
  shadowColor = '#EA6C00',
}) => {
  const [displayPercent, setDisplayPercent] = useState(0);
  const circleRef = useRef<SVGCircleElement>(null);

  const r = size / 2 - thickness;
  const circ = 2 * Math.PI * r;

  useEffect(() => {
    let start: number | null = null;
    const raf = (t: number) => {
      if (!start) start = t;
      const progress = Math.min((t - start) / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      const currentPercent = Math.floor(eased * percent);
      setDisplayPercent(currentPercent);

      if (circleRef.current) {
        const currentOffset = circ * (1 - currentPercent / 100);
        circleRef.current.style.strokeDashoffset = `${currentOffset}`;
      }
      if (progress < 1) requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }, [percent, circ, durationMs]);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <defs>
          <linearGradient id="ringColor" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={strokeColor} />
          </linearGradient>

          <filter id="neonShadow" x="-70%" y="-70%" width="240%" height="240%">
            <feMorphology
              in="SourceGraphic"
              operator="dilate"
              radius="0.7"
              result="thicken"
            />
            <feGaussianBlur in="thicken" stdDeviation="2.2" result="softGlow" />
            <feFlood
              floodColor={shadowColor}
              floodOpacity="0.35"
              result="glowColor"
            />
            <feComposite
              in="glowColor"
              in2="softGlow"
              operator="in"
              result="coloredGlow"
            />

            <feMerge>
              <feMergeNode in="shadow" />
              <feMergeNode in="coloredGlow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
          <circle
            ref={circleRef}
            cx={size / 2}
            cy={size / 2}
            r={r}
            stroke="url(#ringColor)"
            strokeWidth={thickness}
            strokeLinecap="round"
            className="fill-none"
            filter="url(#neonShadow)"
            style={{
              strokeDasharray: circ,
              strokeDashoffset: circ,
            }}
          />
        </g>
      </svg>

      <p className="absolute inset-0 grid place-items-center">
        <span className="inline-flex items-baseline gap-3">
          <span
            style={{
              textShadow: '0 0 5px #fca500, 0 0 10px #fca500',
            }}
            className="text-white text-[18px] tracking-wider"
          >
            {date}
          </span>
          <span
            style={{
              textShadow: '0 0 5px #fca500, 0 0 10px #fca500',
            }}
            className="text-white text-[25px] font-semibold leading-none"
          >
            {displayPercent}%
          </span>
        </span>
      </p>
    </div>
  );
};

export default CircleProgress;
