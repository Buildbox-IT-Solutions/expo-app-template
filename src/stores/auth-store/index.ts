import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { zustandStorage } from '~/utils/storage'

interface IAuthState {
	accessToken: string | null
}

interface IAuthActions {
	set: (state: Partial<IAuthState>) => void
	reset: () => void
}

type IAuthStore = IAuthState & IAuthActions

const DEFAULT_STATE: IAuthState = {
	accessToken: null,
}

export const useAuthStore = create<IAuthStore>()(
	persist(
		(set) => ({
			...DEFAULT_STATE,
			set: (state) => set(state),
			reset: () => set(DEFAULT_STATE),
		}),
		{
			name: 'auth-store',
			storage: createJSONStorage(() => zustandStorage),
		},
	),
)
