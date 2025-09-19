import { useFonts } from 'expo-font'

export { ErrorBoundary } from 'expo-router'

import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import { EFont } from '~/enums/fonts'

SplashScreen.preventAutoHideAsync()

export function useRootLayoutContainer() {
	const [loaded, error] = useFonts({
		[EFont.REGULAR]: require('../../assets/fonts/SpaceMono-Regular.ttf'),
	})

	function errorHandler() {
		if (error) throw error
	}
	useEffect(errorHandler, [error])

	function hiddenSplashScreen() {
		if (loaded) SplashScreen.hideAsync()
	}
	useEffect(hiddenSplashScreen, [loaded])

	return { loaded }
}
