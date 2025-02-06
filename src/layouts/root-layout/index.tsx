import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { QueryProvider } from '~/providers/query-provider'
import { AppThemeProvider } from '~/providers/theme-provider'
import { useContainer } from './container'

export default function RootLayout() {
	const { loaded } = useContainer()

	if (!loaded) return null

	return (
		<AppThemeProvider>
			<StatusBar style="auto" />

			<QueryProvider>
				<Stack
					screenOptions={{
						headerShown: false,
					}}
				/>
			</QueryProvider>
		</AppThemeProvider>
	)
}
