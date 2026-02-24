import React from 'react';

export interface SectionLabelProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

export const SectionLabel: React.FC<SectionLabelProps> = ({ children, className = '', ...props }) => {
  return (
    <span 
      className={`text-accent uppercase tracking-[3px] text-[13px] font-semibold mb-4 block ${className}`} 
      {...props}
    >
      {children}
    </span>
  );
};
