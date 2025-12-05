import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { api } from '../lib/ky-init'
import { components } from '../types'

export function useAuth() {
	const router = useRouter()
	const { mutateAsync: login, isPending: logining } = useMutation({
		mutationKey: ['login'],
		mutationFn: async (data: components['schemas']['LoginRequestDTO']) => {
			console.log(typeof data.phoneNumber)

			const res = await api
				.post(`auth/login`, {
					json: data
				})
				.json<{ data: components['schemas']['UserDto'] }>()
			console.log(res)

			return res
		},
		onSuccess: data => {
			toast.success('Hush kelibsiz!')
			router.push('/dashboard')
		},
		onError: error => {
			console.log('Login xatosi:', error)
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
		queryFn: async () =>
			await api.get('auth/me').json<{ data: components['schemas']['UserDto'] }>()
	})
	return { me, login, logining, logout, loggingOut, register, registering }
}
