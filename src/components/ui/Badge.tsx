import { clsx } from 'clsx';

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'gold' | 'navy' | 'default';
}

export function Badge({ children, className, variant = 'default' }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center px-3 py-1 rounded-full text-xs font-body font-medium',
        {
          'bg-gold/10 text-gold border border-gold/20': variant === 'gold',
          'bg-navy text-text-secondary border border-border': variant === 'navy',
          'bg-surface text-text-secondary border border-border': variant === 'default',
        },
        className
      )}
    >
      {children}
    </span>
  );
}
