import { create } from 'zustand'
// import defaultMessage from '@/i18n/locales/ja.json'


export type I18nState = {
    locale: string;
    setLocale: (locale: string) => void;
    message: any;
    setMessage: (locale: string) => Promise<void>
}

const getLocale = () => {
    // 1. cookieから言語取得
    const match = document.cookie.match(/(?:^| )NEXT_LOCALE=([^;]+)/);
    if (match && match[1]) {
        return match[1];
    }

    // 2. browserから言語取得
    const lang = navigator.language.split("-")[0];
    if (lang) {
        return lang;
    }

    // 3. default
    return "ja"
}

const locale = getLocale();
const defaultMessage = await import(`@/i18n/locales/${locale}.json`);

console.log("getLocale:" + getLocale());

export const useI18nStore = create<I18nState>((set, get) => ({
    locale: locale,
    setLocale: async (locale) => {
        set(state => ({
            ...state,
            locale: locale
        }));
        await get().setMessage(locale);
    },
    message: defaultMessage,
    setMessage: async (locale) => {
        const json = await import(`@/i18n/locales/${locale}.json`)
        set(state => ({
            ...state,
            message: json.default
        }));
    }
}));