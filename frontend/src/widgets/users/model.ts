import { useTranslations } from 'next-intl'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

import { useUserCreate, useUserDelete, useUsers } from '@/shared/hooks/useUsers'

export const useUsersModel = () => {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()
	const page = Number(searchParams.get('page') || 1)
	const limit = Number(searchParams.get('limit') || 10)
	const t = useTranslations('users')
	const { mutate: createUser } = useUserCreate()
	const tProfile = useTranslations('profile')
	const { data: users, isPending: isUsersPending, error: usersError } = useUsers({ page, limit })
	const { mutate: deleteUser, isPending: isUserDeletePending } = useUserDelete()
	const createQueryString = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams.toString())
			params.set(name, value)
			router.push(`${pathname}?${params.toString()}`)
			return params.toString()
		},
		[searchParams]
	)
	return {
		users,
		isUsersPending,
		usersError,
		createUser,
		deleteUser,
		isUserDeletePending,
		t,
		tProfile,
		page,
		limit,
		createQueryString,
		pathname
	}
}
