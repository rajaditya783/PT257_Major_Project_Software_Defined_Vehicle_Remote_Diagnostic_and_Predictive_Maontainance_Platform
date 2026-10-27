import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  size?: number;
}

// 1. Vehicle / Car Icon (Automotive silhouette)
export const CarIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    width={size}
    height={size}
    {...props}
  >
    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10l-1.5-4.5c-.3-.8-1-1.5-1.9-1.5H7.4c-.9 0-1.6.7-1.9 1.5L4 10s-2.7.6-4.5 1.1C-.7 11.3 0 12.1 0 13v3c0 .6.4 1 1 1h2" />
    <circle cx="7" cy="17" r="2.5" />
    <path d="M9.5 17h5" />
    <circle cx="17" cy="17" r="2.5" />
  </svg>
);

// 2. ECU (Electronic Control Unit / Microcontroller)
export const EcuIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    width={size}
    height={size}
    {...props}
  >
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <rect x="8" y="8" width="8" height="8" rx="1" />
    <path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3" />
  </svg>
);

// 3. CAN Bus Network Icon (Differential pair signaling)
export const CanBusIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    width={size}
    height={size}
    {...props}
  >
    <path d="M2 7h5l3 5-3 5H2" />
    <path d="M22 7h-5l-3 5 3 5h5" />
    <circle cx="12" cy="12" r="2" />
    <path d="M12 2v8M12 14v8" />
  </svg>
);

// 4. OBD-II 16-Pin Diagnostic Port Icon
export const ObdPortIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    width={size}
    height={size}
    {...props}
  >
    <path d="M4 6h16l2 6-3 6H5l-3-6 2-6z" />
    <line x1="7" y1="9" x2="7" y2="10" />
    <line x1="10" y1="9" x2="10" y2="10" />
    <line x1="14" y1="9" x2="14" y2="10" />
    <line x1="17" y1="9" x2="17" y2="10" />
    <line x1="7" y1="14" x2="7" y2="15" />
    <line x1="10" y1="14" x2="10" y2="15" />
    <line x1="14" y1="14" x2="14" y2="15" />
    <line x1="17" y1="14" x2="17" y2="15" />
  </svg>
);

// 5. Engine Block Icon
export const EngineIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    width={size}
    height={size}
    {...props}
  >
    <path d="M3 10V7a1 1 0 0 1 1-1h2V4h3v2h6V4h3v2h2a1 1 0 0 1 1 1v3h2v4h-2v4a1 1 0 0 1-1 1h-4v2h-4v-2H4a1 1 0 0 1-1-1v-4H1v-4h2z" />
    <circle cx="12" cy="12" r="2.5" />
  </svg>
);

// 6. Tachometer Gauge Icon (RPM)
export const TachometerIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    width={size}
    height={size}
    {...props}
  >
    <path d="M12 2a10 10 0 1 0 10 10" />
    <path d="M12 12l4-4" />
    <circle cx="12" cy="12" r="2" />
    <path d="M6 12h2M12 6V4M18 12h2" />
  </svg>
);

// 7. Speedometer Icon
export const SpeedometerIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    width={size}
    height={size}
    {...props}
  >
    <path d="M4.93 19.07A10 10 0 1 1 19.07 19.07" />
    <path d="M12 12l3.5-3.5" />
    <circle cx="12" cy="12" r="2" />
    <path d="M9 17h6" />
  </svg>
);

// 8. Battery Pack & Bolt Icon (EV HV Traction Battery)
export const BatteryBoltIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    width={size}
    height={size}
    {...props}
  >
    <rect x="2" y="6" width="17" height="12" rx="2" />
    <path d="M22 10v4" />
    <path d="M11 9l-3 4h4l-2 3" />
  </svg>
);

// 9. Battery Cell Array Icon (SOH & Degradation)
export const BatteryCellIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    width={size}
    height={size}
    {...props}
  >
    <rect x="3" y="5" width="4" height="14" rx="1" />
    <rect x="10" y="5" width="4" height="14" rx="1" />
    <rect x="17" y="5" width="4" height="14" rx="1" />
    <path d="M5 2v3M12 2v3M19 2v3" />
  </svg>
);

