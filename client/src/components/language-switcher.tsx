import { useLanguage } from '@/lib/language-context';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex gap-1" data-testid="language-switcher">
      <Button
        size="sm"
        variant={language === 'en' ? 'default' : 'ghost'}
        onClick={() => setLanguage('en')}
        data-testid="button-language-en"
        className="text-xs"
      >
        EN
      </Button>
      <Button
        size="sm"
        variant={language === 'fr' ? 'default' : 'ghost'}
        onClick={() => setLanguage('fr')}
        data-testid="button-language-fr"
        className="text-xs"
      >
        FR
      </Button>
    </div>
  );
}
