import {
	ActivityIndicator,
	Image,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
} from 'react-native'
import { ScreenWrapper } from '~/components/screen-wrapper'
import { useContainer } from './container'
import { useLoginStyles } from './styles'

export function InitialScreen() {
	const { data, isLoading, error, handleOpenUrl, formatNumber, formatDate } =
		useContainer()
	const styles = useLoginStyles()

	if (isLoading) {
		return (
			<ScreenWrapper>
				<View style={styles.loadingContainer}>
					<ActivityIndicator size="large" color="#007AFF" />
					<Text style={{ marginTop: 15, fontSize: 16 }}>
						Carregando informações da organização...
					</Text>
				</View>
			</ScreenWrapper>
		)
	}

	if (error) {
		return (
			<ScreenWrapper>
				<View style={styles.loadingContainer}>
					<Text
						style={{
							fontSize: 18,
							color: 'red',
							textAlign: 'center',
						}}
					>
						Erro ao carregar informações da organização
					</Text>
					<Text
						style={{
							fontSize: 14,
							marginTop: 10,
							textAlign: 'center',
						}}
					>
						{error.message}
					</Text>
				</View>
			</ScreenWrapper>
		)
	}

	if (!data) {
		return (
			<ScreenWrapper>
				<View style={styles.loadingContainer}>
					<Text style={{ fontSize: 16, textAlign: 'center' }}>
						Nenhuma informação encontrada
					</Text>
				</View>
			</ScreenWrapper>
		)
	}

	return (
		<ScreenWrapper>
			<ScrollView
				style={styles.container}
				contentContainerStyle={styles.scrollContainer}
				showsVerticalScrollIndicator={false}
			>
				<View style={styles.header}>
					<Image
						source={{ uri: data.avatar_url }}
						style={styles.avatar}
						resizeMode="cover"
					/>
					<Text style={styles.organizationName}>{data.name}</Text>
					<Text style={styles.organizationLogin}>@{data.login}</Text>

					{data.is_verified && (
						<View style={styles.verifiedBadge}>
							<Text style={styles.verifiedText}>
								✓ Verificado
							</Text>
						</View>
					)}
				</View>

				{data.description && (
					<Text style={styles.description}>{data.description}</Text>
				)}

				<View style={styles.statsContainer}>
					<View style={styles.statItem}>
						<Text style={styles.statNumber}>
							{formatNumber(data.public_repos)}
						</Text>
						<Text style={styles.statLabel}>
							Repositórios{'\n'}Públicos
						</Text>
					</View>
					<View style={styles.statItem}>
						<Text style={styles.statNumber}>
							{formatNumber(data.followers)}
						</Text>
						<Text style={styles.statLabel}>Seguidores</Text>
					</View>
					<View style={styles.statItem}>
						<Text style={styles.statNumber}>
							{formatNumber(data.following)}
						</Text>
						<Text style={styles.statLabel}>Seguindo</Text>
					</View>
					<View style={styles.statItem}>
						<Text style={styles.statNumber}>
							{formatNumber(data.public_gists)}
						</Text>
						<Text style={styles.statLabel}>
							Gists{'\n'}Públicos
						</Text>
					</View>
				</View>

				<View style={styles.infoSection}>
					{data.company && (
						<View style={styles.infoRow}>
							<Text style={styles.infoLabel}>Empresa:</Text>
							<Text style={styles.infoValue}>{data.company}</Text>
						</View>
					)}

					{data.location && (
						<View style={styles.infoRow}>
							<Text style={styles.infoLabel}>Localização:</Text>
							<Text style={styles.infoValue}>
								{data.location}
							</Text>
						</View>
					)}

					{data.email && (
						<View style={styles.infoRow}>
							<Text style={styles.infoLabel}>Email:</Text>
							<Text style={styles.infoValue}>{data.email}</Text>
						</View>
					)}

					{data.twitter_username && (
						<View style={styles.infoRow}>
							<Text style={styles.infoLabel}>Twitter:</Text>
							<Text style={styles.infoValue}>
								@{data.twitter_username}
							</Text>
						</View>
					)}

					<View style={styles.infoRow}>
						<Text style={styles.infoLabel}>Criado em:</Text>
						<Text style={styles.infoValue}>
							{formatDate(data.created_at)}
						</Text>
					</View>

					<View style={styles.infoRow}>
						<Text style={styles.infoLabel}>Atualizado em:</Text>
						<Text style={styles.infoValue}>
							{formatDate(data.updated_at)}
						</Text>
					</View>

					<View style={styles.infoRow}>
						<Text style={styles.infoLabel}>Projetos da Org:</Text>
						<Text style={styles.infoValue}>
							{data.has_organization_projects ? 'Sim' : 'Não'}
						</Text>
					</View>

					<View style={styles.infoRow}>
						<Text style={styles.infoLabel}>Projetos de Repo:</Text>
						<Text style={styles.infoValue}>
							{data.has_repository_projects ? 'Sim' : 'Não'}
						</Text>
					</View>
				</View>

				<View style={styles.linkSection}>
					<TouchableOpacity
						style={styles.linkButton}
						onPress={handleOpenUrl(data.html_url)}
					>
						<Text style={styles.linkButtonText}>Ver no GitHub</Text>
					</TouchableOpacity>

					{data.blog && (
						<TouchableOpacity
							style={styles.linkButton}
							onPress={handleOpenUrl(data.blog)}
						>
							<Text style={styles.linkButtonText}>
								Visitar Blog
							</Text>
						</TouchableOpacity>
					)}
				</View>
			</ScrollView>
		</ScreenWrapper>
	)
}
