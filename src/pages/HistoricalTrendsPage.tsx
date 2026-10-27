import React, { useState } from 'react';
import { useTelemetry } from '../context/TelemetryContext';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  AreaChart,
  Area,
} from 'recharts';
import {
  OscilloscopeIcon,
  DownloadIcon,
  CalendarIcon,
  ActivityIcon,
  SlidersIcon,
  ThermometerIcon,
  BatteryBoltIcon,
} from '../components/icons';

export const HistoricalTrendsPage: React.FC = () => {
  const { selectedVehicle } = useTelemetry();
  const [timeRange, setTimeRange] = useState<'1H' | '24H' | '7D' | '30D'>('24H');
  const [primaryMetric, setPrimaryMetric] = useState<'speed_rpm' | 'thermal_power' | 'voltage_soc'>('thermal_power');

  // Generate realistic historical time-series data based on current vehicle status
  const generateHistoricalData = () => {
    const pointsCount = timeRange === '1H' ? 24 : timeRange === '24H' ? 24 : 14;
    const baseSpeed = selectedVehicle.liveTelemetry.speedKmh;
    const baseRpm = selectedVehicle.liveTelemetry.rpm;
    const baseCoolant = selectedVehicle.liveTelemetry.coolantTempC;
    const baseInverter = selectedVehicle.liveTelemetry.inverterTempC;
    const baseVoltage = selectedVehicle.liveTelemetry.batteryVoltageV;
    const hasFault = selectedVehicle.status === 'critical';

    return Array.from({ length: pointsCount }).map((_, i) => {
      const label =
        timeRange === '1H'
          ? `:${(i * 2.5).toFixed(0).padStart(2, '0')}`
          : timeRange === '24H'
          ? `${i}:00`
          : `Day ${i + 1}`;

      const t = i / pointsCount;
      const wave = Math.sin(t * Math.PI * 4);
      const thermalDrift = hasFault && i > 16 ? (i - 16) * 2.5 : 0;

      return {
        timestamp: label,
        speedKmh: Math.max(0, Number((baseSpeed + wave * 25 + (Math.random() - 0.5) * 5).toFixed(1))),
        rpm: Math.max(1000, Math.round(baseRpm + wave * 1200 + (Math.random() - 0.5) * 150)),
        coolantTempC: Number((baseCoolant + wave * 4 + thermalDrift + (Math.random() - 0.5) * 1).toFixed(1)),
        inverterTempC: Number((baseInverter + wave * 6 + thermalDrift * 1.5 + (Math.random() - 0.5) * 1).toFixed(1)),
        batteryVoltageV: Number((baseVoltage - (i * 0.4) + (Math.random() - 0.5) * 2).toFixed(1)),
        powerKw: Number((Math.max(5, (baseSpeed + wave * 25) * 0.4)).toFixed(1)),
      };
    });
  };

  const chartData = generateHistoricalData();

  // Export CSV Action
  const handleExportCSV = () => {
    const headers = 'Timestamp,VehicleID,VIN,Speed_kmh,RPM,Coolant_C,Inverter_C,Battery_V,Power_kW\n';
    const rows = chartData
      .map(
        (d) =>
          `${d.timestamp},${selectedVehicle.id},${selectedVehicle.vin},${d.speedKmh},${d.rpm},${d.coolantTempC},${d.inverterTempC},${d.batteryVoltageV},${d.powerKw}`
      )
      .join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `SDV_Telemetry_${selectedVehicle.id}_${timeRange}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export JSON Action
  const handleExportJSON = () => {
    const dataObj = {
      vehicleId: selectedVehicle.id,
      vin: selectedVehicle.vin,
      exportedAt: new Date().toISOString(),
      timeRange,
      telemetryFrames: chartData,
    };

    const blob = new Blob([JSON.stringify(dataObj, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `SDV_Telemetry_${selectedVehicle.id}_${timeRange}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-5 font-mono">
      {/* Top Banner */}
      <div className="cockpit-panel rounded-xl p-5 flex flex-wrap items-center justify-between gap-4 border-l-4 border-l-telemetry-cyan">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-telemetry-cyan uppercase tracking-wider mb-1">
            <OscilloscopeIcon className="w-4 h-4" />
            Time-Series Telemetry & Sensor Signal Analytics
          </div>
          <h1 className="text-lg sm:text-xl font-bold text-slate-100 font-sans">
            Multi-Variable Historical Trends for {selectedVehicle.name}
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Compare powertrain duty cycles, thermal excursions, and voltage stability across selectable time horizons.
          </p>
        </div>

        {/* Export Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-cockpit-850 hover:bg-cockpit-750 text-slate-200 border border-cockpit-700 text-xs font-semibold transition-colors"
          >
            <DownloadIcon className="w-3.5 h-3.5 text-signal-amber" />
            Export CSV
          </button>
          <button
            onClick={handleExportJSON}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-cockpit-850 hover:bg-cockpit-750 text-slate-200 border border-cockpit-700 text-xs font-semibold transition-colors"
          >
            <DownloadIcon className="w-3.5 h-3.5 text-telemetry-cyan" />
            Export JSON
          </button>
        </div>
      </div>

      {/* Control Panel: Time Range + Metric Set */}
      <div className="cockpit-panel rounded-xl p-4 flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Time Range Selector */}
        <div className="flex items-center gap-1.5">
          <CalendarIcon className="w-4 h-4 text-slate-400" />
          <span className="text-slate-400 font-semibold">Range:</span>
          {(['1H', '24H', '7D', '30D'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                timeRange === range
                  ? 'bg-signal-amber text-cockpit-950 shadow-amber-glow'
                  : 'bg-cockpit-850 border border-cockpit-700 text-slate-400 hover:text-slate-200'
              }`}
            >
              {range === '1H' ? 'Past 1 Hour' : range === '24H' ? 'Past 24 Hours' : range === '7D' ? '7 Days' : '30 Days'}
            </button>
          ))}
        </div>

        {/* Metric Overlay Selector */}
        <div className="flex items-center gap-1.5">
          <SlidersIcon className="w-4 h-4 text-slate-400" />
          <span className="text-slate-400 font-semibold">Signal Mode:</span>
          <select
            value={primaryMetric}
            onChange={(e) => setPrimaryMetric(e.target.value as any)}
            className="bg-cockpit-850 border border-cockpit-700 text-slate-200 rounded px-2.5 py-1 text-xs focus:outline-none focus:border-signal-amber"
          >
            <option value="thermal_power">Thermal Excursion vs Power Draw</option>
            <option value="speed_rpm">Velocity (km/h) vs Motor RPM</option>
            <option value="voltage_soc">HV Battery Voltage vs Draw</option>
          </select>
        </div>
      </div>

      {/* Primary Historical Line Chart */}
      <div className="cockpit-panel rounded-xl p-5">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-cockpit-750">
          <div>
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              {primaryMetric === 'thermal_power'
                ? 'Coolant Temp (°C) & Inverter Temp (°C) vs Power Output (kW)'
                : primaryMetric === 'speed_rpm'
                ? 'Vehicle Speed (km/h) & Motor RPM vs Time'
                : 'HV Traction Battery Pack Voltage (V) Stability'}
            </h3>
            <span className="text-[10px] text-slate-500">
              Sampling frequency: 1 Hz synchronized CAN logs
            </span>
          </div>
        </div>

        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            {primaryMetric === 'thermal_power' ? (
              <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2A3344" />
                <XAxis dataKey="timestamp" stroke="#5E6D8A" tick={{ fill: '#8E9BB0', fontSize: 11 }} />
                <YAxis yAxisId="temp" stroke="#FF9E1B" tick={{ fill: '#FF9E1B', fontSize: 11 }} unit="°C" />
                <YAxis
                  yAxisId="power"
                  orientation="right"
                  stroke="#00D2D3"
                  tick={{ fill: '#00D2D3', fontSize: 11 }}
                  unit="kW"
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
                <Line
                  yAxisId="temp"
                  type="monotone"
                  dataKey="coolantTempC"
                  name="Coolant Temp (°C)"
                  stroke="#FF9E1B"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  yAxisId="temp"
                  type="monotone"
                  dataKey="inverterTempC"
                  name="Inverter SiC Temp (°C)"
                  stroke="#FF3B30"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  yAxisId="power"
                  type="monotone"
                  dataKey="powerKw"
                  name="Motor Power (kW)"
                  stroke="#00D2D3"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            ) : primaryMetric === 'speed_rpm' ? (
              <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2A3344" />
                <XAxis dataKey="timestamp" stroke="#5E6D8A" tick={{ fill: '#8E9BB0', fontSize: 11 }} />
                <YAxis yAxisId="speed" stroke="#FF9E1B" tick={{ fill: '#FF9E1B', fontSize: 11 }} unit="km/h" />
                <YAxis
                  yAxisId="rpm"
                  orientation="right"
                  stroke="#00D2D3"
                  tick={{ fill: '#00D2D3', fontSize: 11 }}
                  unit="RPM"
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
                <Line
                  yAxisId="speed"
                  type="monotone"
                  dataKey="speedKmh"
                  name="Speed (km/h)"
                  stroke="#FF9E1B"
                  strokeWidth={2.5}
                  dot={false}
                />
                <Line
                  yAxisId="rpm"
                  type="monotone"
                  dataKey="rpm"
                  name="Engine / Rotor RPM"
                  stroke="#00D2D3"
                  strokeWidth={1.8}
                  dot={false}
                />
              </LineChart>
            ) : (
              <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2A3344" />
                <XAxis dataKey="timestamp" stroke="#5E6D8A" tick={{ fill: '#8E9BB0', fontSize: 11 }} />
                <YAxis stroke="#00D2D3" tick={{ fill: '#00D2D3', fontSize: 11 }} unit="V" domain={['auto', 'auto']} />
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
                <Area
                  type="monotone"
                  dataKey="batteryVoltageV"
                  name="Pack Voltage (V)"
                  stroke="#00D2D3"
                  fill="rgba(0, 210, 211, 0.15)"
                  strokeWidth={2}
                />
              </AreaChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
