import { useEffect, useState } from 'react';

type LanguageChangeCallback = (lng: string) => void;

const listeners: LanguageChangeCallback[] = [];

const i18n = {
  language: 'en',
  changeLanguage: async (lng: string) => {
    i18n.language = lng;
    listeners.forEach((cb) => cb(lng));
  },
  on: (event: string, cb: LanguageChangeCallback) => {
    if (event === 'languageChanged') listeners.push(cb);
  },
  off: (event: string, cb: LanguageChangeCallback) => {
    if (event !== 'languageChanged') return;
    const index = listeners.indexOf(cb);
    if (index >= 0) listeners.splice(index, 1);
  },
};

export const useTranslation = () => {
  const [, setLang] = useState(i18n.language);

  useEffect(() => {
    const handler = () => setLang(i18n.language);
    i18n.on('languageChanged', handler);
    return () => i18n.off('languageChanged', handler);
  }, []);

  return {
    t: (key: string) => key,
    i18n,
  };
};

export const initReactI18next = {
  type: '3rdParty' as const,
  init: () => {},
};
