import React from 'react';
import { ThermometerIcon } from '../icons';

interface ThermalBarometerProps {
  coolantTempC: number;
  inverterTempC: number;
  ambientTempC?: number;
}

export const ThermalBarometer: React.FC<ThermalBarometerProps> = ({
  coolantTempC,
  inverterTempC,
  ambientTempC = 22,
}) => {
  const getTempColor = (val: number, warnThresh: number, critThresh: number) => {
    if (val >= critThresh) return 'bg-telemetry-crimson';
    if (val >= warnThresh) return 'bg-signal-amber';
    return 'bg-telemetry-cyan';
  };

  const coolantPct = Math.min(100, Math.max(0, (coolantTempC / 120) * 100));
  const inverterPct = Math.min(100, Math.max(0, (inverterTempC / 120) * 100));

  const coolantColor = getTempColor(coolantTempC, 98, 105);
  const inverterColor = getTempColor(inverterTempC, 80, 92);

  return (
    <div className="w-full flex flex-col gap-3 font-mono">
      {/* Header */}
      <div className="flex items-center justify-between text-xs text-slate-400">
        <span className="flex items-center gap-1.5 uppercase font-semibold">
          <ThermometerIcon className="w-3.5 h-3.5 text-signal-amber" />
          Thermal Loops
        </span>
        <span className="text-[11px] text-slate-500">Ambient: {ambientTempC.toFixed(1)}°C</span>
      </div>

      {/* Coolant Loop Bar */}
      <div>
        <div className="flex justify-between items-center text-xs mb-1">
          <span className="text-slate-300 font-medium">Coolant Circuit</span>
          <span
            className={`font-bold ${
              coolantTempC >= 105
                ? 'text-telemetry-crimson animate-pulse'
                : coolantTempC >= 98
                ? 'text-signal-amber'
                : 'text-slate-100'
            }`}
          >
            {coolantTempC.toFixed(1)} °C
          </span>
        </div>
        <div className="h-2 w-full bg-cockpit-800 rounded-full overflow-hidden relative">
          {/* Normal operating band marker (80-95C => 66%-79%) */}
          <div className="absolute left-[66%] w-[13%] h-full bg-telemetry-emerald/20" />
          <div
            className={`h-full ${coolantColor} transition-all duration-300 rounded-full`}
            style={{ width: `${coolantPct}%` }}
          />
        </div>
        <div className="flex justify-between text-[9px] text-slate-500 mt-0.5">
          <span>0°C</span>
          <span>Target: 85-95°C</span>
          <span>Max: 120°C</span>
        </div>
      </div>

      {/* Inverter Loop Bar */}
      <div>
        <div className="flex justify-between items-center text-xs mb-1">
          <span className="text-slate-300 font-medium">Inverter SiC Module</span>
          <span
            className={`font-bold ${
              inverterTempC >= 92
                ? 'text-telemetry-crimson animate-pulse'
                : inverterTempC >= 80
                ? 'text-signal-amber'
                : 'text-slate-100'
            }`}
          >
            {inverterTempC.toFixed(1)} °C
          </span>
        </div>
        <div className="h-2 w-full bg-cockpit-800 rounded-full overflow-hidden relative">
          <div className="absolute left-[33%] w-[25%] h-full bg-telemetry-emerald/20" />
          <div
            className={`h-full ${inverterColor} transition-all duration-300 rounded-full`}
            style={{ width: `${inverterPct}%` }}
          />
        </div>
        <div className="flex justify-between text-[9px] text-slate-500 mt-0.5">
          <span>0°C</span>
          <span>Max Continuous: 85°C</span>
          <span>Max: 120°C</span>
        </div>
      </div>
    </div>
  );
};
