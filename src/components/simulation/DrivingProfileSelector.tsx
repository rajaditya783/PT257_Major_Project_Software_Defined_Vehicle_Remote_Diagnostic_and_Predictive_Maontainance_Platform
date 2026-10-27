import React from 'react';
import { useTelemetry } from '../../context/TelemetryContext';
import { DrivingProfile } from '../../types/telemetry';
import { SlidersIcon, ActivityIcon } from '../icons';

export const DrivingProfileSelector: React.FC = () => {
  const {
    drivingProfile,
    setDrivingProfile,
    pollingIntervalMs,
    setPollingIntervalMs,
  } = useTelemetry();

  const profiles: Array<{ id: DrivingProfile; label: string; desc: string }> = [
    { id: 'NORMAL', label: 'Balanced Cruise', desc: 'Standard mixed driving & steady thermal state' },
    { id: 'HIGHWAY_CRUISE', label: 'Highway Steady', desc: 'Continuous 115-130 km/h high-speed load' },
    { id: 'URBAN_TRAFFIC', label: 'Urban Stop & Go', desc: 'Frequent regen braking, rapid throttle transitions' },
    { id: 'THERMAL_STRESS', label: 'Thermal Stress', desc: 'High continuous kW draw, coolant & inverter spike' },
    { id: 'TRACK_STRESS', label: 'Track Performance', desc: 'Redline RPM bursts, maximum torque & aggressive yaw' },
  ];

  const intervals = [
    { ms: 100, label: '100ms (High-Res)' },
    { ms: 500, label: '500ms (Standard)' },
    { ms: 2000, label: '2.0s (Eco)' },
  ];

  return (
    <div className="cockpit-panel rounded-lg p-4 font-mono">
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-cockpit-750">
        <div className="flex items-center gap-2">
          <SlidersIcon className="w-4 h-4 text-signal-amber" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
            Driving Physics & Simulation Profile
          </h3>
        </div>

        {/* Polling Frequency */}
        <div className="flex items-center gap-1.5 text-xs">
          <ActivityIcon className="w-3.5 h-3.5 text-telemetry-cyan" />
          <span className="text-slate-400 text-[11px]">Telemetry Rate:</span>
          <div className="flex gap-1">
            {intervals.map((item) => (
              <button
                key={item.ms}
                onClick={() => setPollingIntervalMs(item.ms)}
                className={`px-2 py-0.5 rounded text-[10px] font-semibold border transition-all ${
                  pollingIntervalMs === item.ms
                    ? 'bg-telemetry-cyan/20 border-telemetry-cyan text-telemetry-cyan'
                    : 'bg-cockpit-850 border-cockpit-700 text-slate-400 hover:text-slate-200'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Profile Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
        {profiles.map((p) => {
          const isActive = drivingProfile === p.id;
          return (
            <button
              key={p.id}
              onClick={() => setDrivingProfile(p.id)}
              className={`text-left p-2.5 rounded border transition-all ${
                isActive
                  ? 'bg-signal-amber/15 border-signal-amber text-slate-100 shadow-amber-glow'
                  : 'bg-cockpit-850/60 border-cockpit-750 text-slate-300 hover:border-cockpit-600 hover:bg-cockpit-800'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-bold">
                <span className={isActive ? 'text-signal-amber' : 'text-slate-200'}>
                  {p.label}
                </span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-signal-amber animate-ping" />
                )}
              </div>
              <div className="text-[10px] text-slate-400 mt-1 line-clamp-2 leading-tight">
                {p.desc}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
