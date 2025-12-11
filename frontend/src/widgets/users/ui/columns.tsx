'use client'

import { ColumnDef } from '@tanstack/react-table'
import Image from 'next/image'

import { components } from '@/shared/types'
import { Badge } from '@/shared/ui/badge'

import { SheetProfileUpdate } from './sheet-profile-update'

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export const columns: ColumnDef<components['schemas']['UserDto']>[] = [
	{
		accessorKey: 'id',
		header: 'ID',
		cell: data => (data.row.index + 1).toString()
	},
	{
		accessorKey: 'avatarUrl',
		header: 'Avatar',
		cell: data => {
			if (typeof data.getValue() === 'string') {
				return (
					<Image
						src={data.getValue() as string}
						alt='Avatar'
						width={40}
						height={40}
						className='h-10 w-10 rounded-full'
					/>
				)
			} else {
				return (
					<div className='bg-input flex size-10 items-center justify-center rounded-full'>
						{data.cell.row.original.name.slice(0, 1)}
					</div>
				)
			}
		}
	},
	{
		accessorKey: 'name',
		header: 'Name',
		cell: data => {
			return (
				<SheetProfileUpdate
					triger={
						<span className='text-brand-primary cursor-pointer hover:underline'>
							{data.getValue() as string}
						</span>
					}
					userData={data.row.original}
				/>
			)
		}
	},
	{
		accessorKey: 'lastName',
		header: 'Last Name'
	},
	{
		accessorKey: 'phoneNumber',
		header: 'Phone Number'
	},
	{
		accessorKey: 'role',
		header: 'Role',
		cell: data => (
			<Badge variant={data.getValue() === 'ADMIN' ? 'destructive' : 'default'}>
				{data.getValue() as string}
			</Badge>
		)
	},
	{
		accessorKey: 'plan',
		header: 'Plan',
		cell: data => (
			<Badge
				variant={
					data.getValue() === 'START'
						? 'pending'
						: data.getValue() === 'ADVANCED'
							? 'outline'
							: 'secondary'
				}
			>
				{data.getValue() as string}
			</Badge>
		)
	},
	{
		accessorKey: 'createdAt',
		header: 'Joined At',
		cell: ({ getValue }) => {
			const value = getValue() as string
			const date = new Date(value)
			const time = new Date(date.getTime() + date.getTimezoneOffset() * 60000)
			return (
				<div className='flex flex-col items-start justify-center'>
					<span>{date.toISOString().slice(0, 10)}</span>
					<span>{time.toISOString().slice(11, 16)}</span>
				</div>
			)
		}
	}
	// {
	// 	// accessorKey: 'createdAt',
	// 	header: 'Actions',
	// 	cell: ({ getValue }) => <Actions cell={getValue} />
	// }
]
