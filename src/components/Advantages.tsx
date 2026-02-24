import React from 'react';
import { motion } from 'motion/react';
import { SectionLabel } from './ui/SectionLabel';
import { FileCheck, Clock, ShieldCheck, Box } from 'lucide-react';
import { CRAFTSMAN_IMAGE_URL } from '../lib/constants';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  visible: { transition: { staggerChildren: 0.1 } }
};

export default function Advantages() {
  const advantages = [
    {
      icon: FileCheck,
      title: 'Честная цена',
      desc: 'Собственное производство — цены на 20-30% ниже салонов. Средний чек 350 000 ₽.'
    },
    {
      icon: Clock,
      title: 'Сроки от 25 дней',
      desc: 'Фиксируем в договоре. За просрочку — неустойка (но такого ещё не было).'
    },
    {
      icon: ShieldCheck,
      title: 'Гарантия 5 лет',
      desc: 'Фурнитура Blum и Hettich. Уверены в качестве на 100%.'
    },
    {
      icon: Box,
      title: 'Бесплатный проект',
      desc: 'Дизайнер приедет с образцами, замерит и составит 3D-проект.'
    }
  ];

  return (
    <section id="advantages" className="py-24 bg-bg-alt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-16 items-center">
          
          {/* Left Column */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeUp}>
              <SectionLabel>ПРЕИМУЩЕСТВА</SectionLabel>
              <h2 className="text-[36px] md:text-[48px] leading-[1.1] font-serif text-primary mb-6">
                Почему 200+ семей доверили нам свои квартиры?
              </h2>
              <p className="text-text-secondary text-[16px] md:text-[18px] mb-12">
                Мы не просто делаем мебель — мы создаём пространство для жизни, продуманное до миллиметра.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {advantages.map((adv, index) => (
                <motion.div key={index} variants={fadeUp} className="flex flex-col gap-4">
                  <div className="w-12 h-12 rounded-sm border border-border flex items-center justify-center bg-white">
                    <adv.icon strokeWidth={1} size={24} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="font-medium text-primary text-lg mb-2">{adv.title}</h3>
                    <p className="text-sm text-text-secondary leading-relaxed">{adv.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
              <img 
                src={CRAFTSMAN_IMAGE_URL} 
                alt="Мастер за работой" 
                className="w-full h-full object-cover grayscale-[10%]"
                data-replace="true"
              />
            </div>
            
            <div className="absolute -bottom-8 -left-8 md:-left-12 max-w-[300px] backdrop-blur-xl bg-white/90 border border-black/5 p-8 rounded-sm shadow-custom-lg">
              <p className="font-serif italic text-xl text-primary leading-snug">
                «Качество — это когда возвращается заказчик, а не товар.»
              </p>
              <div className="mt-4 w-8 h-[1px] bg-accent"></div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
