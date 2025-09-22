import { useCallback, useMemo } from 'react'
import { useShallow } from 'zustand/react/shallow'
import { ETheme } from '~/enums/theme'
import { useAppStore } from '~/stores/app-store'
import { darkTheme } from '~/themes/dark'
import { lightTheme } from '~/themes/light'

const THEMES = {
	[ETheme.LIGHT]: lightTheme,
	[ETheme.DARK]: darkTheme,
}

export function useThemeProviderContainer() {
	const { set, theme } = useAppStore(
		useShallow(({ set, theme }) => ({ set, theme })),
	)

	const setLightTheme = useCallback(() => {
		set({ theme: ETheme.LIGHT })
	}, [])

	const setDarkTheme = useCallback(() => {
		set({ theme: ETheme.DARK })
	}, [])

	const currentTheme = useMemo(() => THEMES[theme], [theme])

	return {
		setLightTheme,
		setDarkTheme,
		currentTheme,
	}
}
