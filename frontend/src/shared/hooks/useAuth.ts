import { useMutation } from '@tanstack/react-query'
import ky from 'ky'

export function useAuth() {
	return useMutation({
		mutationFn: async (data: { phone: string; password: string }) => {
			const res = await ky
				.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/login`, { json: data })
				.json<{ token: string }>()
			return res.token
		},
		onSuccess: data => {
			console.log(data)

			// user ma'lumotini qayta olish uchun signallash
			// queryClient.invalidateQueries({ queryKey: ['user'] })
		}
	})
}