// 10. Thermal & Coolant Gauge Icon
export const ThermometerIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    width={size}
    height={size}
    {...props}
  >
    <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
    <circle cx="11.5" cy="17.5" r="1.5" fill="currentColor" />
  </svg>
);

// 11. Brake Disc & Caliper Icon
export const BrakeDiscIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    width={size}
    height={size}
    {...props}
  >
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="3" />
    <path d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4z" fill="currentColor" fillOpacity="0.2" />
    <circle cx="8" cy="8" r="1" />
    <circle cx="16" cy="8" r="1" />
    <circle cx="16" cy="16" r="1" />
    <circle cx="8" cy="16" r="1" />
  </svg>
);

// 12. Tire Pressure / TPMS Icon
export const TirePressureIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    width={size}
    height={size}
    {...props}
  >
    <path d="M5 19h14c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2z" />
    <path d="M8 7v12M16 7v12M12 7v12" strokeDasharray="2 2" />
    <path d="M12 2v3M9 3l3 2 3-2" />
  </svg>
);

// 13. Alert Triangle Icon (Warning)
export const AlertTriangleIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    width={size}
    height={size}
    {...props}
  >
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <circle cx="12" cy="17" r="1" fill="currentColor" />
  </svg>
);

// 14. Alert Octagon Icon (Critical Hazard / Stop)
export const AlertOctagonIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    width={size}
    height={size}
    {...props}
  >
    <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <circle cx="12" cy="16" r="1" fill="currentColor" />
  </svg>
);

// 15. Shield Check Icon (Healthy / Nominal)
export const ShieldCheckIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    width={size}
    height={size}
    {...props}
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

// 16. Diagnostic Wrench / Tool Icon
export const WrenchIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    width={size}
    height={size}
    {...props}
  >
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>
);

// 17. Diagnostic Decision Tree Icon
export const DiagnosticTreeIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    width={size}
    height={size}
    {...props}
  >
    <rect x="9" y="2" width="6" height="4" rx="1" />
    <rect x="2" y="18" width="6" height="4" rx="1" />
    <rect x="16" y="18" width="6" height="4" rx="1" />
    <path d="M12 6v6m0 0H5v6m7-6h7v6" />
  </svg>
);

// 18. Weibull / RUL Predictive Curve Icon
export const WeibullCurveIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    width={size}
    height={size}
    {...props}
  >
    <path d="M3 21h18" />
    <path d="M3 3v18" />
    <path d="M3 5c6 0 10 8 18 13" />
    <circle cx="16" cy="14" r="2" fill="currentColor" />
  </svg>
);

// 19. Oscilloscope / Live Signal Wave Icon
export const OscilloscopeIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    width={size}
    height={size}
    {...props}
  >
    <rect x="2" y="3" width="20" height="18" rx="2" />
    <path d="M5 12h3l2-6 4 12 2-6h3" />
  </svg>
);

// 20. Telematics / Cellular / WiFi Stream Icon
export const WifiStreamIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    width={size}
    height={size}
    {...props}
  >
    <path d="M5 12.55a11 11 0 0 1 14.08 0" />
    <path d="M1.42 9a16 16 0 0 1 21.16 0" />
    <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
    <circle cx="12" cy="20" r="1.5" fill="currentColor" />
  </svg>
);

// 21. Satellite GPS Tracking Icon
export const SatelliteGpsIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    width={size}
    height={size}
    {...props}
  >
    <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

// 22. CPU Chip / HPC Gateway Icon
export const CpuChipIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    width={size}
    height={size}
    {...props}
  >
    <rect x="5.5" y="5.5" width="13" height="13" rx="2" />
    <path d="M9 1v4.5M15 1v4.5M9 18.5V23M15 18.5V23M1 9h4.5M1 15h4.5M18.5 9H23M18.5 15H23" />
  </svg>
);

// 23. Architecture Layers Icon
export const LayersIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    width={size}
    height={size}
    {...props}
  >
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
);

