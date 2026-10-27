import React from 'react';
import { TPMSData } from '../../types/telemetry';
import { TirePressureIcon } from '../icons';

interface TPMSSensorGridProps {
  tpms: {
    frontLeft: TPMSData;
    frontRight: TPMSData;
    rearLeft: TPMSData;
    rearRight: TPMSData;
  };
}

export const TPMSSensorGrid: React.FC<TPMSSensorGridProps> = ({ tpms }) => {
  const renderWheelBox = (label: string, data: TPMSData, isFront: boolean, isLeft: boolean) => {
    const isWarning = data.status === 'low' || data.pressurePsi < 32 || data.pressurePsi > 42;
    const isCritical = data.status === 'critical' || data.pressurePsi < 28 || data.tempC > 60;

    let borderClass = 'border-cockpit-750 bg-cockpit-850';
    let textClass = 'text-slate-200';

    if (isCritical) {
      borderClass = 'border-telemetry-crimson bg-telemetry-crimson/10 animate-pulse';
      textClass = 'text-telemetry-crimson';
    } else if (isWarning) {
      borderClass = 'border-signal-amber bg-signal-amber/10';
      textClass = 'text-signal-amber';
    }

    return (
      <div
        className={`p-2.5 rounded border ${borderClass} flex flex-col justify-between font-mono text-xs`}
      >
        <div className="flex justify-between items-center text-[10px] text-slate-400">
          <span className="font-semibold uppercase">{label}</span>
          <span className="text-[9px] opacity-75">{data.tempC.toFixed(0)}°C</span>
        </div>
        <div className="my-1 text-center">
          <span className={`text-base font-bold ${textClass}`}>
            {data.pressurePsi.toFixed(1)}
          </span>
          <span className="text-[10px] text-slate-400 ml-1">PSI</span>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-2">
        <span className="flex items-center gap-1.5 uppercase font-semibold">
          <TirePressureIcon className="w-3.5 h-3.5 text-telemetry-cyan" />
          TPMS Pressure & Temp
        </span>
        <span className="text-[10px] text-slate-500">Nominal: 35.0 PSI</span>
      </div>

      <div className="grid grid-cols-2 gap-3 relative py-2">
        {renderWheelBox('FL', tpms.frontLeft, true, true)}
        {renderWheelBox('FR', tpms.frontRight, true, false)}
        
        {/* Center Vehicle Chassis Silhouette Line */}
        <div className="col-span-2 flex items-center justify-center my-[-4px]">
          <div className="h-[1px] w-full bg-cockpit-750 relative">
            <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-cockpit-900 px-2 text-[9px] font-mono text-slate-500 uppercase tracking-widest">
              AXLE SPLIT
            </span>
          </div>
        </div>

        {renderWheelBox('RL', tpms.rearLeft, false, true)}
        {renderWheelBox('RR', tpms.rearRight, false, false)}
      </div>
    </div>
  );
};
