/* istanbul ignore file */

import { z } from 'zod'
import { t } from '~/i18n/config'

const envSchema = z.object({
	BASE_URL: z.string().url(),
})

const _env = envSchema.safeParse({
	BASE_URL: process.env.EXPO_PUBLIC_BASE_URL,
})

if (!_env.success) {
	const errorTable = Object.entries(_env.error.flatten().fieldErrors).reduce(
		(acc, [key, value]) => {
			acc[key] = value.join(', ')
			return acc
		},
		{} as Record<string, string>,
	)

	throw new Error(
		`${t('erros.environment_variables')} \n${JSON.stringify(errorTable, null, 2)}`,
	)
}

export const env = _env.data
