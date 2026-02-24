import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { PHONE, PHONE_RAW, WORK_HOURS, BRAND_NAME, ADDRESS } from '../lib/constants';

function LegalModal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
      />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        className="relative w-full max-w-2xl max-h-[80vh] bg-white rounded-sm shadow-2xl overflow-y-auto z-10"
      >
        <div className="sticky top-0 bg-white border-b border-border px-8 py-5 flex items-center justify-between">
          <h2 className="font-serif text-xl text-primary">{title}</h2>
          <button onClick={onClose} className="text-text-secondary hover:text-primary transition-colors">
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>
        <div className="px-8 py-6 text-sm text-text-secondary leading-relaxed space-y-4">
          {children}
        </div>
      </motion.div>
    </div>
  );
}

export default function Footer() {
  const [modal, setModal] = useState<'privacy' | 'offer' | null>(null);

  return (
    <>
      <footer className="bg-bg-dark-deep py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col items-center md:items-start">
              <a href="#" className="font-serif text-[24px] tracking-widest text-white uppercase mb-2">
                Mebel<span className="text-accent">Sova</span>
              </a>
              <p className="text-xs text-text-muted uppercase tracking-widest">
                Архитектура комфорта
              </p>
            </div>

            <div className="flex gap-6">
              <button onClick={() => setModal('privacy')} className="text-sm text-text-muted hover:text-white transition-colors">
                Политика конфиденциальности
              </button>
              <button onClick={() => setModal('offer')} className="text-sm text-text-muted hover:text-white transition-colors">
                Договор оферты
              </button>
            </div>

            <div className="text-right">
              <a href={`tel:${PHONE_RAW}`} className="block text-lg font-serif text-white hover:text-accent transition-colors mb-1">
                {PHONE}
              </a>
              <p className="text-xs text-text-muted">
                {WORK_HOURS}
              </p>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/5 text-center text-xs text-text-muted opacity-50">
            &copy; {new Date().getFullYear()} MebelSova. Все права защищены.
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {modal === 'privacy' && (
          <LegalModal title="Политика конфиденциальности" onClose={() => setModal(null)}>
            <p><strong>1. Общие положения</strong></p>
            <p>Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных данных пользователей сайта {BRAND_NAME} (далее — Оператор).</p>
            <p><strong>2. Сбор персональных данных</strong></p>
            <p>Оператор собирает следующие данные: имя, номер телефона. Данные предоставляются пользователем добровольно при заполнении форм на сайте.</p>
            <p><strong>3. Цели обработки</strong></p>
            <p>Персональные данные используются исключительно для связи с пользователем по его обращению: обратный звонок, консультация, расчёт стоимости.</p>
            <p><strong>4. Защита данных</strong></p>
            <p>Оператор принимает необходимые организационные и технические меры для защиты персональных данных от неправомерного доступа, изменения, раскрытия или уничтожения.</p>
            <p><strong>5. Передача данных третьим лицам</strong></p>
            <p>Оператор не передаёт персональные данные третьим лицам, за исключением случаев, предусмотренных законодательством РФ.</p>
            <p><strong>6. Контактная информация</strong></p>
            <p>По вопросам, связанным с обработкой персональных данных, вы можете обратиться по телефону {PHONE} или по адресу: {ADDRESS}.</p>
          </LegalModal>
        )}
        {modal === 'offer' && (
          <LegalModal title="Договор оферты" onClose={() => setModal(null)}>
            <p><strong>1. Общие положения</strong></p>
            <p>Настоящий документ является публичной офертой {BRAND_NAME} (далее — Исполнитель) и определяет условия оказания услуг по изготовлению корпусной мебели на заказ.</p>
            <p><strong>2. Предмет договора</strong></p>
            <p>Исполнитель обязуется изготовить и установить корпусную мебель согласно утверждённому дизайн-проекту, а Заказчик обязуется оплатить услуги в порядке и сроки, предусмотренные договором.</p>
            <p><strong>3. Порядок оказания услуг</strong></p>
            <p>Бесплатный выезд замерщика, согласование дизайн-проекта, подписание договора, изготовление в срок 25-35 рабочих дней, доставка и монтаж.</p>
            <p><strong>4. Стоимость и порядок оплаты</strong></p>
            <p>Точная стоимость определяется после замера и утверждения дизайн-проекта. Предоплата — от 30%. Возможна рассрочка 0% на 3-6 месяцев.</p>
            <p><strong>5. Гарантийные обязательства</strong></p>
            <p>Гарантия на корпус и фурнитуру — 5 лет с момента установки.</p>
            <p><strong>6. Контакты</strong></p>
            <p>Телефон: {PHONE}. Адрес: {ADDRESS}.</p>
          </LegalModal>
        )}
      </AnimatePresence>
    </>
  );
}
