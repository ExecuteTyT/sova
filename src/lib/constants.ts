export const PHONE = '+7 (962) 567-98-54';
export const PHONE_RAW = '+79625679854';
export const WHATSAPP = 'https://wa.me/79625679854';
export const ADDRESS = 'г. Набережные Челны, Производственный проезд, 14';
export const WORK_HOURS = 'Ежедневно 9:00 - 20:00';
export const BRAND_NAME = 'MEBEL-SOVA';
export const BRAND_DESCRIPTOR = 'мебель на заказ';

export const HERO_IMAGE_URL = '/images/portfolio/Gemini_Generated_Image_narfibnarfibnarf.png';
export const CRAFTSMAN_IMAGE_URL = '/images/portfolio/Gemini_Generated_Image_c6j5awc6j5awc6j5.png';
export const PRODUCTION_IMAGES = [
    'https://images.unsplash.com/photo-1581092921461-eab62e97a783?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1622372738946-62e02505feb3?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=800&q=80',
];

// Portfolio

export type PortfolioCategory = 'kitchen' | 'wardrobe' | 'closet' | 'children';

export type PortfolioItem = {
  id: number;
  title: string;
  price: string;
  tags: string[];
  category: PortfolioCategory;
  /** Primary image shown in the grid card */
  img: string;
  /** Additional images for the modal gallery (optional — if empty, modal shows only img) */
  images?: string[];
  /** CSS object-position for the card thumbnail (default: 'center') */
  imgPosition?: string;
};

const P = (f: string) => `/images/portfolio/${f}`;

