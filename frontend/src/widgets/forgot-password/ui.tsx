'use client'
import dynamic from 'next/dynamic'

import { BackLink } from '@/entities/back-link'
import { Title } from '@/entities/title'

import { countries } from '@/shared/constants'
import { cn } from '@/shared/lib/utils'
import {
	Button,
	Section,
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger
} from '@/shared/ui'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel
} from '@/shared/ui/form'

import { useForgotPassword } from './model'

const InputMask = dynamic(() => import('@/shared/ui/input-mask'), {
	ssr: false
})
export const ForgotPassword: React.FC<{ className?: string }> = ({ className }) => {
	const {
		form,
		isDropdownOpen,
		onSubmit,
		selectedCountry,
		setIsDropdownOpen,
		setSelectedCountry
	} = useForgotPassword()
	return (
		<Section
			className={cn(
				'dark:bg-foreground w-full space-y-10 rounded-[60px] bg-white p-6 sm:p-12 md:p-16 lg:p-20',
				className
			)}
		>
			<div className='flex items-center gap-4'>
				<BackLink link='/login' />
				<Title title='Забыли пароль' />
			</div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-7'>
					<FormField
						control={form.control}
						name='phone'
						render={({ field }) => (
							<FormItem className='relative mb-2 w-full'>
								<FormLabel>Введите номер телефона</FormLabel>
								<FormControl>
									<div className='flex items-center'>
										<Select
											open={isDropdownOpen}
											onOpenChange={setIsDropdownOpen}
											value={selectedCountry.code}
											onValueChange={value => {
												const country = countries.find(
													c => c.code === value
												)
												if (country) setSelectedCountry(country)
											}}
										>
											<SelectTrigger className='flex max-h-[1000px] min-h-[60px] items-center gap-1 rounded-none rounded-l-2xl border-none'>
												<selectedCountry.flag />
												<span className='text-sm font-medium sm:text-base'>
													{selectedCountry.dialCode}
												</span>
											</SelectTrigger>
											<SelectContent
												className='max-h-[260px] w-[200px] sm:w-[225px]'
												position='popper'
												align='start'
											>
												<SelectGroup>
													{countries.map(country => {
														const CountryFlagComponent = country.flag
														return (
															<SelectItem
																key={country.code}
																value={country.code}
																className='flex items-center gap-1'
															>
																<CountryFlagComponent />
																<span className='min-w-10 text-sm font-medium sm:min-w-12 sm:text-base'>
																	{country.dialCode}
																</span>
																<span className='truncate text-xs sm:text-sm'>
																	{country.name}
																</span>
															</SelectItem>
														)
													})}
												</SelectGroup>
											</SelectContent>
										</Select>
										<InputMask
											phoneMask={selectedCountry.phoneMask}
											type='tel'
											className='border-l-primary-foreground/30 focus-visible:border-l-primary-foreground/30 h-full rounded-none rounded-r-2xl border-0 border-l-2 text-sm shadow-none outline-none focus-visible:ring-0 sm:text-base'
											{...field}
										/>
									</div>
								</FormControl>
								{/* <FormMessage /> */}
								<FormDescription>
									Мы отправим проверочный код на указанный номер телефона для
									восстановления пароля
								</FormDescription>
							</FormItem>
						)}
					/>
					<Button className='mt-5 w-full' type='submit' variant='primary'>
						Получить код
					</Button>
				</form>
			</Form>
		</Section>
	)
}
