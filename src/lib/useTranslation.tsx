import { useTranslation as useI18Translate } from "react-i18next";
import i18next, { changeLanguage } from "i18next";
import { useEffect } from "react";

export enum supportedLanguages {
  ENGLISH = "english",
  ITALIAN = "italian",
}

const useTranslation = () => {
  const cachedLanguage = i18next.language;
  useEffect(() => {
    if (
      !Object.values(supportedLanguages).includes(
        cachedLanguage as supportedLanguages
      )
    ) {
      // default to english
      void changeLanguage("english");
    }
  }, []);

  const { t } = useI18Translate(i18next.language);

  return t;
};

export default useTranslation;
