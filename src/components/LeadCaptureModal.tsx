import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, Phone } from 'lucide-react';
import { Button } from './ui/Button';
import { PhoneInput } from './ui/PhoneInput';
import { sendLead } from '../lib/send-lead';

interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  source: string;
  projectTitle?: string;
}

export default function LeadCaptureModal({ isOpen, onClose, source, projectTitle }: LeadCaptureModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const isValid = name.trim().length > 0 && phone.replace(/\D/g, '').length >= 11;

  const handleSubmit = async () => {
    if (!isValid || loading) return;
    setError(false);
    setLoading(true);

    const success = await sendLead({
      name,
      phone,
      source,
    });

    setLoading(false);
    if (success) {
      setSubmitted(true);
    } else {
      setError(true);
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setName('');
      setPhone('');
      setError(false);
      setSubmitted(false);
      setLoading(false);
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-md bg-bg-dark border border-white/10 rounded-sm shadow-2xl p-8 z-10"
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-text-muted hover:text-white transition-colors"
            >
              <X size={20} strokeWidth={1.5} />
            </button>

            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-[24px] font-serif text-white mb-2 leading-tight">
                    Хотите такой же проект?
                  </h3>
                  {projectTitle && (
                    <p className="text-accent text-sm font-medium mb-3">{projectTitle}</p>
                  )}
                  <p className="text-text-muted text-sm mb-6 leading-relaxed">
                    Оставьте контакты — дизайнер свяжется с вами в течение 15 минут и подготовит расчёт.
                  </p>

                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Ваше имя"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-sm px-5 py-3.5 text-white placeholder:text-text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                    />
                    <PhoneInput
                      value={phone}
                      onChange={setPhone}
                      dark
                    />
                    <Button
                      fullWidth
                      onClick={handleSubmit}
                      disabled={!isValid || loading}
                      className="disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Отправляем...' : 'Получить расчёт'}
                    </Button>
                    {error && (
                      <p className="text-sm text-red-400 text-center">
                        Не удалось отправить. Попробуйте позже.
                      </p>
                    )}
                    <p className="text-[11px] text-text-muted text-center leading-relaxed">
                      Нажимая на кнопку, вы соглашаетесь с политикой конфиденциальности
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="text-center py-4"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", bounce: 0.5, delay: 0.1 }}
                    className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-white/10 mb-6"
                  >
                    <CheckCircle2 size={32} strokeWidth={1} className="text-accent" />
                  </motion.div>
                  <h3 className="text-[22px] font-serif text-white mb-3">
                    Спасибо, {name}!
                  </h3>
                  <div className="flex items-center justify-center gap-2 text-text-muted text-sm">
                    <Phone size={14} strokeWidth={1.5} />
                    <span>Дизайнер свяжется в течение 15 минут</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
