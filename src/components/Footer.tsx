import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-[#111111] py-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start">
            <a href="#" className="font-serif text-[24px] tracking-widest text-white uppercase mb-2">
              Mebel<span className="text-accent">Sova</span>
            </a>
            <p className="text-xs text-[#A1A1AA] uppercase tracking-widest">
              Архитектура комфорта
            </p>
          </div>

          <div className="flex gap-6">
            <a href="#" className="text-sm text-[#A1A1AA] hover:text-white transition-colors">
              Политика конфиденциальности
            </a>
            <a href="#" className="text-sm text-[#A1A1AA] hover:text-white transition-colors">
              Договор оферты
            </a>
          </div>

          <div className="text-right">
            <a href="tel:+79990000000" className="block text-lg font-serif text-white hover:text-accent transition-colors mb-1">
              +7 (999) 000-00-00
            </a>
            <p className="text-xs text-[#A1A1AA]">
              Ежедневно с 9:00 до 20:00
            </p>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/5 text-center text-xs text-[#A1A1AA] opacity-50">
          © {new Date().getFullYear()} MebelSova. Все права защищены.
        </div>
      </div>
    </footer>
  );
}
