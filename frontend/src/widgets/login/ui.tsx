'use client'

import { Eye, EyeClosed } from 'lucide-react'
import Image from 'next/image'

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
	FormLabel,
	FormMessage
} from '@/shared/ui/form'

import { useLogin } from './model'

export const Login: React.FC<{ className?: string }> = ({ className }) => {
	const {
		isHashed,
		setIsHashed,
		isDropdownOpen,
		selectedCountry,
		setIsDropdownOpen,
		setSelectedCountry,
		onSubmit,
		form
	} = useLogin()
	return (
		<div
			className={cn('w-full rounded-[60px] bg-white p-6 sm:p-12 md:p-16 lg:p-20', className)}
		>
			<Form {...form}>
				<form className='space-y-4 sm:space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
					<div className='flex items-center gap-3'>
						<Image
							src={'/main-logo.jpg'}
							width={40}
							height={20}
							alt='main logo'
							className='shrink-0'
						/>
						<div className='truncate text-2xl sm:text-3xl'>Omboor.com</div>
					</div>
					<h3 className='text-3xl font-black sm:text-4xl'>Вход в аккаунт</h3>
					<div className='flex flex-col items-start gap-3'>
						{/* <label className='text-base font-semibold sm:text-lg'></label> */}

						<FormField
							control={form.control}
							name='phone'
							render={({ field }) => (
								<FormItem className='relative mb-2 w-full'>
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
															const CountryFlagComponent =
																country.flag
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
									<FormDescription />
									<FormMessage className='absolute -bottom-6' />
								</FormItem>
							)}
						/>
					</div>

					<div className='space-y-3'>
						{/* <div className='flex flex-col gap-2 text-base font-semibold sm:flex-row sm:items-center sm:justify-between sm:text-lg'>
							<label className='cursor-pointer text-sm text-blue-500 hover:underline sm:text-base'>
								Забыли пароль?
							</label>
						</div> */}
						<div className='relative'>
							<FormField
								control={form.control}
								name='password'
								render={({ field }) => (
									<FormItem>
										<div className='flex items-center justify-between'>
											<FormLabel>Пароль</FormLabel>
											<label className='cursor-pointer text-sm text-blue-500 hover:underline sm:text-base'>
												Забыли пароль?
											</label>
										</div>
										<FormControl>
											<div className='relative'>
												<Input
													{...field}
													type={isHashed ? 'text' : 'password'}
													placeholder='введите ваш пароль'
													className='w-full text-sm sm:text-base'
												/>
												<button
													type='button'
													onClick={() => setIsHashed(!isHashed)}
													className='absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-gray-500 transition-colors hover:text-gray-700'
												>
													{isHashed ? (
														<Eye size={18} className='sm:h-5 sm:w-5' />
													) : (
														<EyeClosed
															size={18}
															className='sm:h-5 sm:w-5'
														/>
													)}
												</button>
											</div>
										</FormControl>
										<FormDescription />
										<FormMessage className='absolute -bottom-6' />
									</FormItem>
								)}
							/>
						</div>
					</div>
					<Button className='mt-5 w-full py-3 text-sm sm:py-4 sm:text-base' type='submit'>
						Вход в аккаунт
					</Button>
					<p className='w-full text-center text-sm sm:text-base'>
						Еще нет аккаунта?{' '}
						<a href='#' className='cursor-pointer text-blue-500 hover:underline'>
							Создать аккаунт
						</a>
					</p>
				</form>
			</Form>
		</div>
	)
}
