'use client'
import { FaFilter, FaUserPlus } from 'react-icons/fa'

import { Title } from '@/entities/title'

import { Button, Section, Spinner } from '@/shared/ui'

import { columns } from './columns'
import { DataTable } from './data-table'
import { SearchInput } from './search-input'
import { UserPagination } from './user-pagination'

import { DialogCreateUser } from '../../../feature/dialog-create-user'
import { useUsersModel } from '../model'

export const Users = () => {
	const { data, isUsersPending, usersError, t } = useUsersModel()
	if (isUsersPending) {
		return <Spinner type='page-loader' />
	}
	if (usersError) {
		return <Section>Network error</Section>
	}

	return (
		<Section className='flex flex-col items-start'>
			<Title title={t('users')} />
			<div className='mt-10 flex w-full items-center gap-5'>
				<SearchInput />
				<Button className='w-18'>
					<FaFilter className='size-6' />
				</Button>
				<DialogCreateUser
					trigger={
						<Button variant={'primary'} className='w-18'>
							<FaUserPlus className='size-6' />
						</Button>
					}
				/>
			</div>
			<DataTable columns={columns} data={data!.users} className='mt-10' />
			<UserPagination className='mt-4' />
		</Section>
	)
}
