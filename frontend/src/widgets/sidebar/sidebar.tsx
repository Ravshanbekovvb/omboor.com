import { ChevronLeft } from 'lucide-react'

import { MainLogo } from '@/entities/main-logo'

import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui'

import { Help } from './help'
import { useSidebar } from './model'
import { Navbar } from './navbar'
import { Profile } from './profile'

export const Sidebar: React.FC = () => {
	const { setIsOpen, isOpen } = useSidebar()
	return (
		<div
			className={cn(
				'dark:bg-background flex h-screen max-w-[250px] flex-col justify-between transition-all duration-350',
				isOpen ? 'w-64' : 'w-21'
			)}
		>
			<div>
				<div className='relative flex items-center justify-between'>
					<MainLogo
						className='gap-0 p-4'
						imageHeight={28}
						imageWidth={40}
						textSize='sm:text-xl font-black'
						link='/dashboard'
						isOpen={isOpen}
					/>
					<Button
						variant={'outline'}
						className='absolute top-[50%] -right-4 min-h-5 min-w-5 -translate-y-1/2 cursor-pointer rounded-full p-2 transition-all duration-400 ease-in-out hover:shadow-md'
						onClick={() => setIsOpen(!isOpen)}
						size={'icon-sm'}
					>
						<ChevronLeft
							className={
								'transition-all duration-300 ease-in-out ' +
								(isOpen ? '' : 'rotate-180')
							}
						/>
					</Button>
				</div>
				<Navbar isOpen={isOpen} />
			</div>
			<div>
				<Profile className='border-t' isOpen={isOpen} />
				<Help className='border-t' isOpen={isOpen} />
			</div>
		</div>
	)
}
