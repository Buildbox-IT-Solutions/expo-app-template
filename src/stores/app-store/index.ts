import { create, type StateCreator } from 'zustand'
import {
	appStoreDisposableSlice,
	type IDisposableSlice,
	type IDisposableState,
} from './disposable'
import {
	appStorePersistentSlice,
	type IPersistentSlice,
	type IPersistentState,
} from './persist'

interface ISharedSlice {
	set: (
		state: Partial<IDisposableState & IPersistentState & ISharedSlice>,
	) => void
}

const createSharedSlice: StateCreator<
	ISharedSlice & IDisposableSlice & IPersistentSlice,
	[],
	[],
	ISharedSlice
> = (_, get, __) => ({
	set: (state) => {
		get().setPersist(state)
		get().setDisposable(state)
	},
})

/**
 * @description !IMPORTANT: when using this store with a callback, use the `useShallow` hook from `zustand/react/shallow` to prevent unnecessary re-renders and a potential infinite loop.
 */
export const useAppStore = create<
	IDisposableSlice & IPersistentSlice & ISharedSlice
>()((...a) => ({
	...appStoreDisposableSlice(...a),
	...appStorePersistentSlice(...a),
	...createSharedSlice(...a),
}))
