import { createContext, type ReactNode, useContext } from 'react'
import type { ITheme } from '~/interfaces/theme'
import { useThemeProviderContainer } from './container'

interface IAppThemeProviderContext {
	setLightTheme: () => void
	setDarkTheme: () => void
	theme: ITheme
}

const AppThemeProviderContext = createContext<IAppThemeProviderContext>(
	{} as IAppThemeProviderContext,
)

export function AppThemeProvider({ children }: { children: ReactNode }) {
	const { currentTheme, setDarkTheme, setLightTheme } =
		useThemeProviderContainer()

	return (
		<AppThemeProviderContext.Provider
			value={{
				setLightTheme,
				setDarkTheme,
				theme: currentTheme,
			}}
		>
			{children}
		</AppThemeProviderContext.Provider>
	)
}

export function useThemeContext() {
	return useContext(AppThemeProviderContext)
}
