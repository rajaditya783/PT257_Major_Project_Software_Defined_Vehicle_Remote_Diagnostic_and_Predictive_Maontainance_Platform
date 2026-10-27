import React from 'react';
import { BatteryBoltIcon } from '../icons';

interface RadialBatteryGaugeProps {
  soc: number; // State of Charge 0-100%
  soh: number; // State of Health 0-100%
  voltage: number;
  currentA: number;
  size?: number;
}

export const RadialBatteryGauge: React.FC<RadialBatteryGaugeProps> = ({
  soc,
  soh,
  voltage,
  currentA,
  size = 200,
}) => {
  const center = size / 2;
  const strokeWidth = 8;
  const outerRadius = size * 0.4;
  const innerRadius = size * 0.3;

  const outerCircumference = 2 * Math.PI * outerRadius;
  const innerCircumference = 2 * Math.PI * innerRadius;

  const socOffset = outerCircumference - (soc / 100) * outerCircumference;
  const sohOffset = innerCircumference - (soh / 100) * innerCircumference;

  const socColor = soc < 20 ? '#FF3B30' : soc < 40 ? '#FF9E1B' : '#00D2D3';
  const sohColor = soh < 80 ? '#FF9E1B' : '#00E676';

  return (
    <div className="flex flex-col items-center justify-center relative select-none">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Outer Ring Background (SOC) */}
        <circle
          cx={center}
          cy={center}
          r={outerRadius}
          fill="none"
          stroke="#2A3344"
          strokeWidth={strokeWidth}
        />
        {/* Outer Ring Active (SOC) */}
        <circle
          cx={center}
          cy={center}
          r={outerRadius}
          fill="none"
          stroke={socColor}
          strokeWidth={strokeWidth}
          strokeDasharray={outerCircumference}
          strokeDashoffset={socOffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${center} ${center})`}
          style={{ transition: 'stroke-dashoffset 0.3s ease-out' }}
        />

        {/* Inner Ring Background (SOH) */}
        <circle
          cx={center}
          cy={center}
          r={innerRadius}
          fill="none"
          stroke="#1F2633"
          strokeWidth={strokeWidth - 2}
        />
        {/* Inner Ring Active (SOH) */}
        <circle
          cx={center}
          cy={center}
          r={innerRadius}
          fill="none"
          stroke={sohColor}
          strokeWidth={strokeWidth - 2}
          strokeDasharray={innerCircumference}
          strokeDashoffset={sohOffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${center} ${center})`}
          style={{ transition: 'stroke-dashoffset 0.3s ease-out' }}
        />

        {/* Center Readout */}
        <g transform={`translate(${center - 8}, ${center - 28})`}>
          <BatteryBoltIcon className="w-4 h-4 text-signal-amber" />
        </g>
        <text
          x={center}
          y={center + 2}
          textAnchor="middle"
          className="text-2xl font-mono font-bold tracking-tight"
          fill="#F4F6F9"
        >
          {soc.toFixed(1)}%
        </text>
        <text
          x={center}
          y={center + 18}
          textAnchor="middle"
          className="text-[9px] font-mono tracking-wider uppercase font-semibold"
          fill="#8E9BB0"
        >
          SOC | SOH {soh.toFixed(0)}%
        </text>
      </svg>

      <div className="w-full flex justify-around mt-[-10px] px-2 text-xs font-mono">
        <div className="text-center">
          <div className="text-[10px] text-slate-500 uppercase tracking-wider">Bus Voltage</div>
          <div className="font-semibold text-slate-200">{voltage.toFixed(1)} V</div>
        </div>
        <div className="text-center">
          <div className="text-[10px] text-slate-500 uppercase tracking-wider">Pack Load</div>
          <div className="font-semibold text-slate-200">{currentA.toFixed(1)} A</div>
        </div>
      </div>
    </div>
  );
};
