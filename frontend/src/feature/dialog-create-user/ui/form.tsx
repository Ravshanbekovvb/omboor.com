import Image from 'next/image'
import { FaCircleXmark } from 'react-icons/fa6'
import { IoMdDownload } from 'react-icons/io'

import { avatars } from '@/shared/constants'
import { cn } from '@/shared/lib/utils'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	FormPasswordInput,
	Input
} from '@/shared/ui'

import { useCreateUserModel } from '../model'

export const FormCreateUser: React.FC = () => {
	const { form, onSubmit, t, isCreating } = useCreateUserModel()
	return (
		<Form {...form}>
			<form
				id='change-password-form'
				className='grid grid-cols-2 gap-4 px-10 pt-0 pb-7'
				onSubmit={e => {
					e.stopPropagation()
					form.handleSubmit(onSubmit)(e)
				}}
			>
				<FormField
					control={form.control}
					name='name'
					render={({ field }) => (
						<FormItem>
							<FormLabel>{t('name')} *</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormDescription />
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='lastName'
					render={({ field }) => (
						<FormItem>
							<FormLabel>{t('lastName')} * </FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormDescription />
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='phoneNumber'
					render={({ field }) => (
						<FormItem>
							<FormLabel>{t('phoneNumber')} *</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormDescription />
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='avatarUrl'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='flex flex-col items-start justify-center gap-3'>
								{t('selectAvatar')}
							</FormLabel>

							<div className='flex items-center justify-between'>
								{avatars.slice(0, 4).map(item => (
									<div key={item} className='relative'>
										<Image
											src={item}
											alt='avatar'
											width={52}
											height={52}
											className={cn(
												'cursor-pointer',
												item === field.value &&
													'ring-brand-primary rounded-full ring-2 ring-offset-2'
											)}
											onClick={() => {
												form.setValue('avatarUrl', item)
											}}
										/>
										{item === field.value && (
											<span
												className='absolute -top-1 -right-1 cursor-pointer'
												onClick={() => field.onChange('')}
											>
												<FaCircleXmark className='size-4.5 text-red-500' />
											</span>
										)}
									</div>
								))}
								{field.value && !avatars.includes(field.value) ? (
									<div className='relative'>
										<Image
											src={field.value}
											alt='avatar'
											width={52}
											height={52}
										/>
										<span
											className='absolute -top-1 -right-1 cursor-pointer'
											onClick={() => field.onChange('')}
										>
											<FaCircleXmark className='size-4.5 text-red-500' />
										</span>
									</div>
								) : (
									<span
										className='flex size-12 cursor-pointer items-center justify-center rounded-full border border-dashed border-gray-400'
										onClick={() => {
											document.getElementById('avatar-image-user')?.click()
										}}
									>
										<IoMdDownload className='size-5' />
									</span>
								)}
							</div>

							<FormControl>
								<Input
									id='avatar-image-user'
									type='file'
									accept='image/*'
									className='hidden'
									onChange={e => {
										const file = e.target.files?.[0]
										if (file) {
											const url = URL.createObjectURL(file)
											field.onChange(url)
										}
									}}
								/>
							</FormControl>
							<FormDescription />
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='password'
					render={({ field }) => (
						<FormItem>
							<FormLabel>{t('password')} *</FormLabel>
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
							<FormLabel>{t('reapetPassword')} *</FormLabel>
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
