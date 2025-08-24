const i18n = {
  language: 'en',
  changeLanguage: async (lng: string) => {
    i18n.language = lng;
  },
};

export const useTranslation = () => ({
  t: (key: string) => key,
  i18n,
});

export const initReactI18next = {
  type: '3rdParty' as const,
  init: () => {},
};
