export type HealthStatus = 'nominal' | 'warning' | 'critical';
export type PowertrainType = 'BEV' | 'PHEV' | 'ICE' | 'COMMERCIAL_EV';
export type AlertSeverity = 'CRITICAL' | 'WARNING' | 'ADVISORY' | 'SYSTEM';
export type UserRole = 'FLEET_MANAGER' | 'FIELD_TECHNICIAN' | 'VEHICLE_OWNER';

export interface TPMSData {
  pressurePsi: number;
  tempC: number;
  status: 'nominal' | 'low' | 'critical';
}

export interface TelemetryFrame {
  timestamp: number;
  speedKmh: number;
  rpm: number;
  coolantTempC: number;
  inverterTempC: number;
  batteryVoltageV: number;
  batterySOC: number; // 0-100%
  batterySOH: number; // 0-100%
  motorPowerKw: number;
  packCurrentA: number;
  oilPressurePsi: number;
  throttlePosPct: number;
  brakePressureBar: number;
  steeringAngleDeg: number;
  fuelLevelPct?: number;
  regenKw: number;
  ambientTempC: number;
  tpms: {
    frontLeft: TPMSData;
    frontRight: TPMSData;
    rearLeft: TPMSData;
    rearRight: TPMSData;
  };
}

export interface CANFrame {
  id: string; // e.g., '0x180'
  name: string; // e.g., 'PCM_POWERTRAIN_STATUS'
  bus: 'CAN-FD-1' | 'CAN-FD-2' | 'LIN-BODY' | 'ETHERNET-DOIP';
  dlc: number;
  hexBytes: string[];
  timestamp: number;
  decodedSignals: Record<string, string | number>;
}

export interface DiagnosticTroubleCode {
  id: string;
  code: string; // e.g. 'P0301'
  standard: 'SAE_J2012' | 'ISO_14229' | 'ISO_15031';
  system: 'POWERTRAIN' | 'CHASSIS' | 'BODY' | 'NETWORK_COMM' | 'HIGH_VOLTAGE';
  severity: 'CRITICAL' | 'MAJOR' | 'MINOR' | 'PENDING';
  title: string;
  description: string;
  status: 'ACTIVE' | 'PENDING' | 'RESOLVED';
  detectedTimestamp: string;
  freezeFrame: {
    engineRpm: number;
    vehicleSpeed: number;
    coolantTemp: number;
    throttlePos: number;
    batteryVoltage: number;
    fuelRailPressure?: number;
    inverterTemp?: number;
    engineLoadPct: number;
  };
  diagnosticSteps: Array<{
    stepNumber: number;
    instruction: string;
    expectedReading: string;
  }>;
  suggestedParts: Array<{
    partNumber: string;
    partName: string;
    estimatedCostUsd: number;
  }>;
}

export interface ComponentRUL {
  id: string;
  name: string;
  subsystem: string;
  healthScore: number; // 0 - 100
  predictedRULDays: number;
  predictedRULKm: number;
  currentWearMetric: string;
  thresholdLimit: string;
  failureRisk: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
  weibullTrend: Array<{
    milestone: string;
    nominalBaseline: number;
    observedWear: number;
    predictedFailureZone?: number;
  }>;
}

export interface AlertItem {
  id: string;
  vehicleId: string;
  vehicleName: string;
  vin: string;
  timestamp: string;
  severity: AlertSeverity;
  title: string;
  message: string;
  acknowledged: boolean;
  sourceEcu: string;
  metricBreached?: string;
  actionTaken?: string;
}

export interface Vehicle {
  id: string;
  vin: string;
  name: string;
  model: string;
  year: number;
  type: PowertrainType;
  fleetDivision: string;
  status: HealthStatus;
  mileageKm: number;
  batterySOC: number;
  batterySOH: number;
  fuelLevelPct?: number;
  activeDtcCount: number;
  locationName: string;
  lat: number;
  lng: number;
  firmwareVersion: string;
  lastPing: string;
  liveTelemetry: TelemetryFrame;
  activeDtcs: DiagnosticTroubleCode[];
  components: ComponentRUL[];
}

export type DrivingProfile = 'NORMAL' | 'URBAN_TRAFFIC' | 'HIGHWAY_CRUISE' | 'THERMAL_STRESS' | 'TRACK_STRESS' | 'FAULT_INJECTED';
