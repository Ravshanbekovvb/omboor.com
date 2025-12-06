import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'

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
					<div className={cn('flex grow flex-col overflow-x-hidden overflow-y-auto')}>
						{currentNavbar.items.map(item => (
							<Link
								href={item.href}
								key={item.name}
								className={cn(
									'hover:bg-input cursor-pointer p-4 px-6 font-bold first-letter:uppercase'
								)}
							>
								{item.name}
							</Link>
						))}
					</div>
				</div>
			) : (
				menuItems.map(item => {
					const ItemIcon = item.icon
					return (
						<HoverCard key={item.name} openDelay={80} closeDelay={80}>
							<HoverCardTrigger
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
								<div
									className={cn(
										'flex origin-left items-center transition-all duration-300 ease-in-out',
										isOpen ? 'gap-3' : 'justify-center gap-0'
									)}
								>
									<span>
										<ItemIcon className='text-brand-primary size-5 transition-all duration-300 ease-in-out' />
									</span>
									<span
										className={cn(
											'truncate overflow-hidden font-bold whitespace-nowrap transition-[max-width,opacity,transform] duration-300 ease-in-out first-letter:uppercase',
											isOpen
												? 'max-w-[160px] translate-x-0 opacity-100'
												: 'max-w-0 -translate-x-2 opacity-0'
										)}
									>
										{item.name}
									</span>
								</div>
								<span
									className={cn(
										'overflow-hidden transition-[max-width,opacity,transform] duration-300 ease-in-out',
										isOpen
											? 'max-w-[20px] translate-x-0 opacity-100'
											: 'hidden max-w-0 translate-x-2 opacity-0'
									)}
								>
									<ChevronRight
										className={cn(
											'text-gray-400 transition-all duration-300 ease-in-out'
										)}
									/>
								</span>
							</HoverCardTrigger>

							{!isOpen && (
								<HoverCardContent side='right' className='w-64 space-y-3 p-4'>
									<div className='flex items-center gap-3 border-b border-dashed pb-3'>
										<span className='bg-brand-primary/10 text-brand-primary rounded-xl p-2'>
											<ItemIcon className='size-5' />
										</span>
										<div className='flex flex-col'>
											<span className='text-sm font-semibold first-letter:uppercase'>
												{item.name}
											</span>
										</div>
									</div>

									<div className='flex flex-col gap-2'>
										{item.nestedItems.map(nestedItem => (
											<div
												key={nestedItem.name}
												className='hover:bg-input group hover:border-brand-primary/30 flex cursor-pointer items-center justify-between rounded-2xl border border-transparent px-3 py-2 text-sm font-semibold transition-all duration-200 ease-in-out'
											>
												<span className='first-letter:uppercase'>
													{nestedItem.name}
												</span>
												<ChevronRight className='group-hover:text-brand-primary size-4 text-gray-400 transition-all duration-200 ease-in-out group-hover:translate-x-1' />
											</div>
										))}
									</div>
								</HoverCardContent>
							)}
						</HoverCard>
					)
				})
			)}
		</div>
	)
}
