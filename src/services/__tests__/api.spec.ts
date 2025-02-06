import { useAuthStore } from '~/stores/auth-store'
import { formatBytes } from '~/utils/data'
import { env } from '~/utils/env'
import { responseErroHandler } from '~/utils/error'
import { devLog } from '~/utils/log'
import { api } from '../api'

jest.mock('~/stores/auth-store')
jest.mock('~/utils/data')
jest.mock('~/utils/env', () => ({
	env: {
		BASE_URL: 'https://test.com',
	},
}))
jest.mock('~/utils/error')
jest.mock('~/utils/log')

describe('API Service', () => {
	beforeEach(() => {
		jest.clearAllMocks()
	})

	it('should set the base URL and timeout for axios instance', () => {
		expect(api.defaults.baseURL).toBe(env.BASE_URL)
		expect(api.defaults.timeout).toBe(10000)
	})

	it('should add Authorization header if accessToken is present', () => {
		const accessToken = 'test-token'
		useAuthStore.getState = jest.fn().mockReturnValue({ accessToken })
		const requestConfig = { headers: {} }

		const result =
			// @ts-expect-error - We are testing a private method
			api.interceptors.request.handlers[0].fulfilled(requestConfig)

		expect(result.headers.Authorization).toBe(`Bearer ${accessToken}`)
	})

	it('should not add Authorization header if accessToken is not present', () => {
		useAuthStore.getState = jest.fn().mockReturnValue({ accessToken: null })
		const requestConfig = { headers: {} }

		const result =
			// @ts-expect-error - We are testing a private method
			api.interceptors.request.handlers[0].fulfilled(requestConfig)

		expect(result.headers.Authorization).toBeUndefined()
	})

	it('should log response information', () => {
		const response = {
			status: 200,
			config: { url: '/test' },
			data: { key: 'value' },
		}
		;(formatBytes as jest.Mock).mockReturnValue('10 bytes')
		const expectedLog = '200 - /test - 10 bytes'

		// @ts-expect-error - We are testing a private method
		api.interceptors.response.handlers[0].fulfilled(response)

		expect(devLog).toHaveBeenCalledWith(expectedLog)
	})

	it('should handle response error', () => {
		const error = new Error('Test error')

		// @ts-expect-error - We are testing a private method
		api.interceptors.response.handlers[0].rejected(error)

		expect(responseErroHandler).toHaveBeenCalledWith(error)
	})
})
