import React from 'react';

interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  subValue?: string;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'stable' | 'warning' | 'critical';
  trendLabel?: string;
  threshold?: string;
  accentColor?: 'amber' | 'cyan' | 'emerald' | 'crimson' | 'none';
  className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  unit,
  subValue,
  icon,
  trend,
  trendLabel,
  threshold,
  accentColor = 'none',
  className = '',
}) => {
  const accentBorder = {
    amber: 'border-t-2 border-t-signal-amber',
    cyan: 'border-t-2 border-t-telemetry-cyan',
    emerald: 'border-t-2 border-t-telemetry-emerald',
    crimson: 'border-t-2 border-t-telemetry-crimson',
    none: '',
  }[accentColor];

  const trendColor = {
    up: 'text-telemetry-emerald',
    down: 'text-signal-amber',
    stable: 'text-slate-400',
    warning: 'text-signal-amber font-semibold',
    critical: 'text-telemetry-crimson font-semibold animate-pulse',
  }[trend || 'stable'];

  return (
    <div
      className={`cockpit-panel rounded-lg p-4 flex flex-col justify-between transition-all duration-200 hover:border-cockpit-600 ${accentBorder} ${className}`}
    >
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-400 flex items-center gap-1.5">
          {icon && <span className="text-slate-400 opacity-90">{icon}</span>}
          {title}
        </span>
        {threshold && (
          <span className="text-[10px] font-mono text-slate-500 dark:text-slate-500 bg-cockpit-850 px-1.5 py-0.5 rounded border border-cockpit-750">
            {threshold}
          </span>
        )}
      </div>

      <div className="my-1 flex items-baseline gap-1.5">
        <span className="text-2xl lg:text-3xl font-mono font-bold tracking-tight text-slate-100 dark:text-slate-900 tabular-nums">
          {value}
        </span>
        {unit && (
          <span className="text-sm font-mono text-slate-400 dark:text-slate-500 font-medium">
            {unit}
          </span>
        )}
      </div>

      {(subValue || trendLabel) && (
        <div className="mt-2 pt-2 border-t border-cockpit-750/60 flex items-center justify-between text-xs font-mono">
          {subValue && (
            <span className="text-slate-400 dark:text-slate-500 text-[11px] truncate">
              {subValue}
            </span>
          )}
          {trendLabel && (
            <span className={`text-[11px] ml-auto ${trendColor}`}>
              {trendLabel}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
