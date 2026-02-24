import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { WHATSAPP } from '../lib/constants';

export default function WhatsAppButton() {
  const [showPing, setShowPing] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowPing(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <a
      href={WHATSAPP}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-whatsapp text-white rounded-full shadow-[0_8px_30px_rgba(37,211,102,0.4)] hover:scale-110 transition-transform duration-300 group"
    >
      {showPing && (
        <div className="absolute inset-0 rounded-full border-2 border-whatsapp animate-ping opacity-75" />
      )}
      <MessageCircle size={28} strokeWidth={1.5} className="relative z-10" />
    </a>
  );
}
