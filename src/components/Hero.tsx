import React from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/Button';
import { HERO_IMAGE_URL } from '../lib/constants';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } }
};

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] flex flex-col justify-between bg-bg pt-24 pb-8 lg:pt-32 lg:pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto w-full flex-grow flex flex-col justify-center">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-12 lg:items-end mb-8 lg:mb-16">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="lg:col-span-8"
          >
            <motion.div variants={fadeUp} className="mb-6 flex items-center gap-4">
              <div className="h-px w-12 bg-accent"></div>
              <span className="text-xs uppercase tracking-[0.2em] text-accent font-medium">Собственное производство</span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="font-serif text-[50px] sm:text-[80px] lg:text-[110px] leading-[0.9] tracking-[-0.02em] text-primary uppercase">
              Мебель <br />
              <span className="text-accent italic lowercase">на заказ</span> <br />
              Архитектура <br />
              <span className="italic">комфорта</span>
            </motion.h1>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="lg:col-span-4 lg:pb-4"
          >
            <motion.p variants={fadeUp} className="text-text-secondary text-sm sm:text-base leading-relaxed mb-8">
              Кухни, шкафы-купе, гардеробные и детская мебель. Изготовим за 25 дней с гарантией 5 лет. Строго по вашим размерам, без посредников.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
              <Button onClick={() => document.getElementById('quiz')?.scrollIntoView({ behavior: 'smooth' })}>
                Рассчитать стоимость
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Image & Metrics */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col-reverse lg:grid lg:grid-cols-12 gap-8 items-start relative mt-8 lg:mt-0"
        >
          <div className="w-full lg:col-span-3 flex flex-row lg:flex-col justify-between lg:justify-start gap-8 border-t border-border pt-6">
            <div className="flex flex-col">
              <span className="font-serif text-3xl lg:text-4xl text-primary mb-1">12+</span>
              <span className="text-[10px] lg:text-xs uppercase tracking-widest text-text-secondary">Лет опыта</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-3xl lg:text-4xl text-primary mb-1">216</span>
              <span className="text-[10px] lg:text-xs uppercase tracking-widest text-text-secondary">Проектов</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-3xl lg:text-4xl text-primary mb-1">4.9</span>
              <span className="text-[10px] lg:text-xs uppercase tracking-widest text-text-secondary">Рейтинг</span>
            </div>
          </div>
          <div className="w-full lg:col-span-9 relative aspect-[16/9] sm:aspect-[21/9] lg:aspect-[16/10] overflow-hidden rounded-sm shadow-2xl z-10">
             <img 
               src={HERO_IMAGE_URL} 
               alt="Интерьер" 
               className="w-full h-full object-cover grayscale-[20%] hover:scale-105 transition-transform duration-1000"
               data-replace="true"
             />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

