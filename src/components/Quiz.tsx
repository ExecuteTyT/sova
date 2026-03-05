import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/Button';
import { SectionLabel } from './ui/SectionLabel';
import { PhoneInput } from './ui/PhoneInput';
import { calculatePrice, QuizAnswers } from '../lib/quiz-calculator';
import { sendLead } from '../lib/send-lead';
import { CheckCircle2, UtensilsCrossed, DoorClosed, Shirt, Home, Gift, Phone, Flame } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } }
};

// Dynamic material price descriptions per kitchen size
function getKitchenMaterialPrices(size: string): { ldsp: string; film: string; enamel: string } {
  const map: Record<string, { ldsp: string; film: string; enamel: string }> = {
    small:   { ldsp: '100 000–110 000 ₽', film: 'от 130 000 ₽', enamel: 'от 150 000 ₽' },
    medium:  { ldsp: 'от 150 000 ₽',      film: 'от 180 000 ₽', enamel: 'от 210 000 ₽' },
    large:   { ldsp: 'от 180 000 ₽',      film: 'от 210 000 ₽', enamel: 'от 250 000 ₽' },
    xlarge:  { ldsp: 'от 200 000 ₽',      film: 'от 240 000 ₽', enamel: 'от 270 000 ₽' },
  };
  return map[size] ?? { ldsp: 'Цена после замера', film: 'Цена после замера', enamel: 'Цена после замера' };
}

