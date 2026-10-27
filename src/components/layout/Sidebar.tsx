import React from 'react';
import { useAuthRole, NavigationTab } from '../../context/AuthRoleContext';
import { useTelemetry } from '../../context/TelemetryContext';
import {
  LayersIcon,
  CarIcon,
  TachometerIcon,
  BugFaultIcon,
  WeibullCurveIcon,
  AlertTriangleIcon,
  OscilloscopeIcon,
  SlidersIcon,
  ShieldCheckIcon,
  AlertOctagonIcon,
  FileTextIcon,
} from '../icons';

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, role } = useAuthRole();
  const { alerts, selectedVehicle, clearAllFaults } = useTelemetry();

  const unackAlertsCount = alerts.filter((a) => !a.acknowledged).length;
  const activeDtcCount = selectedVehicle.activeDtcs.length;

  const navItems: Array<{
    id: NavigationTab;
    label: string;
    sublabel: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: number;
    badgeColor?: string;
  }> = [
    {
      id: 'overview',
      label: 'System Overview',
      sublabel: 'SDV Architecture & Ingestion',
      icon: LayersIcon,
    },
    {
      id: 'fleet',
      label: 'Fleet Operations',
      sublabel: 'Connected Vehicle Grid',
      icon: CarIcon,
    },
    {
      id: 'cockpit',
      label: 'Live Telemetry Cockpit',
      sublabel: 'Real-time OBD-II & CAN-FD',
      icon: TachometerIcon,
    },
    {
      id: 'faults',
      label: 'Fault Detection & DTC',
      sublabel: 'SAE J2012 / ISO 14229',
      icon: BugFaultIcon,
      badge: activeDtcCount > 0 ? activeDtcCount : undefined,
      badgeColor: 'bg-telemetry-crimson text-white',
    },
    {
      id: 'predictive',
      label: 'Predictive Maintenance',
      sublabel: 'RUL Weibull Degradation',
      icon: WeibullCurveIcon,
    },
    {
      id: 'alerts',
      label: 'Alerts & Dispatch Center',
      sublabel: 'Telemetry Event Timeline',
      icon: AlertTriangleIcon,
      badge: unackAlertsCount > 0 ? unackAlertsCount : undefined,
      badgeColor: 'bg-signal-amber text-cockpit-950 font-bold',
    },
    {
      id: 'trends',
      label: 'Historical Analytics',
      sublabel: 'Time-Series Sensor Logs',
      icon: OscilloscopeIcon,
    },
    {
      id: 'settings',
      label: 'Settings & Role Views',
      sublabel: 'Technician vs Owner Mode',
      icon: SlidersIcon,
    },
    {
      id: 'presentation',
      label: 'Project Defense PPT',
      sublabel: '8-Slide Academic Deck',
      icon: FileTextIcon,
      badge: 8,
      badgeColor: 'bg-signal-amber/20 text-signal-amber border border-signal-amber/40',
    },
  ];

  return (
    <aside className="w-64 bg-cockpit-900 border-r border-cockpit-750 flex flex-col justify-between font-mono select-none">
      {/* Navigation List */}
      <div className="p-3 space-y-1 overflow-y-auto">
        <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">
          Diagnostic Modules
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-all ${
                isActive
                  ? 'bg-cockpit-800 text-slate-100 border-l-4 border-signal-amber shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-cockpit-850/60'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <Icon
                  className={`w-4 h-4 flex-shrink-0 ${
                    isActive ? 'text-signal-amber' : 'text-slate-400'
                  }`}
                />
                <div className="truncate">
                  <div
                    className={`text-xs font-semibold leading-tight ${
                      isActive ? 'text-slate-100' : 'text-slate-300'
                    }`}
                  >
                    {item.label}
                  </div>
                  <div className="text-[10px] text-slate-500 truncate">{item.sublabel}</div>
                </div>
              </div>

              {item.badge !== undefined && (
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ml-1 ${item.badgeColor}`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Selected Vehicle Health Footnote */}
      <div className="p-3 border-t border-cockpit-750 bg-cockpit-850/40">
        <div className="p-2.5 rounded-lg bg-cockpit-850 border border-cockpit-750 text-xs">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Active Unit</span>
            <span
              className={`w-2 h-2 rounded-full ${
                selectedVehicle.status === 'nominal'
                  ? 'bg-telemetry-emerald'
                  : selectedVehicle.status === 'warning'
                  ? 'bg-signal-amber'
                  : 'bg-telemetry-crimson animate-ping'
              }`}
            />
          </div>
          <div className="font-bold text-slate-200 truncate">{selectedVehicle.name}</div>
          <div className="text-[10px] text-slate-500 font-mono truncate">{selectedVehicle.vin}</div>

          <div className="mt-2 pt-2 border-t border-cockpit-750 flex items-center justify-between text-[10px]">
            <span className="text-slate-400">SOC: {selectedVehicle.batterySOC.toFixed(0)}%</span>
            <span className="text-slate-400">SOH: {selectedVehicle.batterySOH.toFixed(0)}%</span>
            <span
              className={`font-semibold ${
                selectedVehicle.activeDtcCount > 0
                  ? 'text-telemetry-crimson'
                  : 'text-telemetry-emerald'
              }`}
            >
              {selectedVehicle.activeDtcCount} DTCs
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
};
