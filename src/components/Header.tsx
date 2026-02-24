import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from './ui/Button';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: 'Портфолио', href: '#portfolio' },
    { name: 'Преимущества', href: '#advantages' },
    { name: 'Цены', href: '#pricing' },
    { name: 'Отзывы', href: '#reviews' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-[#141414]/95 backdrop-blur-md shadow-sm py-4 border-b border-white/5' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className={`font-serif text-[24px] tracking-widest uppercase transition-colors duration-300 ${scrolled ? 'text-white' : 'text-primary'}`}>
          Mebel<span className="text-accent">Sova</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map(link => (
            <a 
              key={link.name} 
              href={link.href}
              className={`text-sm font-medium uppercase tracking-widest transition-colors duration-300 ${scrolled ? 'text-white/80 hover:text-white' : 'text-primary/80 hover:text-primary'}`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-6">
          <a 
            href="tel:+79990000000" 
            className={`flex items-center gap-2 text-lg font-semibold tracking-wide transition-colors duration-300 ${scrolled ? 'text-white hover:text-accent' : 'text-primary hover:text-accent'}`}
          >
            <Phone size={16} strokeWidth={2} />
            +7 (999) 000-00-00
          </a>
          <Button 
            variant="primary"
            className="!bg-accent !text-white !border-none !rounded-sm hover:!bg-[#8A4F23] transition-colors duration-300 shadow-none hover:shadow-none hover:translate-y-0"
            onClick={() => document.getElementById('quiz')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Рассчитать стоимость
          </Button>
        </div>

        {/* Mobile Burger */}
        <button 
          className={`md:hidden p-2 transition-colors duration-300 ${scrolled ? 'text-white' : 'text-primary'}`}
          onClick={() => setMobileMenuOpen(true)}
        >
          <Menu size={24} strokeWidth={1.5} />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, clipPath: 'circle(0% at 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at 100% 0)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at 100% 0)' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[999] bg-[#141414] flex flex-col h-[100dvh] px-6 py-8 overflow-hidden"
          >
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] pointer-events-none translate-x-1/3 -translate-y-1/3" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] pointer-events-none -translate-x-1/3 translate-y-1/3" />

            <div className="flex justify-between items-center relative z-10">
              <span className="font-serif text-[24px] tracking-widest text-white uppercase">
                Mebel<span className="text-accent">Sova</span>
              </span>
              <button 
                onClick={() => setMobileMenuOpen(false)} 
                className="text-white p-3 bg-white/5 hover:bg-white/10 rounded-full transition-colors backdrop-blur-sm"
              >
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>
            
            <nav className="flex-1 flex flex-col justify-center gap-8 relative z-10 mt-8">
              {links.map((link, i) => (
                <motion.a 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="text-4xl sm:text-5xl font-serif text-white tracking-wide hover:text-accent transition-colors flex items-center gap-6 group"
                >
                  <span className="text-sm font-sans text-accent/50 group-hover:text-accent transition-colors">0{i + 1}</span>
                  {link.name}
                </motion.a>
              ))}
            </nav>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-auto pt-8 border-t border-white/10 relative z-10"
            >
              <div className="mb-8">
                <p className="text-white/40 text-[10px] uppercase tracking-widest mb-3">Связаться с нами</p>
                <a href="tel:+79990000000" className="block text-3xl text-white font-sans mb-1 tracking-tight">
                  +7 (999) 000-00-00
                </a>
                <p className="text-white/60 text-sm">
                  Ежедневно с 9:00 до 20:00
                </p>
              </div>

              <Button 
                fullWidth 
                variant="primary"
                className="!bg-accent !text-white !border-none !rounded-sm hover:!bg-[#8A4F23] transition-colors duration-300 shadow-none hover:shadow-none hover:translate-y-0 !py-4 text-lg"
                onClick={() => {
                  setMobileMenuOpen(false);
                  document.getElementById('quiz')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Рассчитать стоимость
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
