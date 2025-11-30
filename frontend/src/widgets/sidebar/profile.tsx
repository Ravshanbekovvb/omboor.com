import Image from 'next/image'

import { cn } from '@/shared/lib/utils'

export const Profile: React.FC<{ className?: string; isOpen: boolean }> = ({
	className,
	isOpen
}) => {
	return (
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
	)
}
