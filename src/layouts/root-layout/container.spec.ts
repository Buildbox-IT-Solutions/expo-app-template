import { renderHook } from '@testing-library/react-hooks'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { useRootLayoutContainer } from '~/layouts/root-layout/container'

jest.mock('expo-font')
jest.mock('expo-splash-screen', () => ({
	preventAutoHideAsync: jest.fn(),
	hideAsync: jest.fn(),
}))

describe('useRootLayoutContainer', () => {
	beforeEach(() => {
		jest.clearAllMocks()
	})

	it('should return loaded as true when fonts are loaded', () => {
		;(useFonts as jest.Mock).mockReturnValue([true, null])
		const { result } = renderHook(() => useRootLayoutContainer())
		expect(result.current.loaded).toBe(true)
	})

	it('should return loaded as false when fonts are not loaded', () => {
		;(useFonts as jest.Mock).mockReturnValue([false, null])
		const { result } = renderHook(() => useRootLayoutContainer())
		expect(result.current.loaded).toBe(false)
	})

	it('should call SplashScreen.hideAsync when fonts are loaded', () => {
		;(useFonts as jest.Mock).mockReturnValue([true, null])
		renderHook(() => useRootLayoutContainer())
		expect(SplashScreen.hideAsync).toHaveBeenCalled()
	})

	it('should throw an error if there is an error loading fonts', () => {
		const error = new Error('Failed to load fonts')
		;(useFonts as jest.Mock).mockReturnValue([false, error])
		const { result } = renderHook(() => useRootLayoutContainer())
		expect(() => result.current).toThrow(error)
	})
})
