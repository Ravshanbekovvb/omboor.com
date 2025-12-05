import { User } from '@/generated/client'

export type TUserWithOutPassword = Omit<User, 'password'>
