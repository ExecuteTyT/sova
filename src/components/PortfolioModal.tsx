import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/Button';
import type { PortfolioItem } from '../lib/constants';

interface Props {
  item: PortfolioItem;
  onClose: () => void;
  onLeadCapture: () => void;
}

export default function PortfolioModal({ item, onClose, onLeadCapture }: Props) {
  const allImages = [item.img, ...(item.images ?? [])];
  const [currentIdx, setCurrentIdx] = useState(0);
  const mainImg = allImages[currentIdx];
  const hasThumbnails = allImages.length > 1;

  const goPrev = () => setCurrentIdx((i) => (i - 1 + allImages.length) % allImages.length);
  const goNext = () => setCurrentIdx((i) => (i + 1) % allImages.length);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 16 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-5xl bg-white rounded-sm shadow-2xl overflow-hidden flex flex-col z-10 h-[90vh] md:h-auto max-h-[90vh]"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 text-primary/40 hover:text-primary transition-colors bg-black/10 hover:bg-black/20 rounded-sm w-10 h-10 flex items-center justify-center"
        >
          <X size={24} strokeWidth={1.5} />
        </button>

        <div className="relative h-full flex flex-col w-full">
          <div className="flex-1 overflow-y-auto scrollbar-hide pb-[90px] md:pb-0 md:overflow-hidden flex flex-col md:flex-row">
            {/* Left: Gallery */}
            <div className="w-full md:w-3/5 flex flex-col bg-bg-alt">
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#1a1a1a] group/gallery">
            <img src={mainImg} alt={item.title} className="w-full h-full object-contain" loading="lazy" />
            {hasThumbnails && (
              <>
                <button
                  onClick={goPrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/40 text-white/80 hover:bg-black/60 hover:text-white transition-all opacity-0 group-hover/gallery:opacity-100"
                >
                  <ChevronLeft size={22} strokeWidth={2} />
                </button>
                <button
                  onClick={goNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/40 text-white/80 hover:bg-black/60 hover:text-white transition-all opacity-0 group-hover/gallery:opacity-100"
                >
                  <ChevronRight size={22} strokeWidth={2} />
                </button>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/50 text-white/80 text-xs px-2.5 py-1 rounded-full opacity-0 group-hover/gallery:opacity-100 transition-all">
                  {currentIdx + 1} / {allImages.length}
                </div>
              </>
            )}
          </div>
          {hasThumbnails && (
            <div className="flex gap-3 p-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory bg-bg">
              {allImages.map((thumb, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIdx(idx)}
                  className={`relative h-20 min-w-[120px] snap-center flex-shrink-0 rounded-sm overflow-hidden border-2 transition-colors ${currentIdx === idx ? 'border-accent' : 'border-transparent opacity-50 hover:opacity-100'}`}
                >
                  <img src={thumb} alt={`${item.title} — фото ${idx + 1}`} className="w-full h-full object-cover" loading="lazy" />
                </button>
              ))}
            </div>
          )}
        </div>

            {/* Right: Info */}
            <div className="w-full md:w-2/5 p-8 md:p-10 flex flex-col md:overflow-y-auto md:scrollbar-hide">
              <div className="mb-2 text-xs font-medium uppercase tracking-widest text-accent">
            Проект
          </div>
          <h3 className="text-[24px] md:text-[28px] font-serif text-primary leading-[1.1] mb-6">
            {item.title}
          </h3>

          <div className="mb-8">
            <div className="text-sm text-text-secondary mb-1">Стоимость реализации:</div>
            <div className="text-[28px] font-serif text-primary">{item.price}</div>
          </div>

          <div className="mb-8">
            <div className="text-sm text-text-secondary mb-3">Использованные материалы:</div>
            <ul className="space-y-3">
              {item.tags.map((tag, idx) => (
                <li key={idx} className="flex items-center gap-3 text-primary/90 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0"></div>
                  {tag}
                </li>
              ))}
              <li className="flex items-center gap-3 text-primary/90 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0"></div>
                Срок изготовления: 14–21 день
              </li>
            </ul>
          </div>

              <div className="mt-auto pt-8 hidden md:block">
                <Button
                  fullWidth
                  onClick={() => {
                    onClose();
                    onLeadCapture();
                  }}
                >
                  Хочу так же
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile Sticky Footer */}
          <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-border p-4 md:hidden z-10">
            <Button
              fullWidth
              onClick={() => {
                onClose();
                onLeadCapture();
              }}
            >
              Хочу так же
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
