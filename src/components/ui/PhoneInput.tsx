import React, { ChangeEvent, FocusEvent } from 'react';

export interface PhoneInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  value: string;
  onComplete?: (phone: string) => void;
  onChange?: (phone: string) => void;
  dark?: boolean;
}

const formatPhone = (input: string) => {
  let numbers = input.replace(/\D/g, '');

  if (numbers.length === 0) {
    return '';
  }

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

export const PhoneInput: React.FC<PhoneInputProps> = ({ value, onComplete, onChange, dark, className = '', ...props }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;

    if (input.length < value.length && (input === '+7 ' || input === '+7' || input === '+')) {
      if (onChange) onChange('');
      return;
    }

    const formatted = formatPhone(input);
    if (onChange) onChange(formatted);

    const rawNumbers = formatted.replace(/\D/g, '');
    if (rawNumbers.length === 11 && onComplete) {
      onComplete(formatted);
    }
  };

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    if (!value) {
      if (onChange) onChange('+7 (');
    }
    if (props.onFocus) props.onFocus(e);
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    if (value === '+7 (' || value === '+7') {
      if (onChange) onChange('');
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
      className={`w-full rounded-sm px-6 py-4 border focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors ${
        dark
          ? 'bg-bg-dark-alt border-white/10 text-white placeholder:text-text-muted'
          : 'bg-transparent border-border text-text placeholder:text-text-secondary'
      } ${className}`}
      {...props}
    />
  );
};
