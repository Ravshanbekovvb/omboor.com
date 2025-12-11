import { useTranslations } from 'next-intl'

import { useUserCreate, useUserDelete, useUsers } from '@/shared/hooks/useUsers'

export const useUsersModel = () => {
	const t = useTranslations('users')
	const { mutate: createUser } = useUserCreate()
	const tProfile = useTranslations('profile')
	const { data: users, isPending: isUsersPending, error: usersError } = useUsers()
	const { mutate: deleteUser, isPending: isUserDeletePending } = useUserDelete()
	return {
		users,
		isUsersPending,
		usersError,
		createUser,
		deleteUser,
		isUserDeletePending,
		t,
		tProfile
	}
}
