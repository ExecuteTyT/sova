import React from 'react';
import { motion } from 'motion/react';
import { SectionLabel } from './ui/SectionLabel';
import { Button } from './ui/Button';
import { Check } from 'lucide-react';
import { fadeUp, staggerContainer } from '../lib/motion';

const PACKAGES = [
  {
    name: 'Стандарт',
    desc: 'Для тех, кому важна цена',
    price: 'от 120 000 ₽',
    features: [
      'ЛДСП Egger 16мм',
      'Фасады ЛДСП Egger',
      'Фурнитура Boyard',
      'Столешница 26мм',
      'Замер + 3D проект',
      'Доставка + монтаж'
    ],
    missing: ['Доводчики', 'Подсветка', 'Дизайн интерьера'],
    highlight: false
  },
  {
    name: 'Комфорт',
    desc: 'Оптимальный выбор',
    price: 'от 250 000 ₽',
    badge: 'Популярный',
    features: [
      'ЛДСП Egger 18мм',
      'МДФ плёнка / эмаль',
      'Фурнитура Blum',
      'Столешница 38мм влагост.',
      'Доводчики на все ящики',
      'Подсветка рабочей зоны',
      'Замер + 3D проект',
      'Доставка + монтаж'
    ],
    missing: ['Дизайн интерьера'],
    highlight: true
  },
  {
    name: 'Премиум',
    desc: 'Максимум качества',
    price: 'от 450 000 ₽',
    features: [
      'ЛДСП Egger 18мм',
      'Фасады МДФ эмаль',
      'Фурнитура Hettich',
      'Кварц / искусств. камень',
      'Доводчики премиум',
      'Встроенная подсветка',
      'Дизайн-проект интерьера',
      'Замер + 3D проект',
      'Доставка + монтаж'
    ],
    missing: [],
    highlight: false
  }
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-bg-alt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.div variants={fadeUp}>
            <SectionLabel className="mx-auto">СТОИМОСТЬ</SectionLabel>
            <h2 className="text-[36px] md:text-[48px] leading-[1.1] font-serif text-primary mb-6">
              Прозрачные цены без сюрпризов
            </h2>
            <p className="text-text-secondary text-[16px] md:text-[18px] max-w-2xl mx-auto">
              Точную стоимость рассчитаем после замера. Вот ориентиры для понимания бюджета:
            </p>
          </motion.div>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-4 pb-8 md:grid md:grid-cols-3 md:gap-8 md:overflow-visible items-center -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0"
        >
          {PACKAGES.map((pkg, idx) => (
            <motion.div 
              key={idx} 
              variants={fadeUp}
              className={`relative p-8 md:p-10 rounded-sm border transition-all duration-500 w-[85vw] shrink-0 snap-center md:w-auto ${
                pkg.highlight 
                  ? 'bg-bg-dark-alt border-transparent shadow-2xl transform md:scale-[1.03]' 
                  : 'bg-white border-border hover:border-accent/30'
              }`}
            >
              {pkg.badge && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent text-white text-[10px] uppercase tracking-widest font-medium px-4 py-1.5 rounded-sm">
                  {pkg.badge}
                </div>
              )}
              
              <div className="text-center mb-8 pb-8 border-b border-border/50">
                <h3 className={`font-serif text-[28px] mb-2 ${pkg.highlight ? 'text-white' : 'text-primary'}`}>
                  {pkg.name}
                </h3>
                <p className={`text-sm mb-6 ${pkg.highlight ? 'text-text-muted' : 'text-text-secondary'}`}>
                  {pkg.desc}
                </p>
                <div className={`text-[32px] font-medium ${pkg.highlight ? 'text-white' : 'text-primary'}`}>
                  {pkg.price}
                </div>
              </div>

              <ul className="space-y-4 mb-10">
                {pkg.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check size={18} strokeWidth={2} className="text-accent shrink-0 mt-0.5" />
                    <span className={`text-sm ${pkg.highlight ? 'text-white/90' : 'text-primary'}`}>
                      {feat}
                    </span>
                  </li>
                ))}
                {pkg.missing.map((feat, i) => (
                  <li key={`m-${i}`} className="flex items-start gap-3 opacity-40">
                    <span className="w-[18px] flex justify-center text-xs mt-0.5">—</span>
                    <span className={`text-sm ${pkg.highlight ? 'text-white/90' : 'text-primary'}`}>
                      {feat}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                fullWidth
                variant={pkg.highlight ? 'primary' : 'outline'}
                onClick={() => document.getElementById('quiz')?.scrollIntoView({ behavior: 'smooth' })}
              >
                {pkg.highlight ? 'Рассчитать' : 'Подробнее'}
              </Button>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-16 text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-text-secondary">
            💳 Рассрочка 0% на 3-6 месяцев. Первый взнос от 30%
          </p>
        </div>
      </div>
    </section>
  );
}
