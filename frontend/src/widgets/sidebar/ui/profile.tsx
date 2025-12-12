import { ArrowRight, Store } from 'lucide-react'
import Image from 'next/image'

import { cn } from '@/shared/lib/utils'
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger
} from '@/shared/ui'
import { Button } from '@/shared/ui/button'
import { Spinner } from '@/shared/ui/spinner'

import { useSidebar } from '../model'

export const Profile: React.FC<{ className?: string; isOpen: boolean }> = ({
	className,
	isOpen
}) => {
	const { logout, loggingOut, me } = useSidebar()

	return (
		<Sheet>
			<SheetTrigger asChild>
				<div
					className={cn(
						`hover:bg-input flex cursor-pointer items-center p-4 transition-all duration-300 ease-in-out`,
						isOpen ? 'gap-2' : 'justify-center gap-0',
						className
					)}
				>
					{typeof me?.avatarUrl === 'string' && me?.avatarUrl ? (
						<Image
							src={me.avatarUrl}
							alt='User image'
							height={30}
							width={40}
							className='rounded-full transition-all duration-300 ease-in-out'
						/>
					) : (
						<div className='flex h-10 w-10 items-center justify-center rounded-full bg-gray-500 font-bold text-white'>
							{me?.name?.[0]?.toUpperCase() ?? 'U'}
						</div>
					)}
					<div
						className={cn(
							'flex flex-col items-start overflow-hidden transition-all duration-300 ease-in-out',
							isOpen ? 'ml-2 max-w-full opacity-100' : 'ml-0 max-w-0 opacity-0'
						)}
					>
						<span className='text-lg font-black whitespace-nowrap'>
							{me ? `${me.name} ${me.lastName?.slice(0, 1) ?? ''}.` : 'User name'}
						</span>
						<span className='text-xs font-bold whitespace-nowrap text-gray-400'>
							Bolalar tanlovi
						</span>
					</div>
				</div>
			</SheetTrigger>
			<SheetContent side='left'>
				<SheetHeader>
					<SheetTitle>Аккаунт</SheetTitle>
					<SheetDescription>
						<span
							className={cn(
								`mt-5 flex cursor-pointer items-center justify-start gap-3 p-4 transition-all duration-300 ease-in-out`
							)}
						>
							{typeof me?.avatarUrl === 'string' && me?.avatarUrl ? (
								<Image
									src={me.avatarUrl}
									alt='User image'
									height={30}
									width={40}
									className='rounded-full transition-all duration-300 ease-in-out'
								/>
							) : (
								<span className='flex h-10 w-10 items-center justify-center rounded-full bg-gray-500 font-bold text-white'>
									{me?.name?.[0]?.toUpperCase() ?? 'U'}
								</span>
							)}

							<span className={cn('flex flex-col items-start')}>
								<span className='text-lg font-black whitespace-nowrap'>
									{`${me?.name} ${me?.lastName}`}
								</span>
								<span className='text-xs font-bold whitespace-nowrap'>
									{me?.plan}
									{/* Bolalar tanlovi */}
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
					<Button
						variant={'destructive'}
						className='font-bold'
						onClick={() => {
							logout()
						}}
					>
						{loggingOut ? <Spinner className='size-6 stroke-3' /> : 'выйти из аккаунта'}
					</Button>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	)
}
