import { categoriesData } from './categories';
import { Lang } from '../i18n/translations';
import { pickText } from '../i18n/text';

export function getCategoryLabel(categoryKey: string, lang: Lang): string {
  const cat = categoriesData.find((c) => c.key === categoryKey);
  return cat ? pickText(cat.label, lang) : categoryKey;
}

