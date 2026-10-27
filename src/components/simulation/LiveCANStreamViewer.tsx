import React, { useState } from 'react';
import { useTelemetry } from '../../context/TelemetryContext';
import { CanBusIcon, PlayIcon, PauseIcon, FilterIcon } from '../icons';
import { formatTimestamp } from '../../utils/formatting';

export const LiveCANStreamViewer: React.FC = () => {
  const { liveCANFrames, isSimulating, setIsSimulating } = useTelemetry();
  const [selectedBusFilter, setSelectedBusFilter] = useState<string>('ALL');

  const filteredFrames = liveCANFrames.filter((f) => {
    if (selectedBusFilter === 'ALL') return true;
    return f.bus === selectedBusFilter;
  });

  return (
    <div className="cockpit-panel rounded-lg p-4 font-mono">
      {/* Header Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3 pb-3 border-b border-cockpit-750">
        <div className="flex items-center gap-2">
          <CanBusIcon className="w-4 h-4 text-telemetry-cyan" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
            ISO 11898 CAN-FD & ISO 14229 UDS Frame Stream
          </h3>
          <span className="flex items-center gap-1 text-[10px] bg-telemetry-cyan/10 text-telemetry-cyan px-2 py-0.5 rounded border border-telemetry-cyan/30">
            <span className="w-1.5 h-1.5 rounded-full bg-telemetry-cyan animate-ping" />
            500 kbps / 2 Mbps FD
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Bus Filter */}
          <div className="flex items-center gap-1 text-xs">
            <FilterIcon className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedBusFilter}
              onChange={(e) => setSelectedBusFilter(e.target.value)}
              className="bg-cockpit-850 border border-cockpit-700 text-slate-300 text-xs rounded px-2 py-1 focus:outline-none focus:border-signal-amber"
            >
              <option value="ALL">All Buses</option>
              <option value="CAN-FD-1">CAN-FD-1 (Powertrain)</option>
              <option value="CAN-FD-2">CAN-FD-2 (BMS / TMS)</option>
              <option value="ETHERNET-DOIP">DoIP (Diagnostics)</option>
            </select>
          </div>

          {/* Pause / Resume Button */}
          <button
            onClick={() => setIsSimulating(!isSimulating)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold border transition-colors ${
              isSimulating
                ? 'bg-cockpit-800 border-cockpit-700 text-slate-300 hover:text-signal-amber'
                : 'bg-signal-amber/20 border-signal-amber text-signal-amber'
            }`}
          >
            {isSimulating ? (
              <>
                <PauseIcon className="w-3 h-3 text-signal-amber" />
                Pause
              </>
            ) : (
              <>
                <PlayIcon className="w-3 h-3 text-telemetry-emerald" />
                Resume
              </>
            )}
          </button>
        </div>
      </div>

      {/* Frame Table */}
      <div className="overflow-x-auto max-h-64 overflow-y-auto">
        <table className="w-full text-left text-xs">
          <thead className="text-[10px] uppercase text-slate-400 bg-cockpit-850 sticky top-0 border-b border-cockpit-750">
            <tr>
              <th className="py-2 px-2.5">Time (UTC)</th>
              <th className="py-2 px-2">CAN ID</th>
              <th className="py-2 px-2">Message Identifier</th>
              <th className="py-2 px-2">Bus</th>
              <th className="py-2 px-2">DLC</th>
              <th className="py-2 px-3">Hex Payload (D0-D7)</th>
              <th className="py-2 px-3">Decoded Physical Signals</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-cockpit-800/80">
            {filteredFrames.map((frame, idx) => (
              <tr
                key={`${frame.id}-${idx}`}
                className="hover:bg-cockpit-800/40 transition-colors text-[11px]"
              >
                <td className="py-2 px-2.5 text-slate-400 whitespace-nowrap">
                  {formatTimestamp(frame.timestamp)}
                </td>
                <td className="py-2 px-2 font-bold text-signal-amber whitespace-nowrap">
                  {frame.id}
                </td>
                <td className="py-2 px-2 font-medium text-slate-200 whitespace-nowrap">
                  {frame.name}
                </td>
                <td className="py-2 px-2 text-slate-400 whitespace-nowrap">
                  <span className="bg-cockpit-850 px-1.5 py-0.5 rounded text-[10px] border border-cockpit-700">
                    {frame.bus}
                  </span>
                </td>
                <td className="py-2 px-2 text-slate-400">{frame.dlc}</td>
                <td className="py-2 px-3 whitespace-nowrap">
                  <div className="flex gap-1 text-[11px]">
                    {frame.hexBytes.map((byte, bIdx) => (
                      <span
                        key={bIdx}
                        className={`px-1 py-0.5 rounded ${
                          bIdx === 0
                            ? 'bg-telemetry-cyan/15 text-telemetry-cyan font-bold'
                            : bIdx === 1
                            ? 'bg-signal-amber/15 text-signal-amber font-bold'
                            : 'bg-cockpit-850 text-slate-300'
                        }`}
                      >
                        {byte}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="py-2 px-3 text-slate-300">
                  <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-[10px]">
                    {Object.entries(frame.decodedSignals).map(([key, val]) => (
                      <span key={key} className="inline-flex gap-1">
                        <span className="text-slate-500">{key}:</span>
                        <span className="font-semibold text-slate-200">{val}</span>
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Stats */}
      <div className="mt-3 pt-2 border-t border-cockpit-750 flex flex-wrap items-center justify-between text-[11px] text-slate-400">
        <div className="flex items-center gap-4">
          <span>
            Bus Load: <strong className="text-telemetry-emerald">41.8%</strong>
          </span>
          <span>
            Error Passive: <strong className="text-slate-300">0</strong>
          </span>
          <span>
            Tx/Rx Packets/sec: <strong className="text-slate-200">1,240 pkts/s</strong>
          </span>
        </div>
        <div className="text-[10px] text-slate-500">
          ISO 15765-2 TP Transport Protocol Active
        </div>
      </div>
    </div>
  );
};
