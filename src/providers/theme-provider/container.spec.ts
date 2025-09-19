import { act, renderHook } from '@testing-library/react-hooks'
import { ETheme } from '~/enums/theme'
import { useAppStore } from '~/stores/app-store'
import { darkTheme } from '~/themes/dark'
import { lightTheme } from '~/themes/light'
import { useThemeProviderContainer } from './container'

jest.mock('~/stores/app-store', () => ({
	useAppStore: jest.fn(),
}))

describe('useThemeProviderContainer', () => {
	let setMock: jest.Mock

	beforeEach(() => {
		setMock = jest.fn()
		;(useAppStore as unknown as jest.Mock).mockReturnValue({
			set: setMock,
			theme: ETheme.LIGHT,
		})
	})

	afterEach(() => {
		jest.clearAllMocks()
	})

	it('should return the current theme', () => {
		const { result } = renderHook(() => useThemeProviderContainer())
		expect(result.current.currentTheme).toBe(lightTheme)
	})

	it('should set the light theme', () => {
		const { result } = renderHook(() => useThemeProviderContainer())
		act(() => {
			result.current.setLightTheme()
		})
		expect(setMock).toHaveBeenCalledWith({ theme: ETheme.LIGHT })
	})

	it('should set the dark theme', () => {
		;(useAppStore as unknown as jest.Mock).mockReturnValue({
			set: setMock,
			theme: ETheme.DARK,
		})
		const { result } = renderHook(() => useThemeProviderContainer())
		act(() => {
			result.current.setDarkTheme()
		})
		expect(setMock).toHaveBeenCalledWith({ theme: ETheme.DARK })
	})

	it('should return the dark theme when theme is set to dark', () => {
		;(useAppStore as unknown as jest.Mock).mockReturnValue({
			set: setMock,
			theme: ETheme.DARK,
		})
		const { result } = renderHook(() => useThemeProviderContainer())
		expect(result.current.currentTheme).toBe(darkTheme)
	})
})
