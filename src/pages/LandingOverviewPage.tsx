import React from 'react';
import { useAuthRole } from '../context/AuthRoleContext';
import { useTelemetry } from '../context/TelemetryContext';
import {
  LayersIcon,
  CanBusIcon,
  CpuChipIcon,
  WifiStreamIcon,
  WeibullCurveIcon,
  ShieldCheckIcon,
  AlertTriangleIcon,
  WrenchIcon,
  ArrowUpRightIcon,
  ActivityIcon,
  ServerIcon,
  DatabaseIcon,
} from '../components/icons';
import { MetricCard } from '../components/common/MetricCard';

export const LandingOverviewPage: React.FC = () => {
  const { setActiveTab } = useAuthRole();
  const { vehicles } = useTelemetry();

  const totalVehicles = vehicles.length;
  const criticalCount = vehicles.filter((v) => v.status === 'critical').length;
  const warningCount = vehicles.filter((v) => v.status === 'warning').length;
  const healthyCount = vehicles.filter((v) => v.status === 'nominal').length;

  return (
    <div className="space-y-6 font-mono">
      {/* Top Banner / Hero */}
      <div className="cockpit-panel rounded-xl p-6 border-l-4 border-l-signal-amber tech-border-accent relative overflow-hidden">
        <div className="relative z-10 max-w-4xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-signal-amber uppercase tracking-wider mb-2">
            <span className="w-2 h-2 rounded-full bg-signal-amber animate-ping" />
            Software Defined Vehicle (SDV) Core Architecture
          </div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-100 tracking-tight font-sans">
            Next-Generation Remote Telemetry & Predictive Fleet Diagnostic Engine
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
            Eliminating catastrophic roadside component failures through edge anomaly detection, 
            high-frequency CAN-FD / ISO 14229 UDS telemetry ingestion, and continuous Weibull 
            Remaining Useful Life (RUL) health projections across mission-critical automotive subsystems.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveTab('cockpit')}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-signal-amber hover:bg-signal-amber-hover text-cockpit-950 font-bold text-xs uppercase tracking-wider shadow-amber-glow transition-all"
            >
              Launch Live Telemetry Cockpit
              <ArrowUpRightIcon className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveTab('predictive')}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cockpit-850 hover:bg-cockpit-750 text-slate-200 border border-cockpit-700 text-xs font-semibold transition-colors"
            >
              <WeibullCurveIcon className="w-4 h-4 text-telemetry-cyan" />
              View Predictive Degradation Models
            </button>
            <button
              onClick={() => setActiveTab('faults')}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cockpit-850 hover:bg-cockpit-750 text-slate-200 border border-cockpit-700 text-xs font-semibold transition-colors"
            >
              <WrenchIcon className="w-4 h-4 text-telemetry-emerald" />
              SAE J2012 Diagnostic Trees
            </button>
          </div>
        </div>

        {/* Subtle Watermark Grid Pattern */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none hidden md:flex items-center justify-center">
          <LayersIcon className="w-72 h-72 text-slate-100" />
        </div>
      </div>

      {/* Fleet Executive KPI Metric Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Monitored Fleet Nodes"
          value={totalVehicles}
          unit="Active SDVs"
          subValue={`${healthyCount} Nominal | ${warningCount} Warning | ${criticalCount} Critical`}
          icon={<ShieldCheckIcon className="w-4 h-4 text-telemetry-emerald" />}
          trend="stable"
          trendLabel="100% Ingestion Uptime"
          accentColor="emerald"
        />
        <MetricCard
          title="Early Anomaly Warning Lead Time"
          value="18.4"
          unit="Days Average"
          subValue="Before physical DTC trip"
          icon={<ActivityIcon className="w-4 h-4 text-telemetry-cyan" />}
          trend="up"
          trendLabel="+4.2 Days vs Baseline"
          accentColor="cyan"
        />
        <MetricCard
          title="Unscheduled Fleet Downtime"
          value="-42.6%"
          unit="Reduction"
          subValue="$1.84M estimated warranty savings"
          icon={<WeibullCurveIcon className="w-4 h-4 text-signal-amber" />}
          trend="down"
          trendLabel="ROI Positive at 120 Days"
          accentColor="amber"
        />
        <MetricCard
          title="Critical Active Faults"
          value={criticalCount}
          unit="Interventions"
          subValue={criticalCount > 0 ? 'Quantum GT & Inverter Alert' : 'All subsystems nominal'}
          icon={<AlertTriangleIcon className="w-4 h-4 text-telemetry-crimson" />}
          trend={criticalCount > 0 ? 'critical' : 'stable'}
          trendLabel={criticalCount > 0 ? 'Action Required' : 'Nominal'}
          accentColor={criticalCount > 0 ? 'crimson' : 'none'}
        />
      </div>

      {/* High-Level SDV End-to-End Architecture Diagram */}
      <div className="cockpit-panel rounded-xl p-5">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-cockpit-750">
          <div>
            <span className="text-[10px] text-telemetry-cyan font-bold tracking-widest uppercase">
              System Pipeline Visualizer
            </span>
            <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
              SDV Cloud-Native Telemetry Ingestion & Diagnostic Pipeline
            </h2>
          </div>
          <div className="text-xs text-slate-400">
            Protocols: <span className="text-slate-200">ISO 11898 | ISO 14229 UDS | MQTT 5.0 TLS</span>
          </div>
        </div>

        {/* 5-Stage Interactive Pipeline Visual */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
          {/* Stage 1: In-Vehicle Sensors */}
          <div className="p-3.5 bg-cockpit-850 rounded-lg border border-cockpit-750 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] bg-cockpit-800 text-slate-400 px-1.5 py-0.5 rounded border border-cockpit-700">
                  STAGE 01
                </span>
                <CanBusIcon className="w-4 h-4 text-signal-amber" />
              </div>
              <h3 className="text-xs font-bold text-slate-200 uppercase">In-Vehicle Sensors & ECUs</h3>
              <p className="text-[11px] text-slate-400 mt-1">
                Powertrain (PCM), BMS, Inverter, TPMS, and ABS sensors broadcasting on dual CAN-FD buses at 2 Mbps.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-cockpit-750 text-[10px] text-slate-400">
              Rate: <strong className="text-signal-amber">100Hz - 1kHz</strong>
            </div>
          </div>

          {/* Stage 2: Gateway HPC & Edge Anomaly Model */}
          <div className="p-3.5 bg-cockpit-850 rounded-lg border border-cockpit-750 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] bg-cockpit-800 text-slate-400 px-1.5 py-0.5 rounded border border-cockpit-700">
                  STAGE 02
                </span>
                <CpuChipIcon className="w-4 h-4 text-telemetry-cyan" />
              </div>
              <h3 className="text-xs font-bold text-slate-200 uppercase">Edge Gateway HPC / T-Box</h3>
              <p className="text-[11px] text-slate-400 mt-1">
                Zonal controller aggregates frames, performs edge FFT vibration analysis & micro-freeze frame triggers.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-cockpit-750 text-[10px] text-slate-400">
              Latency: <strong className="text-telemetry-cyan">&lt; 5 ms edge</strong>
            </div>
          </div>

          {/* Stage 3: Cloud Telemetry Ingestion */}
          <div className="p-3.5 bg-cockpit-850 rounded-lg border border-cockpit-750 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] bg-cockpit-800 text-slate-400 px-1.5 py-0.5 rounded border border-cockpit-700">
                  STAGE 03
                </span>
                <WifiStreamIcon className="w-4 h-4 text-telemetry-emerald" />
              </div>
              <h3 className="text-xs font-bold text-slate-200 uppercase">Cloud Ingestion Broker</h3>
              <p className="text-[11px] text-slate-400 mt-1">
                Protobuf compressed telemetry serialized over mTLS MQTT broker to Kafka streaming clusters.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-cockpit-750 text-[10px] text-slate-400">
              Throughput: <strong className="text-telemetry-emerald">250k msgs/s</strong>
            </div>
          </div>

          {/* Stage 4: Predictive AI & Digital Twin */}
          <div className="p-3.5 bg-cockpit-850 rounded-lg border border-cockpit-750 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] bg-cockpit-800 text-slate-400 px-1.5 py-0.5 rounded border border-cockpit-700">
                  STAGE 04
                </span>
                <WeibullCurveIcon className="w-4 h-4 text-signal-amber" />
              </div>
              <h3 className="text-xs font-bold text-slate-200 uppercase">Predictive Engine & Twin</h3>
              <p className="text-[11px] text-slate-400 mt-1">
                Weibull survival models compute component RUL, detect thermal runaway drift, and flag early wear.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-cockpit-750 text-[10px] text-slate-400">
              Inference: <strong className="text-signal-amber">Continuous RUL</strong>
            </div>
          </div>

          {/* Stage 5: Fleet Ops & OEM Dispatch */}
          <div className="p-3.5 bg-cockpit-850 rounded-lg border border-cockpit-750 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] bg-cockpit-800 text-slate-400 px-1.5 py-0.5 rounded border border-cockpit-700">
                  STAGE 05
                </span>
                <WrenchIcon className="w-4 h-4 text-telemetry-sky" />
              </div>
              <h3 className="text-xs font-bold text-slate-200 uppercase">Service & Fleet Console</h3>
              <p className="text-[11px] text-slate-400 mt-1">
                Generates OEM work orders, schedules maintenance windows, and dispatches field technician teams.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-cockpit-750 text-[10px] text-slate-400">
              Action: <strong className="text-telemetry-sky">Automated WO</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Comparative Analysis: Traditional Reactive vs SDV Predictive */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Traditional Legacy */}
        <div className="cockpit-panel rounded-xl p-5 border-t-2 border-t-telemetry-crimson/70">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold text-telemetry-crimson bg-telemetry-crimson/15 px-2 py-0.5 rounded border border-telemetry-crimson/30">
              LEGACY PARADIGM
            </span>
            <h3 className="text-xs font-bold text-slate-200 uppercase">Traditional Reactive Maintenance</h3>
          </div>
          <ul className="space-y-2.5 text-xs text-slate-400">
            <li className="flex items-start gap-2">
              <span className="text-telemetry-crimson font-bold">✕</span>
              <span>Faults only identified AFTER vehicle breakdown on road or MIL lamp dashboard illumination.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-telemetry-crimson font-bold">✕</span>
              <span>Fixed time/mileage service intervals lead to either premature parts replacement or overdue failures.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-telemetry-crimson font-bold">✕</span>
              <span>Diagnostic freeze frames require physical workshop visit and manual OBD-II dongle connection.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-telemetry-crimson font-bold">✕</span>
              <span>High secondary damage costs (e.g. blown inverter destroys motor windings).</span>
            </li>
          </ul>
        </div>

        {/* SDV Predictive Architecture */}
        <div className="cockpit-panel rounded-xl p-5 border-t-2 border-t-telemetry-emerald/70">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold text-telemetry-emerald bg-telemetry-emerald/15 px-2 py-0.5 rounded border border-telemetry-emerald/30">
              SDV PLATFORM ADVANTAGE
            </span>
            <h3 className="text-xs font-bold text-slate-200 uppercase">Continuous Telemetry & Predictive AI</h3>
          </div>
          <ul className="space-y-2.5 text-xs text-slate-300">
            <li className="flex items-start gap-2">
              <span className="text-telemetry-emerald font-bold">✓</span>
              <span>Sub-millisecond CAN-FD telemetry continuously streams to digital twin algorithms.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-telemetry-emerald font-bold">✓</span>
              <span>Weibull Remaining Useful Life (RUL) projections schedule parts replacement at optimal wear.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-telemetry-emerald font-bold">✓</span>
              <span>Autonomous remote freeze frame capture saves full sensor context at exact millisecond of anomaly.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-telemetry-emerald font-bold">✓</span>
              <span>Automated OEM work orders with pre-filled parts catalog and technician step checklists.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
