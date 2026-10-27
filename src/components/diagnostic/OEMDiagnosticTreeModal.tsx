import React from 'react';
import { DiagnosticTroubleCode } from '../../types/telemetry';
import { DiagnosticTreeIcon, XCircleIcon, WrenchIcon, CheckCircleIcon, FileTextIcon } from '../icons';

interface OEMDiagnosticTreeModalProps {
  dtc: DiagnosticTroubleCode | null;
  isOpen: boolean;
  onClose: () => void;
  onGenerateWorkOrder: (dtc: DiagnosticTroubleCode) => void;
}

export const OEMDiagnosticTreeModal: React.FC<OEMDiagnosticTreeModalProps> = ({
  dtc,
  isOpen,
  onClose,
  onGenerateWorkOrder,
}) => {
  if (!isOpen || !dtc) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm font-mono">
      <div className="cockpit-panel rounded-xl max-w-3xl w-full border border-cockpit-700 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 bg-cockpit-850 border-b border-cockpit-700 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-signal-amber/15 text-signal-amber border border-signal-amber/30">
              <DiagnosticTreeIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-signal-amber bg-signal-amber/20 px-2 py-0.5 rounded border border-signal-amber/40">
                  {dtc.code}
                </span>
                <span className="text-xs text-slate-400 font-semibold">{dtc.standard} Standard</span>
              </div>
              <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wider mt-0.5">
                {dtc.title}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-100 rounded-lg hover:bg-cockpit-750 transition-colors"
          >
            <XCircleIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto space-y-4 text-xs">
          {/* Diagnostic Freeze Frame Snapshot */}
          <div className="p-3 bg-cockpit-850 rounded-lg border border-cockpit-750">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <FileTextIcon className="w-3.5 h-3.5 text-telemetry-cyan" />
              Diagnostic Freeze Frame Snapshot (Timestamp of Fault Trigger)
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <div className="p-2 bg-cockpit-900 rounded border border-cockpit-800">
                <div className="text-[10px] text-slate-500">Engine / Rotor RPM</div>
                <div className="font-bold text-slate-200">{dtc.freezeFrame.engineRpm.toLocaleString()} RPM</div>
              </div>
              <div className="p-2 bg-cockpit-900 rounded border border-cockpit-800">
                <div className="text-[10px] text-slate-500">Vehicle Speed</div>
                <div className="font-bold text-slate-200">{dtc.freezeFrame.vehicleSpeed.toFixed(1)} km/h</div>
              </div>
              <div className="p-2 bg-cockpit-900 rounded border border-cockpit-800">
                <div className="text-[10px] text-slate-500">Coolant Temp</div>
                <div className="font-bold text-slate-200">{dtc.freezeFrame.coolantTemp.toFixed(1)} °C</div>
              </div>
              <div className="p-2 bg-cockpit-900 rounded border border-cockpit-800">
                <div className="text-[10px] text-slate-500">Battery Voltage</div>
                <div className="font-bold text-slate-200">{dtc.freezeFrame.batteryVoltage.toFixed(1)} V</div>
              </div>
            </div>
          </div>

          {/* OEM Guided Troubleshooting Flow */}
          <div>
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <WrenchIcon className="w-3.5 h-3.5 text-signal-amber" />
              OEM Step-by-Step Guided Diagnostic Procedure
            </h3>
            <div className="space-y-2">
              {dtc.diagnosticSteps.map((step) => (
                <div
                  key={step.stepNumber}
                  className="p-3 bg-cockpit-850/70 rounded-lg border border-cockpit-750 flex items-start gap-3"
                >
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-signal-amber/20 text-signal-amber border border-signal-amber/40 flex items-center justify-center font-bold text-xs">
                    {step.stepNumber}
                  </span>
                  <div className="flex-1">
                    <p className="text-slate-200 font-medium">{step.instruction}</p>
                    <div className="mt-1 flex items-center gap-1 text-[11px] text-slate-400">
                      <span className="text-telemetry-emerald font-semibold">Expected Standard:</span>
                      <span className="text-slate-300">{step.expectedReading}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Required Replacement Parts */}
          <div>
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <CheckCircleIcon className="w-3.5 h-3.5 text-telemetry-emerald" />
              Recommended OEM Replacement Parts Catalog
            </h3>
            <div className="space-y-1.5">
              {dtc.suggestedParts.map((part) => (
                <div
                  key={part.partNumber}
                  className="p-2.5 bg-cockpit-850 rounded border border-cockpit-750 flex items-center justify-between"
                >
                  <div>
                    <span className="font-bold text-slate-200">{part.partName}</span>
                    <div className="text-[10px] text-slate-500">Part No: {part.partNumber}</div>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-signal-amber">${part.estimatedCostUsd.toFixed(2)}</span>
                    <div className="text-[10px] text-slate-500">Est. OEM List</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-cockpit-850 border-t border-cockpit-700 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded text-xs font-semibold bg-cockpit-800 hover:bg-cockpit-700 text-slate-300 transition-colors"
          >
            Back to Faults
          </button>

          <button
            onClick={() => {
              onGenerateWorkOrder(dtc);
              onClose();
            }}
            className="flex items-center gap-2 px-4 py-2 rounded text-xs font-bold uppercase tracking-wider bg-signal-amber hover:bg-signal-amber-hover text-cockpit-950 shadow-amber-glow transition-all"
          >
            <FileTextIcon className="w-4 h-4 text-cockpit-950" />
            Generate Service Work Order
          </button>
        </div>
      </div>
    </div>
  );
};
