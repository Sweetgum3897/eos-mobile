import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './langs/en.json';
import zh from './langs/zh.json';

const resources = {
  en: { translation: en },
  zh: { translation: zh },
};

export const getLanguage = async (): Promise<string> => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('language') || 'en';
    } else {
      const lang = await AsyncStorage.getItem('language');
      return lang ?? 'en';
    }
  } catch (error) {
    console.error('Error getting language:', error);
    return 'en';
  }
};

getLanguage().then((language) => {
  i18n.use(initReactI18next).init({
    resources,
    lng: language,
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });
});

export const changeLanguage = async (language: string) => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('language', language);
    } else {
      await AsyncStorage.setItem('language', language);
    }
    await i18n.changeLanguage(language);
  } catch (error) {
    console.error('Error changing language:', error);
  }
};

export default i18n;
