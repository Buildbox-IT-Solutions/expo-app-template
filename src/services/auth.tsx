import { type UseQueryResult, useQuery } from '@tanstack/react-query'
import axios, { type AxiosError } from 'axios'
import { EQueryKeys } from '~/enums/query'
import type { IUser } from '~/interfaces/auth'

export function useGetUser(): UseQueryResult<IUser, AxiosError<unknown>> {
	return useQuery({
		queryKey: [EQueryKeys.USER],
		queryFn: async () => {
			const { data } = await axios.get<IUser>(
				'https://api.github.com/users/leonardowlopes',
			)

			return data
		},
		refetchOnMount: false,
		refetchOnWindowFocus: false,
	})
}
