import { clsx } from 'clsx';

export function Spinner({ className }: { className?: string }) {
  return (
    <div
      className={clsx(
        'inline-block w-6 h-6 border-2 border-border border-t-gold rounded-full animate-spin',
        className
      )}
    />
  );
}
