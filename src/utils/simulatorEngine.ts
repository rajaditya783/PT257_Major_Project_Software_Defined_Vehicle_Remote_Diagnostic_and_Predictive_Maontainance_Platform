import { CANFrame, TelemetryFrame, DrivingProfile, Vehicle, DiagnosticTroubleCode, AlertItem } from '../types/telemetry';

// Generate raw 8-byte hex payload representation
function generateHexBytes(count: number = 8): string[] {
  const bytes: string[] = [];
  for (let i = 0; i < count; i++) {
    const val = Math.floor(Math.random() * 256);
    bytes.push(val.toString(16).padStart(2, '0').toUpperCase());
  }
  return bytes;
}

export function generateCANFrames(telemetry: TelemetryFrame, vehicle: Vehicle): CANFrame[] {
  const now = Date.now();
  
  // Convert telemetry values to simulated CAN hex representation
  const speedInt = Math.round(telemetry.speedKmh * 100);
  const speedHexHigh = ((speedInt >> 8) & 0xFF).toString(16).padStart(2, '0').toUpperCase();
  const speedHexLow = (speedInt & 0xFF).toString(16).padStart(2, '0').toUpperCase();

  const rpmInt = Math.round(telemetry.rpm * 4);
  const rpmHexHigh = ((rpmInt >> 8) & 0xFF).toString(16).padStart(2, '0').toUpperCase();
  const rpmHexLow = (rpmInt & 0xFF).toString(16).padStart(2, '0').toUpperCase();

  const tempInt = Math.round(telemetry.coolantTempC + 40); // Standard OBD-II offset
  const tempHex = (tempInt & 0xFF).toString(16).padStart(2, '0').toUpperCase();

  const voltInt = Math.round(telemetry.batteryVoltageV * 10);
  const voltHexHigh = ((voltInt >> 8) & 0xFF).toString(16).padStart(2, '0').toUpperCase();
  const voltHexLow = (voltInt & 0xFF).toString(16).padStart(2, '0').toUpperCase();

  return [
    {
      id: '0x100',
      name: 'VCU_DRIVE_STATUS',
      bus: 'CAN-FD-1',
      dlc: 8,
      hexBytes: [speedHexHigh, speedHexLow, Math.round(telemetry.throttlePosPct).toString(16).padStart(2, '0').toUpperCase(), Math.round(telemetry.brakePressureBar * 5).toString(16).padStart(2, '0').toUpperCase(), '01', 'A4', '00', '1F'],
      timestamp: now,
      decodedSignals: {
        SpeedKmh: telemetry.speedKmh.toFixed(1),
        ThrottlePct: telemetry.throttlePosPct.toFixed(0),
        BrakePressureBar: telemetry.brakePressureBar.toFixed(1),
        DriveMode: 'SPORT_ACTIVE',
      },
    },
    {
      id: '0x180',
      name: 'PCM_TORQUE_RPM',
      bus: 'CAN-FD-1',
      dlc: 8,
      hexBytes: [rpmHexHigh, rpmHexLow, '04', 'E2', '12', '90', '00', 'AA'],
      timestamp: now - 8,
      decodedSignals: {
        EngineRPM: Math.round(telemetry.rpm),
        ShaftTorqueNm: (telemetry.motorPowerKw * 3.8).toFixed(1),
        InverterCurrentA: telemetry.packCurrentA.toFixed(1),
      },
    },
    {
      id: '0x208',
      name: 'BMS_PACK_TELEMETRY',
      bus: 'CAN-FD-2',
      dlc: 8,
      hexBytes: [voltHexHigh, voltHexLow, Math.round(telemetry.batterySOC).toString(16).padStart(2, '0').toUpperCase(), Math.round(telemetry.batterySOH).toString(16).padStart(2, '0').toUpperCase(), '1E', '22', '00', '00'],
      timestamp: now - 15,
      decodedSignals: {
        PackVoltageV: telemetry.batteryVoltageV.toFixed(1),
        SOC: `${telemetry.batterySOC.toFixed(1)}%`,
        SOH: `${telemetry.batterySOH.toFixed(1)}%`,
        CellDeltaMv: vehicle.status === 'critical' ? '142 mV (CRITICAL)' : '8 mV (BALANCED)',
      },
    },
    {
      id: '0x320',
      name: 'TMS_THERMAL_LOOP',
      bus: 'CAN-FD-2',
      dlc: 8,
      hexBytes: [tempHex, Math.round(telemetry.inverterTempC + 40).toString(16).padStart(2, '0').toUpperCase(), '5A', '08', '02', '00', 'FF', '12'],
      timestamp: now - 22,
      decodedSignals: {
        CoolantTempC: `${telemetry.coolantTempC.toFixed(1)} °C`,
        InverterTempC: `${telemetry.inverterTempC.toFixed(1)} °C`,
        PumpFlowRate: '18.4 L/min',
      },
    },
    {
      id: '0x420',
      name: 'ABS_TPMS_WHEEL_SPEEDS',
      bus: 'CAN-FD-1',
      dlc: 8,
      hexBytes: [
        Math.round(telemetry.tpms.frontLeft.pressurePsi).toString(16).padStart(2, '0').toUpperCase(),
        Math.round(telemetry.tpms.frontRight.pressurePsi).toString(16).padStart(2, '0').toUpperCase(),
        Math.round(telemetry.tpms.rearLeft.pressurePsi).toString(16).padStart(2, '0').toUpperCase(),
        Math.round(telemetry.tpms.rearRight.pressurePsi).toString(16).padStart(2, '0').toUpperCase(),
        '1A', '1B', '1C', '1B'
      ],
      timestamp: now - 35,
      decodedSignals: {
        FL_Psi: telemetry.tpms.frontLeft.pressurePsi.toFixed(1),
        FR_Psi: telemetry.tpms.frontRight.pressurePsi.toFixed(1),
        RL_Psi: telemetry.tpms.rearLeft.pressurePsi.toFixed(1),
        RR_Psi: telemetry.tpms.rearRight.pressurePsi.toFixed(1),
      },
    },
    {
      id: '0x7E0',
      name: 'UDS_ISO14229_DIAG_REQ',
      bus: 'ETHERNET-DOIP',
      dlc: 8,
      hexBytes: ['03', '22', 'F1', '90', '00', '00', '00', '00'],
      timestamp: now - 48,
      decodedSignals: {
        Service: '0x22 (ReadDataByIdentifier)',
        DID: '0xF190 (VIN_READOUT)',
      },
    },
    {
      id: '0x7E8',
      name: 'UDS_ISO14229_DIAG_RESP',
      bus: 'ETHERNET-DOIP',
      dlc: 8,
      hexBytes: ['10', '14', '62', 'F1', '90', '31', '41', '39'],
      timestamp: now - 42,
      decodedSignals: {
        Response: '0x62 (PositiveResponse)',
        Payload: '1A9-SDV...',
      },
    },
  ];
}

