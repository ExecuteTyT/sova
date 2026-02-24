import React, { useState, ChangeEvent, FocusEvent } from 'react';

export interface PhoneInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onComplete?: (phone: string) => void;
  onChange?: (phone: string) => void;
}

export const PhoneInput: React.FC<PhoneInputProps> = ({ onComplete, onChange, className = '', ...props }) => {
  const [value, setValue] = useState('');

  const formatPhone = (input: string) => {
    let numbers = input.replace(/\D/g, '');
    
    if (numbers.length === 0) {
      return '';
    }

    // Handle initial input logic (8, 7, 9)
    if (numbers[0] === '8' || numbers[0] === '7') {
      numbers = '7' + numbers.substring(1);
    } else if (numbers[0] === '9') {
      numbers = '79' + numbers.substring(1);
    } else {
      numbers = '7' + numbers;
    }

    let res = '+7';
    if (numbers.length > 1) {
      res += ' (' + numbers.substring(1, 4);
    }
    if (numbers.length >= 5) {
      res += ') ' + numbers.substring(4, 7);
    }
    if (numbers.length >= 8) {
      res += '-' + numbers.substring(7, 9);
    }
    if (numbers.length >= 10) {
      res += '-' + numbers.substring(9, 11);
    }
    return res;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value;
    
    // Handle deletion of the prefix gracefully
    if (input.length < value.length && (input === '+7 ' || input === '+7' || input === '+')) {
      setValue('');
      if (onChange) onChange('');
      return;
    }

    const formatted = formatPhone(input);
    setValue(formatted);
    
    if (onChange) {
      onChange(formatted);
    }

    const rawNumbers = formatted.replace(/\D/g, '');
    if (rawNumbers.length === 11 && onComplete) {
      onComplete(formatted);
    }
  };

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    if (!value) {
      setValue('+7 (');
    }
    if (props.onFocus) props.onFocus(e);
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    if (value === '+7 (' || value === '+7') {
      setValue('');
    }
    if (props.onBlur) props.onBlur(e);
  };

  return (
    <input
      type="tel"
      value={value}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      placeholder="+7 (___) ___-__-__"
      className={`w-full bg-transparent border border-border rounded-sm px-6 py-4 text-text placeholder:text-text-secondary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors ${className}`}
      {...props}
    />
  );
};
