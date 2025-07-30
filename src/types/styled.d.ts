import 'styled-components/native'
import type { ITheme } from '~/interfaces/theme'

declare module 'styled-components/native' {
	export interface DefaultTheme extends ITheme {}
}
