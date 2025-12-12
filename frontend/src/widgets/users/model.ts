import { useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'

import { useUserCreate, useUserDelete, useUsers } from '@/shared/hooks/useUsers'

export const useUsersModel = () => {
	const searchParams = useSearchParams()
	const page = Number(searchParams.get('page') || 1)
	const limit = Number(searchParams.get('limit') || 10)
	const t = useTranslations('users')
	const { mutate: createUser } = useUserCreate()
	const tProfile = useTranslations('profile')
	const { data: users, isPending: isUsersPending, error: usersError } = useUsers({ page, limit })
	const { mutate: deleteUser, isPending: isUserDeletePending } = useUserDelete()
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
		limit
	}
}
