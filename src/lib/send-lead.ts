const ITEM_LABELS: Record<string, string> = {
  kitchen: 'Кухня',
  wardrobe: 'Шкаф-купе',
  closet: 'Гардеробная',
  apartment: 'Вся квартира',
};

const SHAPE_LABELS: Record<string, string> = {
  straight: 'Прямая',
  corner: 'Угловая',
  'u-shape': 'П-образная',
  island: 'С островом',
};

const SIZE_LABELS: Record<string, string> = {
  small: 'Компактный (до 2 м)',
  medium: 'Стандартный (2–3 м)',
  large: 'Просторный (3–4 м)',
  xlarge: 'Большой (более 4 м)',
  measure: 'Нужен замер',
  w2000: 'До 2000 мм',
  w2500: '2500 мм',
  w3000: '3000 мм',
  w3000plus: 'Свыше 3000 мм',
};

const MATERIAL_LABELS: Record<string, string> = {
  ldsp: 'ЛДСП',
  'mdf-film': 'МДФ плёнка',
  'mdf-enamel': 'МДФ эмаль',
  help: 'Помогите выбрать',
};

const TIMING_LABELS: Record<string, string> = {
  asap: 'В ближайший месяц',
  '1-3m': 'Через 1–3 месяца',
  '3-6m': 'Через 3–6 месяцев',
  looking: 'Пока прицениваюсь',
};

const DOOR_LABELS: Record<string, string> = {
  mirrors: 'Оба зеркала',
  'mirror-ldsp': 'Зеркало + ЛДСП',
  other: 'Иной вариант',
};

const CLOSET_SHAPE_LABELS: Record<string, string> = {
  straight: 'Прямая (1 стена)',
  corner: 'Угловая (2 стены)',
  'u-shape': 'П-образная (3 стены)',
};

export async function sendLead(data: {
  name?: string;
  phone: string;
  source: string;
  quizData?: any;
}) {
  const token = (import.meta as any).env.VITE_TELEGRAM_BOT_TOKEN;
  const chatId = (import.meta as any).env.VITE_TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.warn('Telegram credentials are not set. Lead data:', data);
    return false;
  }

  let message = `🔥 *НОВАЯ ЗАЯВКА* 🔥\n\n`;
  message += `📌 *Источник:* ${data.source}\n`;
  if (data.name) message += `👤 *Имя:* ${data.name}\n`;
  message += `📞 *Телефон:* ${data.phone}\n`;

  if (data.quizData) {
    const q = data.quizData;
    message += `\n🛋 *Что заказывают:* ${ITEM_LABELS[q.item] || q.item || '—'}\n`;

    if (q.item === 'kitchen') {
      if (q.kitchenShape) message += `📐 *Форма кухни:* ${SHAPE_LABELS[q.kitchenShape] || q.kitchenShape}\n`;
      if (q.kitchenShape === 'u-shape' && q.kitchenDimensions) {
        const d = q.kitchenDimensions;
        if (d.left || d.back || d.right) {
          message += `📏 *Размеры:* Лев. ${d.left || '?'} см × Задн. ${d.back || '?'} см × Прав. ${d.right || '?'} см\n`;
        }
      }
      if (q.size) message += `📦 *Размер:* ${SIZE_LABELS[q.size] || q.size}\n`;
      if (q.material) message += `🎨 *Материал:* ${MATERIAL_LABELS[q.material] || q.material}\n`;
    } else if (q.item === 'wardrobe') {
      if (q.size) message += `📦 *Ширина:* ${SIZE_LABELS[q.size] || q.size}\n`;
      if (q.wardrobeDoors) message += `🚪 *Двери:* ${DOOR_LABELS[q.wardrobeDoors] || q.wardrobeDoors}\n`;
    } else if (q.item === 'closet') {
      if (q.closetShape) message += `📐 *Форма:* ${CLOSET_SHAPE_LABELS[q.closetShape] || q.closetShape}\n`;
      if (q.size) message += `📦 *Размер:* ${SIZE_LABELS[q.size] || q.size}\n`;
      if (q.material) message += `🎨 *Материал:* ${MATERIAL_LABELS[q.material] || q.material}\n`;
    } else if (q.item === 'apartment') {
      if (q.material) message += `🎨 *Материал:* ${MATERIAL_LABELS[q.material] || q.material}\n`;
    }

    if (q.timing) message += `⏰ *Когда нужно:* ${TIMING_LABELS[q.timing] || q.timing}\n`;

    if (q.calculatedPriceMin) {
      message += `\n💰 *Предв. стоимость:* ${q.calculatedPriceMin.toLocaleString('ru-RU')} — ${q.calculatedPriceMax.toLocaleString('ru-RU')} ₽\n`;
    }
  }

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown',
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('Telegram API error:', err);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error sending lead to Telegram:', error);
    return false;
  }
}
