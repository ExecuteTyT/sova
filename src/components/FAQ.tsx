import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SectionLabel } from './ui/SectionLabel';
import { Button } from './ui/Button';
import { Plus } from 'lucide-react';
import { WHATSAPP } from '../lib/constants';

const FAQ_DATA = [
  { q: 'Сколько стоит кухня?', a: 'От 130 000 ₽ (прямая 2м, ЛДСП) до 700 000+ ₽ (премиум с островом). Средний чек 250–350к. Точную стоимость назовём после замера и составления 3D-проекта.' },
  { q: 'Какие сроки изготовления?', a: '14–21 рабочий день. Мы фиксируем сроки в договоре и строго их соблюдаем.' },
  { q: 'Есть ли рассрочка?', a: 'Да, мы предоставляем беспроцентную рассрочку на 3–4 месяца — без первоначального взноса. Если нужна рассрочка на срок до 1 года, оформляем через банк.' },
  { q: 'Замер платный?', a: 'Нет. Выезд дизайнера, замер и составление 3D-проекта — бесплатно и ни к чему вас не обязывают. Работаем по всему Татарстану.' },
  { q: 'Какие материалы используете?', a: 'Работаем с любой фурнитурой и материалами — Blum, Hettich, Boyard, Samet, GTV и другие. Если вы где-то слышали о бренде или видели понравившуюся фурнитуру — мы с ней работаем. По корпусу используем ЛДСП Egger (Австрия), Ламарти и фасады МДФ с эмалью или плёнкой на выбор.' },
  { q: 'Какая гарантия?', a: 'Мы даём 2 года гарантии на кухни и 1 год на любую корпусную мебель — уверены в качестве материалов и сборки.' },
  { q: 'Делаете только кухни?', a: 'Нет, мы производим любую корпусную мебель на заказ: шкафы-купе, гардеробные, детские, прихожие, мебель для ванных и офисов. Также изготавливаем кровати — как отдельно, так и в комплекте с заказанной корпусной мебелью.' },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-16">
          
          {/* Left Column */}
          <div className="lg:sticky lg:top-32 h-fit">
            <SectionLabel>FAQ</SectionLabel>
            <h2 className="text-[36px] md:text-[48px] leading-[1.1] font-serif text-primary mb-6">
              Остались вопросы?
            </h2>
            <p className="text-text-secondary text-[16px] md:text-[18px] mb-8">
              Не нашли ответ на свой вопрос? Позвоните нам или напишите в WhatsApp, мы с радостью проконсультируем.
            </p>
            <Button
              variant="whatsapp"
              onClick={() => window.open(WHATSAPP, '_blank')}
            >
              Написать в WhatsApp
            </Button>
          </div>

          {/* Right Column - Accordion */}
          <div className="border-t border-border">
            {FAQ_DATA.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={index} className="border-b border-border">
                  <button
                    onClick={() => toggle(index)}
                    className="w-full py-6 flex items-center justify-between text-left focus:outline-none group"
                  >
                    <span className={`font-serif text-[22px] transition-colors duration-300 ${isOpen ? 'text-accent' : 'text-primary group-hover:text-accent'}`}>
                      {item.q}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className={`flex-shrink-0 ml-4 ${isOpen ? 'text-accent' : 'text-text-secondary group-hover:text-accent'}`}
                    >
                      <Plus strokeWidth={1.5} size={24} />
                    </motion.div>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pb-6 text-text-secondary leading-relaxed">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
