import React from 'react';
import { useTelemetry } from '../context/TelemetryContext';
import { useAuthRole } from '../context/AuthRoleContext';
import {
  CarIcon,
  TachometerIcon,
  SpeedometerIcon,
  BatteryBoltIcon,
  ThermometerIcon,
  WrenchIcon,
  BugFaultIcon,
  SatelliteGpsIcon,
  ActivityIcon,
} from '../components/icons';
import { StatusChip } from '../components/common/StatusChip';
import { TechnicalBadge } from '../components/common/TechnicalBadge';
import { MetricCard } from '../components/common/MetricCard';
import { CircularTachometer } from '../components/gauges/CircularTachometer';
import { CircularSpeedometer } from '../components/gauges/CircularSpeedometer';
import { RadialBatteryGauge } from '../components/gauges/RadialBatteryGauge';
import { ThermalBarometer } from '../components/gauges/ThermalBarometer';
import { TPMSSensorGrid } from '../components/gauges/TPMSSensorGrid';
import { DrivingProfileSelector } from '../components/simulation/DrivingProfileSelector';
import { LiveCANStreamViewer } from '../components/simulation/LiveCANStreamViewer';

export const VehicleDetailPage: React.FC = () => {
  const { selectedVehicle, activeFaultId } = useTelemetry();
  const { setActiveTab } = useAuthRole();

  const tel = selectedVehicle.liveTelemetry;
  const hasFault = selectedVehicle.status === 'critical' || selectedVehicle.activeDtcs.length > 0;

  return (
    <div className="space-y-5 font-mono">
      {/* Vehicle Identity Header Banner */}
      <div className="cockpit-panel rounded-xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 border-l-4 border-l-signal-amber">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest bg-cockpit-850 px-2 py-0.5 rounded border border-cockpit-750">
              {selectedVehicle.id}
            </span>
            <h1 className="text-lg sm:text-xl font-bold text-slate-100 font-sans">
              {selectedVehicle.name}
            </h1>
            <StatusChip status={selectedVehicle.status} size="md" />
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 pt-1">
            <TechnicalBadge label="VIN" value={selectedVehicle.vin} variant="amber" />
            <TechnicalBadge label="TYPE" value={selectedVehicle.type} variant="cyan" />
            <TechnicalBadge label="FW" value={selectedVehicle.firmwareVersion} variant="slate" />
            <span className="flex items-center gap-1 text-slate-400 truncate">
              <SatelliteGpsIcon className="w-3.5 h-3.5 text-slate-500" />
              {selectedVehicle.locationName}
            </span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-2">
          {selectedVehicle.activeDtcCount > 0 && (
            <button
              onClick={() => setActiveTab('faults')}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-telemetry-crimson hover:bg-red-600 text-white text-xs font-bold uppercase tracking-wider shadow-critical-glow transition-all animate-pulse"
            >
              <BugFaultIcon className="w-4 h-4" />
              {selectedVehicle.activeDtcCount} DTC Active — Analyze
            </button>
          )}

          <button
            onClick={() => setActiveTab('predictive')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-cockpit-850 hover:bg-cockpit-750 text-slate-200 border border-cockpit-700 text-xs font-semibold transition-colors"
          >
            <WrenchIcon className="w-4 h-4 text-signal-amber" />
            RUL Degradation
          </button>
        </div>
      </div>

      {/* Primary Cockpit Gauge Array */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Gauge 1: Tachometer */}
        <div className="cockpit-panel rounded-xl p-4 flex flex-col items-center justify-between">
          <div className="w-full flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="flex items-center gap-1 font-semibold uppercase">
              <TachometerIcon className="w-4 h-4 text-telemetry-cyan" />
              Shaft Commutation RPM
            </span>
            <span className="text-[10px] text-slate-500">PID 0x0C (OBD-II)</span>
          </div>
          <CircularTachometer
            rpm={tel.rpm}
            hasFault={hasFault}
            sublabel={`${tel.motorPowerKw.toFixed(1)} kW Output`}
          />
        </div>

        {/* Gauge 2: Speedometer */}
        <div className="cockpit-panel rounded-xl p-4 flex flex-col items-center justify-between">
          <div className="w-full flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="flex items-center gap-1 font-semibold uppercase">
              <SpeedometerIcon className="w-4 h-4 text-signal-amber" />
              Vehicle Velocity
            </span>
            <span className="text-[10px] text-slate-500">PID 0x0D (OBD-II)</span>
          </div>
          <CircularSpeedometer
            speed={tel.speedKmh}
            regenKw={tel.regenKw}
            sublabel={`Throttle: ${tel.throttlePosPct}%`}
          />
        </div>

        {/* Gauge 3: Battery Energy & Voltage */}
        <div className="cockpit-panel rounded-xl p-4 flex flex-col items-center justify-between">
          <div className="w-full flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="flex items-center gap-1 font-semibold uppercase">
              <BatteryBoltIcon className="w-4 h-4 text-signal-amber" />
              Traction Battery State
            </span>
            <span className="text-[10px] text-slate-500">BMS 800V DC Bus</span>
          </div>
          <RadialBatteryGauge
            soc={tel.batterySOC}
            soh={tel.batterySOH}
            voltage={tel.batteryVoltageV}
            currentA={tel.packCurrentA}
          />
        </div>
      </div>

      {/* Secondary Sensor Stack: Thermal Loops + TPMS Wheels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="cockpit-panel rounded-xl p-4">
          <ThermalBarometer
            coolantTempC={tel.coolantTempC}
            inverterTempC={tel.inverterTempC}
            ambientTempC={tel.ambientTempC}
          />
        </div>
        <div className="cockpit-panel rounded-xl p-4">
          <TPMSSensorGrid tpms={tel.tpms} />
        </div>
      </div>

      {/* Sensor Numerical Readout Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-3 bg-cockpit-850 rounded-lg border border-cockpit-750">
          <span className="text-[10px] text-slate-500 uppercase font-semibold">Throttle Cmd</span>
          <div className="text-base font-bold text-slate-200 mt-1">{tel.throttlePosPct}%</div>
          <span className="text-[9px] text-slate-500">Hall Sensor Dual</span>
        </div>
        <div className="p-3 bg-cockpit-850 rounded-lg border border-cockpit-750">
          <span className="text-[10px] text-slate-500 uppercase font-semibold">Brake Pressure</span>
          <div className="text-base font-bold text-slate-200 mt-1">{tel.brakePressureBar.toFixed(1)} bar</div>
          <span className="text-[9px] text-slate-500">Hydraulic Line</span>
        </div>
        <div className="p-3 bg-cockpit-850 rounded-lg border border-cockpit-750">
          <span className="text-[10px] text-slate-500 uppercase font-semibold">Steering Angle</span>
          <div className="text-base font-bold text-slate-200 mt-1">{tel.steeringAngleDeg.toFixed(1)}°</div>
          <span className="text-[9px] text-slate-500">Rack Position</span>
        </div>
        <div className="p-3 bg-cockpit-850 rounded-lg border border-cockpit-750">
          <span className="text-[10px] text-slate-500 uppercase font-semibold">Motor Power</span>
          <div className="text-base font-bold text-signal-amber mt-1">{tel.motorPowerKw.toFixed(1)} kW</div>
          <span className="text-[9px] text-slate-500">Instant Draw</span>
        </div>
        <div className="p-3 bg-cockpit-850 rounded-lg border border-cockpit-750">
          <span className="text-[10px] text-slate-500 uppercase font-semibold">Pack Current</span>
          <div className="text-base font-bold text-telemetry-cyan mt-1">{tel.packCurrentA.toFixed(1)} A</div>
          <span className="text-[9px] text-slate-500">Continuous</span>
        </div>
        <div className="p-3 bg-cockpit-850 rounded-lg border border-cockpit-750">
          <span className="text-[10px] text-slate-500 uppercase font-semibold">Regen Rate</span>
          <div className="text-base font-bold text-telemetry-emerald mt-1">+{tel.regenKw.toFixed(1)} kW</div>
          <span className="text-[9px] text-slate-500">Kinetic Recovery</span>
        </div>
      </div>

      {/* Physics Profile Selector */}
      <DrivingProfileSelector />

      {/* Live Raw CAN Stream Inspector */}
      <LiveCANStreamViewer />
    </div>
  );
};
