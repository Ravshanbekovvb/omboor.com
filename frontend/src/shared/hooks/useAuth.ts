import { useMutation, useQuery } from '@tanstack/react-query'
import { HTTPError } from 'ky'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { api } from '../lib/ky-init'
import { components } from '../types'

export function useAuth() {
	const router = useRouter()
	const { mutateAsync: login, isPending: logining } = useMutation({
		mutationKey: ['login'],
		mutationFn: async (data: components['schemas']['LoginRequestDTO']) => {
			const res = await api
				.post(`auth/login`, {
					json: data
				})
				.json<{ data: components['schemas']['UserDto'] }>()

			return res
		},
		onSuccess: data => {
			toast.success('Hush kelibsiz!')
			router.push('/dashboard')
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
	const { mutateAsync: logout, isPending: loggingOut } = useMutation({
		mutationKey: ['logout'],
		mutationFn: async () => {
			await api.post('auth/logout').json()
		},
		onSuccess: () => {
			router.push('/login')
		}
	})
	const { mutateAsync: register, isPending: registering } = useMutation({
		mutationKey: ['register'],
		mutationFn: async (payload: components['schemas']['CreateUserRequestDTO']) => {
			await api.post('auth/register', { json: payload }).json()
		}
	})

	const { data: me } = useQuery({
		queryKey: ['me'],
		queryFn: async () => await api.get('auth/me').json<components['schemas']['UserDto']>()
	})
	return { me, login, logining, logout, loggingOut, register, registering }
}
