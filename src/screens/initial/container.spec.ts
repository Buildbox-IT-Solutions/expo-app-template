import { renderHook } from '@testing-library/react-hooks'
import { Alert, Linking } from 'react-native'
import type { IOrganization } from '~/interfaces/organization'
import { useGetOrg } from '~/services/organization'
import { useContainer } from './container'

jest.mock('../../services/organization')
jest.mock('react-native', () => ({
	Alert: {
		alert: jest.fn(),
	},
	Linking: {
		canOpenURL: jest.fn(),
		openURL: jest.fn(),
	},
}))

const mockUseGetOrg = useGetOrg as jest.MockedFunction<typeof useGetOrg>

describe('useContainer', () => {
	beforeEach(() => {
		jest.clearAllMocks()
	})

	it('should return data from useGetOrg', () => {
		const mockData = {
			id: 1,
			login: 'test-org',
			name: 'Test Organization',
		} as IOrganization

		mockUseGetOrg.mockReturnValue({
			data: mockData,
			isLoading: false,
			error: null,
		} as unknown as ReturnType<typeof useGetOrg>)

		const { result } = renderHook(() => useContainer())

		expect(result.current.data).toBe(mockData)
		expect(result.current.isLoading).toBe(false)
		expect(result.current.error).toBe(null)
	})

	it('should return loading state', () => {
		mockUseGetOrg.mockReturnValue({
			data: null,
			isLoading: true,
			error: null,
		} as unknown as ReturnType<typeof useGetOrg>)

		const { result } = renderHook(() => useContainer())

		expect(result.current.isLoading).toBe(true)
	})

	it('should return error state', () => {
		const mockError = new Error('Test error')

		mockUseGetOrg.mockReturnValue({
			data: null,
			isLoading: false,
			error: mockError,
		} as unknown as ReturnType<typeof useGetOrg>)

		const { result } = renderHook(() => useContainer())

		expect(result.current.error).toBe(mockError)
	})

	describe('formatNumber', () => {
		beforeEach(() => {
			mockUseGetOrg.mockReturnValue({
				data: null,
				isLoading: false,
				error: null,
			} as unknown as ReturnType<typeof useGetOrg>)
		})

		it('should format numbers in millions', () => {
			const { result } = renderHook(() => useContainer())

			expect(result.current.formatNumber(1500000)).toBe('1.5M')
			expect(result.current.formatNumber(2000000)).toBe('2.0M')
		})

		it('should format numbers in thousands', () => {
			const { result } = renderHook(() => useContainer())

			expect(result.current.formatNumber(1500)).toBe('1.5K')
			expect(result.current.formatNumber(2000)).toBe('2.0K')
		})

		it('should return string for small numbers', () => {
			const { result } = renderHook(() => useContainer())

			expect(result.current.formatNumber(999)).toBe('999')
			expect(result.current.formatNumber(0)).toBe('0')
		})
	})

	describe('formatDate', () => {
		beforeEach(() => {
			mockUseGetOrg.mockReturnValue({
				data: null,
				isLoading: false,
				error: null,
			} as unknown as ReturnType<typeof useGetOrg>)
		})

		it('should format date in pt-BR locale', () => {
			const { result } = renderHook(() => useContainer())

			const dateString = '2023-01-15T10:30:00Z'
			const formatted = result.current.formatDate(dateString)

			expect(formatted).toMatch(/\d{2}\/\d{2}\/\d{4}/)
		})
	})

	describe('handleOpenUrl', () => {
		beforeEach(() => {
			mockUseGetOrg.mockReturnValue({
				data: null,
				isLoading: false,
				error: null,
			} as unknown as ReturnType<typeof useGetOrg>)
		})

		it('should open URL when supported', async () => {
			const mockLinking = Linking as jest.Mocked<typeof Linking>
			mockLinking.canOpenURL.mockResolvedValue(true)
			mockLinking.openURL.mockResolvedValue(undefined)

			const { result } = renderHook(() => useContainer())

			const testUrl = 'https://example.com'
			const openUrlFunction = result.current.handleOpenUrl(testUrl)

			await openUrlFunction()

			expect(mockLinking.canOpenURL).toHaveBeenCalledWith(testUrl)
			expect(mockLinking.openURL).toHaveBeenCalledWith(testUrl)
		})

		it('should show alert when URL is not supported', async () => {
			const mockLinking = Linking as jest.Mocked<typeof Linking>
			const mockAlert = Alert as jest.Mocked<typeof Alert>

			mockLinking.canOpenURL.mockResolvedValue(false)

			const { result } = renderHook(() => useContainer())

			const testUrl = 'invalid://url'
			const openUrlFunction = result.current.handleOpenUrl(testUrl)

			await openUrlFunction()

			expect(mockLinking.canOpenURL).toHaveBeenCalledWith(testUrl)
			expect(mockLinking.openURL).not.toHaveBeenCalled()
			expect(mockAlert.alert).toHaveBeenCalledWith(
				'Error',
				'Cannot open this URL',
			)
		})

		it('should show alert when opening URL fails', async () => {
			const mockLinking = Linking as jest.Mocked<typeof Linking>
			const mockAlert = Alert as jest.Mocked<typeof Alert>

			mockLinking.canOpenURL.mockRejectedValue(new Error('Network error'))

			const { result } = renderHook(() => useContainer())

			const testUrl = 'https://example.com'
			const openUrlFunction = result.current.handleOpenUrl(testUrl)

			await openUrlFunction()

			expect(mockLinking.canOpenURL).toHaveBeenCalledWith(testUrl)
			expect(mockAlert.alert).toHaveBeenCalledWith(
				'Error',
				'Failed to open URL',
			)
		})

		it('should show alert when openURL throws error', async () => {
			const mockLinking = Linking as jest.Mocked<typeof Linking>
			const mockAlert = Alert as jest.Mocked<typeof Alert>

			mockLinking.canOpenURL.mockResolvedValue(true)
			mockLinking.openURL.mockRejectedValue(new Error('Failed to open'))

			const { result } = renderHook(() => useContainer())

			const testUrl = 'https://example.com'
			const openUrlFunction = result.current.handleOpenUrl(testUrl)

			await openUrlFunction()

			expect(mockLinking.canOpenURL).toHaveBeenCalledWith(testUrl)
			expect(mockLinking.openURL).toHaveBeenCalledWith(testUrl)
			expect(mockAlert.alert).toHaveBeenCalledWith(
				'Error',
				'Failed to open URL',
			)
		})
	})

	it('should return all expected functions and data', () => {
		mockUseGetOrg.mockReturnValue({
			data: { id: 1 } as IOrganization,
			isLoading: false,
			error: null,
		} as unknown as ReturnType<typeof useGetOrg>)

		const { result } = renderHook(() => useContainer())

		expect(typeof result.current.handleOpenUrl).toBe('function')
		expect(typeof result.current.formatNumber).toBe('function')
		expect(typeof result.current.formatDate).toBe('function')
		expect(result.current.data).toBeDefined()
		expect(typeof result.current.isLoading).toBe('boolean')
	})
})
