import { PropsWithChildren } from 'react'

import { cn } from '../lib/utils'

type Props = {
	className?: string
}

export const Section: React.FC<PropsWithChildren<Props>> = ({ className, children }) => {
	return <section className={cn('container', className)}>{children}</section>
}
