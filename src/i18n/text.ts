import { Lang } from './translations';

export function pickText(text: { uk: string; en: string }, lang: Lang) {
  return lang === 'en' ? text.en : text.uk;
}

