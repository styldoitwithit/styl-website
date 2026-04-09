import { clsx } from 'clsx';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  goldAccent?: boolean;
  className?: string;
}

export function SectionHeading({ title, subtitle, centered = true, goldAccent = false, className }: SectionHeadingProps) {
  return (
    <div className={clsx(centered && 'text-center', className)}>
      <h2 className={clsx(
        'font-heading text-4xl md:text-5xl font-semibold leading-tight',
        goldAccent ? 'text-gold' : 'text-white'
      )}>
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-text-secondary font-body text-base md:text-lg max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
      <div className={clsx('mt-4 h-0.5 w-16 bg-gold', centered && 'mx-auto')} />
    </div>
  );
}
