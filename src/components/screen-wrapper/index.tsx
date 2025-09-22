import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useThemeContext } from '~/providers/theme-provider'
import { DEFAULT_SCROLL_VIEW_PROPS } from '~/utils/props'
import type { IScreenWrapperProps } from './types'

export function ScreenWrapper({
	children,
	disableSafeArea,
	disableScrollView,
	safeAreaProps,
	scrollProps,
	disableKeyboard,
	keyboardProps,
	backgroundColor = 'background',
}: IScreenWrapperProps) {
	const { theme } = useThemeContext()

	let content = children

	if (!disableScrollView) {
		content = (
			<ScrollView
				style={{
					flex: 1,
					backgroundColor: theme.colors[backgroundColor],
				}}
				contentContainerStyle={{ flexGrow: 1 }}
				{...DEFAULT_SCROLL_VIEW_PROPS}
				{...scrollProps}
			>
				{content}
			</ScrollView>
		)
	}

	if (!disableKeyboard) {
		content = (
			<KeyboardAvoidingView
				behavior={Platform.OS === 'ios' ? 'padding' : undefined}
				style={{
					flex: 1,
					backgroundColor: theme.colors[backgroundColor],
				}}
				{...keyboardProps}
			>
				{content}
			</KeyboardAvoidingView>
		)
	}

	if (!disableSafeArea) {
		content = (
			<SafeAreaView
				style={{
					flex: 1,
					backgroundColor: theme.colors[backgroundColor],
				}}
				{...safeAreaProps}
			>
				{content}
			</SafeAreaView>
		)
	}

	return content
}
