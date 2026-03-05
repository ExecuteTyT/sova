import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'dark-outline' | 'whatsapp';
  size?: 'default' | 'small' | 'large';
  fullWidth?: boolean;
  flat?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'default', fullWidth, flat, children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-sm font-medium transition-all duration-200 tracking-wide';

    const variants = {
      primary: flat
        ? 'bg-accent text-white hover:bg-accent-hover hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(107,158,138,0.45)]'
        : 'bg-accent text-white shadow-[0_8px_30px_rgba(107,158,138,0.25)] hover:bg-accent-hover hover:shadow-[0_16px_40px_rgba(107,158,138,0.55)] hover:-translate-y-1',
      secondary: 'bg-transparent border border-primary text-primary hover:bg-primary hover:text-white',
      outline: 'bg-transparent border border-border text-primary hover:bg-primary hover:text-white hover:border-primary',
      'dark-outline': 'bg-transparent border border-white/20 text-white hover:bg-white hover:text-black',
      whatsapp: 'bg-whatsapp text-white shadow-[0_8px_30px_rgba(37,211,102,0.3)] hover:bg-whatsapp-hover hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(37,211,102,0.5)]',
    };

    const sizes = {
      default: 'px-9 py-4',
      small: 'px-6 py-2.5 text-sm',
      large: 'px-10 py-5 text-lg',
    };

    const widthClass = fullWidth ? 'w-full' : '';

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
