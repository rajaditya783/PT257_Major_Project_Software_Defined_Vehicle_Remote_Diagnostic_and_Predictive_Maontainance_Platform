import React from 'react';

interface MiniSparklineProps {
  data: number[];
  width?: number;
  height?: number;
  color?: 'amber' | 'cyan' | 'emerald' | 'crimson';
  className?: string;
}

export const MiniSparkline: React.FC<MiniSparklineProps> = ({
  data,
  width = 80,
  height = 24,
  color = 'cyan',
  className = '',
}) => {
  if (!data || data.length < 2) {
    return <div style={{ width, height }} className="bg-cockpit-800/30 rounded" />;
  }

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data.map((val, idx) => {
    const x = (idx / (data.length - 1)) * width;
    const y = height - ((val - min) / range) * (height - 4) - 2;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });

  const pathD = `M ${points.join(' L ')}`;

  const strokeColor = {
    amber: '#FF9E1B',
    cyan: '#00D2D3',
    emerald: '#00E676',
    crimson: '#FF3B30',
  }[color];

  return (
    <svg width={width} height={height} className={`overflow-visible ${className}`}>
      <path
        d={pathD}
        fill="none"
        stroke={strokeColor}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* End pulse dot */}
      {points.length > 0 && (
        <circle
          cx={parseFloat(points[points.length - 1].split(',')[0])}
          cy={parseFloat(points[points.length - 1].split(',')[1])}
          r={2}
          fill={strokeColor}
        />
      )}
    </svg>
  );
};
