import { ActivityIndicator, Button } from 'react-native'
import { ScreenWrapper } from '~/components/screen-wrapper'
import { useThemeContext } from '~/providers/theme-provider'
import { useGetUser } from '~/services/auth'
import * as S from './styles'

export function InitialScreen() {
	const { data, isLoading } = useGetUser()

	const { setDarkTheme, setLightTheme } = useThemeContext()

	return (
		<ScreenWrapper>
			<S.Container>
				<S.Title>Hello {data?.login || 'Build'}!</S.Title>

				<S.Avatar
					source={{
						uri:
							data?.avatar_url ||
							'https://media.licdn.com/dms/image/v2/C4E0BAQHw3-RgYXsq_g/company-logo_200_200/company-logo_200_200/0/1630632834846/buildbox_it_solutions_logo?e=2147483647&v=beta&t=-tVj5R8h64akOnoC8Qad9cUaE-23aRH6mmXjZC8j7GI',
					}}
				/>

				{isLoading && <ActivityIndicator />}

				<Button title="Light Theme" />
				<Button title="Light Theme" onPress={setLightTheme} />
				<Button title="Dark Theme" onPress={setDarkTheme} />
			</S.Container>
		</ScreenWrapper>
	)
}
