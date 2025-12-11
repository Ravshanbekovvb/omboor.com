import * as React from 'react'

import { components } from '@/shared/types'
import {
	Button,
	Input,
	Label,
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Sheet,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger
} from '@/shared/ui'

import { useUsersModel } from '../model'

interface SheetProfileUpdateProps {
	triger: React.ReactNode
	userData: components['schemas']['UserDto']
}
export const SheetProfileUpdate: React.FC<SheetProfileUpdateProps> = ({ triger, userData }) => {
	const { deleteUser, tProfile, t } = useUsersModel()
	return (
		<Sheet>
			<SheetTrigger asChild>{triger}</SheetTrigger>
			<SheetContent className='min-w-[600px]'>
				<SheetHeader>
					<SheetTitle>{tProfile('profile')}</SheetTitle>
					<SheetDescription>{tProfile('description')}</SheetDescription>
				</SheetHeader>
				<div className='grid flex-1 auto-rows-min grid-cols-2 gap-6 px-4'>
					<div className='grid gap-3'>
						<Label htmlFor='sheet-demo-name'>{tProfile('name')}</Label>
						<Input id='sheet-demo-name' defaultValue={userData.name} />
					</div>
					<div className='grid gap-3'>
						<Label htmlFor='sheet-demo-username'>{tProfile('lastName')}</Label>
						<Input id='sheet-demo-username' defaultValue={userData.lastName} />
					</div>
					<div className='grid gap-3'>
						<Label htmlFor='sheet-demo-username'>{t('phoneNumber')}</Label>
						<Input id='sheet-demo-username' defaultValue={userData.phoneNumber} />
					</div>
					<div className='grid gap-3'>
						<Label htmlFor='sheet-demo-username'>{t('role')}</Label>
						<Select defaultValue={userData.role}>
							<SelectTrigger className='min-h-[60px] w-full'>
								<SelectValue placeholder='Select a role' />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectItem value='ADMIN'>ADMIN</SelectItem>
									<SelectItem value='REGULAR'>REGULAR</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>
					<div className='grid gap-3'>
						<Label htmlFor='sheet-demo-username'>{t('plan')}</Label>
						<Input id='sheet-demo-username' defaultValue={userData.plan} disabled />
					</div>
				</div>
				<SheetFooter>
					<Button type='submit' variant={'primary'}>
						{tProfile('save')}
					</Button>
					<Button
						type='submit'
						variant={'destructive'}
						onClick={() => deleteUser(userData.id!)}
					>
						{t('deleteUser')}
					</Button>
					{/* <SheetClose asChild>
						<Button variant='outline'>Close</Button>
					</SheetClose> */}
				</SheetFooter>
			</SheetContent>
		</Sheet>
	)
}
