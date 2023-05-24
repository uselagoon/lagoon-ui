import { useEffect } from 'react';
import { useTranslation as useI18Translate } from 'react-i18next';

import i18next, { changeLanguage } from 'i18next';

export enum supportedLanguages {
  ENGLISH = 'en',
  ITALIAN = 'it',
}

const useTranslation = () => {
  const cachedLanguage = i18next.language;
  useEffect(() => {
    if (!Object.values(supportedLanguages).includes(cachedLanguage as supportedLanguages)) {
      // default to english
      void changeLanguage('en');
    }
  }, []);

  const { t } = useI18Translate(i18next.language);

  return t;
};

export default useTranslation;
