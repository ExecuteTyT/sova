import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { Button } from './ui/Button';
import { PhoneInput } from './ui/PhoneInput';
import { sendLead } from '../lib/send-lead';

export default function TimedPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [phone, setPhone] = useState('');

  useEffect(() => {
    const isClosed = sessionStorage.getItem('popupClosed');
    if (!isClosed) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 35000); // 35 seconds
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('popupClosed', 'true');
  };

  const handleSubmit = async () => {
    if (phone.replace(/\D/g, '').length < 11) return;
    
    await sendLead({
      phone,
      source: 'Всплывающее окно (Каталог)'
    });
    
    handleClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 sm:p-6 pointer-events-none">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            onClick={handleClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-auto sm:hidden"
          />
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-md bg-[#141414] border border-white/10 rounded-sm shadow-2xl p-8 pointer-events-auto z-10"
          >
            <button 
              onClick={handleClose}
              className="absolute top-4 right-4 text-[#A1A1AA] hover:text-white transition-colors"
            >
              <X size={20} strokeWidth={1.5} />
            </button>
            
            <h3 className="text-[24px] font-serif text-white mb-3 leading-tight">
              Выбираете мебель?
            </h3>
            <p className="text-[#A1A1AA] text-sm mb-6 leading-relaxed">
              Получите PDF-каталог наших лучших проектов с реальными сметами за этот год.
            </p>
            
            <div className="space-y-4">
              <PhoneInput 
                value={phone} 
                onChange={setPhone} 
                className="!bg-[#1A1A1A] !border-white/10 !text-white !placeholder-[#A1A1AA]"
              />
              <Button 
                fullWidth 
                onClick={handleSubmit}
                disabled={phone.replace(/\D/g, '').length < 11}
                className="disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Получить каталог в WhatsApp
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
