import React, { useState } from 'react';
import { useTelemetry } from '../context/TelemetryContext';
import { useAuthRole } from '../context/AuthRoleContext';
import { AlertSeverity, AlertItem } from '../types/telemetry';
import {
  AlertTriangleIcon,
  AlertOctagonIcon,
  ShieldCheckIcon,
  CheckCircleIcon,
  CarIcon,
  WrenchIcon,
  ClockIcon,
  FilterIcon,
  ArrowUpRightIcon,
} from '../components/icons';
import { StatusChip } from '../components/common/StatusChip';
import { formatRelativeTime } from '../utils/formatting';

export const AlertsCenterPage: React.FC = () => {
  const { alerts, acknowledgeAlert, setSelectedVehicleId } = useTelemetry();
  const { setActiveTab } = useAuthRole();

  const [severityFilter, setSeverityFilter] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<string>('ALL'); // 'ALL' | 'UNACK' | 'ACK'

  const filteredAlerts = alerts.filter((alt) => {
    const matchesSev = severityFilter === 'ALL' || alt.severity === severityFilter;
    const matchesAck =
      statusFilter === 'ALL' ||
      (statusFilter === 'UNACK' && !alt.acknowledged) ||
      (statusFilter === 'ACK' && alt.acknowledged);
    return matchesSev && matchesAck;
  });

  const unackCount = alerts.filter((a) => !a.acknowledged).length;
  const criticalCount = alerts.filter((a) => a.severity === 'CRITICAL').length;

  const handleInspectVehicle = (vehicleId: string) => {
    setSelectedVehicleId(vehicleId);
    setActiveTab('cockpit');
  };

  return (
    <div className="space-y-5 font-mono">
      {/* Top Banner */}
      <div className="cockpit-panel rounded-xl p-5 flex flex-wrap items-center justify-between gap-4 border-l-4 border-l-signal-amber">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-signal-amber uppercase tracking-wider mb-1">
            <AlertTriangleIcon className="w-4 h-4" />
            Centralized Telemetry Event & Diagnostic Incident Stream
          </div>
          <h1 className="text-lg sm:text-xl font-bold text-slate-100 font-sans">
            Fleet Safety, DTC Triggers & Anomaly Notifications
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time event timeline captured from edge ECU telemetry breaches and cloud inference alarms.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-cockpit-850 rounded-lg border border-cockpit-750 text-right">
            <span className="text-[10px] text-slate-500 uppercase">Pending Review</span>
            <div className="text-base font-bold text-signal-amber">{unackCount} Unacknowledged</div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="cockpit-panel rounded-xl p-4 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <FilterIcon className="w-4 h-4 text-slate-400" />
          <span className="text-slate-400 font-semibold">Filter Timeline:</span>

          {/* Severity */}
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="bg-cockpit-850 border border-cockpit-700 text-slate-200 rounded px-2.5 py-1 text-xs focus:outline-none focus:border-signal-amber"
          >
            <option value="ALL">All Severities</option>
            <option value="CRITICAL">Critical ({criticalCount})</option>
            <option value="WARNING">Warning</option>
            <option value="ADVISORY">Advisory</option>
            <option value="SYSTEM">System</option>
          </select>

          {/* Acknowledged */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-cockpit-850 border border-cockpit-700 text-slate-200 rounded px-2.5 py-1 text-xs focus:outline-none focus:border-signal-amber"
          >
            <option value="ALL">All Action States</option>
            <option value="UNACK">Unacknowledged Only ({unackCount})</option>
            <option value="ACK">Acknowledged / Resolved</option>
          </select>
        </div>

        <div className="text-[11px] text-slate-500">
          Showing <strong className="text-slate-200">{filteredAlerts.length}</strong> of {alerts.length} events
        </div>
      </div>

      {/* Chronological Timeline Feed */}
      <div className="space-y-3">
        {filteredAlerts.length === 0 ? (
          <div className="cockpit-panel rounded-xl p-10 text-center text-slate-400 text-xs">
            No events match the selected filters.
          </div>
        ) : (
          filteredAlerts.map((alt) => {
            const isCritical = alt.severity === 'CRITICAL';
            const isWarning = alt.severity === 'WARNING';

            return (
              <div
                key={alt.id}
                className={`cockpit-panel rounded-xl p-4 sm:p-5 border-l-4 transition-all ${
                  isCritical
                    ? 'border-l-telemetry-crimson shadow-critical-glow'
                    : isWarning
                    ? 'border-l-signal-amber'
                    : 'border-l-telemetry-sky'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2 pb-2 border-b border-cockpit-750/70">
                  <div className="flex items-center gap-2.5">
                    <StatusChip status={alt.severity} size="sm" />
                    <span className="text-xs font-bold text-slate-200">{alt.title}</span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <ClockIcon className="w-3.5 h-3.5 text-slate-500" />
                      {formatRelativeTime(alt.timestamp)}
                    </span>
                    <span className="text-[10px] bg-cockpit-850 px-1.5 py-0.5 rounded border border-cockpit-750 font-mono">
                      ECU: {alt.sourceEcu}
                    </span>
                  </div>
                </div>

                {/* Body Details */}
                <div className="flex flex-wrap items-start justify-between gap-4 my-2">
                  <div className="space-y-1 max-w-3xl">
                    <p className="text-xs text-slate-300 leading-relaxed">{alt.message}</p>
                    <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-slate-400">
                      <span className="text-slate-500">Vehicle:</span>
                      <strong className="text-slate-200 font-semibold">{alt.vehicleName}</strong>
                      <span className="text-signal-amber font-mono">({alt.vin})</span>
                      {alt.metricBreached && (
                        <span className="bg-cockpit-850 text-slate-300 px-2 py-0.5 rounded border border-cockpit-750 ml-2">
                          Breach: <strong className="text-signal-amber">{alt.metricBreached}</strong>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => handleInspectVehicle(alt.vehicleId)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded bg-cockpit-850 hover:bg-cockpit-750 text-slate-200 border border-cockpit-700 text-xs font-semibold transition-colors"
                    >
                      <CarIcon className="w-3.5 h-3.5" />
                      Inspect Vehicle
                    </button>

                    {!alt.acknowledged ? (
                      <button
                        onClick={() => acknowledgeAlert(alt.id)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded bg-signal-amber hover:bg-signal-amber-hover text-cockpit-950 text-xs font-bold uppercase tracking-wider shadow-amber-glow transition-all"
                      >
                        <CheckCircleIcon className="w-3.5 h-3.5" />
                        Acknowledge
                      </button>
                    ) : (
                      <span className="flex items-center gap-1 text-[11px] text-telemetry-emerald bg-telemetry-emerald/10 px-2 py-1 rounded border border-telemetry-emerald/30 font-semibold">
                        <CheckCircleIcon className="w-3 h-3" />
                        Acknowledged
                      </span>
                    )}
                  </div>
                </div>

                {/* Resolution note if present */}
                {alt.actionTaken && (
                  <div className="mt-2 pt-2 border-t border-cockpit-750/50 text-[11px] text-slate-400 flex items-center gap-1.5">
                    <span className="text-telemetry-emerald font-semibold">Action Logged:</span>
                    <span>{alt.actionTaken}</span>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