export const PORTFOLIO_DATA: PortfolioItem[] = [
  // ── КУХНИ ──────────────────────────────────────────────────────────────────
  {
    id: 1,
    title: 'Прямая кухня: белый матт + дерево',
    price: '185 000 ₽',
    tags: ['МДФ плёнка', 'Egger', 'Подсветка'],
    category: 'kitchen',
    img: P('kitchen-1-IMG_2897.png'),
    images: [
      P('kitchen-1-IMG_2898.png'),
      P('kitchen-1-IMG_2899.png'),
      P('kitchen-1-IMG_2900.png'),
      P('kitchen-1-IMG_2901.png'),
      P('kitchen-1-IMG_2902.png'),
      P('kitchen-1-IMG_2903.png'),
    ],
  },
  {
    id: 2,
    title: 'Серая угловая кухня, встроенная техника',
    price: '240 000 ₽',
    tags: ['МДФ плёнка', 'Samet', 'Камень'],
    category: 'kitchen',
    img: P('kitchen-2-IMG_2293.png'),
    images: [
      P('kitchen-2-IMG_2294.png'),
      P('kitchen-2-IMG_2295.png'),
      P('kitchen-2-IMG_2296.png'),
      P('kitchen-2-IMG_2297.png'),
      P('kitchen-2-IMG_2298.png'),
      P('kitchen-2-IMG_2299.png'),
    ],
  },
  {
    id: 3,
    title: 'Белая угловая кухня, мрамор, чёрные ручки',
    price: '285 000 ₽',
    tags: ['МДФ эмаль', 'Blum', 'Подсветка'],
    category: 'kitchen',
    img: P('kitchen-3-IMG_7480.JPG'),
    images: [
      P('kitchen-3-IMG_7481.JPG'),
      P('kitchen-3-IMG_7482.JPG'),
      P('kitchen-3-IMG_7483.JPG'),
      P('kitchen-3-IMG_7486.JPG'),
      P('kitchen-3-IMG_7487.JPG'),
      P('kitchen-3-IMG_7488.JPG'),
    ],
  },
  {
    id: 4,
    title: 'Белый минимализм с деревянной столешницей',
    price: '210 000 ₽',
    tags: ['МДФ плёнка', 'Blum', 'Подсветка'],
    category: 'kitchen',
    img: P('kitchen-4-IMG_7408.JPG'),
    images: [
      P('kitchen-4-IMG_7409.JPG'),
      P('kitchen-4-IMG_7410.JPG'),
      P('kitchen-4-IMG_7411.JPG'),
      P('kitchen-4-IMG_7412.JPG'),
      P('kitchen-4-IMG_7413.JPG'),
    ],
  },
  {
    id: 5,
    title: 'Двухтонная кухня: белый + бежевый рифлёный МДФ',
    price: '310 000 ₽',
    tags: ['МДФ плёнка', 'Подсветка'],
    category: 'kitchen',
    img: P('kitchen-5-IMG_6928.JPG'),
    images: [
      P('kitchen-5-IMG_6929.JPG'),
      P('kitchen-5-IMG_6930.JPG'),
      P('kitchen-5-IMG_6931.JPG'),
      P('kitchen-5-IMG_6932.JPG'),
      P('kitchen-5-IMG_6933.JPG'),
      P('kitchen-5-IMG_6934.JPG'),
    ],
  },
  {
    id: 6,
    title: 'Угловая кухня с золотой фурнитурой',
    price: '300 000 ₽',
    tags: ['МДФ плёнка', 'Blum', 'Золото', 'HPL панель'],
    category: 'kitchen',
    img: P('kitchen-6-photo_2026-03-05_09-33-59.jpg'),
    images: [
      P('kitchen-6-photo_2026-03-05_09-34-31.jpg'),
      P('kitchen-6-photo_2026-03-05_09-34-37.jpg'),
      P('kitchen-6-photo_2026-03-05_09-34-48.jpg'),
      P('kitchen-6-photo_2026-03-05_09-34-56.jpg'),
      P('kitchen-6-photo_2026-03-05_09-35-02.jpg'),
      P('kitchen-6-photo_2026-03-05_09-35-08.jpg'),
      P('kitchen-6-photo_2026-03-05_09-35-13.jpg'),
      P('kitchen-6-photo_2026-03-05_09-35-18.jpg'),
      P('kitchen-6-photo_2026-03-05_09-35-24.jpg'),
      P('kitchen-6-photo_2026-03-05_09-35-31.jpg'),
      P('kitchen-6-photo_2026-03-05_09-35-36.jpg'),
    ],
  },
  {
    id: 7,
    title: 'Классика в бежевом: рифлёные фасады, золотые ручки',
    price: '700 000 ₽',
    tags: ['МДФ эмаль', 'Blum', 'Золото', 'Кварц агломерат'],
    category: 'kitchen',
    img: P('kitchen-7-IMG_3470.JPG'),
    images: [
      P('kitchen-7-IMG_3471.JPG'),
      P('kitchen-7-IMG_3472.JPG'),
      P('kitchen-7-IMG_3473.JPG'),
      P('kitchen-7-IMG_3474.JPG'),
      P('kitchen-7-IMG_3475.JPG'),
      P('kitchen-7-IMG_3478.JPG'),
      P('kitchen-7-IMG_3482.JPG'),
    ],
  },
  {
    id: 8,
    title: 'Премиум кухня с фурнитурой Blum',
    price: '340 000 ₽',
    tags: ['МДФ эмаль', 'Blum', 'Подсветка'],
    category: 'kitchen',
    img: P('kitchen-8-instories_1EB195B6-55F8-4174-9F14-7B16A621EA78.png'),
    images: [
      P('kitchen-8-instories_586A586A-FB84-4BCB-A3A3-8FDE330478B5.png'),
      P('kitchen-8-instories_5F2B0A8F-DBB1-4AFC-AC39-4E4C10F76499.png'),
      P('kitchen-8-instories_89258469-D4AF-41F0-BE51-C3F8C8D87448.png'),
      P('kitchen-8-instories_8F3A516B-4DE9-40BB-B37B-6EB46C8A4C1E.png'),
      P('kitchen-8-instories_962A9634-794F-45B1-9F4C-B520911C5062.png'),
      P('kitchen-8-instories_C16F2CD9-6EC0-49CF-BF6F-90E5FBAB6FE8.png'),
      P('kitchen-8-instories_F3B6E739-A6A7-419C-95CA-25BD8C67CA70.png'),
    ],
  },

  // ── ШКАФЫ ──────────────────────────────────────────────────────────────────
  {
    id: 9,
    title: 'Бежевый распашной шкаф с чёрными ручками',
    price: '120 000 ₽',
    tags: ['ЛДСП Ламарти', 'Samet', 'Матт'],
    category: 'wardrobe',
    img: P('closet-1-photo_2026-03-05_09-55-59.jpg'),
    images: [
      P('closet-1-photo_2026-03-05_09-56-21.jpg'),
      P('closet-1-photo_2026-03-05_09-56-26.jpg'),
      P('closet-1-photo_2026-03-05_09-56-30.jpg'),
      P('closet-1-photo_2026-03-05_09-56-34.jpg'),
      P('closet-1-photo_2026-03-05_09-56-39.jpg'),
      P('closet-1-photo_2026-03-05_09-56-44.jpg'),
      P('closet-1-photo_2026-03-05_09-56-48.jpg'),
      P('closet-1-photo_2026-03-05_09-56-52.jpg'),
    ],
  },
  {
    id: 10,
    title: 'Шкаф + рабочий стол, серый матт',
    price: '110 000 ₽',
    tags: ['ЛДСП', 'Samet', 'Матт'],
    category: 'wardrobe',
    img: P('closet-3-instories_36A84924-DE2B-4A44-8418-D4D587230D2F.png'),
    images: [
      P('closet-3-instories_AD99D807-9CE3-451D-8420-E529569FC2EF.png'),
      P('closet-3-instories_B7061ED5-458B-4D13-AD39-D409FA10B4AC.png'),
      P('closet-3-instories_B99622B8-060F-4594-BF33-33F22CD983CE.png'),
      P('closet-3-instories_F5DCE351-B383-4CD5-A4BA-F2A8CDD09D64.png'),
    ],
  },
  {
    id: 11,
    title: 'Шкаф-купе: бежевый с рифлёными вставками',
    price: '110 000 ₽',
    tags: ['Двери купе в профиле', 'Матт'],
    category: 'wardrobe',
    img: P('closet-5-IMG_2214.png'),
    images: [
      P('closet-5-IMG_2216.png'),
      P('closet-5-IMG_2217.png'),
      P('closet-5-IMG_2219.png'),
      P('closet-5-IMG_2220.png'),
      P('closet-5-IMG_2221.png'),
    ],
  },

  // ── ГАРДЕРОБНЫЕ ────────────────────────────────────────────────────────────
  {
    id: 12,
    title: 'Графитовая гардеробная с выдвижными ящиками',
    price: '120 000 ₽',
    tags: ['ЛДСП Egger', 'Blum', 'Графит'],
    category: 'closet',
    img: P('closet-2-IMG_6983.JPG'),
    imgPosition: 'center 75%',
    images: [
      P('closet-2-IMG_6980.JPG'),
      P('closet-2-IMG_6981.JPG'),
      P('closet-2-IMG_6982.JPG'),
      P('closet-2-IMG_6984.JPG'),
      P('closet-2-IMG_6985.JPG'),
      P('closet-2-IMG_6986.JPG'),
      P('closet-2-IMG_6987.JPG'),
    ],
  },
  {
    id: 13,
    title: 'Гардеробная мокко с золотыми ручками',
    price: '145 000 ₽',
    tags: ['ЛДСП Egger', 'Blum', 'Золото'],
    category: 'closet',
    img: P('closet-4-IMG_2204.JPG'),
    images: [
      P('closet-4-IMG_2205.JPG'),
      P('closet-4-IMG_2206.png'),
      P('closet-4-IMG_2207.png'),
      P('closet-4-IMG_2208.png'),
      P('closet-4-IMG_2209.png'),
      P('closet-4-IMG_2210.png'),
      P('closet-4-IMG_2212.png'),
    ],
  },

  // ── ДЕТСКИЕ ────────────────────────────────────────────────────────────────
  {
    id: 14,
    title: 'Детская для девочки: арка, кровать с изголовьем',
    price: '130 000 ₽',
    tags: ['МДФ эмаль', 'Blum', 'Дизайн'],
    category: 'children',
    img: P("children's room-1-kiIMG_2755.JPG"),
    images: [
      P("children's room-1-IMG_2756.JPG"),
      P("children's room-1-IMG_2758.JPG"),
      P("children's room-1-IMG_2759.JPG"),
      P("children's room-1-IMG_2760.JPG"),
    ],
  },
  {
    id: 15,
    title: 'Подростковая комната: диван и кровать, рабочая зона',
    price: '180 000 ₽',
    tags: ['МДФ плёнка', 'Egger', 'Комплект'],
    category: 'children',
    img: P("children's room-2-IMG_3244.png"),
    images: [
      P("children's room-2-IMG_3245.png"),
      P("children's room-2-IMG_3246.png"),
      P("children's room-2-IMG_3247.png"),
      P("children's room-2-IMG_3248.png"),
      P("children's room-2-IMG_3249.png"),
      P("children's room-2-IMG_3250.png"),
      P("children's room-2-IMG_3251.png"),
      P("children's room-2-IMG_3252.png"),
      P("children's room-2-IMG_3253.png"),
      P("children's room-2-IMG_3254.png"),
    ],
  },
];
