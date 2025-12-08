import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	FormPasswordInput
} from '@/shared/ui'

import { useChangePasswordModel } from '../model'

export const ChangePasswordForm: React.FC = () => {
	const { form, onSubmit } = useChangePasswordModel()
	return (
		<Form {...form}>
			<form
				id='change-password-form'
				className='space-y-10 px-10 pt-0 pb-7'
				onSubmit={e => {
					e.stopPropagation()
					form.handleSubmit(onSubmit)(e)
				}}
			>
				<FormField
					control={form.control}
					name='oldPassword'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Old Password</FormLabel>
							<FormControl>
								<FormPasswordInput {...field} />
							</FormControl>
							<FormDescription />
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='newPassword'
					render={({ field }) => (
						<FormItem>
							<FormLabel>New Password</FormLabel>
							<FormControl>
								<FormPasswordInput {...field} />
							</FormControl>
							<FormDescription />
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='repeatPassword'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Repeat Password</FormLabel>
							<FormControl>
								<FormPasswordInput {...field} />
							</FormControl>
							<FormDescription />
							<FormMessage />
						</FormItem>
					)}
				/>
			</form>
		</Form>
	)
}
