import { renderHook } from '@testing-library/react-hooks'
import { act } from 'react'
import { useAppStore } from '~/stores/app-store'

jest.mock('@react-native-async-storage/async-storage', () => ({
	setItem: jest.fn(),
	getItem: jest.fn(),
	removeItem: jest.fn(),
}))

describe('useAppStore', () => {
	it('should initialize with default state', () => {
		const { result } = renderHook(() => useAppStore())
		expect(result.current).toBeDefined()
	})

	it('should update state using set method', () => {
		const { result } = renderHook(() => useAppStore())

		act(() => {
			// @ts-ignore
			result.current.set({ someKey: 'someValue' })
		})

		// @ts-ignore
		expect(result.current.someKey).toBe('someValue')
	})

	it('should call setPersist and setDisposable when set is called', () => {
		const { result } = renderHook(() => useAppStore())
		const setPersistSpy = jest.spyOn(result.current, 'setPersist')
		const setDisposableSpy = jest.spyOn(result.current, 'setDisposable')

		act(() => {
			// @ts-ignore
			result.current.set({ someKey: 'someValue' })
		})

		expect(setPersistSpy).toHaveBeenCalledWith({ someKey: 'someValue' })
		expect(setDisposableSpy).toHaveBeenCalledWith({ someKey: 'someValue' })
	})
})
