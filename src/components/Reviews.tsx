import React from 'react';
import { motion } from 'motion/react';
import { SectionLabel } from './ui/SectionLabel';
import { fadeUp, staggerContainer } from '../lib/motion';

const REVIEWS = [
  {
    id: 1,
    text: 'Заказывали кухню в новую квартиру. Очень переживали за сроки — нужно было переезжать. Ребята не подвели, сделали на 3 дня раньше! Качество фасадов отличное, фурнитура Blum работает идеально.',
    author: 'Алина',
    rating: 5
  },
  {
    id: 2,
    text: 'Понравился подход. Дизайнер приехал с образцами, всё замерил, сразу нарисовал проект. Цена не изменилась в процессе, что редкость. Кухней пользуемся полгода — никаких нареканий.',
    author: 'Марат',
    rating: 5
  },
  {
    id: 3,
    text: 'Спасибо за мою классическую кухню! Очень качественно покрашены фасады, цвет подобрали именно тот. Отдельное спасибо сборщикам — всё чисто, аккуратно.',
    author: 'Елена Викторовна',
    rating: 5
  }
];

export default function Reviews() {
  return (
    <section id="reviews" className="py-24 bg-bg-dark-deep border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="mb-16"
        >
          <motion.div variants={fadeUp}>
            <SectionLabel>ОТЗЫВЫ</SectionLabel>
            <h2 className="text-[36px] md:text-[48px] leading-[1.1] font-serif text-white mb-4">
              Слово нашим клиентам
            </h2>
            <div className="flex items-center gap-3 text-text-muted">
              <div className="flex text-accent">
                {[...Array(5)].map((_, i) => <span key={i}>★</span>)}
              </div>
              <span className="text-sm uppercase tracking-widest">4.9 на 2ГИС</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {REVIEWS.map((review) => (
            <motion.div 
              key={review.id}
              variants={fadeUp}
              className="border border-white/10 rounded-sm p-8 flex flex-col justify-between"
            >
              <p className="font-serif italic text-[18px] leading-relaxed text-text-light mb-8">
                «{review.text}»
              </p>
              <div className="flex items-center justify-between border-t border-white/10 pt-6">
                <span className="font-medium text-white tracking-wide">{review.author}</span>
                <div className="flex text-accent text-sm">
                  {[...Array(review.rating)].map((_, i) => <span key={i}>★</span>)}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
