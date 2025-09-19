import type { IOrganization } from '~/interfaces/organization'

export function makeOrganizationSut(
	overrides?: Partial<IOrganization>,
): IOrganization {
	return {
		id: 1,
		login: 'buildbox-it-solutions',
		node_id: '123',
		url: 'https://github.com/buildbox-it-solutions',
		repos_url: 'https://github.com/buildbox-it-solutions/repos',
		events_url: 'https://github.com/buildbox-it-solutions/events',
		hooks_url: 'https://github.com/buildbox-it-solutions/hooks',
		issues_url: 'https://github.com/buildbox-it-solutions/issues',
		members_url: 'https://github.com/buildbox-it-solutions/members',
		public_members_url:
			'https://github.com/buildbox-it-solutions/public-members',
		avatar_url: 'https://github.com/buildbox-it-solutions.png',
		description: 'Buildbox IT Solutions',
		name: 'Buildbox IT Solutions',
		company: 'Buildbox IT Solutions',
		blog: 'https://github.com/buildbox-it-solutions',
		location: 'Brazil',
		email: 'buildbox-it-solutions@gmail.com',
		twitter_username: 'buildbox-it-solutions',
		is_verified: true,
		has_organization_projects: true,
		has_repository_projects: true,
		public_repos: 1,
		public_gists: 1,
		followers: 1,
		following: 1,
		html_url: 'https://github.com/buildbox-it-solutions',
		created_at: '2021-01-01',
		updated_at: '2021-01-01',
		archived_at: null,
		type: 'Organization',
		...overrides,
	}
}
