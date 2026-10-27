import React from 'react';

interface TechnicalBadgeProps {
  label: string;
  value?: string | number;
  variant?: 'amber' | 'cyan' | 'slate' | 'emerald' | 'crimson';
  className?: string;
  icon?: React.ReactNode;
}

export const TechnicalBadge: React.FC<TechnicalBadgeProps> = ({
  label,
  value,
  variant = 'slate',
  className = '',
  icon,
}) => {
  const variantStyles = {
    amber: 'bg-signal-amber/10 border-signal-amber/30 text-signal-amber',
    cyan: 'bg-telemetry-cyan/10 border-telemetry-cyan/30 text-telemetry-cyan',
    slate: 'bg-cockpit-800/80 border-cockpit-700 text-slate-300 dark:text-slate-300',
    emerald: 'bg-telemetry-emerald/10 border-telemetry-emerald/30 text-telemetry-emerald',
    crimson: 'bg-telemetry-crimson/10 border-telemetry-crimson/30 text-telemetry-crimson',
  }[variant];

  return (
    <div
      className={`inline-flex items-center text-xs font-mono px-2 py-0.5 rounded border ${variantStyles} ${className}`}
    >
      {icon && <span className="mr-1.5 opacity-80">{icon}</span>}
      <span className="text-[11px] opacity-75 mr-1 tracking-wider">{label}</span>
      {value !== undefined && <span className="font-semibold text-slate-100 dark:text-slate-100">{value}</span>}
    </div>
  );
};
