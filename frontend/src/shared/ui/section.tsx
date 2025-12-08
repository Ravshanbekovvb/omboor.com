import { PropsWithChildren } from 'react'

import { cn } from '../lib/utils'

type Props = {
	className?: string
}

export const Section: React.FC<PropsWithChildren<Props>> = ({ className, children }) => {
	return (
		<section className={cn('container mx-auto px-3 md:px-4 lg:px-5 xl:px-6', className)}>
			{children}
		</section>
	)
}
