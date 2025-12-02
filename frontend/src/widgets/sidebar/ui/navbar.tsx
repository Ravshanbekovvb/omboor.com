import { ChevronLeft, ChevronRight } from 'lucide-react'

import { menuItems } from '@/shared/constants'
import { cn } from '@/shared/lib/utils'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/shared/ui'

import { useSidebar } from '../model'

export const Navbar: React.FC<{ className?: string; isOpen: boolean }> = ({
	className,
	isOpen
}) => {
	const { setCurrentNavbar, currentNavbar } = useSidebar()
	return (
		<div className={cn('', className)}>
			{currentNavbar && currentNavbar.items.length > 0 && isOpen ? (
				<div className=''>
					<div
						className='hover:bg-input flex items-center gap-3 p-4 px-4 hover:cursor-pointer'
						onClick={() => setCurrentNavbar(null)}
					>
						<ChevronLeft
							className={cn('text-gray-400 transition-all duration-300 ease-in-out')}
						/>
						<currentNavbar.currentLinkIcon className='text-brand-primary size-5 transition-all duration-300 ease-in-out' />

						<span className='first-letter:uppercase'>
							{currentNavbar.currentLinkName}
						</span>
					</div>
					<div className={cn('flex flex-col')}>
						{currentNavbar.items.map(item => (
							<span
								key={item.name}
								className={cn(
									'group hover:bg-input inline-block w-full cursor-pointer items-center justify-between gap-3 overflow-hidden p-4 px-6 font-bold whitespace-nowrap transition-all duration-300 ease-in-out first-letter:uppercase'
								)}
							>
								{item.name}
							</span>
						))}
					</div>
				</div>
			) : (
				menuItems.map(item => {
					const ItemIcon = item.icon
					return (
						<div
							key={item.name}
							className={cn(
								'group hover:bg-input flex cursor-pointer items-center justify-between gap-3 p-4 transition-all duration-300 ease-in-out',
								isOpen ? '' : 'justify-center'
							)}
							onClick={() =>
								setCurrentNavbar({
									currentLinkName: item.name,
									items: item.nestedItems,
									currentLinkIcon: item.icon
								})
							}
						>
							<HoverCard openDelay={10} closeDelay={10}>
								<HoverCardTrigger>Hover</HoverCardTrigger>
								<HoverCardContent side='right' className='w-60'>
									The React Framework – created and maintained by @vercel.
								</HoverCardContent>
							</HoverCard>
							<div
								className={cn(
									'flex items-center transition-all duration-300 ease-in-out',
									isOpen ? 'gap-3' : 'justify-center gap-0'
								)}
							>
								<span>
									<ItemIcon className='text-brand-primary size-5 transition-all duration-300 ease-in-out' />
								</span>
								<span
									className={cn(
										'overflow-hidden font-bold whitespace-nowrap transition-all duration-300 ease-in-out first-letter:uppercase',
										isOpen
											? 'ml-3 max-w-full justify-center opacity-100'
											: 'ml-0 max-w-0 opacity-0'
									)}
								>
									{item.name}
								</span>
							</div>
							<span
								className={cn(
									'overflow-hidden transition-all duration-300 ease-in-out',
									isOpen ? 'max-w-full opacity-100' : 'hidden max-w-0 opacity-0'
								)}
							>
								<ChevronRight
									className={cn(
										'text-gray-400 transition-all duration-300 ease-in-out'
									)}
								/>
							</span>
						</div>
					)
				})
			)}
		</div>
	)
}
