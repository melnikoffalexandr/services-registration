import { TelegramApi } from "./telegramApi";

declare global {
  interface Window { Telegram: { WebApp: TelegramApi; } }
}
