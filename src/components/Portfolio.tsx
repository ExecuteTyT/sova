import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SectionLabel } from './ui/SectionLabel';
import { Button } from './ui/Button';
import PortfolioModal from './PortfolioModal';
import LeadCaptureModal from './LeadCaptureModal';
import { WHATSAPP, PORTFOLIO_DATA } from '../lib/constants';
import type { PortfolioItem, PortfolioCategory } from '../lib/constants';

type Category = 'all' | PortfolioCategory;

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
  const [leadItem, setLeadItem] = useState<PortfolioItem | null>(null);

  const filteredData = PORTFOLIO_DATA.filter(item => activeTab === 'all' || item.category === activeTab);

  return (
    <section id="portfolio" className="py-24 bg-bg-alt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <SectionLabel>ПОРТФОЛИО</SectionLabel>
          <h2 className="text-[36px] md:text-[48px] leading-[1.1] font-serif text-primary mb-6">
            Реализованные проекты
          </h2>
          <p className="text-text-secondary text-[16px] md:text-[18px] max-w-2xl">
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
                  ? 'bg-primary text-white border-primary'
                  : 'bg-transparent text-text-secondary border-border hover:border-primary/40 hover:text-primary'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Grid / Carousel */}
        <div className="relative">
          {/* Right fade for mobile to indicate scroll */}
          <div className="absolute top-0 right-0 bottom-8 w-16 bg-gradient-to-l from-bg-alt to-transparent z-10 pointer-events-none lg:hidden" />
          
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
                  className="w-[85vw] sm:w-[45vw] lg:w-auto flex-shrink-0 snap-start lg:snap-align-none group bg-white border border-border rounded-sm overflow-hidden hover:shadow-2xl hover:-translate-y-1 hover:border-accent/30 transition-all duration-200 cursor-pointer flex flex-col"
                >
                  <div className="relative aspect-[4/3] overflow-hidden shrink-0">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      style={item.imgPosition ? { objectPosition: item.imgPosition } : undefined}
                      loading="lazy"
                    />
                    {/* Glassmorphism Price Tag */}
                    <div className="absolute bottom-4 left-4 backdrop-blur-md bg-white/90 border border-black/5 px-3 py-1.5 rounded-sm shadow-sm">
                      <span className="font-serif font-bold text-primary">{item.price}</span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-medium text-primary text-lg mb-4 line-clamp-2">{item.title}</h3>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {item.tags.map(tag => (
                        <span key={tag} className="text-[10px] uppercase tracking-widest text-text-secondary border border-border px-2 py-1 rounded-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="mt-auto">
                      <Button
                        variant="outline"
                        fullWidth
                        onClick={(e) => {
                          e.stopPropagation();
                          setLeadItem(item);
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
          <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-primary hover:text-accent transition-colors">
            Смотреть больше фото в WhatsApp <span className="text-lg">&rarr;</span>
          </a>
        </div>

        <AnimatePresence>
          {selectedItem && (
            <PortfolioModal
              item={selectedItem}
              onClose={() => setSelectedItem(null)}
              onLeadCapture={() => setLeadItem(selectedItem)}
            />
          )}
        </AnimatePresence>

        <LeadCaptureModal
          isOpen={!!leadItem}
          onClose={() => setLeadItem(null)}
          source={`Портфолио — ${leadItem?.title || ''}`}
          projectTitle={leadItem?.title}
        />
      </div>
    </section>
  );
}
