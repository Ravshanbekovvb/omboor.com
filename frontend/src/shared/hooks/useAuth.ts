import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { api } from '../lib/ky-init'
import { User } from '../types'

export function useAuth() {
	const router = useRouter()
	const { mutateAsync: login, isPending: logining } = useMutation({
		mutationKey: ['login'],
		mutationFn: async (data: { phoneNumber: string; password: string }) => {
			console.log(typeof data.phoneNumber)

			const res = await api
				.post(`auth/login`, {
					json: data
				})
				.json<{ data: User }>()
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
		mutationFn: async (payload: User) => {
			await api.post('auth/register', { json: payload }).json()
		}
	})

	const { data: me } = useQuery({
		queryKey: ['me'],
		queryFn: async () => await api.get('auth/me').json<{ data: User }>()
	})
	return { me, login, logining, logout, loggingOut, register, registering }
}
