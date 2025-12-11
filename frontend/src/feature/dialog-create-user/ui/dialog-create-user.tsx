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
	Separator,
	Spinner
} from '@/shared/ui'

import { FormCreateUser } from './form'

import { useCreateUserModel } from '../model'

interface DialogCreateUserProps {
	clasName?: string
	trigger: React.ReactNode
}

export const DialogCreateUser: React.FC<DialogCreateUserProps> = ({ clasName, trigger }) => {
	const { isCreating, t } = useCreateUserModel()
	return (
		<Dialog>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent showCloseButton={false} className='p-0 sm:max-w-3xl'>
				<DialogHeader>
					<DialogTitle className='flex items-center justify-between px-10 py-5'>
						<DialogClose>
							<BackLink />
						</DialogClose>
						{t('createUser')}
						<Button
							variant={'primary'}
							size={'sm'}
							form='change-password-form'
							type='submit'
						>
							{isCreating ? <Spinner className='min-w-16 stroke-3' /> : t('create')}
						</Button>
					</DialogTitle>
					<Separator />
				</DialogHeader>
				<DialogDescription></DialogDescription>
				<FormCreateUser />
			</DialogContent>
		</Dialog>
	)
}