// 24. Refresh / Sync Icon
export const RefreshCwIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    width={size}
    height={size}
    {...props}
  >
    <path d="M23 4v6h-6" />
    <path d="M1 20v-6h6" />
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
  </svg>
);

// 25. Search Icon
export const SearchIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    width={size}
    height={size}
    {...props}
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

// 26. Filter Funnel Icon
export const FilterIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    width={size}
    height={size}
    {...props}
  >
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);

// 27. Sliders / Tuning Control Icon
export const SlidersIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    width={size}
    height={size}
    {...props}
  >
    <line x1="4" y1="21" x2="4" y2="14" />
    <line x1="4" y1="10" x2="4" y2="3" />
    <line x1="12" y1="21" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12" y2="3" />
    <line x1="20" y1="21" x2="20" y2="16" />
    <line x1="20" y1="12" x2="20" y2="3" />
    <line x1="1" y1="14" x2="7" y2="14" />
    <line x1="9" y1="8" x2="15" y2="8" />
    <line x1="17" y1="16" x2="23" y2="16" />
  </svg>
);

// 28. Clock / Timestamp Icon
export const ClockIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    width={size}
    height={size}
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

// 29. Download / Export Icon
export const DownloadIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    width={size}
    height={size}
    {...props}
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

// 30. Zap / High Voltage Icon
export const ZapIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    width={size}
    height={size}
    {...props}
  >
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

// 31. Activity / Heartbeat Icon
export const ActivityIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    width={size}
    height={size}
    {...props}
  >
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

// 32. Check Circle Icon
export const CheckCircleIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    width={size}
    height={size}
    {...props}
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

// 33. X Circle Icon
export const XCircleIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    width={size}
    height={size}
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="15" y1="9" x2="9" y2="15" />
    <line x1="9" y1="9" x2="15" y2="15" />
  </svg>
);

// 34. Bug / Fault Injection Icon
export const BugFaultIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    width={size}
    height={size}
    {...props}
  >
    <rect width="8" height="14" x="8" y="6" rx="4" />
    <path d="m19 7-3 2M5 7l3 2M19 17l-3-2M5 17l3-2M20 12h-4M4 12h4M10 2l1 4M14 2l-1 4" />
  </svg>
);

// 35. File Text / Report Icon
export const FileTextIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    width={size}
    height={size}
    {...props}
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

// 36. Users / Fleet Operator Icon
export const UsersIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    width={size}
    height={size}
    {...props}
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

// 37. Sun / Light Mode Icon
export const SunIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    width={size}
    height={size}
    {...props}
  >
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

// 38. Moon / Dark Mode Icon
export const MoonIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    width={size}
    height={size}
    {...props}
  >
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

// 39. Chevron Right Icon
export const ChevronRightIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    width={size}
    height={size}
    {...props}
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

// 40. Chevron Down Icon
export const ChevronDownIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    width={size}
    height={size}
    {...props}
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

// 41. Arrow Up Right Icon
export const ArrowUpRightIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    width={size}
    height={size}
    {...props}
  >
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="7 7 17 7 17 17" />
  </svg>
);

// 42. Play Icon
export const PlayIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="none"
    className={className}
    width={size}
    height={size}
    {...props}
  >
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);

// 43. Pause Icon
export const PauseIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="none"
    className={className}
    width={size}
    height={size}
    {...props}
  >
    <rect x="6" y="4" width="4" height="16" rx="1" />
    <rect x="14" y="4" width="4" height="16" rx="1" />
  </svg>
);

// 44. Info Icon
export const InfoIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    width={size}
    height={size}
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

// 45. Calendar Icon
export const CalendarIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    width={size}
    height={size}
    {...props}
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

// 46. Server Icon
export const ServerIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    width={size}
    height={size}
    {...props}
  >
    <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
    <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
    <line x1="6" y1="6" x2="6.01" y2="6" />
    <line x1="6" y1="18" x2="6.01" y2="18" />
  </svg>
);

// 47. Database Icon
export const DatabaseIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    width={size}
    height={size}
    {...props}
  >
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
  </svg>
);

