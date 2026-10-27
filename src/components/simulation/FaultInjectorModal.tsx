import React from 'react';
import { useTelemetry } from '../../context/TelemetryContext';
import { FAULT_PRESETS } from '../../utils/simulatorEngine';
import { BugFaultIcon, XCircleIcon, AlertTriangleIcon, RefreshCwIcon } from '../icons';

interface FaultInjectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FaultInjectorModal: React.FC<FaultInjectorModalProps> = ({ isOpen, onClose }) => {
  const { selectedVehicle, activeFaultId, injectFault, clearAllFaults } = useTelemetry();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm font-mono">
      <div className="cockpit-panel rounded-xl max-w-2xl w-full border border-cockpit-700 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 bg-cockpit-850 border-b border-cockpit-700 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-telemetry-crimson/15 text-telemetry-crimson border border-telemetry-crimson/30">
              <BugFaultIcon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
                Edge Telemetry & Fault Injection Console
              </h2>
              <p className="text-xs text-slate-400">
                Target: <span className="text-signal-amber font-semibold">{selectedVehicle.name}</span> ({selectedVehicle.vin})
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-100 rounded-lg hover:bg-cockpit-750 transition-colors"
          >
            <XCircleIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 overflow-y-auto space-y-3">
          <div className="p-3 bg-cockpit-850/80 rounded-lg border border-cockpit-750 text-xs text-slate-300">
            <strong className="text-signal-amber uppercase tracking-wider">Interactive Diagnostic Evaluation:</strong>
            <p className="mt-1 text-slate-400">
              Select a hardware fault anomaly below to inject directly into the live SDV telemetry bus. 
              The simulator will trigger real-time CAN error frames, register active DTCs, capture a freeze frame, 
              alert the notification center, and accelerate the predictive component RUL degradation curve.
            </p>
          </div>

          <div className="space-y-2">
            {FAULT_PRESETS.map((fault) => {
              const isCurrentlyActive = activeFaultId === fault.id;
              return (
                <div
                  key={fault.id}
                  className={`p-3 rounded-lg border transition-all ${
                    isCurrentlyActive
                      ? 'bg-telemetry-crimson/15 border-telemetry-crimson text-slate-100 shadow-critical-glow'
                      : 'bg-cockpit-850 border-cockpit-750 hover:border-cockpit-600'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-telemetry-crimson bg-telemetry-crimson/20 px-2 py-0.5 rounded border border-telemetry-crimson/40">
                        {fault.code}
                      </span>
                      <span className="text-xs font-bold text-slate-200">{fault.name}</span>
                    </div>
                    <span className="text-[10px] uppercase font-semibold text-slate-400 bg-cockpit-800 px-2 py-0.5 rounded border border-cockpit-700">
                      Subsystem: {fault.subsystem}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 mb-3">{fault.description}</p>

                  <div className="flex items-center justify-between pt-2 border-t border-cockpit-750/60">
                    <span className="text-[11px] text-slate-500">
                      Impact: Health drops to <strong className="text-telemetry-crimson">{fault.impactScore}%</strong>
                    </span>
                    <button
                      onClick={() => {
                        injectFault(fault.id);
                        onClose();
                      }}
                      disabled={isCurrentlyActive}
                      className={`px-3 py-1.5 rounded text-xs font-bold uppercase tracking-wider transition-all ${
                        isCurrentlyActive
                          ? 'bg-telemetry-crimson/40 text-slate-300 cursor-not-allowed'
                          : 'bg-telemetry-crimson hover:bg-red-600 text-white shadow-critical-glow'
                      }`}
                    >
                      {isCurrentlyActive ? 'Fault Active' : 'Inject Fault'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-cockpit-850 border-t border-cockpit-700 flex items-center justify-between">
          <button
            onClick={() => {
              clearAllFaults();
              onClose();
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded text-xs font-semibold bg-cockpit-800 hover:bg-cockpit-750 text-slate-200 border border-cockpit-700 transition-colors"
          >
            <RefreshCwIcon className="w-3.5 h-3.5 text-telemetry-emerald" />
            Reset & Clear All Faults
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded text-xs font-semibold bg-cockpit-800 hover:bg-cockpit-700 text-slate-300 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