export function stepTelemetry(
  current: TelemetryFrame,
  profile: DrivingProfile,
  hasCriticalFault: boolean
): TelemetryFrame {
  const t = Date.now() / 1000;
  let targetSpeed = 95;
  let targetRpm = 4500;
  let targetCoolant = 84;
  let targetInverter = 58;
  let throttle = 35;
  let brake = 0;
  let regen = 0;

  switch (profile) {
    case 'HIGHWAY_CRUISE':
      targetSpeed = 115 + Math.sin(t * 0.5) * 8;
      targetRpm = 4900 + Math.sin(t * 0.5) * 200;
      targetCoolant = 86;
      targetInverter = 62;
      throttle = 40;
      break;

    case 'URBAN_TRAFFIC':
      const phase = (Math.sin(t * 0.8) + 1) / 2; // 0 to 1
      targetSpeed = phase * 60;
      targetRpm = 1200 + phase * 3200;
      throttle = phase > 0.4 ? phase * 70 : 0;
      brake = phase < 0.3 ? (0.3 - phase) * 35 : 0;
      regen = brake > 0 ? 15 : 0;
      targetCoolant = 90;
      targetInverter = 65;
      break;

    case 'THERMAL_STRESS':
      targetSpeed = 135 + Math.sin(t * 0.3) * 10;
      targetRpm = 6200 + Math.sin(t * 0.3) * 400;
      targetCoolant = 104 + Math.sin(t * 0.2) * 4;
      targetInverter = 88 + Math.sin(t * 0.2) * 5;
      throttle = 75;
      break;

    case 'TRACK_STRESS':
      const trackWave = Math.sin(t * 1.2);
      targetSpeed = 130 + trackWave * 45;
      targetRpm = 6800 + trackWave * 1500;
      targetCoolant = 102;
      targetInverter = 92;
      throttle = trackWave > 0 ? 90 : 10;
      brake = trackWave < -0.4 ? 22 : 0;
      break;

    case 'FAULT_INJECTED':
      // Chaotic RPM jitter and misfire fluctuation
      const jitter = (Math.random() - 0.5) * 900;
      targetSpeed = Math.max(30, 85 + Math.sin(t * 0.4) * 20);
      targetRpm = Math.max(1000, 4800 + jitter);
      targetCoolant = 108.5 + (Math.random() - 0.5) * 3;
      targetInverter = 95.0 + (Math.random() - 0.5) * 4;
      throttle = 60 + Math.random() * 20;
      break;

    case 'NORMAL':
    default:
      targetSpeed = 98 + Math.sin(t * 0.2) * 6;
      targetRpm = 4400 + Math.sin(t * 0.2) * 250;
      targetCoolant = 84.5;
      targetInverter = 58.0;
      throttle = 32;
      break;
  }

  // Add realistic micro jitter
  const jitterFactor = hasCriticalFault ? 1.8 : 0.4;
  const speedNoise = (Math.random() - 0.5) * jitterFactor;
  const rpmNoise = (Math.random() - 0.5) * (hasCriticalFault ? 180 : 35);
  const voltNoise = (Math.random() - 0.5) * 0.4;

  const newSpeed = Math.max(0, current.speedKmh + (targetSpeed - current.speedKmh) * 0.15 + speedNoise);
  const newRpm = Math.max(800, current.rpm + (targetRpm - current.rpm) * 0.2 + rpmNoise);
  const newCoolant = current.coolantTempC + (targetCoolant - current.coolantTempC) * 0.05 + (Math.random() - 0.5) * 0.1;
  const newInverter = current.inverterTempC + (targetInverter - current.inverterTempC) * 0.05;
  
  // Power calculation
  const powerKw = Math.max(0, (newSpeed * throttle * 0.04) - (regen * 0.8));
  const packCurrentA = Math.max(0, (powerKw * 1000) / (current.batteryVoltageV || 400));
  
  // Smooth battery discharge
  const newSoc = Math.max(5, current.batterySOC - 0.0005 * (powerKw / 30));

  return {
    ...current,
    timestamp: Date.now(),
    speedKmh: Number(newSpeed.toFixed(1)),
    rpm: Math.round(newRpm),
    coolantTempC: Number(newCoolant.toFixed(1)),
    inverterTempC: Number(newInverter.toFixed(1)),
    batteryVoltageV: Number((current.batteryVoltageV + voltNoise).toFixed(1)),
    batterySOC: Number(newSoc.toFixed(2)),
    motorPowerKw: Number(powerKw.toFixed(1)),
    packCurrentA: Number(packCurrentA.toFixed(1)),
    oilPressurePsi: Number((45 + (newRpm / 5000) * 15 + (Math.random() - 0.5) * 0.5).toFixed(1)),
    throttlePosPct: Number(throttle.toFixed(0)),
    brakePressureBar: Number(brake.toFixed(1)),
    regenKw: Number(regen.toFixed(1)),
    steeringAngleDeg: Number((Math.sin(t * 0.3) * 3.5).toFixed(1)),
  };
}

