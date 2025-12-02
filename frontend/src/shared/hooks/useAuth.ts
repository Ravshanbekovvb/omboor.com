import { useMutation } from '@tanstack/react-query'
import ky from 'ky'

import { queryClient } from '../lib'

export function useAuth() {
	return useMutation({
		mutationFn: async (data: { email: string; password: string }) => {
			const res = await ky.post('/api/login', { json: data }).json<{ token: string }>()
			return res.token
		},
		onSuccess: data => {
			// user ma'lumotini qayta olish uchun signallash
			queryClient.invalidateQueries({ queryKey: ['user'] })
		}
	})
}
