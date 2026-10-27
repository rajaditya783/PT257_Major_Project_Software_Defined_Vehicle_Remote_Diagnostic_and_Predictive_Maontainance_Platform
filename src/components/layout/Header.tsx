import React, { useState } from 'react';
import { useTelemetry } from '../../context/TelemetryContext';
import { useAuthRole } from '../../context/AuthRoleContext';
import {
  CarIcon,
  BugFaultIcon,
  SunIcon,
  MoonIcon,
  UsersIcon,
  ActivityIcon,
  WifiStreamIcon,
  ChevronDownIcon,
} from '../icons';
import { FaultInjectorModal } from '../simulation/FaultInjectorModal';

export const Header: React.FC = () => {
  const { vehicles, selectedVehicleId, setSelectedVehicleId, activeFaultId } = useTelemetry();
  const { role, setRole, theme, toggleTheme, cloudSyncStatus } = useAuthRole();
  const [isFaultModalOpen, setIsFaultModalOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 h-16 bg-cockpit-900/90 backdrop-blur-md border-b border-cockpit-750 px-4 lg:px-6 flex items-center justify-between font-mono">
        {/* Left Brand Identity */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-signal-amber to-signal-amber-dark text-cockpit-950 shadow-amber-glow font-bold">
            <CarIcon className="w-5 h-5 text-cockpit-950" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm lg:text-base tracking-wider text-slate-100">
                AERO<span className="text-signal-amber">-SDV</span>
              </span>
              <span className="hidden sm:inline-block text-[10px] bg-cockpit-800 text-slate-400 px-1.5 py-0.5 rounded border border-cockpit-700">
                PROD-v4.19
              </span>
            </div>
            <div className="text-[10px] text-slate-400 hidden sm:block tracking-tight">
              Remote Diagnostic & Predictive Maintenance Platform
            </div>
          </div>
        </div>

        {/* Center Live Stream & Vehicle Picker */}
        <div className="flex items-center gap-3">
          {/* Active Vehicle Picker */}
          <div className="relative flex items-center">
            <CarIcon className="w-4 h-4 text-signal-amber absolute left-2.5 pointer-events-none" />
            <select
              value={selectedVehicleId}
              onChange={(e) => setSelectedVehicleId(e.target.value)}
              aria-label="Active Vehicle Telemetry Selection"
              className="bg-cockpit-850 border border-cockpit-700 text-slate-200 text-xs rounded-lg pl-8 pr-7 py-1.5 focus:outline-none focus:border-signal-amber cursor-pointer appearance-none"
            >
              {vehicles.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.name} ({v.id}) - {v.status.toUpperCase()}
                </option>
              ))}
            </select>
            <ChevronDownIcon className="w-3.5 h-3.5 text-slate-400 absolute right-2 pointer-events-none" />
          </div>

          {/* Live Telemetry Streaming Indicator */}
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded bg-cockpit-850 border border-cockpit-750 text-xs">
            <span className="w-2 h-2 rounded-full bg-telemetry-cyan animate-ping" />
            <span className="text-telemetry-cyan font-semibold text-[11px]">MQTT/TLS</span>
            <span className="text-slate-400 text-[10px]">100% Signal</span>
          </div>
        </div>

        {/* Right Action Tools */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Fault Injector Button */}
          <button
            onClick={() => setIsFaultModalOpen(true)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
              activeFaultId
                ? 'bg-telemetry-crimson text-white shadow-critical-glow animate-pulse'
                : 'bg-signal-amber/15 text-signal-amber border border-signal-amber/40 hover:bg-signal-amber/25'
            }`}
          >
            <BugFaultIcon className="w-4 h-4" />
            <span className="hidden sm:inline">
              {activeFaultId ? 'Fault Active' : 'Inject Fault'}
            </span>
          </button>

          {/* Role Switcher */}
          <div className="hidden lg:flex items-center gap-1 bg-cockpit-850 p-1 rounded-lg border border-cockpit-750 text-xs">
            <UsersIcon className="w-3.5 h-3.5 text-slate-400 ml-1" />
            <button
              onClick={() => setRole('FLEET_MANAGER')}
              className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-colors ${
                role === 'FLEET_MANAGER'
                  ? 'bg-signal-amber text-cockpit-950 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Fleet Ops
            </button>
            <button
              onClick={() => setRole('FIELD_TECHNICIAN')}
              className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-colors ${
                role === 'FIELD_TECHNICIAN'
                  ? 'bg-signal-amber text-cockpit-950 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Technician
            </button>
            <button
              onClick={() => setRole('VEHICLE_OWNER')}
              className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-colors ${
                role === 'VEHICLE_OWNER'
                  ? 'bg-signal-amber text-cockpit-950 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Owner
            </button>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Dark / Light Theme"
            className="p-2 rounded-lg bg-cockpit-850 hover:bg-cockpit-750 text-slate-300 border border-cockpit-700 transition-colors"
          >
            {theme === 'dark' ? (
              <SunIcon className="w-4 h-4 text-signal-amber" />
            ) : (
              <MoonIcon className="w-4 h-4 text-slate-700" />
            )}
          </button>
        </div>
      </header>

      <FaultInjectorModal
        isOpen={isFaultModalOpen}
        onClose={() => setIsFaultModalOpen(false)}
      />
    </>
  );
};
