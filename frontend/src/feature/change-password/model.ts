import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import z from 'zod'

import { useAuth } from '@/shared/hooks/useAuth'

const formSchema = z.object({
	oldPassword: z.string().min(6).max(50),
	newPassword: z.string().min(6).max(50),
	repeatPassword: z.string().min(6).max(50)
})
type TForm = z.infer<typeof formSchema>
export const useChangePasswordModel = () => {
	const { changePassword, changingPassword } = useAuth()
	const form = useForm({
		resolver: zodResolver(formSchema),
		mode: 'onChange',
		defaultValues: {
			newPassword: '',
			oldPassword: '',
			repeatPassword: ''
		}
	})
	const onSubmit: SubmitHandler<TForm> = data => {
		console.log(data)
		changePassword(data)
	}
	return { onSubmit, form, changingPassword }
}
