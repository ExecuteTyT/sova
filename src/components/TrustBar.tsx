import React from 'react';
import { Check } from 'lucide-react';

export default function TrustBar() {
  const items = [
    'Собственное производство',
    'Гарантия 5 лет',
    'Премиум-материалы из Европы',
    'Рассрочка 0%'
  ];

  return (
    <div className="bg-bg-dark py-6 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center sm:justify-between items-center gap-6 sm:gap-4">
          {items.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <Check size={18} strokeWidth={1.5} className="text-accent" />
              <span className="text-white text-sm tracking-wide">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
