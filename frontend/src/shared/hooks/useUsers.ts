import { useMutation, useQuery } from '@tanstack/react-query'
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
export function useUserCreate() {
	return useMutation({
		mutationKey: ['createUser'],
		mutationFn: async (data: components['schemas']['CreateUserRequestDTO']) => {
			const res = await api
				.post(`users`, { json: data })
				.json<components['schemas']['UserDto']>()
			return res
		},
		onSuccess: () => {
			toast.success('User created successfully!', { closeButton: true })
			queryClient.invalidateQueries({ queryKey: ['users'] })
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

export function useUsers({ page, limit }: { page: number; limit: number }) {
	return useQuery({
		queryKey: ['users', page, limit],
		queryFn: async () => {
			const res = await api
				.get('users', { searchParams: { page, limit } })
				.json<components['schemas']['UserDto'][]>()
			if (res.length === 0) toast.info('No users found', { closeButton: true })
			console.log(res)

			return res
		}
	})
}
export function useUserDelete() {
	return useMutation({
		mutationKey: ['deleteUser'],
		mutationFn: async (id: string) => {
			if (!id) toast.error('User ID is missing')
			return await api.delete(`users/${id}`).json<components['schemas']['UserDto']>()
		},
		onSuccess: () => {
			toast.success('User deleted successfully!', { closeButton: true })
			queryClient.invalidateQueries({ queryKey: ['users'] })
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
