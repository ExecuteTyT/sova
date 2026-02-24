import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SectionLabel } from './ui/SectionLabel';
import { Button } from './ui/Button';
import PortfolioModal from './PortfolioModal';
import { WHATSAPP } from '../lib/constants';

type Category = 'all' | 'kitchen' | 'wardrobe' | 'closet' | 'children';

export type PortfolioItem = {
  id: number;
  title: string;
  price: string;
  tags: string[];
  category: string;
  img: string;
};

const PORTFOLIO_DATA: PortfolioItem[] = [
  { id: 1, title: 'Современная классика в ЖК «Парус»', price: '385 000 ₽', tags: ['МДФ Эмаль', 'Blum', 'Камень'], category: 'kitchen', img: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&q=80' },
  { id: 2, title: 'Лофт кухня с островом', price: '420 000 ₽', tags: ['Egger', 'Hettich', 'Подсветка'], category: 'kitchen', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80' },
  { id: 3, title: 'Угловая кухня, скандинавский стиль', price: '275 000 ₽', tags: ['МДФ плёнка', 'Blum'], category: 'kitchen', img: 'https://images.unsplash.com/photo-1556910103-1c02745a872f?w=800&q=80' },
  { id: 4, title: 'Минималистичная белая кухня', price: '210 000 ₽', tags: ['ЛДСП Egger'], category: 'kitchen', img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80' },
  { id: 5, title: 'Встроенный шкаф-купе с зеркалом', price: '142 000 ₽', tags: ['ЛДСП Egger', 'Hettich'], category: 'wardrobe', img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80' },
  { id: 6, title: 'Гардеробная комната под ключ', price: '158 000 ₽', tags: ['ЛДСП', 'Blum'], category: 'closet', img: 'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?w=800&q=80' },
  { id: 7, title: 'Детская для двоих детей', price: '185 000 ₽', tags: ['Экологичный ЛДСП'], category: 'children', img: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80' },
  { id: 8, title: 'Вся квартира под ключ', price: '540 000 ₽', tags: ['МДФ', 'Blum', 'Hettich'], category: 'kitchen', img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80' },
];

const TABS: { id: Category; label: string }[] = [
  { id: 'all', label: 'Все' },
  { id: 'kitchen', label: 'Кухни' },
  { id: 'wardrobe', label: 'Шкафы' },
  { id: 'closet', label: 'Гардеробные' },
  { id: 'children', label: 'Детская' },
];

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState<Category>('all');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  const filteredData = PORTFOLIO_DATA.filter(item => activeTab === 'all' || item.category === activeTab);

  return (
    <section id="portfolio" className="py-24 bg-bg-dark-deep">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <SectionLabel>ПОРТФОЛИО</SectionLabel>
          <h2 className="text-[36px] md:text-[48px] leading-[1.1] font-serif text-white mb-6">
            Реализованные проекты
          </h2>
          <p className="text-text-muted text-[16px] md:text-[18px] max-w-2xl">
            Мы гордимся каждой работой. Посмотрите примеры с реальными ценами и деталями реализации.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex overflow-x-auto scrollbar-hide gap-2 mb-12 pb-2 pr-4 sm:pr-0">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap px-6 py-2.5 rounded-sm text-sm font-medium transition-all duration-300 border ${
                activeTab === tab.id
                  ? 'bg-white text-primary border-white'
                  : 'bg-transparent text-text-muted border-white/10 hover:border-white/30 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Grid / Carousel */}
        <div className="relative">
          {/* Right fade for mobile to indicate scroll */}
          <div className="absolute top-0 right-0 bottom-8 w-16 bg-gradient-to-l from-bg-dark-deep to-transparent z-10 pointer-events-none lg:hidden" />
          
          <motion.div layout className="flex lg:grid lg:grid-cols-4 gap-4 md:gap-6 overflow-x-auto lg:overflow-visible scrollbar-hide snap-x snap-mandatory pb-8 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0">
            <AnimatePresence mode="popLayout">
              {filteredData.map(item => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => setSelectedItem(item)}
                  className="w-[85vw] sm:w-[45vw] lg:w-auto flex-shrink-0 snap-start lg:snap-align-none group bg-bg-dark-alt rounded-sm overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer flex flex-col"
                >
                  <div className="relative aspect-[4/3] overflow-hidden shrink-0">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                      data-replace="true"
                    />
                    {/* Glassmorphism Price Tag */}
                    <div className="absolute bottom-4 left-4 backdrop-blur-md bg-black/60 border border-white/10 px-3 py-1.5 rounded-sm shadow-sm">
                      <span className="font-serif font-bold text-white">{item.price}</span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-medium text-white text-lg mb-4 line-clamp-2">{item.title}</h3>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {item.tags.map(tag => (
                        <span key={tag} className="text-[10px] uppercase tracking-widest text-text-muted border border-white/10 px-2 py-1 rounded-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="mt-auto">
                      <Button
                        variant="dark-outline"
                        fullWidth
                        onClick={(e) => {
                          e.stopPropagation();
                          document.getElementById('quiz')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                      >
                        Хочу такую же
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        <div className="mt-12 text-center">
          <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-white hover:text-accent transition-colors">
            Смотреть больше фото в WhatsApp <span className="text-lg">&rarr;</span>
          </a>
        </div>

        <AnimatePresence>
          {selectedItem && (
            <PortfolioModal 
              item={selectedItem} 
              onClose={() => setSelectedItem(null)} 
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
