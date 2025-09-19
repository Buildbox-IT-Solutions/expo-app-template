import { Alert, Linking } from 'react-native'
import { useGetOrg } from '~/services/organization'

export function useContainer() {
	const { data, isLoading, error } = useGetOrg()

	function handleOpenUrl(url: string) {
		return async function openUrl() {
			try {
				const supported = await Linking.canOpenURL(url)
				if (supported) {
					await Linking.openURL(url)
				} else {
					Alert.alert('Error', 'Cannot open this URL')
				}
			} catch {
				Alert.alert('Error', 'Failed to open URL')
			}
		}
	}

	function formatNumber(num: number) {
		if (num >= 1000000) {
			return `${(num / 1000000).toFixed(1)}M`
		}
		if (num >= 1000) {
			return `${(num / 1000).toFixed(1)}K`
		}
		return num.toString()
	}

	function formatDate(dateString: string) {
		return new Date(dateString).toLocaleDateString('pt-BR')
	}

	return {
		data,
		isLoading,
		error,
		handleOpenUrl,
		formatNumber,
		formatDate,
	}
}
