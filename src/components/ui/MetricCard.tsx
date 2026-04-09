import { clsx } from 'clsx';

interface MetricCardProps {
  value: string;
  label: string;
  direction?: 'up' | 'down';
  className?: string;
}

export function MetricCard({ value, label, direction, className }: MetricCardProps) {
  return (
    <div className={clsx(
      'bg-navy/50 border border-border rounded-lg p-4 text-center',
      className
    )}>
      <div className="flex items-center justify-center gap-1">
        {direction === 'up' && <span className="text-green-400 text-lg">↑</span>}
        {direction === 'down' && <span className="text-red-400 text-lg">↓</span>}
        <span className="font-heading text-2xl font-bold text-gold">{value}</span>
      </div>
      <p className="font-body text-xs text-text-secondary mt-1">{label}</p>
    </div>
  );
}
