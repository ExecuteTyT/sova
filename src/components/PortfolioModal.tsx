import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X } from 'lucide-react';
import { Button } from './ui/Button';
import { PortfolioItem } from './Portfolio';

interface Props {
  item: PortfolioItem;
  onClose: () => void;
}

export default function PortfolioModal({ item, onClose }: Props) {
  const [mainImg, setMainImg] = useState(item.img);

  const thumbnails = [
    item.img,
    item.img.replace('Кухня', 'Деталь').replace('Шкаф', 'Деталь').replace('Гардеробная', 'Деталь'),
    item.img.replace('Кухня', 'Фурнитура').replace('Шкаф', 'Фурнитура').replace('Гардеробная', 'Фурнитура'),
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }} 
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-5xl bg-bg-dark-alt rounded-sm shadow-2xl overflow-hidden flex flex-col z-10 h-[90vh] md:h-auto max-h-[90vh]"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 text-white/50 hover:text-white transition-colors bg-black/40 hover:bg-black/60 rounded-sm w-10 h-10 flex items-center justify-center"
        >
          <X size={24} strokeWidth={1.5} />
        </button>

        <div className="relative h-full flex flex-col w-full">
          <div className="flex-1 overflow-y-auto scrollbar-hide pb-[90px] md:pb-0 md:overflow-hidden flex flex-col md:flex-row">
            {/* Left: Gallery */}
            <div className="w-full md:w-3/5 flex flex-col bg-bg-dark-deep">
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-bg-dark-deep">
            <img src={mainImg} alt={item.title} className="w-full h-full object-cover" loading="lazy" data-replace="true" />
          </div>
          <div className="flex gap-3 p-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory bg-bg-dark-alt">
            {thumbnails.map((thumb, idx) => (
              <button 
                key={idx} 
                onClick={() => setMainImg(thumb)}
                className={`relative h-20 min-w-[120px] snap-center flex-shrink-0 rounded-sm overflow-hidden border-2 transition-colors ${mainImg === thumb ? 'border-accent' : 'border-transparent opacity-50 hover:opacity-100'}`}
              >
                <img src={thumb} alt="thumbnail" className="w-full h-full object-cover" loading="lazy" data-replace="true" />
              </button>
            ))}
          </div>
        </div>

            {/* Right: Info */}
            <div className="w-full md:w-2/5 p-8 md:p-10 flex flex-col md:overflow-y-auto md:scrollbar-hide">
              <div className="mb-2 text-xs font-medium uppercase tracking-widest text-accent">
            Проект
          </div>
          <h3 className="text-[24px] md:text-[28px] font-serif text-white leading-[1.1] mb-6">
            {item.title}
          </h3>
          
          <div className="mb-8">
            <div className="text-sm text-text-muted mb-1">Стоимость реализации:</div>
            <div className="text-[28px] font-serif text-white">{item.price}</div>
          </div>

          <div className="mb-8">
            <div className="text-sm text-text-muted mb-3">Использованные материалы:</div>
            <ul className="space-y-3">
              {item.tags.map((tag, idx) => (
                <li key={idx} className="flex items-center gap-3 text-white/90 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0"></div>
                  {tag}
                </li>
              ))}
              <li className="flex items-center gap-3 text-white/90 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0"></div>
                Срок изготовления: 25 дней
              </li>
            </ul>
          </div>

              <div className="mt-auto pt-8 hidden md:block">
                <Button 
                  fullWidth 
                  onClick={() => {
                    onClose();
                    document.getElementById('quiz')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Хочу так же
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile Sticky Footer */}
          <div className="absolute bottom-0 left-0 right-0 bg-bg-dark-alt border-t border-white/5 p-4 md:hidden z-10">
            <Button 
              fullWidth 
              onClick={() => {
                onClose();
                document.getElementById('quiz')?.scrollIntoView({ behavior: 'smooth' });
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
