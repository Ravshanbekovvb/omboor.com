'use client'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'

import { Title } from '@/entities/title'

import { countries } from '@/shared/constants'
import { cn } from '@/shared/lib/utils'
import {
	Button,
	Input,
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
		<div
			className={cn(
				'w-full space-y-10 rounded-[60px] bg-white p-6 sm:p-12 md:p-16 lg:p-20',
				className
			)}
		>
			<div className='flex items-center gap-4'>
				<Link href={'/login'}>
					<Button
						variant={'outline'}
						className='size-7 min-h-12 w-12 rounded-full'
						size='icon'
					>
						<ChevronLeft className='size-6' />
					</Button>
				</Link>
				<Title title='Забыли пароль' />
			</div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-7'>
					<FormField
						control={form.control}
						name='phone'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Введите номер телефона</FormLabel>
								<FormControl>
									<div className='border-input focus-within:ring-input flex items-center rounded-2xl border transition-shadow duration-300 focus-within:ring-3 focus-within:ring-offset-1'>
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
											<SelectTrigger className='w-[100px] rounded-none border-0 shadow-none outline-none focus-visible:ring-0 focus-visible:ring-offset-0 sm:w-[120px]'>
												<div className='flex items-center gap-1 sm:gap-2'>
													{<selectedCountry.flag />}
													<span className='text-sm font-medium sm:text-base'>
														{selectedCountry.dialCode}
													</span>
												</div>
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
															>
																<div className='flex items-center gap-1'>
																	<CountryFlagComponent />
																	<span className='min-w-10 text-sm font-medium sm:min-w-12 sm:text-base'>
																		{country.dialCode}
																	</span>
																	<span className='truncate text-xs text-gray-600 sm:text-sm'>
																		{country.name}
																	</span>
																</div>
															</SelectItem>
														)
													})}
												</SelectGroup>
											</SelectContent>
										</Select>
										<Input
											{...field}
											type='tel'
											placeholder={'xx xxx xx xx'}
											className='rounded-none rounded-r-2xl border-0 border-l-2 border-l-gray-200 text-sm shadow-none outline-none focus-visible:border-l-gray-200 focus-visible:ring-0 focus-visible:ring-offset-0 sm:text-base'
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
					<Button className='mt-5 w-full' type='submit'>
						Получить код
					</Button>
				</form>
			</Form>
		</div>
	)
}
