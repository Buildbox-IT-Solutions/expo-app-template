/* istanbul ignore file */

import type { ScrollViewProps, TouchableOpacityProps } from 'react-native'
import { Feedback } from './feedback'

export const DEFAULT_SCROLL_VIEW_PROPS: Partial<ScrollViewProps> = {
	bounces: false,
	showsHorizontalScrollIndicator: false,
	showsVerticalScrollIndicator: false,
	overScrollMode: 'never',
}

export const DEFAULT_TOUCHABLE_OPACITY_PROPS: Partial<TouchableOpacityProps> = {
	activeOpacity: 0.8,
	onPressIn: () => Feedback.haptic.light(),
	onPress: () => Feedback.notImplemented(),
}