export const FAULT_PRESETS: Array<{
  id: string;
  name: string;
  code: string;
  subsystem: string;
  severity: 'CRITICAL' | 'MAJOR' | 'MINOR';
  description: string;
  targetComponentId: string;
  impactScore: number; // Health drops to this value
  dtcObj: DiagnosticTroubleCode;
}> = [
  {
    id: 'FAULT-P0301',
    name: 'Cylinder 1 / Inverter Phase Misfire',
    code: 'P0301',
    subsystem: 'Powertrain & Inverter',
    severity: 'CRITICAL',
    description: 'Instantaneous torque fluctuation > 8.5% with IGBT thermal overload.',
    targetComponentId: 'CMP-03',
    impactScore: 24,
    dtcObj: {
      id: 'DTC-INJ-01',
      code: 'P0301',
      standard: 'SAE_J2012',
      system: 'POWERTRAIN',
      severity: 'CRITICAL',
      title: 'Inverter Phase-U Gate Driver Desaturation & Misfire',
      description: 'Severe commutation timing drift detected across primary drive unit.',
      status: 'ACTIVE',
      detectedTimestamp: new Date().toISOString(),
      freezeFrame: {
        engineRpm: 6850,
        vehicleSpeed: 124.0,
        coolantTemp: 104.2,
        throttlePos: 82.0,
        batteryVoltage: 735.0,
        inverterTemp: 96.4,
        engineLoadPct: 92.0,
      },
      diagnosticSteps: [
        { stepNumber: 1, instruction: 'Verify Phase-U gate drive optocoupler signal with 100MHz scope.', expectedReading: 'Square wave 0-15V with < 20ns rise time' },
        { stepNumber: 2, instruction: 'Check desaturation detection diode circuit D402.', expectedReading: 'Forward voltage 0.68V ± 0.05V' },
        { stepNumber: 3, instruction: 'Perform stator phase-to-phase winding insulation resistance test.', expectedReading: '> 500 MΩ at 1000V DC' },
      ],
      suggestedParts: [
        { partNumber: 'OEM-SIC-MOD-U', partName: 'SiC Power MOSFET Inverter Block (Phase U)', estimatedCostUsd: 1350.00 },
        { partNumber: 'OEM-GAT-DRV8', partName: 'Isolated Gate Driver Daughterboard', estimatedCostUsd: 195.00 },
      ],
    },
  },
  {
    id: 'FAULT-P0A80',
    name: 'HV Battery Pack Cell Voltage Delta Spike',
    code: 'P0A80',
    subsystem: 'Energy Storage System',
    severity: 'CRITICAL',
    description: 'Module 4 cell delta exceeded 140mV threshold during high-draw discharge.',
    targetComponentId: 'CMP-01',
    impactScore: 32,
    dtcObj: {
      id: 'DTC-INJ-02',
      code: 'P0A80',
      standard: 'SAE_J2012',
      system: 'HIGH_VOLTAGE',
      severity: 'CRITICAL',
      title: 'Replace High Voltage Battery Module / Cell Imbalance',
      description: 'Internal resistance divergence detected on Brick #04.',
      status: 'ACTIVE',
      detectedTimestamp: new Date().toISOString(),
      freezeFrame: {
        engineRpm: 5200,
        vehicleSpeed: 102.0,
        coolantTemp: 88.0,
        throttlePos: 65.0,
        batteryVoltage: 710.0,
        engineLoadPct: 80.0,
      },
      diagnosticSteps: [
        { stepNumber: 1, instruction: 'Run automated passive balancing cycle via UDS Service $31.', expectedReading: 'Delta mV < 15mV after 4 hours' },
        { stepNumber: 2, instruction: 'Perform 1C charge/discharge capacity verification on Brick 4.', expectedReading: 'Capacity > 90% of nominal 180Ah' },
      ],
      suggestedParts: [
        { partNumber: 'OEM-BAT-MOD4', partName: '800V Cell Module (12S3P Replacement Pack)', estimatedCostUsd: 2200.00 },
      ],
    },
  },
  {
    id: 'FAULT-P0128',
    name: 'Coolant Thermostat Stuck Open',
    code: 'P0128',
    subsystem: 'Thermal Management',
    severity: 'MAJOR',
    description: 'Engine runtime > 20 mins with coolant failing to reach 85°C operating band.',
    targetComponentId: 'CMP-04',
    impactScore: 45,
    dtcObj: {
      id: 'DTC-INJ-03',
      code: 'P0128',
      standard: 'SAE_J2012',
      system: 'POWERTRAIN',
      severity: 'MAJOR',
      title: 'Coolant Temp Below Regulating Temperature',
      description: 'Thermostat bypass valve mechanically stuck open in cooling loop.',
      status: 'ACTIVE',
      detectedTimestamp: new Date().toISOString(),
      freezeFrame: {
        engineRpm: 2400,
        vehicleSpeed: 80.0,
        coolantTemp: 64.0,
        throttlePos: 25.0,
        batteryVoltage: 780.0,
        engineLoadPct: 32.0,
      },
      diagnosticSteps: [
        { stepNumber: 1, instruction: 'Inspect electronic wax motor thermostat connector and harness.', expectedReading: '12V battery reference on Pin 1' },
        { stepNumber: 2, instruction: 'Measure heater circuit coil resistance.', expectedReading: '14.5 Ω to 17.5 Ω at 20°C' },
      ],
      suggestedParts: [
        { partNumber: 'OEM-THM-8820', partName: 'Electronic Thermostat Assembly with Integrated Temp Sensor', estimatedCostUsd: 125.00 },
      ],
    },
  },
  {
    id: 'FAULT-B1020',
    name: 'Brake Friction Pad Wear Boundary (3.1mm)',
    code: 'B1020',
    subsystem: 'Chassis & Brakes',
    severity: 'MAJOR',
    description: 'Wear probe circuit triggered on front-left caliper friction pad.',
    targetComponentId: 'CMP-02',
    impactScore: 35,
    dtcObj: {
      id: 'DTC-INJ-04',
      code: 'B1020',
      standard: 'ISO_14229',
      system: 'CHASSIS',
      severity: 'MAJOR',
      title: 'Brake Pad Lining Wear Sensor Circuit Low',
      description: 'Continuous ground fault triggered by contact with carbon-ceramic disc rotor.',
      status: 'ACTIVE',
      detectedTimestamp: new Date().toISOString(),
      freezeFrame: {
        engineRpm: 3400,
        vehicleSpeed: 72.0,
        coolantTemp: 82.0,
        throttlePos: 0.0,
        batteryVoltage: 784.0,
        engineLoadPct: 15.0,
      },
      diagnosticSteps: [
        { stepNumber: 1, instruction: 'Measure disc rotor thickness with micrometer at 8 points.', expectedReading: 'Minimum 32.0mm thickness across friction surface' },
        { stepNumber: 2, instruction: 'Verify caliper slide pins are free of corrosion and lubricated with synthetic silicone grease.', expectedReading: 'Smooth manual floating travel' },
      ],
      suggestedParts: [
        { partNumber: 'OEM-PAD-FRT-E7', partName: 'Performance Ceramic Brake Pad Set (Front Axle)', estimatedCostUsd: 240.00 },
      ],
    },
  },
];
