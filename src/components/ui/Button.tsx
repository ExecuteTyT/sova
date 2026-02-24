import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'default' | 'small' | 'large';
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'default', fullWidth, children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-sm font-medium transition-all duration-500 tracking-wide';
    
    const variants = {
      primary: 'bg-accent text-white shadow-[0_8px_30px_rgba(163,106,59,0.3)] hover:bg-accent-hover hover:shadow-[0_8px_30px_rgba(163,106,59,0.5)] hover:-translate-y-0.5',
      secondary: 'bg-transparent border border-primary text-primary hover:bg-primary hover:text-white',
      outline: 'bg-transparent border border-black/20 text-primary hover:border-primary hover:bg-bg-alt',
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
