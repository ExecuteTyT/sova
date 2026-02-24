import React from 'react';
import { motion } from 'motion/react';
import { SectionLabel } from './ui/SectionLabel';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  visible: { transition: { staggerChildren: 0.1 } }
};

const STEPS = [
  { num: '01', title: 'Заявка', desc: 'Оставляете заявку или звоните. Перезвоним за 15 минут.', time: 'День 1' },
  { num: '02', title: 'Замер', desc: 'Бесплатно приезжаем, замеряем. Привозим образцы материалов.', time: 'День 2-3' },
  { num: '03', title: '3D-проект', desc: 'Создаём визуализацию. Правки до вашего «Идеально».', time: 'День 4-7' },
  { num: '04', title: 'Договор', desc: 'Фиксируем цену и сроки. Без доплат. Предоплата 30%.', time: 'День 8' },
  { num: '05', title: 'Производство', desc: 'Изготавливаем в своём цеху. Фото процесса в WhatsApp.', time: '25 дней' },
  { num: '06', title: 'Монтаж', desc: 'Доставка + установка бесплатно. Гарантия 5 лет.', time: '1-2 дня' },
];

export default function Process() {
  return (
    <section id="process" className="py-24 bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="mb-20"
        >
          <motion.div variants={fadeUp}>
            <SectionLabel>КАК МЫ РАБОТАЕМ</SectionLabel>
            <h2 className="text-[36px] md:text-[48px] leading-[1.1] font-serif text-primary mb-6">
              От заявки до готовой мебели — 6 шагов
            </h2>
            <p className="text-text-secondary text-[16px] md:text-[18px] max-w-2xl">
              Весь процесс занимает 30-35 дней. Вы в курсе на каждом этапе. Никаких скрытых платежей и задержек.
            </p>
          </motion.div>
        </motion.div>

        <div className="relative">
          {/* Horizontal Line for Desktop */}
          <div className="hidden md:block absolute top-[120px] left-0 w-full h-[1px] bg-border"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-4">
            {STEPS.map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative flex flex-col pt-8 md:pt-0"
              >
                {/* Vertical Line for Mobile */}
                <div className="md:hidden absolute left-0 top-0 w-[1px] h-full bg-border"></div>
                
                {/* Number Watermark */}
                <div className="absolute top-0 md:top-4 left-4 md:left-0 font-serif text-[80px] leading-none text-primary opacity-5 select-none pointer-events-none z-0">
                  {step.num}
                </div>

                <div className="relative z-10 pl-8 md:pl-0">
                  <div className="hidden md:flex items-center mb-16">
                    <div className="w-2 h-2 rounded-full bg-accent"></div>
                  </div>
                  <div className="md:hidden absolute left-[-4px] top-10 w-2 h-2 rounded-full bg-accent"></div>

                  <div className="text-xs font-medium uppercase tracking-widest text-accent mb-3">
                    {step.time}
                  </div>
                  <h3 className="font-serif text-[24px] text-primary mb-3">{step.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
