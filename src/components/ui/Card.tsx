import { clsx } from 'clsx';
import { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  glow?: boolean;
}

export function Card({ glow = false, className, children, ...props }: CardProps) {
  return (
    <div
      className={clsx(
        'bg-surface border border-border rounded-xl p-6 transition-all duration-300',
        glow && 'hover:border-gold/50 hover:shadow-[0_0_30px_rgba(201,168,76,0.1)]',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
