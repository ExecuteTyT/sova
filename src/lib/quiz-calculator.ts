export type QuizAnswers = {
  item: 'kitchen' | 'wardrobe' | 'closet' | 'apartment' | '';
  kitchenShape: 'straight' | 'corner' | 'u-shape' | 'island' | '';
  size: 'small' | 'medium' | 'large' | 'xlarge' | 'measure' | '';
  material: 'ldsp' | 'mdf-film' | 'mdf-enamel' | 'help' | '';
  timing: string;
};

const BASE_PRICES: Record<string, Record<string, number>> = {
  kitchen:   { ldsp: 120000, 'mdf-film': 180000, 'mdf-enamel': 280000, help: 180000 },
  wardrobe:  { ldsp: 80000,  'mdf-film': 120000, 'mdf-enamel': 180000, help: 120000 },
  closet:    { ldsp: 90000,  'mdf-film': 140000, 'mdf-enamel': 200000, help: 140000 },
  apartment: { ldsp: 350000, 'mdf-film': 500000, 'mdf-enamel': 750000, help: 500000 },
};

const SIZE_MULT: Record<string, number> = { small: 1.0, medium: 1.4, large: 1.8, xlarge: 2.3, measure: 1.4, '': 1.4 };
const SHAPE_MULT: Record<string, number> = { straight: 1.0, corner: 1.15, 'u-shape': 1.35, island: 1.5, '': 1.0 };

export function calculatePrice(answers: QuizAnswers): { min: number; max: number } {
  let total = 0;
  const mat = answers.material || 'mdf-film';
  const sz = SIZE_MULT[answers.size] || 1.4;

  if (!answers.item) {
    return { min: 0, max: 0 };
  }

  const item = answers.item;
  let base = BASE_PRICES[item]?.[mat] || 180000;
  let mult = item === 'apartment' ? 1 : sz;
  if (item === 'kitchen') mult *= (SHAPE_MULT[answers.kitchenShape] || 1.0);
  total += base * mult;

  return {
    min: Math.round((total * 0.85) / 10000) * 10000,
    max: Math.round((total * 1.25) / 10000) * 10000,
  };
}
