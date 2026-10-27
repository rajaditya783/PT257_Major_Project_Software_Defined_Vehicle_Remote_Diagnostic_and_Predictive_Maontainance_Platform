import React from 'react';

interface CircularTachometerProps {
  rpm: number;
  maxRpm?: number;
  redlineRpm?: number;
  size?: number;
  sublabel?: string;
  hasFault?: boolean;
}

export const CircularTachometer: React.FC<CircularTachometerProps> = ({
  rpm,
  maxRpm = 8000,
  redlineRpm = 6500,
  size = 220,
  sublabel = 'POWERTRAIN RPM',
  hasFault = false,
}) => {
  const clampedRpm = Math.min(Math.max(0, rpm), maxRpm);
  const percentage = clampedRpm / maxRpm;
  
  // 240-degree arc: start from -210 deg to 30 deg
  const startAngle = -210;
  const totalAngle = 240;
  const currentAngle = startAngle + percentage * totalAngle;

  const radius = size * 0.38;
  const center = size / 2;
  const strokeWidth = 10;

  // Function to calculate SVG arc point
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

  const isRedline = rpm >= redlineRpm;
  const activeColor = hasFault
    ? '#FF3B30'
    : isRedline
    ? '#FF9E1B'
    : '#00D2D3';

  // Tick marks
  const tickCount = 9;
  const ticks = Array.from({ length: tickCount }).map((_, i) => {
    const tickPct = i / (tickCount - 1);
    const tickRpm = tickPct * maxRpm;
    const tickAngle = startAngle + tickPct * totalAngle;
    const p1 = polarToCartesian(center, center, radius - 12, tickAngle);
    const p2 = polarToCartesian(center, center, radius - 4, tickAngle);
    const textPos = polarToCartesian(center, center, radius - 24, tickAngle);
    const isTickRed = tickRpm >= redlineRpm;

    return {
      x1: p1.x,
      y1: p1.y,
      x2: p2.x,
      y2: p2.y,
      label: (tickRpm / 1000).toFixed(0),
      textX: textPos.x,
      textY: textPos.y,
      isRed: isTickRed,
    };
  });

  return (
    <div className="relative flex flex-col items-center justify-center select-none">
      <svg width={size} height={size * 0.88} viewBox={`0 0 ${size} ${size}`}>
        {/* Background track */}
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
          stroke={activeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          style={{
            transition: 'stroke-dashoffset 0.15s ease-out, stroke 0.2s ease',
            filter: isRedline || hasFault ? `drop-shadow(0 0 6px ${activeColor})` : 'none',
          }}
        />

        {/* Ticks & Numbers */}
        {ticks.map((t, idx) => (
          <g key={idx}>
            <line
              x1={t.x1}
              y1={t.y1}
              x2={t.x2}
              y2={t.y2}
              stroke={t.isRed ? '#FF3B30' : '#5E6D8A'}
              strokeWidth={idx % 2 === 0 ? 2 : 1}
            />
            <text
              x={t.textX}
              y={t.textY + 3}
              textAnchor="middle"
              className="text-[9px] font-mono font-semibold"
              fill={t.isRed ? '#FF3B30' : '#8E9BB0'}
            >
              {t.label}
            </text>
          </g>
        ))}

        {/* Center Digital Display */}
        <text
          x={center}
          y={center - 2}
          textAnchor="middle"
          className="text-2xl font-mono font-bold tracking-tight"
          fill={hasFault ? '#FF3B30' : '#F4F6F9'}
        >
          {rpm.toLocaleString()}
        </text>
        <text
          x={center}
          y={center + 16}
          textAnchor="middle"
          className="text-[10px] font-mono tracking-widest uppercase"
          fill="#8E9BB0"
        >
          RPM x1000
        </text>
      </svg>

      <div className="text-center mt-[-14px]">
        <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
          {sublabel}
        </div>
        {hasFault && (
          <div className="text-[10px] font-mono text-telemetry-crimson font-bold uppercase tracking-wider mt-0.5 animate-pulse">
            MISFIRE ANOMALY DETECTED
          </div>
        )}
      </div>
    </div>
  );
};
