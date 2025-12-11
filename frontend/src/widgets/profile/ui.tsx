'use client'

import Image from 'next/image'
import React from 'react'

import { Title } from '@/entities/title'

import { avatars, countries, themeOptions } from '@/shared/constants'
import {
	Button,
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
	Label,
	RadioGroup,
	RadioGroupItem,
	Section,
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	Separator
} from '@/shared/ui'
import { Spinner } from '@/shared/ui/spinner'

import { useProfile } from './model'
import { DialogChangePassword } from '@/feature/change-password'

export const Profile: React.FC = () => {
	const { form, onSubmit, updatingMe, t } = useProfile()
	return (
		<div className='pb-20'>
			{/* HEADER */}
			<header className='dark:bg-foreground sticky top-0 z-1 flex items-center justify-between border-b-2 bg-white px-8 py-4 pl-18'>
				<Title title={t('title')} />
				<div className='flex items-center gap-5'>
					<Button
						onClick={() => {
							form.reset()
						}}
						disabled={updatingMe || !form.formState.isDirty}
						type='button'
					>
						{t('reset')}
					</Button>
					<Button
						type='submit'
						variant={'primary'}
						disabled={updatingMe || !form.formState.isDirty}
						form='form-profile-update'
					>
						{updatingMe ? <Spinner className='size-5 w-[94px] stroke-3' /> : t('save')}
					</Button>
				</div>
			</header>
			{/* FORM */}
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} id='form-profile-update'>
					<Section className='flex gap-12'>
						{/* LEFT TITLE */}
						<Title title={t('basic')} size='small' className='min-w-[170px]' />
						{/* FORM */}
						<div className='w-full max-w-4xl space-y-12'>
							{/* NAME BLOCK */}
							<div className='grid grid-cols-2 gap-12'>
								<FormField
									control={form.control}
									name='name'
									render={({ field }) => (
										<FormItem>
											<FormLabel>{t('name')}</FormLabel>
											<FormControl>
												<Input
													{...field}
													className='border-0'
													placeholder='Abdulloh'
												/>
											</FormControl>

											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='lastName'
									render={({ field }) => (
										<FormItem>
											<FormLabel>{t('lastName')}</FormLabel>
											<FormControl>
												<Input
													{...field}
													className='border-0'
													placeholder='Sultonov'
												/>
											</FormControl>

											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							{/* PHOTO BLOCK */}
							<div>
								<Label>{t('photo')}</Label>
								<div className='bg-background-light dark:bg-background mt-3 flex overflow-hidden rounded-xl'>
									{/* LEFT UPLOAD AREA */}
									<div className='border-input flex w-1/2 flex-col items-center justify-center border-r-2 py-10'>
										{/* Preview selected image */}
										{form.watch('imgUrl') ? (
											<div className='mt-4 min-h-20'>
												<Image
													src={form.watch('imgUrl')!}
													alt='Uploaded preview'
													width={80}
													height={80}
												/>
											</div>
										) : (
											<FormField
												control={form.control}
												name='imgUrl'
												render={({ field }) => (
													<FormItem>
														{/* LABEL triggers hidden input */}
														<FormLabel className='flex-c flex cursor-pointer flex-col items-center justify-center gap-1'>
															<p className=''>{t('selectAvatar')}</p>
															<p className='my-2 text-gray-500'>
																{t('or')}
															</p>
															<span className='text-brand-primary underline'>
																{t('uploadPhoto')}
															</span>
														</FormLabel>
														<FormControl>
															<Input
																type='file'
																accept='image/*'
																className='hidden'
																onChange={e => {
																	const file = e.target.files?.[0]
																	if (file) {
																		const url =
																			URL.createObjectURL(
																				file
																			)
																		field.onChange(url)
																	}
																}}
															/>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
										)}
									</div>

									{/* RIGHT AVATAR SELECTOR */}
									<div className='grid w-1/2 grid-cols-5 place-items-center gap-4 p-6'>
										{/* Clear button */}
										<button
											type='button'
											onClick={() => {
												form.setValue('imgUrl', '')
											}}
											className={`flex h-14 w-14 items-center justify-center rounded-full border-4 ${
												form.watch('imgUrl') === ''
													? 'border-brand-primary'
													: 'border-transparent'
											}`}
										>
											🚫
										</button>

										{avatars.map(src => (
											<button
												key={src}
												type='button'
												onClick={() => {
													form.setValue('imgUrl', src)
												}}
												className={`h-14 w-14 overflow-hidden rounded-full border-4 ${
													form.watch('imgUrl') === src
														? 'border-brand-primary'
														: 'border-transparent'
												}`}
											>
												<Image
													src={src}
													alt='Avatar'
													width={56}
													height={56}
												/>
											</button>
										))}
									</div>
								</div>
								<FormDescription>{t('photoFormat')}</FormDescription>
							</div>
						</div>
					</Section>
					<Separator />
					{/* change password */}
					<Section className='flex gap-12'>
						<Title title={t('security')} size='small' className='min-w-[170px]' />
						<div>
							<Label>{t('password')}</Label>
							<DialogChangePassword title={t('changePassword')} />
						</div>
					</Section>
					<Separator />
					<Section className='flex gap-12'>
						{/* LEFT TITLE */}
						<Title title={t('interface')} size='small' className='min-w-[170px]' />

						<div className='space-y-7'>
							<div>
								<FormField
									control={form.control}
									name='language'
									render={({ field }) => (
										<FormItem>
											<FormLabel>{t('language')}</FormLabel>
											<FormControl>
												<Select
													{...field}
													value={field.value}
													onValueChange={value => field.onChange(value)}
												>
													<SelectTrigger className='max-h-[1000px] min-h-[60px] w-110'>
														{(() => {
															const c = countries.find(
																c =>
																	c.code.toLowerCase() ===
																	field.value
															)
															if (!c) return null

															const Flag = c.flag
															return (
																<span className='flex items-center gap-2 text-sm font-medium sm:text-base'>
																	<Flag className='size-6' />
																	{c.languageLabel}
																</span>
															)
														})()}
													</SelectTrigger>
													<SelectContent
														className='max-h-[260px] w-[200px] sm:w-full'
														position='popper'
														align='start'
													>
														<SelectGroup>
															{countries
																.filter(
																	country =>
																		country.code === 'UZ' ||
																		country.code === 'RU' ||
																		country.code === 'US'
																)
																.map(country => {
																	const CountryFlagComponent =
																		country.flag
																	return (
																		<SelectItem
																			key={country.code}
																			value={country.code.toLowerCase()}
																			className='flex items-center gap-1'
																		>
																			<CountryFlagComponent />

																			<span className='truncate text-xs sm:text-sm'>
																				{
																					country.languageLabel
																				}
																			</span>
																		</SelectItem>
																	)
																})}
														</SelectGroup>
													</SelectContent>
												</Select>
											</FormControl>

											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<div>
								<FormField
									control={form.control}
									name='theme'
									render={({ field }) => (
										<FormItem>
											<FormLabel>{t('theme')}</FormLabel>
											<FormControl>
												<RadioGroup
													onValueChange={field.onChange}
													value={field.value}
													className='grid grid-cols-3 gap-6'
												>
													{themeOptions.map(item => (
														<FormItem
															className='flex flex-col items-center space-y-0 space-x-3'
															key={item.label}
														>
															<FormControl>
																<RadioGroupItem
																	id={item.label}
																	value={item.label}
																	className='hidden'
																/>
															</FormControl>
															<FormLabel htmlFor={item.label}>
																<Image
																	alt={item.label}
																	src={item.img}
																	width={220}
																	height={120}
																	className={`cursor-pointer rounded-3xl ${form.getValues('theme') === item.label ? 'border-brand-primary border-4' : 'border-4'}`}
																/>
															</FormLabel>
															<div className='font-semibold first-letter:uppercase'>
																{t(item.label)}
															</div>
														</FormItem>
													))}
												</RadioGroup>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</div>
					</Section>
				</form>
			</Form>
		</div>
	)
}
