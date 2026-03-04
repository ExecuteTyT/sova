export type QuizAnswers = {
  item: 'kitchen' | 'wardrobe' | 'closet' | 'apartment' | '';
  kitchenShape: 'straight' | 'corner' | 'u-shape' | 'island' | '';
  kitchenDimensions?: { left: string; back: string; right: string };
  closetShape?: 'straight' | 'corner' | 'u-shape' | '';
  wardrobeDoors?: 'mirrors' | 'mirror-ldsp' | 'other' | '';
  size: 'small' | 'medium' | 'large' | 'xlarge' | 'measure' | 'w2000' | 'w2500' | 'w3000' | 'w3000plus' | '';
  material: 'ldsp' | 'mdf-film' | 'mdf-enamel' | 'help' | '';
  timing: string;
};

// Kitchen: explicit price lookup by size × material
const KITCHEN_PRICES: Record<string, Record<string, number>> = {
  small:   { ldsp: 105000, 'mdf-film': 130000, 'mdf-enamel': 150000, help: 130000 },
  medium:  { ldsp: 150000, 'mdf-film': 180000, 'mdf-enamel': 210000, help: 180000 },
  large:   { ldsp: 180000, 'mdf-film': 210000, 'mdf-enamel': 250000, help: 210000 },
  xlarge:  { ldsp: 200000, 'mdf-film': 240000, 'mdf-enamel': 270000, help: 240000 },
  measure: { ldsp: 150000, 'mdf-film': 180000, 'mdf-enamel': 210000, help: 180000 },
};

// Wardrobe: fixed price by size
const WARDROBE_PRICES: Record<string, number> = {
  w2000:     60000,
  w2500:     75000,
  w3000:     85000,
  w3000plus: 90000,
};

const BASE_PRICES: Record<string, Record<string, number>> = {
  closet:    { ldsp: 60000,  'mdf-film': 90000,  'mdf-enamel': 130000, help: 90000  },
  apartment: { ldsp: 350000, 'mdf-film': 500000, 'mdf-enamel': 750000, help: 500000 },
};

const SIZE_MULT: Record<string, number> = { small: 1.0, medium: 1.4, large: 1.8, xlarge: 2.3, measure: 1.4, '': 1.4 };
const SHAPE_MULT: Record<string, number> = { straight: 1.0, corner: 1.15, 'u-shape': 1.35, island: 1.5, '': 1.0 };

export function calculatePrice(answers: QuizAnswers): { min: number; max: number } {
  if (!answers.item) return { min: 0, max: 0 };

  let total = 0;

  if (answers.item === 'kitchen') {
    const mat = answers.material || 'mdf-film';
    const sz = answers.size || 'medium';
    const base = KITCHEN_PRICES[sz]?.[mat] ?? 180000;
    const shapeMult = SHAPE_MULT[answers.kitchenShape] || 1.0;
    total = base * shapeMult;
  } else if (answers.item === 'wardrobe') {
    total = WARDROBE_PRICES[answers.size] ?? 75000;
  } else {
    const mat = answers.material || 'mdf-film';
    const base = BASE_PRICES[answers.item]?.[mat] ?? 180000;
    const sz = SIZE_MULT[answers.size] || 1.4;
    total = base * sz;
  }

  return {
    min: Math.round((total * 0.9) / 5000) * 5000,
    max: Math.round((total * 1.2) / 5000) * 5000,
  };
}
