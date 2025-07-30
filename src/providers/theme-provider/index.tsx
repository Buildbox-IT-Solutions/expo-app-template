import { createContext, type ReactNode, useContext } from 'react'
import { ThemeProvider } from 'styled-components/native'
import { useContainer } from './container'

interface IAppThemeProviderContext {
	setLightTheme: () => void
	setDarkTheme: () => void
}

const AppThemeProviderContext = createContext<IAppThemeProviderContext>(
	{} as IAppThemeProviderContext,
)

export function AppThemeProvider({ children }: { children: ReactNode }) {
	const { currentTheme, setDarkTheme, setLightTheme } = useContainer()

	return (
		<AppThemeProviderContext.Provider
			value={{
				setLightTheme,
				setDarkTheme,
			}}
		>
			<ThemeProvider theme={currentTheme}>{children}</ThemeProvider>
		</AppThemeProviderContext.Provider>
	)
}

export function useThemeContext() {
	return useContext(AppThemeProviderContext)
}
