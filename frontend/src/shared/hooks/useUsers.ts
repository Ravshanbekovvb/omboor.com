import { useMutation } from '@tanstack/react-query'

import { api } from '../lib/ky-init'
import { components } from '../types'

export function useUserUpdate({ id }: { id: string }) {
	return useMutation({
		mutationKey: ['updateUser', id],
		mutationFn: async (data: components['schemas']['UpdateUserRequestDTO']) => {
			const res = await api
				.patch(`users/${id}`, { json: data })
				.json<components['schemas']['UserDto']>()
			return res
		}
	})
}
