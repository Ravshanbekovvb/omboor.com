import { useMutation } from '@tanstack/react-query'
import { HTTPError } from 'node_modules/ky/distribution/errors/HTTPError'
import { toast } from 'sonner'

import { queryClient } from '../lib'
import { api } from '../lib/ky-init'
import { components } from '../types'

export function useUserUpdate(id: string | undefined) {
	return useMutation({
		mutationKey: ['updateUser', id],
		mutationFn: async (data: components['schemas']['UpdateUserRequestDTO']) => {
			if (!id) toast.error('User ID is missing')
			const res = await api
				.patch(`users/${id}`, { json: data })
				.json<components['schemas']['UserDto']>()
			return res
		},
		onSuccess: () => {
			toast.success('User updated successfully!', { closeButton: true })
			queryClient.invalidateQueries({ queryKey: ['me'] })
		},
		onError: async error => {
			if (error instanceof HTTPError) {
				const body = await error.response.json().catch(() => null)
				if (body.message) {
					return toast.error(body.message)
				}
			}
		}
	})
}
