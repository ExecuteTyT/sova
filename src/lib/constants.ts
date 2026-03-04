export const PHONE = '+7 (XXX) XXX-XX-XX';
export const PHONE_RAW = '+7XXXXXXXXXX';
export const WHATSAPP = 'https://wa.me/79XXXXXXXXX';
export const ADDRESS = 'г. Набережные Челны, Производственный проезд, 14';
export const WORK_HOURS = 'Ежедневно 9:00 - 20:00';
export const BRAND_NAME = 'MEBEL-SOVA';
export const BRAND_DESCRIPTOR = 'мебель на заказ';

export const HERO_IMAGE_URL = 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80';
export const CRAFTSMAN_IMAGE_URL = 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80';
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
};

/**
 * Portfolio data.
 *
 * How to add real photos:
 * 1. Put images into  public/images/portfolio/
 * 2. Reference them as  '/images/portfolio/filename.webp'
 * 3. Use `img` for the main card photo, `images` for extra gallery shots in the modal
 */
export const PORTFOLIO_DATA: PortfolioItem[] = [
  {
    id: 1,
    title: 'Современная классика в ЖК «Парус»',
    price: '385 000 ₽',
    tags: ['МДФ Эмаль', 'Blum', 'Камень'],
    category: 'kitchen',
    img: '/images/portfolio/placeholder-1.jpg',
    // images: ['/images/portfolio/1-detail.webp', '/images/portfolio/1-hardware.webp'],
  },
  {
    id: 2,
    title: 'Лофт кухня с островом',
    price: '420 000 ₽',
    tags: ['Egger', 'Hettich', 'Подсветка'],
    category: 'kitchen',
    img: '/images/portfolio/placeholder-2.jpg',
  },
  {
    id: 3,
    title: 'Угловая кухня, скандинавский стиль',
    price: '275 000 ₽',
    tags: ['МДФ плёнка', 'Blum'],
    category: 'kitchen',
    img: '/images/portfolio/placeholder-3.jpg',
  },
  {
    id: 4,
    title: 'Минималистичная белая кухня',
    price: '210 000 ₽',
    tags: ['ЛДСП Egger'],
    category: 'kitchen',
    img: '/images/portfolio/placeholder-4.jpg',
  },
  {
    id: 5,
    title: 'Встроенный шкаф-купе с зеркалом',
    price: '142 000 ₽',
    tags: ['ЛДСП Egger', 'Hettich'],
    category: 'wardrobe',
    img: '/images/portfolio/placeholder-5.jpg',
  },
  {
    id: 6,
    title: 'Гардеробная комната под ключ',
    price: '158 000 ₽',
    tags: ['ЛДСП', 'Blum'],
    category: 'closet',
    img: '/images/portfolio/placeholder-6.jpg',
  },
  {
    id: 7,
    title: 'Детская для двоих детей',
    price: '185 000 ₽',
    tags: ['Экологичный ЛДСП'],
    category: 'children',
    img: '/images/portfolio/placeholder-7.jpg',
  },
  {
    id: 8,
    title: 'Вся квартира под ключ',
    price: '540 000 ₽',
    tags: ['МДФ', 'Blum', 'Hettich'],
    category: 'kitchen',
    img: '/images/portfolio/placeholder-8.jpg',
  },
];
