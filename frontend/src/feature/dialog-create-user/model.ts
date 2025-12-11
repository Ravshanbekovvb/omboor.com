'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { SubmitHandler, useForm } from 'react-hook-form'
import z from 'zod'

import { useUserCreate } from '@/shared/hooks/useUsers'

const formSchema = z.object({
	name: z.string().min(2).max(50),
	lastName: z.string().min(2).max(50),
	password: z.string().min(6).max(50),
	repeatPassword: z.string().min(6).max(50),
	phoneNumber: z.string().min(5).max(50),
	avatarUrl: z.string().optional()
})
type TForm = z.infer<typeof formSchema>
export const useCreateUserModel = () => {
	const { mutate: createUser, isPending: isCreating } = useUserCreate()
	const t = useTranslations('profile')
	const form = useForm<TForm>({
		resolver: zodResolver(formSchema),
		mode: 'onChange',
		defaultValues: {
			avatarUrl: '',
			lastName: '',
			name: '',
			password: '',
			phoneNumber: '',
			repeatPassword: ''
		}
	})
	const onSubmit: SubmitHandler<TForm> = data => {
		console.log(data)

		createUser(data)
	}
	return { form, onSubmit, t, isCreating }
}
