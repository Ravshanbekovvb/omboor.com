import { BackLink } from '@/entities/back-link'

import {
	Button,
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	Separator
} from '@/shared/ui'
import { Spinner } from '@/shared/ui/spinner'

import { ChangePasswordForm } from './form'

import { useChangePasswordModel } from '../model'

export const DialogChangePassword: React.FC<{ title: string }> = ({ title }) => {
	const { changingPassword } = useChangePasswordModel()
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className='mt-5 w-110' type='button'>
					{title}
				</Button>
			</DialogTrigger>
			<DialogContent showCloseButton={false} className='p-0 sm:max-w-3xl'>
				<DialogHeader>
					<DialogTitle className='flex items-center justify-between px-10 py-5'>
						<DialogClose>
							<BackLink />
						</DialogClose>
						Изменение пароля
						<Button
							variant={'primary'}
							size={'sm'}
							form='change-password-form'
							type='submit'
							disabled={changingPassword}
						>
							{changingPassword ? <Spinner className='min-w-[100px]' /> : 'Применить'}
						</Button>
					</DialogTitle>
					<Separator />
				</DialogHeader>
				<DialogDescription></DialogDescription>
				<ChangePasswordForm />
			</DialogContent>
		</Dialog>
	)
}
