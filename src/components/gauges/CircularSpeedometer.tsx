import React from 'react';

interface CircularSpeedometerProps {
  speed: number;
  maxSpeed?: number;
  size?: number;
  sublabel?: string;
  regenKw?: number;
}

export const CircularSpeedometer: React.FC<CircularSpeedometerProps> = ({
  speed,
  maxSpeed = 220,
  size = 220,
  sublabel = 'GROUND SPEED',
  regenKw = 0,
}) => {
  const clampedSpeed = Math.min(Math.max(0, speed), maxSpeed);
  const percentage = clampedSpeed / maxSpeed;

  const startAngle = -210;
  const totalAngle = 240;
  const currentAngle = startAngle + percentage * totalAngle;

  const radius = size * 0.38;
  const center = size / 2;
  const strokeWidth = 10;

  const polarToCartesian = (cx: number, cy: number, r: number, angleInDegrees: number) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: cx + r * Math.cos(angleInRadians),
      y: cy + r * Math.sin(angleInRadians),
    };
  };

  const describeArc = (x: number, y: number, r: number, startAngleDeg: number, endAngleDeg: number) => {
    const start = polarToCartesian(x, y, r, endAngleDeg);
    const end = polarToCartesian(x, y, r, startAngleDeg);
    const largeArcFlag = endAngleDeg - startAngleDeg <= 180 ? '0' : '1';
    return ['M', start.x, start.y, 'A', r, r, 0, largeArcFlag, 0, end.x, end.y].join(' ');
  };

  const backgroundArc = describeArc(center, center, radius, startAngle, startAngle + totalAngle);
  const activeArc = describeArc(center, center, radius, startAngle, Math.max(startAngle + 0.1, currentAngle));

  const tickSteps = [0, 40, 80, 120, 160, 200, 220];
  const ticks = tickSteps.map((s) => {
    const tickPct = s / maxSpeed;
    const tickAngle = startAngle + tickPct * totalAngle;
    const p1 = polarToCartesian(center, center, radius - 12, tickAngle);
    const p2 = polarToCartesian(center, center, radius - 4, tickAngle);
    const textPos = polarToCartesian(center, center, radius - 24, tickAngle);

    return {
      x1: p1.x,
      y1: p1.y,
      x2: p2.x,
      y2: p2.y,
      label: s.toString(),
      textX: textPos.x,
      textY: textPos.y,
    };
  });

  return (
    <div className="relative flex flex-col items-center justify-center select-none">
      <svg width={size} height={size * 0.88} viewBox={`0 0 ${size} ${size}`}>
        {/* Background Track */}
        <path
          d={backgroundArc}
          fill="none"
          stroke="#2A3344"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />

        {/* Active Arc */}
        <path
          d={activeArc}
          fill="none"
          stroke="#FF9E1B"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          style={{
            transition: 'stroke-dashoffset 0.15s ease-out',
            filter: 'drop-shadow(0 0 6px rgba(255, 158, 27, 0.4))',
          }}
        />

        {/* Ticks */}
        {ticks.map((t, idx) => (
          <g key={idx}>
            <line
              x1={t.x1}
              y1={t.y1}
              x2={t.x2}
              y2={t.y2}
              stroke="#5E6D8A"
              strokeWidth={1.5}
            />
            <text
              x={t.textX}
              y={t.textY + 3}
              textAnchor="middle"
              className="text-[9px] font-mono font-semibold"
              fill="#8E9BB0"
            >
              {t.label}
            </text>
          </g>
        ))}

        {/* Center Readout */}
        <text
          x={center}
          y={center - 2}
          textAnchor="middle"
          className="text-3xl font-mono font-bold tracking-tight"
          fill="#F4F6F9"
        >
          {speed.toFixed(0)}
        </text>
        <text
          x={center}
          y={center + 16}
          textAnchor="middle"
          className="text-[10px] font-mono tracking-widest uppercase font-semibold"
          fill="#FF9E1B"
        >
          KM/H
        </text>
      </svg>

      <div className="text-center mt-[-14px]">
        <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
          {sublabel}
        </div>
        {regenKw > 0 ? (
          <div className="text-[10px] font-mono text-telemetry-emerald font-semibold uppercase tracking-wider mt-0.5">
            REGEN: +{regenKw.toFixed(1)} kW
          </div>
        ) : (
          <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mt-0.5">
            DRIVE ACTIVE
          </div>
        )}
      </div>
    </div>
  );
};
