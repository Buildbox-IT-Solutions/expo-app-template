import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from 'styled-components/native'
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
	const { COLORS } = useTheme()

	let content = children

	if (!disableScrollView) {
		content = (
			<ScrollView
				style={{
					flex: 1,
					backgroundColor: COLORS[backgroundColor],
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
					backgroundColor: COLORS[backgroundColor],
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
					backgroundColor: COLORS[backgroundColor],
				}}
				{...safeAreaProps}
			>
				{content}
			</SafeAreaView>
		)
	}

	return content
}
