'use client';
import { clsx } from 'clsx';
import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export function Button({ variant = 'primary', size = 'md', className, children, ...props }: ButtonProps) {
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center font-body font-medium transition-all duration-200 cursor-pointer',
        {
          'bg-gold text-black hover:bg-gold-light': variant === 'primary',
          'border border-gold text-gold hover:bg-gold hover:text-black': variant === 'secondary',
          'text-gold hover:text-gold-light underline underline-offset-2': variant === 'ghost',
          'px-4 py-2 text-sm rounded': size === 'sm',
          'px-6 py-3 text-base rounded-md': size === 'md',
          'px-8 py-4 text-lg rounded-md': size === 'lg',
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
