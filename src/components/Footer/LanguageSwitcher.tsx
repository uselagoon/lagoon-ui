import i18next, { changeLanguage } from 'i18next';
import { supportedLanguages } from 'lib/useTranslation';

import { StyledLanguageSwitcher } from './StyledFooter';

const LanguageSwitcher = () => {
  const langs = Object.values(supportedLanguages) as string[];

  const changeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    void changeLanguage(e.target.value);
  };

  return (
    <StyledLanguageSwitcher onChange={changeHandler} defaultValue={i18next.language}>
      {langs.map(language => {
        return (
          <option value={language} key={language}>
            {language.charAt(0).toUpperCase() + language.slice(1)}
          </option>
        );
      })}
    </StyledLanguageSwitcher>
  );
};

export default LanguageSwitcher;
