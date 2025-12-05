import Image from 'next/image'
import Link from 'next/link'

import { cn } from '@/shared/lib/utils'

import { Title } from '../title'

export const MainLogo: React.FC<{
	className?: string
	imageHeight?: number
	imageWidth?: number
	textSize?: string
	isOpen?: boolean
	link?: string
}> = ({
	className,
	imageHeight = 40,
	imageWidth = 40,
	textSize = 'text-2xl sm:text-3xl',
	isOpen = true,
	link = '/'
}) => {
	return (
		<Link
			href={link}
			className={cn(`flex items-center transition-all duration-300 ease-in-out`, className)}
		>
			<Image
				src={'/main-logo.webp'}
				width={imageWidth}
				height={imageHeight}
				alt='main logo'
				className='shrink-0 transition-all duration-300 ease-in-out'
			/>
			<Title
				title='Omboor'
				className={cn(
					`truncate overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out ${textSize}`,
					className,
					isOpen ? 'max-w-full opacity-100' : 'max-w-0 opacity-0'
				)}
			/>
		</Link>
	)
}
