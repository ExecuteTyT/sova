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

  let message = `🔥 *НОВЫЙ ЛИД* 🔥\n\n`;
  message += `📌 *Источник:* ${data.source}\n`;
  if (data.name) message += `👤 *Имя:* ${data.name}\n`;
  message += `📞 *Телефон:* ${data.phone}\n\n`;

  if (data.quizData) {
    message += `🛠 *Данные квиза:*\n`;
    message += `Форма: ${data.quizData.kitchenShape || 'Не указано'}\n`;
    message += `Размер: ${data.quizData.size || 'Не указано'}\n`;
    message += `Материал: ${data.quizData.material || 'Не указано'}\n`;
    message += `Сроки: ${data.quizData.timing || 'Не указано'}\n`;
    message += `Техника: ${data.quizData.items?.join(', ') || 'Нет'}\n`;
    if (data.quizData.calculatedPrice) {
      message += `\n💰 *Расчетная цена:* ${data.quizData.calculatedPrice.toLocaleString('ru-RU')} ₽\n`;
    }
  }

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown',
      }),
    });

    if (!response.ok) {
      throw new Error(`Telegram API error: ${response.statusText}`);
    }

    return true;
  } catch (error) {
    console.error('Error sending lead to Telegram:', error);
    return false;
  }
}
