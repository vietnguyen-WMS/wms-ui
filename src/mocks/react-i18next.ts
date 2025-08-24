export const useTranslation = () => ({ t: (key: string) => key });

export const initReactI18next = {
  type: '3rdParty' as const,
  init: () => {},
};
