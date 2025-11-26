'use client'
import * as flags from 'country-flag-icons/react/3x2'
import { Eye, EyeClosed } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

import { Country, countries } from '@/shared/lib/constants'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger } from '@/shared/ui/select'

type country = Omit<Country, 'name'>
export default function Home() {
	const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0])
	const [phoneNumber, setPhoneNumber] = useState('')
	const [password, setPassword] = useState('')
	const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)
	const [isHashed, setIsHashed] = useState<boolean>(false)

	// Get flag component for country
	const getFlagComponent = (countryCode: string) => {
		const FlagComponent = (flags as any)[countryCode.toUpperCase()]
		return FlagComponent ? (
			<FlagComponent className='h-4 w-2' />
		) : (
			<div className='flex h-4 w-5 items-center justify-center rounded bg-blue-400 text-xs font-bold text-white'>
				{countryCode}
			</div>
		)
	}

	return (
		<div className='flex min-h-screen items-center justify-center px-4'>
			<form className='w-full max-w-xl'>
				<div className='rounded-[60px] bg-white p-6 sm:p-12 md:p-16 lg:p-20'>
					<div className='w-full space-y-4 sm:space-y-6'>
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
							<label className='text-base font-semibold sm:text-lg'>
								Введите номер телефона
							</label>
							<div className='focus-within:ring-ring aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive flex w-full items-center rounded-2xl border transition-colors focus-within:ring-2 focus-within:ring-offset-2'>
								<Select
									open={isDropdownOpen}
									onOpenChange={setIsDropdownOpen}
									value={selectedCountry.code}
									onValueChange={value => {
										const country = countries.find(c => c.code === value)
										if (country) setSelectedCountry(country)
									}}
								>
									<SelectTrigger className='w-[100px] rounded-none border-0 shadow-none outline-none focus-visible:ring-0 focus-visible:ring-offset-0 sm:w-[120px]'>
										<div className='flex items-center gap-1 sm:gap-2'>
											{getFlagComponent(selectedCountry.code)}
											<span className='text-sm font-medium sm:text-base'>
												{selectedCountry.dial_code}
											</span>
										</div>
									</SelectTrigger>
									<SelectContent
										className='max-h-[260px] w-[200px] sm:w-[225px]'
										position='popper'
										align='start'
									>
										<SelectGroup>
											{countries.map(country => (
												<SelectItem key={country.code} value={country.code}>
													<div className='flex items-center gap-1'>
														{getFlagComponent(country.code)}
														<span className='min-w-10 text-sm font-medium sm:min-w-12 sm:text-base'>
															{country.dial_code}
														</span>
														<span className='truncate text-xs text-gray-600 sm:text-sm'>
															{country.name}
														</span>
													</div>
												</SelectItem>
											))}
										</SelectGroup>
									</SelectContent>
								</Select>

								<Input
									type='tel'
									value={phoneNumber}
									onChange={e => setPhoneNumber(e.target.value)}
									placeholder={'xx xxx xx xx'}
									className='rounded-none border-0 border-l-2 border-l-gray-200 text-sm shadow-none outline-none focus-visible:border-l-gray-200 focus-visible:ring-0 focus-visible:ring-offset-0 sm:text-base'
									required
								/>
							</div>
						</div>
						<div className='space-y-3'>
							<div className='flex flex-col gap-2 text-base font-semibold sm:flex-row sm:items-center sm:justify-between sm:text-lg'>
								<label>Пароль</label>
								<label className='cursor-pointer text-sm text-blue-500 hover:underline sm:text-base'>
									Забыли пароль?
								</label>
							</div>
							<div className='relative'>
								<Input
									type={isHashed ? 'text' : 'password'}
									value={password}
									onChange={e => setPassword(e.target.value)}
									placeholder='введите ваш пароль'
									required
									className='w-full pr-10 text-sm sm:text-base'
								/>
								<button
									type='button'
									onClick={() => setIsHashed(!isHashed)}
									className='absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-gray-500 transition-colors hover:text-gray-700'
								>
									{isHashed ? (
										<Eye size={18} className='sm:h-5 sm:w-5' />
									) : (
										<EyeClosed size={18} className='sm:h-5 sm:w-5' />
									)}
								</button>
							</div>
						</div>
						<Button
							className='mt-5 w-full py-3 text-sm sm:py-4 sm:text-base'
							type='button'
						>
							Вход в аккаунт
						</Button>
						<p className='w-full text-center text-sm sm:text-base'>
							Еще нет аккаунта?{' '}
							<a href='#' className='cursor-pointer text-blue-500 hover:underline'>
								Создать аккаунт
							</a>
						</p>
					</div>
				</div>
			</form>
		</div>
	)
}
