import React, { useState } from 'react';
import { Vehicle, DiagnosticTroubleCode } from '../../types/telemetry';
import { FileTextIcon, XCircleIcon, CheckCircleIcon, DownloadIcon } from '../icons';

interface WorkOrderModalProps {
  vehicle: Vehicle;
  dtc?: DiagnosticTroubleCode | null;
  isOpen: boolean;
  onClose: () => void;
}

export const WorkOrderModal: React.FC<WorkOrderModalProps> = ({
  vehicle,
  dtc,
  isOpen,
  onClose,
}) => {
  const [technicianName, setTechnicianName] = useState('Tech #4812 - Marcus Vance');
  const [serviceBay, setServiceBay] = useState('Bay 04 - High Voltage Diagnostic Bay');
  const [scheduledDate, setScheduledDate] = useState('2026-09-04');
  const [priority, setPriority] = useState<'URGENT' | 'HIGH' | 'ROUTINE'>('URGENT');
  const [dispatched, setDispatched] = useState(false);

  if (!isOpen) return null;

  const totalPartsCost = dtc
    ? dtc.suggestedParts.reduce((acc, p) => acc + p.estimatedCostUsd, 0)
    : 340;
  const laborHours = 2.5;
  const laborRate = 120;
  const totalLaborCost = laborHours * laborRate;
  const grandTotal = totalPartsCost + totalLaborCost;

  const handleDispatch = () => {
    setDispatched(true);
    setTimeout(() => {
      setDispatched(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm font-mono">
      <div className="cockpit-panel rounded-xl max-w-2xl w-full border border-cockpit-700 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 bg-cockpit-850 border-b border-cockpit-700 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-telemetry-cyan/15 text-telemetry-cyan border border-telemetry-cyan/30">
              <FileTextIcon className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-telemetry-cyan font-bold tracking-widest uppercase">
                OEM Predictive Service Order
              </span>
              <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
                WO-{vehicle.id}-{Date.now().toString().slice(-4)}
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

        {/* Form Body */}
        <div className="p-4 overflow-y-auto space-y-4 text-xs">
          {/* Vehicle Metadata Header */}
          <div className="p-3 bg-cockpit-850 rounded-lg border border-cockpit-750 grid grid-cols-2 sm:grid-cols-4 gap-2">
            <div>
              <span className="text-[10px] text-slate-500">Vehicle Name</span>
              <div className="font-bold text-slate-200">{vehicle.name}</div>
            </div>
            <div>
              <span className="text-[10px] text-slate-500">VIN Number</span>
              <div className="font-bold text-signal-amber">{vehicle.vin}</div>
            </div>
            <div>
              <span className="text-[10px] text-slate-500">Odometer</span>
              <div className="font-bold text-slate-200">{vehicle.mileageKm.toLocaleString()} km</div>
            </div>
            <div>
              <span className="text-[10px] text-slate-500">Active Fault</span>
              <div className="font-bold text-telemetry-crimson">{dtc ? dtc.code : 'Predictive RUL Wear'}</div>
            </div>
          </div>

          {/* Dispatch Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Assigned Diagnostic Specialist</label>
              <input
                type="text"
                value={technicianName}
                onChange={(e) => setTechnicianName(e.target.value)}
                className="w-full bg-cockpit-850 border border-cockpit-700 rounded px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-signal-amber"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Assigned Service Bay</label>
              <input
                type="text"
                value={serviceBay}
                onChange={(e) => setServiceBay(e.target.value)}
                className="w-full bg-cockpit-850 border border-cockpit-700 rounded px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-signal-amber"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Target Service Date</label>
              <input
                type="date"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
                className="w-full bg-cockpit-850 border border-cockpit-700 rounded px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-signal-amber"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Service Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as any)}
                className="w-full bg-cockpit-850 border border-cockpit-700 rounded px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-signal-amber"
              >
                <option value="URGENT">CRITICAL / URGENT DISPATCH</option>
                <option value="HIGH">HIGH - WITHIN 48 HOURS</option>
                <option value="ROUTINE">ROUTINE PREDICTIVE WINDOW</option>
              </select>
            </div>
          </div>

          {/* Cost Estimate Summary */}
          <div className="p-3 bg-cockpit-850 rounded-lg border border-cockpit-750">
            <h4 className="text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-2">
              Parts & Labor Estimate Breakdown
            </h4>
            <div className="space-y-1.5 text-[11px]">
              <div className="flex justify-between text-slate-400">
                <span>OEM Certified Hardware Replacement Parts</span>
                <span className="font-semibold text-slate-200">${totalPartsCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Certified Master Tech Labor ({laborHours} hrs @ ${laborRate}/hr)</span>
                <span className="font-semibold text-slate-200">${totalLaborCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Pre-Delivery SDV Telemetry Re-Flash & Calibration</span>
                <span className="font-semibold text-telemetry-emerald">Complimentary (OTA Verified)</span>
              </div>
              <div className="pt-2 border-t border-cockpit-750 flex justify-between font-bold text-xs text-slate-100">
                <span>Total Estimated Work Order Value</span>
                <span className="text-signal-amber text-sm">${grandTotal.toFixed(2)} USD</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-cockpit-850 border-t border-cockpit-700 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded text-xs font-semibold bg-cockpit-800 hover:bg-cockpit-700 text-slate-300 transition-colors"
          >
            Cancel
          </button>

          <button
            onClick={handleDispatch}
            disabled={dispatched}
            className={`flex items-center gap-2 px-5 py-2 rounded text-xs font-bold uppercase tracking-wider transition-all ${
              dispatched
                ? 'bg-telemetry-emerald text-cockpit-950 shadow-emerald-glow'
                : 'bg-signal-amber hover:bg-signal-amber-hover text-cockpit-950 shadow-amber-glow'
            }`}
          >
            {dispatched ? (
              <>
                <CheckCircleIcon className="w-4 h-4" />
                Work Order Dispatched & Logged
              </>
            ) : (
              <>
                <DownloadIcon className="w-4 h-4" />
                Confirm & Dispatch Work Order
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
