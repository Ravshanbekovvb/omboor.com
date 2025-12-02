import { ChevronRight } from 'lucide-react'

import { menuItems } from '@/shared/constants'
import { cn } from '@/shared/lib/utils'

export const Navbar: React.FC<{ className?: string; isOpen: boolean }> = ({
	className,
	isOpen
}) => {
	return (
		<div className={cn('', className)}>
			{menuItems.map(item => {
				const ItemIcon = item.icon
				return (
					<div
						key={item.name}
						className={cn(
							'group hover:bg-input flex cursor-pointer items-center justify-between gap-3 p-4 transition-all duration-300 ease-in-out',
							isOpen ? '' : 'justify-center'
						)}
					>
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
			})}
		</div>
	)
}
