import { User } from '@/generated/client'

export type TUserWithOutPassword = Omit<User, 'password'>

export type TApiResponse<T extends unknown> = {
	success: boolean
	message: string
	data: T
}
