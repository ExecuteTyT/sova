import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/Button';
import { PhoneInput } from './ui/PhoneInput';
import { HERO_IMAGE_URL } from '../lib/constants';
import { sendLead } from '../lib/send-lead';
import { Phone, CheckCircle2 } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } }
};

export default function Hero() {
  const [phone, setPhone] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCallback = async () => {
    if (phone.replace(/\D/g, '').length < 11 || loading) return;
    setLoading(true);
    const ok = await sendLead({ phone, source: 'Герой (Быстрый звонок)' });
    setLoading(false);
    if (ok) setSent(true);
  };

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
              <span className="text-xs uppercase tracking-[0.2em] text-accent font-medium">Собственное производство · Набережные Челны</span>
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
            <motion.p variants={fadeUp} className="text-text-secondary text-sm sm:text-base leading-relaxed mb-6">
              Кухни, шкафы-купе, гардеробные и детская мебель. Изготовим за 14–21 день. Строго по вашим размерам, без посредников.
            </motion.p>

            {/* Primary CTA */}
            <motion.div variants={fadeUp} className="mb-5">
              <Button
                fullWidth
                onClick={() => document.getElementById('quiz')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Рассчитать стоимость
              </Button>
            </motion.div>

            {/* Quick callback form */}
            <motion.div variants={fadeUp}>
              <div className="relative">
                <div className="absolute inset-0 flex items-center" aria-hidden>
                  <div className="w-full border-t border-border/60" />
                </div>
                <div className="relative flex justify-center">
                  <span className="px-3 bg-bg text-[11px] text-text-secondary uppercase tracking-widest">или перезвоним вам</span>
                </div>
              </div>

              <div className="mt-4">
                {sent ? (
                  <div className="flex items-center gap-2 text-accent text-sm font-medium py-3">
                    <CheckCircle2 size={18} strokeWidth={1.5} />
                    <span>Перезвоним в течение 15 минут!</span>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <PhoneInput value={phone} onChange={setPhone} />
                    </div>
                    <button
                      onClick={handleCallback}
                      disabled={phone.replace(/\D/g, '').length < 11 || loading}
                      className="shrink-0 flex items-center justify-center w-12 h-12 bg-accent text-white rounded-sm hover:bg-accent/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                      title="Перезвоните мне"
                    >
                      <Phone size={18} strokeWidth={1.5} />
                    </button>
                  </div>
                )}
                <p className="text-[11px] text-text-secondary mt-2">
                  Ответим в течение 15 минут · Бесплатный замер по Татарстану
                </p>
              </div>
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
          <div className="w-full lg:col-span-3 flex flex-row lg:flex-col justify-between lg:justify-start gap-8 border-t-2 border-accent pt-6">
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
          <div className="w-full lg:col-span-9 relative aspect-[16/9] sm:aspect-[21/9] lg:aspect-[16/10] overflow-hidden rounded-sm shadow-custom-lg z-10 group">
            <img
              src={HERO_IMAGE_URL}
              alt="Интерьер"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              data-replace="true"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
