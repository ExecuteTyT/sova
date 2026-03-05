import React from 'react';
import { Phone } from 'lucide-react';
import { PHONE_RAW } from '../lib/constants';

export default function MobileCtaBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white border-t border-border shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
      <div className="flex items-stretch h-14">
        <a
          href={`tel:${PHONE_RAW}`}
          className="flex items-center justify-center gap-2 w-2/5 border-r border-border text-primary hover:bg-bg-alt transition-colors text-sm font-medium"
        >
          <Phone size={16} strokeWidth={1.5} />
          <span>Позвонить</span>
        </a>
        <button
          onClick={() => document.getElementById('quiz')?.scrollIntoView({ behavior: 'smooth' })}
          className="flex items-center justify-center flex-1 bg-accent text-white text-sm font-medium hover:bg-accent-hover transition-colors duration-150 active:scale-[0.98]"
        >
          Получить расчёт
        </button>
      </div>
    </div>
  );
}
