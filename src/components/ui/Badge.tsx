import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({ children, icon, className = '', ...props }) => {
  return (
    <span 
      className={`border border-border text-primary rounded-sm text-[11px] uppercase tracking-widest px-3 py-1.5 inline-flex items-center gap-2 ${className}`} 
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </span>
  );
};
