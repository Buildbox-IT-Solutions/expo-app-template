import { renderHook } from '@testing-library/react-hooks'
import { act } from 'react'
import { useAuthStore } from '~/stores/auth-store'
import { makeUserSut } from '../../../tests/factories/user'

jest.mock('@react-native-async-storage/async-storage', () => ({
	setItem: jest.fn(),
	getItem: jest.fn(),
	removeItem: jest.fn(),
}))

describe('useAuthStore', () => {
	beforeEach(() => {
		const { result } = renderHook(() => useAuthStore())
		act(() => {
			result.current.reset()
		})
	})

	it('should initialize with default state', () => {
		const { result } = renderHook(() => useAuthStore())
		expect(result.current.user).toBeNull()
		expect(result.current.accessToken).toBeNull()
	})

	it('should set user and accessToken', () => {
		const { result } = renderHook(() => useAuthStore())
		const user = makeUserSut()
		const accessToken = 'token123'

		act(() => {
			result.current.set({ user, accessToken })
		})

		expect(result.current.user).toEqual(user)
		expect(result.current.accessToken).toEqual(accessToken)
	})

	it('should reset to default state', () => {
		const { result } = renderHook(() => useAuthStore())
		const user = makeUserSut()
		const accessToken = 'token123'

		act(() => {
			result.current.set({ user, accessToken })
		})

		act(() => {
			result.current.reset()
		})

		expect(result.current.user).toBeNull()
		expect(result.current.accessToken).toBeNull()
	})
})
