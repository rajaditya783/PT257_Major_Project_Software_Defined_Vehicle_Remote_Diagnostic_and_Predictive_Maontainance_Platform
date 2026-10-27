import React, { useState } from 'react';
import { useTelemetry } from '../context/TelemetryContext';
import { ComponentRUL } from '../types/telemetry';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ReferenceLine,
} from 'recharts';
import {
  WeibullCurveIcon,
  ShieldCheckIcon,
  AlertTriangleIcon,
  AlertOctagonIcon,
  WrenchIcon,
  FileTextIcon,
  ActivityIcon,
} from '../components/icons';
import { WorkOrderModal } from '../components/diagnostic/WorkOrderModal';

export const PredictiveMaintPage: React.FC = () => {
  const { selectedVehicle } = useTelemetry();
  const [selectedComponent, setSelectedComponent] = useState<ComponentRUL>(
    selectedVehicle.components[0] || {
      id: 'CMP-01',
      name: 'HV Traction Battery Pack (800V)',
      subsystem: 'Energy Storage System',
      healthScore: 96,
      predictedRULDays: 1420,
      predictedRULKm: 185000,
      currentWearMetric: '3.8% Capacity Fade',
      thresholdLimit: '20.0% Degradation Threshold',
      failureRisk: 'LOW',
      weibullTrend: [],
    }
  );

  const [isWorkOrderOpen, setIsWorkOrderOpen] = useState(false);

  const components = selectedVehicle.components;

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'CRITICAL':
        return 'text-telemetry-crimson bg-telemetry-crimson/15 border-telemetry-crimson/40';
      case 'HIGH':
        return 'text-signal-amber bg-signal-amber/15 border-signal-amber/40';
      case 'MODERATE':
        return 'text-telemetry-cyan bg-telemetry-cyan/15 border-telemetry-cyan/40';
      default:
        return 'text-telemetry-emerald bg-telemetry-emerald/15 border-telemetry-emerald/40';
    }
  };

  return (
    <div className="space-y-5 font-mono">
      {/* Top Banner */}
      <div className="cockpit-panel rounded-xl p-5 flex flex-wrap items-center justify-between gap-4 border-l-4 border-l-signal-amber">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-signal-amber uppercase tracking-wider mb-1">
            <WeibullCurveIcon className="w-4 h-4" />
            Remaining Useful Life (RUL) & Weibull Degradation Engine
          </div>
          <h1 className="text-lg sm:text-xl font-bold text-slate-100 font-sans">
            Predictive Component Health Matrix for {selectedVehicle.name}
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Continuous Bayesian regression mapping physical sensor fatigue against fleet failure curves.
          </p>
        </div>

        <button
          onClick={() => setIsWorkOrderOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-signal-amber hover:bg-signal-amber-hover text-cockpit-950 font-bold text-xs uppercase tracking-wider shadow-amber-glow transition-all"
        >
          <FileTextIcon className="w-4 h-4" />
          Schedule Preventative Service
        </button>
      </div>

      {/* Component Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {components.map((comp) => {
          const isSelected = selectedComponent.id === comp.id;
          const isCrit = comp.failureRisk === 'CRITICAL';
          const isHigh = comp.failureRisk === 'HIGH';

          return (
            <div
              key={comp.id}
              onClick={() => setSelectedComponent(comp)}
              className={`cockpit-panel rounded-xl p-4 cursor-pointer transition-all ${
                isSelected
                  ? 'border-signal-amber shadow-amber-glow bg-cockpit-850'
                  : 'hover:border-cockpit-600'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] text-slate-500 uppercase">{comp.subsystem}</span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${getRiskColor(
                    comp.failureRisk
                  )}`}
                >
                  {comp.failureRisk} Risk
                </span>
              </div>

              <h3 className="text-xs font-bold text-slate-100 font-sans mb-3 line-clamp-1">
                {comp.name}
              </h3>

              <div className="space-y-2 text-xs">
                {/* Health Score Bar */}
                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-slate-400">Health Index</span>
                    <span
                      className={`font-bold ${
                        comp.healthScore < 40
                          ? 'text-telemetry-crimson'
                          : comp.healthScore < 75
                          ? 'text-signal-amber'
                          : 'text-telemetry-emerald'
                      }`}
                    >
                      {comp.healthScore}%
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-cockpit-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        comp.healthScore < 40
                          ? 'bg-telemetry-crimson'
                          : comp.healthScore < 75
                          ? 'bg-signal-amber'
                          : 'bg-telemetry-emerald'
                      }`}
                      style={{ width: `${comp.healthScore}%` }}
                    />
                  </div>
                </div>

                <div className="pt-2 border-t border-cockpit-750/70 flex justify-between text-[11px]">
                  <span className="text-slate-400">Predicted RUL:</span>
                  <span className="font-bold text-slate-200">
                    {comp.predictedRULDays} Days ({comp.predictedRULKm.toLocaleString()} km)
                  </span>
                </div>

                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>Current Metric:</span>
                  <span className="text-slate-300 font-semibold">{comp.currentWearMetric}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Component Degradation Trend Chart */}
      <div className="cockpit-panel rounded-xl p-5">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-cockpit-750">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-signal-amber bg-signal-amber/20 px-2 py-0.5 rounded border border-signal-amber/40">
                ACTIVE WEIBULL MODEL
              </span>
              <h2 className="text-sm font-bold text-slate-100 font-sans uppercase">
                {selectedComponent.name} — Degradation & Failure Forecast
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Threshold Limit: <span className="text-slate-200">{selectedComponent.thresholdLimit}</span> | Subsystem: {selectedComponent.subsystem}
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <div className="p-2 bg-cockpit-850 rounded border border-cockpit-750 text-right">
              <span className="text-[10px] text-slate-500">Remaining Life</span>
              <div className="font-bold text-signal-amber">
                {selectedComponent.predictedRULDays} Days / {selectedComponent.predictedRULKm.toLocaleString()} km
              </div>
            </div>
          </div>
        </div>

        {/* Recharts Degradation Curve */}
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={selectedComponent.weibullTrend}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#2A3344" />
              <XAxis dataKey="milestone" stroke="#5E6D8A" tick={{ fill: '#8E9BB0', fontSize: 11 }} />
              <YAxis
                domain={[0, 100]}
                stroke="#5E6D8A"
                tick={{ fill: '#8E9BB0', fontSize: 11 }}
                unit="%"
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#13171F',
                  borderColor: '#2A3344',
                  borderRadius: '8px',
                  color: '#F4F6F9',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '11px',
                }}
              />
              <Legend
                wrapperStyle={{
                  paddingTop: '10px',
                  fontSize: '11px',
                  fontFamily: 'JetBrains Mono, monospace',
                }}
              />
              <ReferenceLine
                y={40}
                label={{ value: 'Critical Wear Boundary (40%)', fill: '#FF3B30', fontSize: 10 }}
                stroke="#FF3B30"
                strokeDasharray="4 4"
              />
              <Line
                type="monotone"
                dataKey="nominalBaseline"
                name="Nominal Fleet Baseline (%)"
                stroke="#5E6D8A"
                strokeWidth={2}
                dot={{ fill: '#5E6D8A', r: 3 }}
              />
              <Line
                type="monotone"
                dataKey="observedWear"
                name="Observed & Projected Health (%)"
                stroke={selectedComponent.healthScore < 50 ? '#FF3B30' : '#FF9E1B'}
                strokeWidth={3}
                dot={{ fill: '#FF9E1B', r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Explanatory Footnote */}
        <div className="mt-4 pt-3 border-t border-cockpit-750 flex flex-wrap items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <ActivityIcon className="w-4 h-4 text-telemetry-cyan" />
            <span>
              Model: Continuous 2-Parameter Weibull CDF with Maximum Likelihood Estimation (MLE).
            </span>
          </div>
          <span className="text-slate-500">Confidence Interval: 99.2% (p &lt; 0.001)</span>
        </div>
      </div>

      <WorkOrderModal
        vehicle={selectedVehicle}
        isOpen={isWorkOrderOpen}
        onClose={() => setIsWorkOrderOpen(false)}
      />
    </div>
  );
};
