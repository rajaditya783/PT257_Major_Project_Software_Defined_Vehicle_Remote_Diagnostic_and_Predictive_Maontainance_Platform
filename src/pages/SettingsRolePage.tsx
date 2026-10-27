import React, { useState } from 'react';
import { useAuthRole } from '../context/AuthRoleContext';
import { useTelemetry } from '../context/TelemetryContext';
import {
  SlidersIcon,
  UsersIcon,
  SunIcon,
  MoonIcon,
  CanBusIcon,
  WifiStreamIcon,
  ShieldCheckIcon,
  WrenchIcon,
  CheckCircleIcon,
  FileTextIcon,
  ActivityIcon,
} from '../components/icons';

export const SettingsRolePage: React.FC = () => {
  const {
    role,
    setRole,
    theme,
    setTheme,
    toggleTheme,
    baudRateProtocol,
    setBaudRateProtocol,
  } = useAuthRole();

  const {
    selectedVehicle,
    pollingIntervalMs,
    setPollingIntervalMs,
  } = useTelemetry();

  const [webhookUrl, setWebhookUrl] = useState('https://telemetry.fleet-oem-cloud.internal/v1/ingest');
  const [apiKey, setApiKey] = useState('sk_live_sdv_49184029104829103819');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="space-y-6 font-mono">
      {/* Top Banner */}
      <div className="cockpit-panel rounded-xl p-5 flex flex-wrap items-center justify-between gap-4 border-l-4 border-l-signal-amber">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-signal-amber uppercase tracking-wider mb-1">
            <SlidersIcon className="w-4 h-4" />
            Platform Configuration & Role-Based Access Control
          </div>
          <h1 className="text-lg sm:text-xl font-bold text-slate-100 font-sans">
            User Persona & Service-Center Preferences
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Switch perspective between Fleet Manager, Workshop Diagnostic Specialist, and Vehicle Owner.
          </p>
        </div>
      </div>

      {/* Role Switcher Selection */}
      <div className="cockpit-panel rounded-xl p-5">
        <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-3 flex items-center gap-2">
          <UsersIcon className="w-4 h-4 text-signal-amber" />
          Active Persona & Perspective
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Persona 1: Fleet Manager */}
          <button
            onClick={() => setRole('FLEET_MANAGER')}
            className={`p-4 rounded-xl border text-left transition-all ${
              role === 'FLEET_MANAGER'
                ? 'bg-signal-amber/15 border-signal-amber text-slate-100 shadow-amber-glow'
                : 'bg-cockpit-850 border-cockpit-750 text-slate-300 hover:border-cockpit-600'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase text-signal-amber">
                Fleet Operations Manager
              </span>
              {role === 'FLEET_MANAGER' && (
                <span className="w-2 h-2 rounded-full bg-signal-amber animate-ping" />
              )}
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Full macro-fleet health overview, SLA breach notifications, bulk geofencing, and automated service routing.
            </p>
          </button>

          {/* Persona 2: Field Technician */}
          <button
            onClick={() => setRole('FIELD_TECHNICIAN')}
            className={`p-4 rounded-xl border text-left transition-all ${
              role === 'FIELD_TECHNICIAN'
                ? 'bg-signal-amber/15 border-signal-amber text-slate-100 shadow-amber-glow'
                : 'bg-cockpit-850 border-cockpit-750 text-slate-300 hover:border-cockpit-600'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase text-signal-amber">
                Workshop Diagnostic Technician
              </span>
              {role === 'FIELD_TECHNICIAN' && (
                <span className="w-2 h-2 rounded-full bg-signal-amber animate-ping" />
              )}
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Deep diagnostic access, raw CAN bus hex logger, UDS service $22 routines, freeze frames, and actuator tests.
            </p>
          </button>

          {/* Persona 3: Vehicle Owner */}
          <button
            onClick={() => setRole('VEHICLE_OWNER')}
            className={`p-4 rounded-xl border text-left transition-all ${
              role === 'VEHICLE_OWNER'
                ? 'bg-signal-amber/15 border-signal-amber text-slate-100 shadow-amber-glow'
                : 'bg-cockpit-850 border-cockpit-750 text-slate-300 hover:border-cockpit-600'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase text-signal-amber">
                Vehicle Owner (Simplified Light)
              </span>
              {role === 'VEHICLE_OWNER' && (
                <span className="w-2 h-2 rounded-full bg-signal-amber animate-ping" />
              )}
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Consumer-friendly vehicle health rating, estimated range, preventative service reminders, and roadside token.
            </p>
          </button>
        </div>
      </div>

      {/* Role-Specific Specialized View Demonstration */}
      {role === 'VEHICLE_OWNER' ? (
        /* Owner View Mode */
        <div className="cockpit-panel rounded-xl p-6 space-y-4 border-t-2 border-t-telemetry-emerald">
          <div className="flex items-center justify-between pb-3 border-b border-cockpit-750">
            <div>
              <span className="text-[10px] text-telemetry-emerald font-bold tracking-widest uppercase">
                Owner Perspective: My Connected Vehicle
              </span>
              <h2 className="text-base font-bold text-slate-100">{selectedVehicle.name}</h2>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400">Overall Health Grade</span>
              <div className="text-2xl font-bold text-telemetry-emerald">96 / 100 (Grade A)</div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-cockpit-850 rounded-lg border border-cockpit-750">
              <span className="text-[10px] text-slate-500 uppercase">Estimated Driving Range</span>
              <div className="text-xl font-bold text-slate-200 mt-1">428 km</div>
              <span className="text-[10px] text-telemetry-emerald">Battery at {selectedVehicle.batterySOC.toFixed(0)}%</span>
            </div>
            <div className="p-4 bg-cockpit-850 rounded-lg border border-cockpit-750">
              <span className="text-[10px] text-slate-500 uppercase">Next Scheduled Inspection</span>
              <div className="text-xl font-bold text-slate-200 mt-1">In 42 Days</div>
              <span className="text-[10px] text-slate-400">Brake pad inspection</span>
            </div>
            <div className="p-4 bg-cockpit-850 rounded-lg border border-cockpit-750">
              <span className="text-[10px] text-slate-500 uppercase">Emergency Roadside Token</span>
              <div className="text-base font-mono font-bold text-signal-amber mt-1">SDV-SAFE-9921</div>
              <span className="text-[10px] text-slate-400">Encrypted live telemetry sharing</span>
            </div>
          </div>
        </div>
      ) : role === 'FIELD_TECHNICIAN' ? (
        /* Technician Mode */
        <div className="cockpit-panel rounded-xl p-6 space-y-4 border-t-2 border-t-signal-amber">
          <div className="flex items-center justify-between pb-3 border-b border-cockpit-750">
            <div>
              <span className="text-[10px] text-signal-amber font-bold tracking-widest uppercase">
                Diagnostic Specialist Mode
              </span>
              <h2 className="text-base font-bold text-slate-100">
                Bi-Directional Actuator & UDS Routine Tester
              </h2>
            </div>
            <span className="text-xs bg-signal-amber/15 text-signal-amber px-2.5 py-1 rounded border border-signal-amber/30 font-bold">
              ISO 14229 Security Level 0x01 Unlocked
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <button className="p-3 bg-cockpit-850 hover:bg-cockpit-750 rounded-lg border border-cockpit-700 text-left transition-colors">
              <div className="font-bold text-slate-200 mb-1">Actuate Inverter Coolant Pump</div>
              <div className="text-[10px] text-slate-400">Command 100% duty cycle for 30s to purge air bubbles.</div>
            </button>
            <button className="p-3 bg-cockpit-850 hover:bg-cockpit-750 rounded-lg border border-cockpit-700 text-left transition-colors">
              <div className="font-bold text-slate-200 mb-1">Equalize Battery Bricks (UDS $31)</div>
              <div className="text-[10px] text-slate-400">Trigger passive cell balancing bleed resistors on BMS.</div>
            </button>
            <button className="p-3 bg-cockpit-850 hover:bg-cockpit-750 rounded-lg border border-cockpit-700 text-left transition-colors">
              <div className="font-bold text-slate-200 mb-1">Cycle Thermostat Wax Heater</div>
              <div className="text-[10px] text-slate-400">Pulse 12V 1.5A to test electronic bypass valve motion.</div>
            </button>
          </div>
        </div>
      ) : null}

      {/* Hardware & Network Preferences Form */}
      <form onSubmit={handleSaveSettings} className="cockpit-panel rounded-xl p-5 space-y-4">
        <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-2 flex items-center gap-2">
          <CanBusIcon className="w-4 h-4 text-telemetry-cyan" />
          Hardware Bus & Telematics Protocol
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block text-slate-400 mb-1">CAN Bus Protocol & Baud Rate</label>
            <select
              value={baudRateProtocol}
              onChange={(e) => setBaudRateProtocol(e.target.value)}
              className="w-full bg-cockpit-850 border border-cockpit-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-signal-amber"
            >
              <option value="CAN_FD_500K_2M">ISO 11898-1:2015 CAN FD (500 kbps / 2.0 Mbps)</option>
              <option value="CLASSIC_CAN_500K">Classic CAN 2.0B (500 kbps)</option>
              <option value="DOIP_ISO13400">Diagnostics over IP (DoIP / ISO 13400-2 100BASE-T1)</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-400 mb-1">Theme Mode</label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setTheme('dark')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border text-xs font-bold ${
                  theme === 'dark'
                    ? 'bg-cockpit-800 border-signal-amber text-signal-amber shadow-amber-glow'
                    : 'bg-cockpit-850 border-cockpit-700 text-slate-400'
                }`}
              >
                <MoonIcon className="w-4 h-4" />
                Cockpit Slate (Dark)
              </button>
              <button
                type="button"
                onClick={() => setTheme('light')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border text-xs font-bold ${
                  theme === 'light'
                    ? 'bg-slate-100 border-signal-amber text-signal-amber shadow-amber-glow'
                    : 'bg-cockpit-850 border-cockpit-700 text-slate-400'
                }`}
              >
                <SunIcon className="w-4 h-4" />
                Technical Chalk (Light)
              </button>
            </div>
          </div>

          <div>
            <label className="block text-slate-400 mb-1">MQTT / Protobuf Cloud Webhook Endpoint</label>
            <input
              type="text"
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              className="w-full bg-cockpit-850 border border-cockpit-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-signal-amber"
            />
          </div>

          <div>
            <label className="block text-slate-400 mb-1">OEM Edge Telematics Secret API Key</label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full bg-cockpit-850 border border-cockpit-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-signal-amber"
            />
          </div>
        </div>

        <div className="pt-3 border-t border-cockpit-750 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">
            Encrypted with AES-256 GCM hardware security module (HSM).
          </span>

          <button
            type="submit"
            className="flex items-center gap-2 px-5 py-2 rounded-lg bg-signal-amber hover:bg-signal-amber-hover text-cockpit-950 font-bold text-xs uppercase tracking-wider shadow-amber-glow transition-all"
          >
            {savedSuccess ? (
              <>
                <CheckCircleIcon className="w-4 h-4" />
                Saved & Synchronized
              </>
            ) : (
              'Save Preferences'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
