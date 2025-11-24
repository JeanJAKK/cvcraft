import { useLanguage } from '@/lib/language-context';
import { translations } from '@/lib/translations';

export function useTranslations() {
  const { language } = useLanguage();
  return translations[language];
}
