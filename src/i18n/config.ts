import { getLocales } from 'expo-localization'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { devLog } from '~/utils/log'
import ptBr from './languages/pt-br.json'

const DEFAULT_LANGUAGE = 'pt-BR'

const lng = getLocales()[0]?.languageTag || DEFAULT_LANGUAGE

i18n.use(initReactI18next).init({
	compatibilityJSON: 'v4',
	resources: {
		'pt-BR': ptBr,
	},
	fallbackLng: DEFAULT_LANGUAGE,
	lng,
	interpolation: {
		escapeValue: false,
	},
})

devLog(`🌎 Setting language to ${lng}`)

export const t = i18n.t.bind(i18n)
