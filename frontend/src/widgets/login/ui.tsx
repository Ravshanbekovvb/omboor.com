'use client'

import { Eye, EyeClosed } from 'lucide-react'
import dynamic from 'next/dynamic'
import Link from 'next/link'

import { MainLogo } from '@/entities/main-logo/main-logo'
import { ThemeToggle } from '@/entities/theme-toggle'
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
	FormLabel,
	FormMessage
} from '@/shared/ui/form'

import { useLogin } from './model'

const InputMask = dynamic(() => import('@/shared/ui/input-mask'), {
	ssr: false
})

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
			className={cn(
				'dark:bg-foreground w-full rounded-[75px] bg-white p-6 sm:p-12 md:p-16 lg:p-20',
				className
			)}
		>
			<Form {...form}>
				<form className='space-y-4 sm:space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
					<MainLogo isOpen={true} className='gap-2' />
					<Title title='Вход в аккаунт' />
					<div className='flex flex-col items-start'>
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
															const CountryFlagComponent =
																country.flag
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
									<FormDescription />
									<FormMessage className='absolute -bottom-6' />
								</FormItem>
							)}
						/>
					</div>

					<div className='space-y-3'>
						<div className='relative'>
							<FormField
								control={form.control}
								name='password'
								render={({ field }) => (
									<FormItem>
										<div className='flex items-center justify-between'>
											<FormLabel>Пароль</FormLabel>
											<Link
												href={'/forgot-password'}
												className='cursor-pointer text-sm font-medium text-blue-500 hover:underline sm:text-base'
											>
												Забыли пароль?
											</Link>
										</div>
										<FormControl>
											<div className='relative'>
												<Input
													{...field}
													type={isHashed ? 'text' : 'password'}
													placeholder='введите ваш пароль'
													className='w-full border-none text-sm sm:text-base'
												/>
												<button
													type='button'
													onClick={() => setIsHashed(!isHashed)}
													className='absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer transition-colors'
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
					<Button
						className='mt-5 w-full py-3 text-sm sm:py-4 sm:text-lg'
						type='submit'
						variant='primary'
					>
						Вход в аккаунт
					</Button>
					<p className='w-full text-center text-sm sm:text-base'>
						Еще нет аккаунта?{' '}
						<a href='#' className='cursor-pointer text-blue-500 hover:underline'>
							Создать аккаунт
						</a>
					</p>
				</form>
				<ThemeToggle />
			</Form>
		</div>
	)
}
