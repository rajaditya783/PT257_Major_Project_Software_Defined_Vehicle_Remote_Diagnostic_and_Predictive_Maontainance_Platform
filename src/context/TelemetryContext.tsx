import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import {
  Vehicle,
  CANFrame,
  AlertItem,
  AlertSeverity,
  DrivingProfile,
  TelemetryFrame,
  DiagnosticTroubleCode,
} from '../types/telemetry';
import { INITIAL_FLEET, INITIAL_ALERTS } from '../data/mockFleetData';
import { generateCANFrames, stepTelemetry, FAULT_PRESETS } from '../utils/simulatorEngine';

interface TelemetryContextType {
  vehicles: Vehicle[];
  selectedVehicleId: string;
  selectedVehicle: Vehicle;
  liveCANFrames: CANFrame[];
  alerts: AlertItem[];
  drivingProfile: DrivingProfile;
  pollingIntervalMs: number;
  isSimulating: boolean;
  activeFaultId: string | null;
  setSelectedVehicleId: (id: string) => void;
  setDrivingProfile: (profile: DrivingProfile) => void;
  setPollingIntervalMs: (ms: number) => void;
  setIsSimulating: (sim: boolean) => void;
  injectFault: (faultId: string) => void;
  clearAllFaults: () => void;
  clearDTC: (vehicleId: string, dtcId: string) => void;
  acknowledgeAlert: (alertId: string, actionNote?: string) => void;
}

const TelemetryContext = createContext<TelemetryContextType | undefined>(undefined);

