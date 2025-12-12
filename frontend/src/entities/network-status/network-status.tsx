'use client'
import { MdRefresh } from 'react-icons/md'
import { RiSignalWifiErrorFill } from 'react-icons/ri'

import { Button } from '@/shared/ui'

import { netWorkStatusModel } from './model'

export const NetworkStatus: React.FC = () => {
	const { t, isOnline } = netWorkStatusModel()
	console.log('status:', isOnline)

	if (isOnline) {
		return null
	}
	return (
		<div className='dark:bg-background/80 bg-background-light/80 fixed z-20 flex min-h-screen w-screen items-center justify-center px-4 py-10 backdrop-blur-[2px]'>
			<div className='flex w-full max-w-lg flex-col items-center text-center md:max-w-xl lg:max-w-2xl'>
				{/* Icon */}
				<div className='relative mb-8 md:mb-10'>
					<div className='bg-destructive/20 absolute inset-0 animate-ping rounded-full md:scale-125' />
					<div className='bg-destructive/10 relative flex h-20 w-20 items-center justify-center rounded-full md:h-28 md:w-28'>
						<RiSignalWifiErrorFill className='text-destructive h-10 w-10 md:h-14 md:w-14' />
					</div>
				</div>

				{/* Title */}
				<h1 className='text-foreground mb-2 text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl dark:text-white'>
					{t('noInternetConnection')}
				</h1>

				{/* Description */}
				<p className='text-muted-foreground mb-6 max-w-sm text-sm md:max-w-md md:text-base lg:max-w-lg'>
					{t('description')}
				</p>

				{/* Button */}
				<Button
					onClick={() => {
						window.location.reload()
					}}
					size='lg'
					variant={'outline'}
					className='group gap-2 text-sm transition-all hover:gap-3 md:text-base'
				>
					<MdRefresh className='h-5 w-5 transition-transform group-hover:rotate-180' />
					{t('tryAgain')}
				</Button>
			</div>
		</div>
	)
}
