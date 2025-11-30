import { ArrowRight, Store } from 'lucide-react'
import Image from 'next/image'

import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/button'
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger
} from '@/shared/ui/sheet'

export const Profile: React.FC<{ className?: string; isOpen: boolean }> = ({
	className,
	isOpen
}) => {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<div
					className={cn(
						`flex cursor-pointer items-center p-4 transition-all duration-300 ease-in-out hover:bg-gray-100`,
						isOpen ? 'gap-2' : 'justify-center gap-0',
						className
					)}
				>
					<Image
						src={'https://cdn-icons-png.flaticon.com/512/219/219988.png'}
						alt='User image'
						height={'30'}
						width={'40'}
						className='transition-all duration-300 ease-in-out'
					/>
					<div
						className={cn(
							'flex flex-col items-start overflow-hidden transition-all duration-300 ease-in-out',
							isOpen ? 'ml-2 max-w-full opacity-100' : 'ml-0 max-w-0 opacity-0'
						)}
					>
						<span className='text-lg font-black whitespace-nowrap'>Abdulloh S.</span>
						<span className='text-xs font-bold whitespace-nowrap text-gray-400'>
							Bolalar tanlovi
						</span>
					</div>
				</div>
			</SheetTrigger>
			<SheetContent side='left' className='rounded-r-2xl' color='dark'>
				<SheetHeader>
					<SheetTitle>Аккаунт</SheetTitle>
					<SheetDescription>
						<span
							className={cn(
								`mt-5 flex cursor-pointer items-center p-4 transition-all duration-300 ease-in-out hover:bg-gray-100`,
								isOpen ? 'gap-2' : 'justify-center gap-0'
							)}
						>
							<Image
								src={'https://cdn-icons-png.flaticon.com/512/219/219988.png'}
								alt='User image'
								height={'30'}
								width={'40'}
								className='transition-all duration-300 ease-in-out'
							/>
							<span
								className={cn(
									'flex flex-col items-start overflow-hidden transition-all duration-300 ease-in-out',
									isOpen
										? 'ml-2 max-w-full opacity-100'
										: 'ml-0 max-w-0 opacity-0'
								)}
							>
								<span className='text-lg font-black whitespace-nowrap'>
									Abdulloh Sultonov
								</span>
								<span className='text-xs font-bold whitespace-nowrap text-gray-400'>
									Bolalar tanlovi
								</span>
							</span>
						</span>
					</SheetDescription>
					<div className='flex min-h-full flex-col items-center justify-end gap-3'>
						<div className='w-full'>
							<Button
								variant={'outline'}
								className='flex items-center justify-between p-10'
							>
								<span className='text-left font-bold whitespace-normal first-letter:uppercase'>
									откройте официальный офис{' '}
									<span className='text-brand-primary'>Omboor</span> в вашем
									регионе
								</span>
								<ArrowRight
									size={16}
									strokeWidth={3}
									className='text-brand-primary'
								/>
							</Button>
						</div>
						<div className='w-full'>
							<Button
								variant={'outline'}
								className='flex w-full items-center justify-between p-10'
							>
								<span className='text-left font-bold whitespace-normal first-letter:uppercase'>
									тариф "Start" <br />
									<span className='text-brand-primary first-letter:uppercase'>
										подписка активна до 30.11.2025
									</span>
								</span>
								<ArrowRight
									size={16}
									strokeWidth={3}
									className='text-brand-primary'
								/>
							</Button>
						</div>
						<div className='w-full'>
							<Button
								variant={'outline'}
								className='flex w-full items-center justify-between'
							>
								<Store size={18} strokeWidth={3} />
								<span className='text-left font-bold whitespace-normal first-letter:uppercase'>
									сменить магазин
								</span>
								<ArrowRight
									size={16}
									strokeWidth={3}
									className='text-brand-primary'
								/>
							</Button>
						</div>
					</div>
				</SheetHeader>

				<SheetFooter>
					<Button variant={'destructive'} className='font-bold'>
						<span className='first-letter:uppercase'>выйти из аккаунта</span>
						{/* <LogOut className='size-6' strokeWidth={2.5} /> */}
					</Button>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	)
}