export default function Quiz() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<QuizAnswers>({
    item: '',
    kitchenShape: '',
    kitchenDimensions: { left: '', back: '', right: '' },
    closetShape: '',
    wardrobeDoors: '',
    size: '',
    material: '',
    timing: ''
  });
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 0 });
  const [submitError, setSubmitError] = useState(false);

  // Navigation: which real step number is "submit" step
  const SUBMIT_STEP = 6;

  const getTotalSteps = () => {
    if (answers.item === 'kitchen') return answers.kitchenShape === 'u-shape' ? 7 : 6;
    if (answers.item === 'wardrobe') return 5;
    if (answers.item === 'closet') return 6;
    if (answers.item === 'apartment') return 4;
    return 6;
  };

  const getCurrentVisualStep = () => {
    if (step === 1) return 1;

    if (answers.item === 'kitchen') {
      // steps: 1→2→(9)→3→4→5→6
      if (step === 2) return 2;
      if (step === 9) return 3; // u-shape dimensions
      if (step === 3) return answers.kitchenShape === 'u-shape' ? 4 : 3;
      if (step === 4) return answers.kitchenShape === 'u-shape' ? 5 : 4;
      if (step === 5) return answers.kitchenShape === 'u-shape' ? 6 : 5;
      if (step === SUBMIT_STEP) return answers.kitchenShape === 'u-shape' ? 7 : 6;
    }

    if (answers.item === 'wardrobe') {
      // steps: 1→3→10→5→6
      if (step === 3) return 2;
      if (step === 10) return 3;
      if (step === 5) return 4;
      if (step === SUBMIT_STEP) return 5;
    }

    if (answers.item === 'closet') {
      // steps: 1→8→3→4→5→6
      if (step === 8) return 2;
      if (step === 3) return 3;
      if (step === 4) return 4;
      if (step === 5) return 5;
      if (step === SUBMIT_STEP) return 6;
    }

    if (answers.item === 'apartment') {
      // steps: 1→4→5→6
      if (step === 4) return 2;
      if (step === 5) return 3;
      if (step === SUBMIT_STEP) return 4;
    }

    return step;
  };

  const totalSteps = getTotalSteps();
  const currentVisualStep = getCurrentVisualStep();

  const handleNext = async (currentAnswers?: QuizAnswers) => {
    const a = currentAnswers || answers;

    if (step === SUBMIT_STEP) {
      const range = calculatePrice(a);
      setPriceRange(range);
      setSubmitError(false);

      const success = await sendLead({
        name,
        phone,
        source: 'Квиз (Расчет стоимости)',
        quizData: {
          ...a,
          calculatedPriceMin: range.min,
          calculatedPriceMax: range.max,
        }
      });

      if (!success) setSubmitError(true);
      setStep(7);
      return;
    }

    // Navigation forward
    if (step === 1) {
      if (a.item === 'kitchen') setStep(2);
      else if (a.item === 'wardrobe') setStep(3);
      else if (a.item === 'closet') setStep(8);
      else if (a.item === 'apartment') setStep(4);
    } else if (step === 2) {
      if (a.kitchenShape === 'u-shape') setStep(9);
      else setStep(3);
    } else if (step === 9) {
      setStep(3);
    } else if (step === 8) {
      setStep(3);
    } else if (step === 3) {
      if (a.item === 'wardrobe') setStep(10);
      else setStep(4);
    } else if (step === 10) {
      setStep(5);
    } else if (step === 4) {
      setStep(5);
    } else if (step === 5) {
      setStep(SUBMIT_STEP);
    }
  };

  const handlePrev = () => {
    if (step === 2) setStep(1);
    else if (step === 8) setStep(1);
    else if (step === 9) setStep(2);
    else if (step === 3) {
      if (answers.item === 'kitchen') {
        if (answers.kitchenShape === 'u-shape') setStep(9);
        else setStep(2);
      } else if (answers.item === 'closet') setStep(8);
      else setStep(1);
    } else if (step === 4) {
      setStep(3);
    } else if (step === 10) setStep(3);
    else if (step === 5) {
      if (answers.item === 'wardrobe') setStep(10);
      else setStep(4);
    } else if (step === SUBMIT_STEP) setStep(5);
  };

  const setAnswer = (key: keyof QuizAnswers, value: any) => {
    const updated = { ...answers, [key]: value };
    setAnswers(updated);
    setTimeout(() => handleNext(updated), 400);
  };

  const progress = Math.min((currentVisualStep / totalSteps) * 100, 100);
  const isResultStep = step === 7;

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
          {!isResultStep && (
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

            {/* Step 1 — Item selection */}
            {step === 1 && (
              <motion.div key="step1" variants={fadeUp} initial="hidden" animate="visible" exit="exit">
                <h3 className="text-[20px] md:text-[24px] font-serif text-primary mb-6 md:mb-8">Что вам нужно изготовить?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-8">
                  {[
                    { id: 'kitchen',   icon: UtensilsCrossed, label: 'Кухня',        price: 'от 130 000 ₽' },
                    { id: 'wardrobe',  icon: DoorClosed,      label: 'Шкаф-купе',    price: 'от 65 000 ₽'  },
                    { id: 'closet',    icon: Shirt,           label: 'Гардеробная',  price: 'от 60 000 ₽'  },
                    { id: 'apartment', icon: Home,            label: 'Вся квартира', price: 'от 350 000 ₽' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setAnswer('item', opt.id)}
                      className={`p-4 md:p-6 rounded-sm border-2 text-left transition-all duration-150 flex items-center md:items-start md:flex-col gap-4 md:gap-0 ${
                        answers.item === opt.id
                          ? 'border-accent bg-accent/5'
                          : 'border-border hover:border-accent hover:bg-accent/5 hover:shadow-sm'
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

            {/* Step 2 — Kitchen shape */}
            {step === 2 && (
              <motion.div key="step2" variants={fadeUp} initial="hidden" animate="visible" exit="exit">
                <h3 className="text-[20px] md:text-[24px] font-serif text-primary mb-6 md:mb-8">Какая форма кухни предпочтительна?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  {[
                    { id: 'straight', label: 'Прямая' },
                    { id: 'corner',   label: 'Угловая' },
                    { id: 'u-shape',  label: 'П-образная' },
                    { id: 'island',   label: 'С островом' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setAnswer('kitchenShape', opt.id)}
                      className={`p-4 md:p-6 rounded-sm border-2 text-center transition-all duration-150 ${
                        answers.kitchenShape === opt.id
                          ? 'border-accent bg-accent/5'
                          : 'border-border hover:border-accent hover:bg-accent/5 hover:shadow-sm'
                      }`}
                    >
                      <div className="font-medium text-primary text-base md:text-lg">{opt.label}</div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 9 — U-shape kitchen dimensions */}
            {step === 9 && (
              <motion.div key="step9" variants={fadeUp} initial="hidden" animate="visible" exit="exit">
                <h3 className="text-[20px] md:text-[24px] font-serif text-primary mb-3 md:mb-4">Укажите размеры кухни</h3>
                <p className="text-text-secondary text-sm mb-6 md:mb-8">П-образная кухня имеет три стены. Укажите примерную длину каждой в сантиметрах.</p>

                {/* U-shape schematic */}
                <div className="flex justify-center mb-8">
                  <svg viewBox="0 0 260 200" className="w-56 h-44 text-accent" fill="none" stroke="currentColor" strokeWidth="2" overflow="visible">
                    {/* Dashed room outline */}
                    <rect x="60" y="40" width="140" height="130" rx="2" strokeDasharray="5 3" stroke="rgba(20,20,20,0.15)" />
                    {/* Left wall */}
                    <line x1="60" y1="40" x2="60" y2="170" strokeWidth="4" />
                    {/* Back wall */}
                    <line x1="60" y1="40" x2="200" y2="40" strokeWidth="4" />
                    {/* Right wall */}
                    <line x1="200" y1="40" x2="200" y2="170" strokeWidth="4" />
                    {/* Labels */}
                    <text x="38" y="105" fontSize="13" fontWeight="600" fill="currentColor" textAnchor="middle" transform="rotate(-90,38,105)">Лев.</text>
                    <text x="130" y="24" fontSize="13" fontWeight="600" fill="currentColor" textAnchor="middle">Задняя</text>
                    <text x="222" y="105" fontSize="13" fontWeight="600" fill="currentColor" textAnchor="middle" transform="rotate(90,222,105)">Прав.</text>
                  </svg>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                  {[
                    { key: 'left',  label: 'Левая стена' },
                    { key: 'back',  label: 'Задняя стена' },
                    { key: 'right', label: 'Правая стена' },
                  ].map((wall) => (
                    <div key={wall.key}>
                      <label className="block text-xs font-medium text-text-secondary uppercase tracking-widest mb-2">{wall.label}</label>
                      <div className="relative">
                        <input
                          type="number"
                          placeholder="напр. 240"
                          value={answers.kitchenDimensions?.[wall.key as 'left' | 'back' | 'right'] ?? ''}
                          onChange={(e) => {
                            const dims = { ...(answers.kitchenDimensions ?? { left: '', back: '', right: '' }), [wall.key]: e.target.value };
                            setAnswers({ ...answers, kitchenDimensions: dims });
                          }}
                          className="w-full bg-transparent border border-border rounded-sm px-4 py-3 text-text placeholder:text-text-secondary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors pr-10 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-text-secondary">см</span>
                      </div>
                    </div>
                  ))}
                </div>

                <Button fullWidth size="large" onClick={() => handleNext()}>
                  Далее
                </Button>
              </motion.div>
            )}

            {/* Step 3 — Size */}
            {step === 3 && (
              <motion.div key="step3" variants={fadeUp} initial="hidden" animate="visible" exit="exit">
                {answers.item === 'wardrobe' ? (
                  <>
                    <h3 className="text-[20px] md:text-[24px] font-serif text-primary mb-6 md:mb-8">Укажите ширину шкафа-купе</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                      {[
                        { id: 'w2000',     label: 'До 2000 мм',    price: '60 000 ₽' },
                        { id: 'w2500',     label: '2500 мм',       price: '75 000 ₽' },
                        { id: 'w3000',     label: '3000 мм',       price: '85 000 ₽' },
                        { id: 'w3000plus', label: 'Свыше 3000 мм', price: 'от 90 000 ₽' },
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          onClick={() => setAnswer('size', opt.id)}
                          className={`p-4 md:p-6 rounded-sm border-2 text-left transition-all duration-150 flex justify-between items-center ${
                            answers.size === opt.id
                              ? 'border-accent bg-accent/5'
                              : 'border-border hover:border-accent hover:bg-accent/5 hover:shadow-sm'
                          }`}
                        >
                          <div className="font-medium text-primary text-base md:text-lg">{opt.label}</div>
                          <div className="text-sm font-medium text-accent">{opt.price}</div>
                        </button>
                      ))}
                    </div>
                    <p className="mt-4 text-xs text-text-secondary text-center">
                      Итоговая цена зависит от выбранного профиля и его цвета
                    </p>
                  </>
                ) : (
                  <>
                    <h3 className="text-[20px] md:text-[24px] font-serif text-primary mb-6 md:mb-8">Укажите примерный размер</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                      {[
                        { id: 'small',   label: 'Компактный',  desc: 'до 2 м' },
                        { id: 'medium',  label: 'Стандартный', desc: '2–3 м' },
                        { id: 'large',   label: 'Просторный',  desc: '3–4 м' },
                        { id: 'xlarge',  label: 'Большой',     desc: 'более 4 м' },
                        { id: 'measure', label: 'Нужен замер', desc: 'пока не знаю' },
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          onClick={() => setAnswer('size', opt.id)}
                          className={`p-4 md:p-6 rounded-sm border-2 text-left transition-all duration-150 flex justify-between items-center sm:block ${
                            answers.size === opt.id
                              ? 'border-accent bg-accent/5'
                              : 'border-border hover:border-accent hover:bg-accent/5 hover:shadow-sm'
                          }`}
                        >
                          <div className="font-medium text-primary text-base md:text-lg sm:mb-1">{opt.label}</div>
                          <div className="text-xs md:text-sm text-text-secondary">{opt.desc}</div>
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </motion.div>
            )}

            {/* Step 4 — Material */}
            {step === 4 && (
              <motion.div key="step4" variants={fadeUp} initial="hidden" animate="visible" exit="exit">
                <h3 className="text-[20px] md:text-[24px] font-serif text-primary mb-6 md:mb-8">Выберите материал фасадов</h3>
                <div className="grid grid-cols-1 gap-3 md:gap-4">
                  {(() => {
                    const isKitchen = answers.item === 'kitchen';
                    const prices = isKitchen ? getKitchenMaterialPrices(answers.size) : null;
                    return [
                      {
                        id: 'ldsp',
                        label: 'ЛДСП',
                        desc: isKitchen ? prices!.ldsp : 'Бюджетный вариант',
                        popular: false,
                      },
                      {
                        id: 'mdf-film',
                        label: 'МДФ плёнка',
                        desc: isKitchen ? prices!.film : 'Оптимальный выбор',
                        popular: true,
                      },
                      {
                        id: 'mdf-enamel',
                        label: 'МДФ эмаль',
                        desc: isKitchen ? prices!.enamel : 'Премиум качество',
                        popular: false,
                      },
                      {
                        id: 'help',
                        label: 'Помогите выбрать',
                        desc: 'Обсудить с дизайнером',
                        popular: false,
                      },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => setAnswer('material', opt.id)}
                        className={`p-4 md:p-6 rounded-sm border-2 text-left transition-all duration-150 relative flex flex-col justify-center ${
                          answers.material === opt.id
                            ? 'border-accent bg-accent/5'
                            : opt.popular
                            ? 'border-accent/40 hover:border-accent hover:bg-accent/5 hover:shadow-sm'
                            : 'border-border hover:border-accent hover:bg-accent/5 hover:shadow-sm'
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
                    ));
                  })()}
                </div>
              </motion.div>
            )}

            {/* Step 5 — Timing */}
            {step === 5 && (
              <motion.div key="step5" variants={fadeUp} initial="hidden" animate="visible" exit="exit">
                <h3 className="text-[20px] md:text-[24px] font-serif text-primary mb-6 md:mb-8">Когда планируете установку?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  {[
                    { id: 'asap',    label: 'В ближайший месяц', icon: Flame },
                    { id: '1-3m',    label: 'Через 1-3 месяца' },
                    { id: '3-6m',    label: 'Через 3-6 месяцев' },
                    { id: 'looking', label: 'Пока прицениваюсь' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setAnswer('timing', opt.id)}
                      className={`p-4 md:p-6 rounded-sm border-2 text-center flex items-center justify-center gap-3 transition-all duration-150 ${
                        answers.timing === opt.id
                          ? 'border-accent bg-accent/5'
                          : 'border-border hover:border-accent hover:bg-accent/5 hover:shadow-sm'
                      }`}
                    >
                      {opt.icon && <opt.icon strokeWidth={1.2} size={24} className="text-accent" />}
                      <div className="font-medium text-primary text-base md:text-lg">{opt.label}</div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 6 — Contact info */}
            {step === SUBMIT_STEP && (
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
                  <PhoneInput value={phone} onChange={setPhone} />
                </div>

                <Button
                  fullWidth
                  size="large"
                  onClick={() => handleNext()}
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

            {/* Step 7 — Result */}
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

            {/* Step 8 — Closet shape */}
            {step === 8 && (
              <motion.div key="step8" variants={fadeUp} initial="hidden" animate="visible" exit="exit">
                <h3 className="text-[20px] md:text-[24px] font-serif text-primary mb-6 md:mb-8">Выберите форму гардеробной</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
                  {[
                    { id: 'straight', label: 'Прямая',     desc: 'Одна стена' },
                    { id: 'corner',   label: 'Угловая',    desc: 'Две стены' },
                    { id: 'u-shape',  label: 'П-образная', desc: 'Три стены' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setAnswer('closetShape', opt.id)}
                      className={`p-4 md:p-6 rounded-sm border-2 text-center transition-all duration-150 ${
                        answers.closetShape === opt.id
                          ? 'border-accent bg-accent/5'
                          : 'border-border hover:border-accent hover:bg-accent/5 hover:shadow-sm'
                      }`}
                    >
                      <div className="font-medium text-primary text-base md:text-lg mb-1">{opt.label}</div>
                      <div className="text-xs text-text-secondary">{opt.desc}</div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 10 — Wardrobe door type */}
            {step === 10 && (
              <motion.div key="step10" variants={fadeUp} initial="hidden" animate="visible" exit="exit">
                <h3 className="text-[20px] md:text-[24px] font-serif text-primary mb-6 md:mb-8">Выберите тип дверей</h3>
                <div className="grid grid-cols-1 gap-3 md:gap-4">
                  {[
                    { id: 'mirrors',     label: 'Оба зеркала',          desc: 'Все дверные полотна — зеркало' },
                    { id: 'mirror-ldsp', label: 'Зеркало + ЛДСП',       desc: 'Комбинация зеркала и ЛДСП' },
                    { id: 'other',       label: 'Иной вариант',          desc: 'Обсудим детали с дизайнером' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setAnswer('wardrobeDoors', opt.id)}
                      className={`p-4 md:p-6 rounded-sm border-2 text-left transition-all duration-150 ${
                        answers.wardrobeDoors === opt.id
                          ? 'border-accent bg-accent/5'
                          : 'border-border hover:border-accent hover:bg-accent/5 hover:shadow-sm'
                      }`}
                    >
                      <div className="font-medium text-primary text-base md:text-lg mb-0.5">{opt.label}</div>
                      <div className="text-xs md:text-sm text-text-secondary">{opt.desc}</div>
                    </button>
                  ))}
                </div>
                <p className="mt-4 text-xs text-text-secondary text-center">
                  Итоговая цена зависит от выбранного профиля и его цвета
                </p>
              </motion.div>
            )}

          </AnimatePresence>

          {step > 1 && !isResultStep && step !== 9 && (
            <div className="flex justify-between items-center mt-8 md:mt-12 pt-6 md:pt-8 border-t border-border">
              <button onClick={handlePrev} className="text-text-secondary hover:text-primary text-sm font-medium uppercase tracking-widest transition-colors">
                Назад
              </button>
            </div>
          )}
          {step === 9 && (
            <div className="flex justify-between items-center mt-6 pt-6 border-t border-border">
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
