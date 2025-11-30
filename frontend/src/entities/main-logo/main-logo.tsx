import Image from 'next/image'
import Link from 'next/link'

import { cn } from '@/shared/lib/utils'

export const MainLogo: React.FC<{
	className?: string
	imageHeight?: number
	imageWidth?: number
	textSize?: string
	isOpen?: boolean
}> = ({
	className,
	imageHeight = 20,
	imageWidth = 40,
	textSize = 'text-2xl sm:text-3xl',
	isOpen = true
}) => {
	return (
		<Link
			href='/'
			className={cn(`flex items-center transition-all duration-300 ease-in-out`, className)}
		>
			<Image
				src={'/main-logo.jpg'}
				width={imageWidth}
				height={imageHeight}
				alt='main logo'
				className='shrink-0 transition-all duration-300 ease-in-out'
			/>
			<div
				className={cn(
					`truncate overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out ${textSize}`,
					className,
					isOpen ? 'ml-2 max-w-full opacity-100' : 'ml-0 max-w-0 opacity-0'
				)}
			>
				Omboor.com
			</div>
		</Link>
	)
}
