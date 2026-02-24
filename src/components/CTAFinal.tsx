import React, { useState } from 'react';
import { motion } from 'motion/react';
import { SectionLabel } from './ui/SectionLabel';
import { Button } from './ui/Button';
import { PhoneInput } from './ui/PhoneInput';
import { sendLead } from '../lib/send-lead';

export default function CTAFinal() {
  const [phone, setPhone] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async () => {
    if (phone.replace(/\D/g, '').length < 11) return;
    setError(false);

    const success = await sendLead({
      phone,
      source: 'Подвал (CTAFinal)'
    });

    if (success) {
      setIsSent(true);
    } else {
      setError(true);
    }
  };

  return (
    <section className="py-24 bg-bg-dark-alt border-t border-white/5 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <SectionLabel className="mx-auto">ОСТАЛИСЬ СОМНЕНИЯ?</SectionLabel>
        <h2 className="text-[36px] md:text-[56px] leading-[1.1] font-serif text-white mb-6">
          Давайте обсудим ваш проект
        </h2>
        <p className="text-text-muted text-[16px] md:text-[18px] mb-12 max-w-2xl mx-auto">
          Оставьте номер телефона. Наш дизайнер перезвонит в течение 15 минут, ответит на вопросы и договорится о бесплатном замере.
        </p>

        {isSent ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-bg-dark-deep border border-white/10 p-8 rounded-sm inline-block"
          >
            <h3 className="text-2xl font-serif text-white mb-2">Спасибо за заявку!</h3>
            <p className="text-text-muted">Мы перезвоним вам в ближайшее время.</p>
          </motion.div>
        ) : (
          <>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-xl mx-auto">
              <PhoneInput
                value={phone}
                onChange={setPhone}
                dark
                className="sm:w-2/3"
              />
              <Button
                onClick={handleSubmit}
                disabled={phone.replace(/\D/g, '').length < 11}
                className="sm:w-1/3 disabled:opacity-50"
              >
                Жду звонка
              </Button>
            </div>
            {error && (
              <p className="mt-4 text-sm text-red-400">
                Не удалось отправить заявку. Пожалуйста, позвоните нам напрямую.
              </p>
            )}
          </>
        )}
        <p className="text-xs text-text-muted mt-6 opacity-60">
          Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
        </p>
      </div>
    </section>
  );
}
