import React from 'react';
import { HealthStatus, AlertSeverity } from '../../types/telemetry';
import { ShieldCheckIcon, AlertTriangleIcon, AlertOctagonIcon, InfoIcon } from '../icons';

interface StatusChipProps {
  status: HealthStatus | AlertSeverity;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  className?: string;
  labelOverride?: string;
}

export const StatusChip: React.FC<StatusChipProps> = ({
  status,
  size = 'md',
  showIcon = true,
  className = '',
  labelOverride,
}) => {
  const norm = status.toLowerCase();

  let colorClasses = 'bg-telemetry-emerald/10 text-telemetry-emerald border-telemetry-emerald/40';
  let dotColor = 'bg-telemetry-emerald';
  let Icon = ShieldCheckIcon;
  let label = labelOverride || 'Nominal';

  if (norm === 'warning' || norm === 'major') {
    colorClasses = 'bg-signal-amber/10 text-signal-amber border-signal-amber/40';
    dotColor = 'bg-signal-amber';
    Icon = AlertTriangleIcon;
    label = labelOverride || 'Warning';
  } else if (norm === 'critical') {
    colorClasses = 'bg-telemetry-crimson/15 text-telemetry-crimson border-telemetry-crimson/50 animate-pulse';
    dotColor = 'bg-telemetry-crimson';
    Icon = AlertOctagonIcon;
    label = labelOverride || 'Critical';
  } else if (norm === 'advisory' || norm === 'info' || norm === 'minor') {
    colorClasses = 'bg-telemetry-sky/10 text-telemetry-sky border-telemetry-sky/40';
    dotColor = 'bg-telemetry-sky';
    Icon = InfoIcon || ShieldCheckIcon;
    label = labelOverride || 'Advisory';
  } else if (norm === 'system') {
    colorClasses = 'bg-cockpit-600/20 text-slate-400 border-cockpit-600/40';
    dotColor = 'bg-slate-400';
    Icon = ShieldCheckIcon;
    label = labelOverride || 'System';
  }

  const sizeClasses = {
    sm: 'text-[10px] px-2 py-0.5 tracking-wider gap-1',
    md: 'text-xs px-2.5 py-1 tracking-wide gap-1.5',
    lg: 'text-sm px-3.5 py-1.5 font-medium gap-2',
  }[size];

  return (
    <span
      className={`inline-flex items-center font-mono uppercase font-semibold rounded border ${colorClasses} ${sizeClasses} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
      {showIcon && <Icon className="w-3.5 h-3.5" />}
      <span>{label}</span>
    </span>
  );
};
