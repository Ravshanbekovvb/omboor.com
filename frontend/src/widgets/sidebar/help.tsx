import { HelpCircle } from 'lucide-react'

import { cn } from '@/shared/lib/utils'

export const Help: React.FC<{ className?: string; isOpen: boolean }> = ({ className, isOpen }) => {
	return (
		<div
			className={cn(
				`text-md dark:hover:bg-input flex cursor-pointer items-center p-4 py-6 font-black transition-all duration-300 ease-in-out first-letter:uppercase`,
				isOpen ? '' : 'justify-center',
				className
			)}
		>
			<HelpCircle
				className={cn(
					'inline-block transition-all duration-300 ease-in-out',
					isOpen ? 'mr-2' : 'mr-0'
				)}
			/>
			<span
				className={cn(
					'overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out first-letter:uppercase',
					isOpen ? 'max-w-full opacity-100' : 'ml-0 max-w-0 opacity-0'
				)}
			>
				написать в поддержку
			</span>
		</div>
	)
}
