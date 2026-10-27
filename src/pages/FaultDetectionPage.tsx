import React, { useState } from 'react';
import { useTelemetry } from '../context/TelemetryContext';
import { DiagnosticTroubleCode } from '../types/telemetry';
import {
  BugFaultIcon,
  WrenchIcon,
  FileTextIcon,
  CheckCircleIcon,
  AlertTriangleIcon,
  RefreshCwIcon,
  ClockIcon,
  ShieldCheckIcon,
} from '../components/icons';
import { OEMDiagnosticTreeModal } from '../components/diagnostic/OEMDiagnosticTreeModal';
import { WorkOrderModal } from '../components/diagnostic/WorkOrderModal';
import { formatRelativeTime } from '../utils/formatting';

export const FaultDetectionPage: React.FC = () => {
  const { selectedVehicle, clearDTC, clearAllFaults } = useTelemetry();

  const [selectedDtcForTree, setSelectedDtcForTree] = useState<DiagnosticTroubleCode | null>(null);
  const [selectedDtcForWorkOrder, setSelectedDtcForWorkOrder] = useState<DiagnosticTroubleCode | null>(null);
  const [isTreeModalOpen, setIsTreeModalOpen] = useState(false);
  const [isWorkOrderModalOpen, setIsWorkOrderModalOpen] = useState(false);

  const activeDtcs = selectedVehicle.activeDtcs;

  const handleOpenDiagnosticTree = (dtc: DiagnosticTroubleCode) => {
    setSelectedDtcForTree(dtc);
    setIsTreeModalOpen(true);
  };

  const handleOpenWorkOrder = (dtc: DiagnosticTroubleCode) => {
    setSelectedDtcForWorkOrder(dtc);
    setIsWorkOrderModalOpen(true);
  };

  return (
    <div className="space-y-5 font-mono">
      {/* Top Banner */}
      <div className="cockpit-panel rounded-xl p-5 flex flex-wrap items-center justify-between gap-4 border-l-4 border-l-telemetry-crimson">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-telemetry-crimson uppercase tracking-wider mb-1">
            <BugFaultIcon className="w-4 h-4" />
            SAE J2012 / ISO 14229 Remote Diagnostic Trouble Code Analyzer
          </div>
          <h1 className="text-lg sm:text-xl font-bold text-slate-100 font-sans">
            Active Faults & On-Board Diagnostics for {selectedVehicle.name}
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            VIN: <span className="text-signal-amber">{selectedVehicle.vin}</span> | Status:{' '}
            <span className="uppercase font-bold text-slate-200">{selectedVehicle.status}</span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          {activeDtcs.length > 0 && (
            <button
              onClick={clearAllFaults}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-cockpit-850 hover:bg-cockpit-750 text-slate-200 border border-cockpit-700 text-xs font-semibold transition-colors"
            >
              <RefreshCwIcon className="w-3.5 h-3.5 text-telemetry-emerald" />
              Clear All DTCs (UDS $14)
            </button>
          )}
        </div>
      </div>

      {/* Active DTC Card Stream */}
      {activeDtcs.length === 0 ? (
        <div className="cockpit-panel rounded-xl p-10 text-center flex flex-col items-center justify-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-telemetry-emerald/15 text-telemetry-emerald flex items-center justify-center border border-telemetry-emerald/30 shadow-emerald-glow">
            <ShieldCheckIcon className="w-6 h-6" />
          </div>
          <h2 className="text-base font-bold text-slate-100 uppercase">
            No Active Diagnostic Trouble Codes Detected
          </h2>
          <p className="text-xs text-slate-400 max-w-md">
            All 14 on-board Electronic Control Units (PCM, BMS, ABS, BCM, TMS) are reporting zero
            MIL trigger flags and nominal readiness monitors.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {activeDtcs.map((dtc) => {
            const isCritical = dtc.severity === 'CRITICAL';
            return (
              <div
                key={dtc.id}
                className={`cockpit-panel rounded-xl p-5 border-l-4 transition-all ${
                  isCritical ? 'border-l-telemetry-crimson shadow-critical-glow' : 'border-l-signal-amber shadow-amber-glow'
                }`}
              >
                {/* DTC Code Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-3 border-b border-cockpit-750">
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-sm font-bold px-2.5 py-1 rounded border font-mono ${
                        isCritical
                          ? 'bg-telemetry-crimson/20 text-telemetry-crimson border-telemetry-crimson/50'
                          : 'bg-signal-amber/20 text-signal-amber border-signal-amber/50'
                      }`}
                    >
                      {dtc.code}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-sm font-bold text-slate-100 font-sans">{dtc.title}</h2>
                        <span className="text-[10px] text-slate-400 bg-cockpit-850 px-1.5 py-0.5 rounded border border-cockpit-750">
                          {dtc.system}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-500 font-mono">
                        Standard: {dtc.standard} | Severity: {dtc.severity}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenDiagnosticTree(dtc)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-signal-amber/15 hover:bg-signal-amber/25 text-signal-amber border border-signal-amber/40 text-xs font-semibold transition-colors"
                    >
                      <WrenchIcon className="w-3.5 h-3.5" />
                      OEM Diagnostic Tree
                    </button>

                    <button
                      onClick={() => handleOpenWorkOrder(dtc)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-cockpit-850 hover:bg-cockpit-750 text-slate-200 border border-cockpit-700 text-xs font-semibold transition-colors"
                    >
                      <FileTextIcon className="w-3.5 h-3.5 text-telemetry-cyan" />
                      Create Work Order
                    </button>

                    <button
                      onClick={() => clearDTC(selectedVehicle.id, dtc.id)}
                      className="px-2.5 py-1.5 rounded bg-cockpit-850 hover:bg-cockpit-750 text-slate-400 hover:text-slate-200 border border-cockpit-700 text-xs transition-colors"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-300 leading-relaxed mb-4">{dtc.description}</p>

                {/* Diagnostic Freeze Frame Snapshot Grid */}
                <div className="p-3 bg-cockpit-850 rounded-lg border border-cockpit-750">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-semibold mb-2">
                    <span className="flex items-center gap-1">
                      <ClockIcon className="w-3.5 h-3.5 text-signal-amber" />
                      Freeze Frame Telemetry (Recorded at Trigger Instant)
                    </span>
                    <span className="text-[10px] text-slate-500">
                      Detected: {formatRelativeTime(dtc.detectedTimestamp)}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2 text-xs">
                    <div className="p-2 bg-cockpit-900 rounded border border-cockpit-800">
                      <div className="text-[10px] text-slate-500">Engine / Motor RPM</div>
                      <div className="font-bold text-slate-200">
                        {dtc.freezeFrame.engineRpm.toLocaleString()}
                      </div>
                    </div>
                    <div className="p-2 bg-cockpit-900 rounded border border-cockpit-800">
                      <div className="text-[10px] text-slate-500">Vehicle Speed</div>
                      <div className="font-bold text-slate-200">
                        {dtc.freezeFrame.vehicleSpeed.toFixed(1)} km/h
                      </div>
                    </div>
                    <div className="p-2 bg-cockpit-900 rounded border border-cockpit-800">
                      <div className="text-[10px] text-slate-500">Coolant Temp</div>
                      <div className="font-bold text-slate-200">
                        {dtc.freezeFrame.coolantTemp.toFixed(1)} °C
                      </div>
                    </div>
                    <div className="p-2 bg-cockpit-900 rounded border border-cockpit-800">
                      <div className="text-[10px] text-slate-500">Battery Voltage</div>
                      <div className="font-bold text-slate-200">
                        {dtc.freezeFrame.batteryVoltage.toFixed(1)} V
                      </div>
                    </div>
                    <div className="p-2 bg-cockpit-900 rounded border border-cockpit-800">
                      <div className="text-[10px] text-slate-500">Throttle Pos</div>
                      <div className="font-bold text-slate-200">
                        {dtc.freezeFrame.throttlePos}%
                      </div>
                    </div>
                    <div className="p-2 bg-cockpit-900 rounded border border-cockpit-800">
                      <div className="text-[10px] text-slate-500">Calculated Load</div>
                      <div className="font-bold text-slate-200">
                        {dtc.freezeFrame.engineLoadPct}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Historical DTC Archive */}
      <div className="cockpit-panel rounded-xl p-5">
        <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-3">
          Historical Cleared DTC Telemetry Archive (Past 90 Days)
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="text-[10px] uppercase text-slate-400 bg-cockpit-850 border-b border-cockpit-750">
              <tr>
                <th className="py-2.5 px-3">Cleared Date</th>
                <th className="py-2.5 px-3">DTC Code</th>
                <th className="py-2.5 px-3">Subsystem</th>
                <th className="py-2.5 px-3">Root Cause Diagnosis</th>
                <th className="py-2.5 px-3">Technician Resolution</th>
                <th className="py-2.5 px-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cockpit-800">
              <tr className="hover:bg-cockpit-850/50 transition-colors">
                <td className="py-2.5 px-3 text-slate-400">2026-08-14 09:22</td>
                <td className="py-2.5 px-3 font-bold text-signal-amber">P0117</td>
                <td className="py-2.5 px-3 text-slate-300">THERMAL</td>
                <td className="py-2.5 px-3 text-slate-300">Engine Coolant Sensor 1 Circuit Low</td>
                <td className="py-2.5 px-3 text-slate-400">Replaced sensor probe harness #OEM-SNR-01</td>
                <td className="py-2.5 px-3 text-right">
                  <span className="text-telemetry-emerald font-semibold">RESOLVED</span>
                </td>
              </tr>
              <tr className="hover:bg-cockpit-850/50 transition-colors">
                <td className="py-2.5 px-3 text-slate-400">2026-07-28 16:45</td>
                <td className="py-2.5 px-3 font-bold text-signal-amber">U0100</td>
                <td className="py-2.5 px-3 text-slate-300">NETWORK</td>
                <td className="py-2.5 px-3 text-slate-300">Lost Communication with ECM/PCM A</td>
                <td className="py-2.5 px-3 text-slate-400">OTA Gateway firmware patch v4.17.2 applied</td>
                <td className="py-2.5 px-3 text-right">
                  <span className="text-telemetry-emerald font-semibold">RESOLVED</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Diagnostic Modals */}
      <OEMDiagnosticTreeModal
        dtc={selectedDtcForTree}
        isOpen={isTreeModalOpen}
        onClose={() => setIsTreeModalOpen(false)}
        onGenerateWorkOrder={(dtc) => {
          setSelectedDtcForWorkOrder(dtc);
          setIsWorkOrderModalOpen(true);
        }}
      />

      <WorkOrderModal
        vehicle={selectedVehicle}
        dtc={selectedDtcForWorkOrder}
        isOpen={isWorkOrderModalOpen}
        onClose={() => setIsWorkOrderModalOpen(false)}
      />
    </div>
  );
};
