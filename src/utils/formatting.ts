export function formatNumber(val: number, decimals: number = 0): string {
  if (isNaN(val)) return '0';
  return Number(val.toFixed(decimals)).toLocaleString('en-US');
}

export function formatBytes(hexList: string[]): string {
  return hexList.join(' ');
}

export function formatTimestamp(ts: number | string): string {
  const date = typeof ts === 'number' ? new Date(ts) : new Date(ts);
  const timeStr = date.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  const ms = date.getMilliseconds().toString().padStart(3, '0');
  return `${timeStr}.${ms}`;
}

export function formatRelativeTime(isoString: string): string {
  const diff = Date.now() - new Date(isoString).getTime();
  const secs = Math.floor(diff / 1000);
  if (secs < 5) return 'Just now';
  if (secs < 60) return `${secs}s ago`;
  const mins = Math.floor(secs / 60);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  return `${hrs}h ago`;
}

export function getStatusColorClass(status: 'nominal' | 'warning' | 'critical'): {
  text: string;
  bg: string;
  border: string;
  glow: string;
  badge: string;
} {
  switch (status) {
    case 'nominal':
      return {
        text: 'text-telemetry-emerald',
        bg: 'bg-telemetry-emerald/10',
        border: 'border-telemetry-emerald/30',
        glow: 'shadow-emerald-glow',
        badge: 'bg-telemetry-emerald/20 text-telemetry-emerald border border-telemetry-emerald/40',
      };
    case 'warning':
      return {
        text: 'text-signal-amber',
        bg: 'bg-signal-amber/10',
        border: 'border-signal-amber/30',
        glow: 'shadow-amber-glow',
        badge: 'bg-signal-amber/20 text-signal-amber border border-signal-amber/40',
      };
    case 'critical':
      return {
        text: 'text-telemetry-crimson',
        bg: 'bg-telemetry-crimson/10',
        border: 'border-telemetry-crimson/30',
        glow: 'shadow-critical-glow',
        badge: 'bg-telemetry-crimson/20 text-telemetry-crimson border border-telemetry-crimson/40',
      };
  }
}