export const TelemetryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>(INITIAL_FLEET);
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>('VEH-001');
  const [alerts, setAlerts] = useState<AlertItem[]>(INITIAL_ALERTS);
  const [drivingProfile, setDrivingProfile] = useState<DrivingProfile>('NORMAL');
  const [pollingIntervalMs, setPollingIntervalMs] = useState<number>(500);
  const [isSimulating, setIsSimulating] = useState<boolean>(true);
  const [activeFaultId, setActiveFaultId] = useState<string | null>(null);

  const selectedVehicle = useMemo(() => {
    return vehicles.find((v) => v.id === selectedVehicleId) || vehicles[0];
  }, [vehicles, selectedVehicleId]);

  const [liveCANFrames, setLiveCANFrames] = useState<CANFrame[]>(() =>
    generateCANFrames(selectedVehicle.liveTelemetry, selectedVehicle)
  );

  // Background Telemetry Simulation Loop
  useEffect(() => {
    if (!isSimulating) return;

    const interval = setInterval(() => {
      setVehicles((prevFleet) => {
        return prevFleet.map((veh) => {
          // If this is the currently focused active vehicle, step physics by active profile
          const isTarget = veh.id === selectedVehicleId;
          const profile = isTarget ? drivingProfile : 'NORMAL';
          const hasCritical = veh.status === 'critical' || veh.activeDtcs.length > 0;

          const nextTelemetry = stepTelemetry(veh.liveTelemetry, profile, hasCritical);

          return {
            ...veh,
            liveTelemetry: nextTelemetry,
            lastPing: new Date().toISOString(),
          };
        });
      });
    }, pollingIntervalMs);

    return () => clearInterval(interval);
  }, [isSimulating, selectedVehicleId, drivingProfile, pollingIntervalMs]);

  // Update live CAN frames stream when active vehicle telemetry updates
  useEffect(() => {
    if (selectedVehicle) {
      setLiveCANFrames(generateCANFrames(selectedVehicle.liveTelemetry, selectedVehicle));
    }
  }, [selectedVehicle?.liveTelemetry?.timestamp, selectedVehicle?.id]);

  const injectFault = (faultId: string) => {
    const preset = FAULT_PRESETS.find((f) => f.id === faultId);
    if (!preset) return;

    setActiveFaultId(faultId);
    setDrivingProfile('FAULT_INJECTED');

    setVehicles((prev) =>
      prev.map((v) => {
        if (v.id !== selectedVehicleId) return v;

        // Check if DTC already exists
        const exists = v.activeDtcs.some((d) => d.code === preset.code);
        const nextDtcs = exists
          ? v.activeDtcs
          : [
              {
                ...preset.dtcObj,
                detectedTimestamp: new Date().toISOString(),
              },
              ...v.activeDtcs,
            ];

        // Drop target component health
        const updatedComponents = v.components.map((comp) => {
          if (comp.id === preset.targetComponentId || comp.subsystem.toLowerCase().includes(preset.subsystem.toLowerCase())) {
            return {
              ...comp,
              healthScore: preset.impactScore,
              failureRisk: preset.severity === 'CRITICAL' ? ('CRITICAL' as const) : ('HIGH' as const),
              predictedRULDays: Math.min(comp.predictedRULDays, 5),
              predictedRULKm: Math.min(comp.predictedRULKm, 650),
            };
          }
          return comp;
        });

        return {
          ...v,
          status: preset.severity === 'CRITICAL' ? ('critical' as const) : ('warning' as const),
          activeDtcCount: nextDtcs.length,
          activeDtcs: nextDtcs,
          components: updatedComponents,
        };
      })
    );

    const alertSev: AlertSeverity =
      preset.severity === 'CRITICAL'
        ? 'CRITICAL'
        : preset.severity === 'MAJOR'
        ? 'WARNING'
        : 'ADVISORY';

    // Add alert to feed
    const newAlert: AlertItem = {
      id: `ALT-INJ-${Date.now()}`,
      vehicleId: selectedVehicle.id,
      vehicleName: selectedVehicle.name,
      vin: selectedVehicle.vin,
      timestamp: new Date().toISOString(),
      severity: alertSev,
      title: `INJECTED FAULT: ${preset.code} - ${preset.name}`,
      message: `${preset.description} Live CAN bus error frames registered.`,
      acknowledged: false,
      sourceEcu: 'EDGE-FAULT-SIMULATOR',
      metricBreached: `DTC ${preset.code} Active`,
    };

    setAlerts((prev) => [newAlert, ...prev]);
  };

  const clearAllFaults = () => {
    setActiveFaultId(null);
    setDrivingProfile('NORMAL');

    setVehicles((prev) =>
      prev.map((v) => {
        if (v.id !== selectedVehicleId) return v;
        return {
          ...v,
          status: 'nominal',
          activeDtcCount: 0,
          activeDtcs: [],
          components: v.components.map((c) => ({
            ...c,
            healthScore: Math.max(88, c.healthScore),
            failureRisk: 'LOW',
            predictedRULDays: Math.max(450, c.predictedRULDays),
          })),
        };
      })
    );
  };

  const clearDTC = (vehicleId: string, dtcId: string) => {
    setVehicles((prev) =>
      prev.map((v) => {
        if (v.id !== vehicleId) return v;
        const nextDtcs = v.activeDtcs.filter((d) => d.id !== dtcId);
        return {
          ...v,
          activeDtcs: nextDtcs,
          activeDtcCount: nextDtcs.length,
          status: nextDtcs.length === 0 ? 'nominal' : v.status,
        };
      })
    );
  };

  const acknowledgeAlert = (alertId: string, actionNote?: string) => {
    setAlerts((prev) =>
      prev.map((alt) => {
        if (alt.id === alertId) {
          return {
            ...alt,
            acknowledged: true,
            actionTaken: actionNote || 'Acknowledged by Fleet Diagnostics Controller',
          };
        }
        return alt;
      })
    );
  };

  return (
    <TelemetryContext.Provider
      value={{
        vehicles,
        selectedVehicleId,
        selectedVehicle,
        liveCANFrames,
        alerts,
        drivingProfile,
        pollingIntervalMs,
        isSimulating,
        activeFaultId,
        setSelectedVehicleId,
        setDrivingProfile,
        setPollingIntervalMs,
        setIsSimulating,
        injectFault,
        clearAllFaults,
        clearDTC,
        acknowledgeAlert,
      }}
    >
      {children}
    </TelemetryContext.Provider>
  );
};

export const useTelemetry = (): TelemetryContextType => {
  const context = useContext(TelemetryContext);
  if (!context) {
    throw new Error('useTelemetry must be used within a TelemetryProvider');
  }
  return context;
};
