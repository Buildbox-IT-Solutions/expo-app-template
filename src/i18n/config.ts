import { getLocales } from 'expo-localization'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import ptBr from './languages/pt-br.json'

const DEFAULT_LANGUAGE = 'pt-BR'

i18n.use(initReactI18next).init({
	compatibilityJSON: 'v4',
	resources: {
		'pt-BR': { translation: ptBr },
	},
	fallbackLng: DEFAULT_LANGUAGE,
	lng: getLocales()[0]?.languageTag || DEFAULT_LANGUAGE,
	interpolation: {
		escapeValue: false,
	},
})

export const t = i18n.t.bind(i18n)
