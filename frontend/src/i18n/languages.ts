export enum SupportedLanguage {
  ENGLISH = 'en',
  HINDI = 'hi',
  TELUGU = 'te',
  TAMIL = 'ta',
  KANNADA = 'kn',
}

export interface LanguageOption {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: SupportedLanguage.ENGLISH, name: 'English', nativeName: 'English' },
  { code: SupportedLanguage.HINDI, name: 'Hindi', nativeName: 'हिन्दी' },
  { code: SupportedLanguage.TELUGU, name: 'Telugu', nativeName: 'తెలుగు' },
  { code: SupportedLanguage.TAMIL, name: 'Tamil', nativeName: 'தமிழ்' },
  { code: SupportedLanguage.KANNADA, name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
];

export const DEFAULT_LANGUAGE = SupportedLanguage.ENGLISH;
