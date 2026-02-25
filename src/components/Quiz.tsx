import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/Button';
import { SectionLabel } from './ui/SectionLabel';
import { PhoneInput } from './ui/PhoneInput';
import { calculatePrice, QuizAnswers } from '../lib/quiz-calculator';
import { sendLead } from '../lib/send-lead';
import { CheckCircle2, UtensilsCrossed, DoorClosed, Shirt, Home, Gift, Phone, Flame } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
};

export default function Quiz() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<QuizAnswers>({
    item: '',
    kitchenShape: '',
    size: '',
    material: '',
    timing: ''
  });
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 0 });
  const [submitError, setSubmitError] = useState(false);

  const hasKitchen = answers.item === 'kitchen';
  
  const getTotalSteps = () => {
    if (answers.item === 'kitchen') return 6;
    if (answers.item === 'wardrobe' || answers.item === 'closet') return 5;
    if (answers.item === 'apartment') return 4;
    return 6;
  };

  const getCurrentVisualStep = () => {
    if (step === 1) return 1;
    if (answers.item === 'kitchen') return step;
    if (answers.item === 'wardrobe' || answers.item === 'closet') {
      if (step === 3) return 2;
      if (step === 4) return 3;
      if (step === 5) return 4;
      if (step === 6) return 5;
    }
    if (answers.item === 'apartment') {
      if (step === 4) return 2;
      if (step === 5) return 3;
      if (step === 6) return 4;
    }
    return step;
  };

  const totalSteps = getTotalSteps();
  const currentVisualStep = getCurrentVisualStep();

  const handleNext = async (currentAnswers?: QuizAnswers) => {
    const a = currentAnswers || answers;
    if (step === 6) {
      const range = calculatePrice(a);
      setPriceRange(range);
      setSubmitError(false);

      const success = await sendLead({
        name,
        phone,
        source: 'Квиз (Расчет стоимости)',
        quizData: {
          ...a,
          calculatedPrice: range.min
        }
      });

      if (!success) setSubmitError(true);
      setStep(7);
    } else {
      if (step === 1) {
        if (a.item === 'kitchen') setStep(2);
        else if (a.item === 'wardrobe' || a.item === 'closet') setStep(3);
        else if (a.item === 'apartment') setStep(4);
      } else if (step === 2) {
        setStep(3);
      } else if (step === 3) {
        setStep(4);
      } else if (step === 4) {
        setStep(5);
      } else if (step === 5) {
        setStep(6);
      }
    }
  };

  const handlePrev = () => {
    if (step === 2) setStep(1);
    else if (step === 3) {
      if (answers.item === 'kitchen') setStep(2);
      else setStep(1);
    } else if (step === 4) {
      if (answers.item === 'apartment') setStep(1);
      else setStep(3);
    } else if (step === 5) setStep(4);
    else if (step === 6) setStep(5);
  };

  const setAnswer = (key: keyof QuizAnswers, value: any) => {
    const updated = { ...answers, [key]: value };
    setAnswers(updated);
    setTimeout(() => handleNext(updated), 400);
  };

  const progress = Math.min((currentVisualStep / totalSteps) * 100, 100);

  return (
    <section id="quiz" className="py-16 md:py-24 bg-bg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-16">
          <SectionLabel className="mx-auto">ОНЛАЙН-РАСЧЁТ</SectionLabel>
          <h2 className="text-[28px] md:text-[48px] leading-[1.1] font-serif text-primary mb-4 md:mb-6">
            Узнайте стоимость вашей мебели
          </h2>
          <p className="text-text-secondary text-[15px] md:text-[18px] max-w-2xl mx-auto">
            Ответьте на несколько вопросов и получите предварительный расчёт, а также дизайн-проект в подарок.
          </p>
        </div>

        <div className="bg-white rounded-sm border border-border shadow-custom p-6 md:p-12 relative overflow-hidden">
          {step < 7 && (
            <>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 md:gap-4 mb-6 md:mb-8">
                <div className="text-[10px] md:text-xs font-medium text-text-secondary uppercase tracking-[0.15em]">
                  Вопрос {currentVisualStep} из {totalSteps}
                </div>
                <div className="flex items-center gap-2 text-accent text-[10px] md:text-xs font-medium uppercase tracking-widest">
                  <Gift size={14} strokeWidth={1.5} />
                  <span>Бонус: Дизайн-проект</span>
                </div>
              </div>
              <div className="w-full h-[1px] bg-border mb-8 md:mb-10 overflow-hidden relative">
                <motion.div 
                  className="absolute top-0 left-0 h-full bg-accent"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />
              </div>
            </>
          )}

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" variants={fadeUp} initial="hidden" animate="visible" exit="exit">
                <h3 className="text-[20px] md:text-[24px] font-serif text-primary mb-6 md:mb-8">Что вам нужно изготовить?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-8">
                  {[
                    { id: 'kitchen', icon: UtensilsCrossed, label: 'Кухня', price: 'от 120 000 ₽' },
                    { id: 'wardrobe', icon: DoorClosed, label: 'Шкаф-купе', price: 'от 80 000 ₽' },
                    { id: 'closet', icon: Shirt, label: 'Гардеробная', price: 'от 90 000 ₽' },
                    { id: 'apartment', icon: Home, label: 'Вся квартира', price: 'от 350 000 ₽' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setAnswer('item', opt.id)}
                      className={`p-4 md:p-6 rounded-sm border-2 text-left transition-all duration-500 flex items-center md:items-start md:flex-col gap-4 md:gap-0 ${
                        answers.item === opt.id
                          ? 'border-accent bg-accent/5'
                          : 'border-border/50 hover:border-accent/40 hover:bg-bg-alt/50'
                      }`}
                    >
                      <opt.icon strokeWidth={1.2} size={28} className="text-accent md:mb-4 shrink-0" />
                      <div>
                        <div className="font-medium text-primary text-base md:text-lg mb-0.5 md:mb-1">{opt.label}</div>
                        <div className="text-xs md:text-sm text-text-secondary">{opt.price}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" variants={fadeUp} initial="hidden" animate="visible" exit="exit">
                <h3 className="text-[20px] md:text-[24px] font-serif text-primary mb-6 md:mb-8">Какая форма кухни предпочтительна?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  {[
                    { id: 'straight', label: 'Прямая' },
                    { id: 'corner', label: 'Угловая' },
                    { id: 'u-shape', label: 'П-образная' },
                    { id: 'island', label: 'С островом' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setAnswer('kitchenShape', opt.id)}
                      className={`p-4 md:p-6 rounded-sm border-2 text-center transition-all duration-500 ${
                        answers.kitchenShape === opt.id
                          ? 'border-accent bg-accent/5'
                          : 'border-border/50 hover:border-accent/40 hover:bg-bg-alt/50'
                      }`}
                    >
                      <div className="font-medium text-primary text-base md:text-lg">{opt.label}</div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" variants={fadeUp} initial="hidden" animate="visible" exit="exit">
                <h3 className="text-[20px] md:text-[24px] font-serif text-primary mb-6 md:mb-8">Укажите примерный размер</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  {[
                    { id: 'small', label: 'Компактный', desc: 'до 2 м' },
                    { id: 'medium', label: 'Стандартный', desc: '2-3 м' },
                    { id: 'large', label: 'Просторный', desc: '3-4 м' },
                    { id: 'xlarge', label: 'Большой', desc: 'более 4 м' },
                    { id: 'measure', label: 'Нужен замер', desc: 'пока не знаю' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setAnswer('size', opt.id)}
                      className={`p-4 md:p-6 rounded-sm border-2 text-left transition-all duration-500 flex justify-between items-center sm:block ${
                        answers.size === opt.id
                          ? 'border-accent bg-accent/5'
                          : 'border-border/50 hover:border-accent/40 hover:bg-bg-alt/50'
                      }`}
                    >
                      <div className="font-medium text-primary text-base md:text-lg sm:mb-1">{opt.label}</div>
                      <div className="text-xs md:text-sm text-text-secondary">{opt.desc}</div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div key="step4" variants={fadeUp} initial="hidden" animate="visible" exit="exit">
                <h3 className="text-[20px] md:text-[24px] font-serif text-primary mb-6 md:mb-8">Выберите материал фасадов</h3>
                <div className="grid grid-cols-1 gap-3 md:gap-4">
                  {[
                    { id: 'ldsp', label: 'ЛДСП Egger', desc: 'Бюджетный вариант — от 120 000 ₽' },
                    { id: 'mdf-film', label: 'МДФ плёнка', desc: 'Оптимальный выбор — от 180 000 ₽', popular: true },
                    { id: 'mdf-enamel', label: 'МДФ эмаль', desc: 'Премиум качество — от 280 000 ₽' },
                    { id: 'help', label: 'Помогите выбрать', desc: 'Обсудить с дизайнером' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setAnswer('material', opt.id)}
                      className={`p-4 md:p-6 rounded-sm border-2 text-left transition-all duration-500 relative flex flex-col justify-center ${
                        answers.material === opt.id
                          ? 'border-accent bg-accent/5'
                          : opt.popular ? 'border-accent/40 hover:border-accent' : 'border-border/50 hover:border-accent/40 hover:bg-bg-alt/50'
                      }`}
                    >
                      {opt.popular && (
                        <span className="absolute top-4 md:top-6 right-4 md:right-6 text-[9px] md:text-[10px] uppercase tracking-widest font-medium text-accent border border-accent/20 px-2 py-1 rounded-sm">
                          Популярный
                        </span>
                      )}
                      <div className="font-medium text-primary text-base md:text-lg mb-0.5 md:mb-1 pr-24">{opt.label}</div>
                      <div className="text-xs md:text-sm text-text-secondary">{opt.desc}</div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 5 && (
              <motion.div key="step5" variants={fadeUp} initial="hidden" animate="visible" exit="exit">
                <h3 className="text-[20px] md:text-[24px] font-serif text-primary mb-6 md:mb-8">Когда планируете установку?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  {[
                    { id: 'asap', label: 'В ближайший месяц', icon: Flame },
                    { id: '1-3m', label: 'Через 1-3 месяца' },
                    { id: '3-6m', label: 'Через 3-6 месяцев' },
                    { id: 'looking', label: 'Пока прицениваюсь' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setAnswer('timing', opt.id)}
                      className={`p-4 md:p-6 rounded-sm border-2 text-center flex items-center justify-center gap-3 transition-all duration-500 ${
                        answers.timing === opt.id
                          ? 'border-accent bg-accent/5'
                          : 'border-border/50 hover:border-accent/40 hover:bg-bg-alt/50'
                      }`}
                    >
                      {opt.icon && <opt.icon strokeWidth={1.2} size={24} className="text-accent" />}
                      <div className="font-medium text-primary text-base md:text-lg">{opt.label}</div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 6 && (
              <motion.div key="step6" variants={fadeUp} initial="hidden" animate="visible" exit="exit">
                <h3 className="text-[28px] font-serif text-primary mb-4">Финальный шаг</h3>
                <p className="text-text-secondary mb-10">Оставьте контактные данные, и наш дизайнер свяжется с вами в течение 15 минут для оглашения расчёта.</p>
                
                <div className="space-y-6 mb-10">
                  <input
                    type="text"
                    placeholder="Ваше имя"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-transparent border border-border rounded-sm px-6 py-4 text-text placeholder:text-text-secondary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                  />
                  <PhoneInput
                    value={phone}
                    onChange={setPhone}
                  />
                </div>
                
                <Button 
                  fullWidth 
                  size="large" 
                  onClick={handleNext}
                  disabled={!name || phone.replace(/\D/g, '').length < 11}
                  className="mb-6 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Получить расчёт
                </Button>
                <p className="text-xs text-text-secondary text-center">
                  Нажимая на кнопку, вы соглашаетесь с политикой конфиденциальности
                </p>
              </motion.div>
            )}

            {step === 7 && (
              <motion.div key="step7" variants={fadeUp} initial="hidden" animate="visible" exit="exit" className="text-center py-12">
                <motion.div 
                  initial={{ scale: 0 }} 
                  animate={{ scale: 1 }} 
                  transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
                  className="inline-flex items-center justify-center w-24 h-24 rounded-full border border-border mb-8"
                >
                  <CheckCircle2 size={48} strokeWidth={1} className="text-accent" />
                </motion.div>
                <h3 className="text-[32px] font-serif text-primary mb-4">Благодарим за доверие, {name || 'уважаемый клиент'}!</h3>
                <div className="border border-border rounded-sm p-8 mb-8 inline-block w-full max-w-lg bg-bg-alt/30">
                  <p className="text-text-secondary text-sm uppercase tracking-widest mb-4">Предварительная стоимость</p>
                  <p className="text-primary font-serif text-[36px] leading-none">
                    {priceRange.min.toLocaleString('ru-RU')} <span className="text-accent">—</span> {priceRange.max.toLocaleString('ru-RU')} ₽
                  </p>
                </div>
                <p className="text-primary font-medium mb-3">Точная смета формируется после бесплатного замера.</p>
                <div className="flex items-center justify-center gap-2 text-text-secondary">
                  <Phone size={16} strokeWidth={1.5} />
                  <span>Ожидайте звонка дизайнера в течение 15 минут.</span>
                </div>
                {submitError && (
                  <p className="mt-4 text-sm text-red-600">
                    Не удалось отправить заявку. Пожалуйста, позвоните нам напрямую.
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {step > 1 && step < 7 && (
            <div className="flex justify-between items-center mt-8 md:mt-12 pt-6 md:pt-8 border-t border-border">
              <button onClick={handlePrev} className="text-text-secondary hover:text-primary text-sm font-medium uppercase tracking-widest transition-colors">
                Назад
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

