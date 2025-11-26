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
		<div className='flex min-h-screen items-center justify-center'>
			<form>
				<div className='rounded-[60px] bg-white p-20'>
					<div className='min-w-[380px] space-y-6'>
						<div className='flex items-center gap-3'>
							<Image src={'/main-logo.jpg'} width={40} height={20} alt='main logo' />
							<div className='text-3xl'>Omboor.com</div>
						</div>
						<h3 className='text-4xl font-black'>Вход в аккаунт</h3>
						<div className='flex flex-col items-start gap-3'>
							<label className='text-lg font-semibold'>Введите номер телефона</label>
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
									<SelectTrigger className='w-[120px] rounded-none border-0 shadow-none outline-none focus-visible:ring-0 focus-visible:ring-offset-0'>
										<div className='flex items-center gap-2'>
											{getFlagComponent(selectedCountry.code)}
											<span className='font-medium'>
												{selectedCountry.dial_code}
											</span>
										</div>
									</SelectTrigger>
									<SelectContent
										className='max-h-[260px] w-[225px]'
										position='popper'
										align='start'
									>
										<SelectGroup>
											{countries.map(country => (
												<SelectItem key={country.code} value={country.code}>
													<div className='flex items-center gap-1'>
														{getFlagComponent(country.code)}
														<span className='min-w-12 font-medium'>
															{country.dial_code}
														</span>
														<span className='truncate text-sm text-gray-600'>
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
									className='text-md rounded-none border-0 border-l-2 border-l-gray-200 shadow-none outline-none focus-visible:border-l-gray-200 focus-visible:ring-0 focus-visible:ring-offset-0'
									required
								/>
							</div>
						</div>
						<div className='space-y-3'>
							<div className='flex items-center justify-between text-lg font-semibold'>
								<label>Пароль</label>
								<label className='cursor-pointer text-blue-500 hover:underline'>
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
									className='w-full pr-10'
								/>
								<button
									type='button'
									onClick={() => setIsHashed(!isHashed)}
									className='absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-gray-500 transition-colors hover:text-gray-700'
								>
									{isHashed ? <Eye size={20} /> : <EyeClosed size={20} />}
								</button>
							</div>
						</div>
						<Button className='mt-5 w-full' type='button'>
							Вход в аккаунт
						</Button>
						<p className='w-full text-center'>
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
