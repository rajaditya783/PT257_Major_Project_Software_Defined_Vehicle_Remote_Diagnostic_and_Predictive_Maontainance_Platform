import React, { useState } from 'react';
import { useTelemetry } from '../context/TelemetryContext';
import { useAuthRole } from '../context/AuthRoleContext';
import { PowertrainType, HealthStatus, Vehicle } from '../types/telemetry';
import {
  CarIcon,
  SearchIcon,
  FilterIcon,
  SatelliteGpsIcon,
  BatteryBoltIcon,
  SpeedometerIcon,
  ArrowUpRightIcon,
  BugFaultIcon,
  ShieldCheckIcon,
  AlertTriangleIcon,
} from '../components/icons';
import { StatusChip } from '../components/common/StatusChip';
import { MiniSparkline } from '../components/gauges/MiniSparkline';
import { formatRelativeTime } from '../utils/formatting';

export const FleetDashboardPage: React.FC = () => {
  const { vehicles, setSelectedVehicleId } = useTelemetry();
  const { setActiveTab } = useAuthRole();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [typeFilter, setTypeFilter] = useState<string>('ALL');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const filteredVehicles = vehicles.filter((v) => {
    const matchesSearch =
      v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.vin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.locationName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || v.status === statusFilter;
    const matchesType = typeFilter === 'ALL' || v.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  const handleSelectVehicle = (vehicleId: string) => {
    setSelectedVehicleId(vehicleId);
    setActiveTab('cockpit');
  };

  return (
    <div className="space-y-5 font-mono">
      {/* Top Filter & Search Bar */}
      <div className="cockpit-panel rounded-xl p-4 flex flex-wrap items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-[240px]">
          <SearchIcon className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by VIN, Model Name, Depot, or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-cockpit-850 border border-cockpit-700 rounded-lg pl-9 pr-4 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-signal-amber"
          />
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* Status Filter */}
          <div className="flex items-center gap-1">
            <span className="text-[11px] text-slate-400">Health:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-cockpit-850 border border-cockpit-700 text-slate-200 rounded px-2 py-1 text-xs focus:outline-none focus:border-signal-amber"
            >
              <option value="ALL">All States</option>
              <option value="nominal">Nominal (Healthy)</option>
              <option value="warning">Warning / Degradation</option>
              <option value="critical">Critical / DTC Active</option>
            </select>
          </div>

          {/* Powertrain Filter */}
          <div className="flex items-center gap-1">
            <span className="text-[11px] text-slate-400">Powertrain:</span>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="bg-cockpit-850 border border-cockpit-700 text-slate-200 rounded px-2 py-1 text-xs focus:outline-none focus:border-signal-amber"
            >
              <option value="ALL">All Types</option>
              <option value="BEV">Pure EV (BEV)</option>
              <option value="COMMERCIAL_EV">Commercial EV</option>
              <option value="PHEV">Plug-in Hybrid</option>
              <option value="ICE">Combustion (ICE)</option>
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex bg-cockpit-850 p-0.5 rounded border border-cockpit-700">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                viewMode === 'grid' ? 'bg-signal-amber text-cockpit-950' : 'text-slate-400'
              }`}
            >
              GRID
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                viewMode === 'table' ? 'bg-signal-amber text-cockpit-950' : 'text-slate-400'
              }`}
            >
              TABLE
            </button>
          </div>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {filteredVehicles.map((veh) => {
            const isCrit = veh.status === 'critical';
            const isWarn = veh.status === 'warning';

            return (
              <div
                key={veh.id}
                className={`cockpit-panel rounded-xl p-4 flex flex-col justify-between transition-all duration-200 hover:border-cockpit-500 hover:shadow-lg ${
                  isCrit
                    ? 'border-telemetry-crimson/50 shadow-critical-glow'
                    : isWarn
                    ? 'border-signal-amber/40 shadow-amber-glow'
                    : ''
                }`}
              >
                {/* Header */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-cockpit-850 px-2 py-0.5 rounded border border-cockpit-750">
                      {veh.type}
                    </span>
                    <StatusChip status={veh.status} size="sm" />
                  </div>

                  <h3 className="text-sm font-bold text-slate-100 font-sans truncate">
                    {veh.name}
                  </h3>
                  <div className="text-[11px] text-signal-amber font-mono mt-0.5">
                    {veh.vin}
                  </div>
                  <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-1 truncate">
                    <SatelliteGpsIcon className="w-3 h-3 text-slate-500 flex-shrink-0" />
                    <span className="truncate">{veh.locationName}</span>
                  </div>
                </div>

                {/* Live Telemetry Readings & Mini Sparkline */}
                <div className="my-3 py-2.5 border-y border-cockpit-750/70 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 flex items-center gap-1">
                      <SpeedometerIcon className="w-3.5 h-3.5 text-signal-amber" />
                      Speed:
                    </span>
                    <span className="font-bold text-slate-200">
                      {veh.liveTelemetry.speedKmh.toFixed(0)} km/h
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 flex items-center gap-1">
                      <BatteryBoltIcon className="w-3.5 h-3.5 text-telemetry-cyan" />
                      SOC / SOH:
                    </span>
                    <span className="font-bold text-slate-200">
                      {veh.batterySOC.toFixed(0)}% <span className="text-slate-500">|</span> {veh.batterySOH.toFixed(0)}%
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Coolant Temp:</span>
                    <span
                      className={`font-bold ${
                        veh.liveTelemetry.coolantTempC >= 100
                          ? 'text-telemetry-crimson'
                          : veh.liveTelemetry.coolantTempC >= 95
                          ? 'text-signal-amber'
                          : 'text-slate-200'
                      }`}
                    >
                      {veh.liveTelemetry.coolantTempC.toFixed(1)} °C
                    </span>
                  </div>

                  {/* Dynamic Sparkline Simulation */}
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[10px] text-slate-500">Load Profile:</span>
                    <MiniSparkline
                      data={[
                        veh.liveTelemetry.speedKmh * 0.8,
                        veh.liveTelemetry.speedKmh * 0.95,
                        veh.liveTelemetry.speedKmh * 1.05,
                        veh.liveTelemetry.speedKmh * 0.9,
                        veh.liveTelemetry.speedKmh,
                      ]}
                      color={isCrit ? 'crimson' : isWarn ? 'amber' : 'cyan'}
                      width={90}
                      height={20}
                    />
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-1">
                    {veh.activeDtcCount > 0 ? (
                      <span className="text-[10px] font-bold text-telemetry-crimson bg-telemetry-crimson/15 px-1.5 py-0.5 rounded border border-telemetry-crimson/30">
                        {veh.activeDtcCount} DTC ACTIVE
                      </span>
                    ) : (
                      <span className="text-[10px] text-telemetry-emerald font-semibold">
                        0 Active Faults
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => handleSelectVehicle(veh.id)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded bg-cockpit-800 hover:bg-signal-amber hover:text-cockpit-950 text-slate-200 text-xs font-semibold border border-cockpit-700 transition-colors"
                  >
                    Cockpit
                    <ArrowUpRightIcon className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Table View */
        <div className="cockpit-panel rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-[10px] uppercase text-slate-400 bg-cockpit-850 border-b border-cockpit-750">
                <tr>
                  <th className="py-3 px-4">Vehicle / Model</th>
                  <th className="py-3 px-3">VIN</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3">Powertrain</th>
                  <th className="py-3 px-3">Speed</th>
                  <th className="py-3 px-3">SOC / SOH</th>
                  <th className="py-3 px-3">Coolant</th>
                  <th className="py-3 px-3">DTCs</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cockpit-800">
                {filteredVehicles.map((veh) => (
                  <tr key={veh.id} className="hover:bg-cockpit-850/50 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-100">{veh.name}</td>
                    <td className="py-3 px-3 font-mono text-signal-amber">{veh.vin}</td>
                    <td className="py-3 px-3">
                      <StatusChip status={veh.status} size="sm" />
                    </td>
                    <td className="py-3 px-3 text-slate-300">{veh.type}</td>
                    <td className="py-3 px-3 font-semibold text-slate-200">
                      {veh.liveTelemetry.speedKmh.toFixed(0)} km/h
                    </td>
                    <td className="py-3 px-3 text-slate-300">
                      {veh.batterySOC.toFixed(0)}% / {veh.batterySOH.toFixed(0)}%
                    </td>
                    <td className="py-3 px-3 font-semibold text-slate-200">
                      {veh.liveTelemetry.coolantTempC.toFixed(1)} °C
                    </td>
                    <td className="py-3 px-3">
                      {veh.activeDtcCount > 0 ? (
                        <span className="text-telemetry-crimson font-bold">
                          {veh.activeDtcCount} DTC
                        </span>
                      ) : (
                        <span className="text-telemetry-emerald">0</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => handleSelectVehicle(veh.id)}
                        className="px-2.5 py-1 rounded bg-cockpit-800 hover:bg-signal-amber hover:text-cockpit-950 text-slate-200 text-xs font-semibold border border-cockpit-700 transition-colors"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
