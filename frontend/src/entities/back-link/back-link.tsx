import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/shared/ui'

interface BackLinkProps {
	link?: string
}

export const BackLink: React.FC<BackLinkProps> = ({ link }) => {
	if (typeof link === 'string') {
		return (
			<Link href={link}>
				<Button
					variant={'outline'}
					className='size-7 min-h-12 w-12 rounded-full'
					size='icon'
				>
					<ChevronLeft className='size-6 stroke-3' />
				</Button>
			</Link>
		)
	}
	if (typeof link === 'undefined') {
		return (
			<Button
				variant={'outline'}
				className='size-7 min-h-12 w-12 rounded-full'
				size='icon'
				asChild
			>
				<span>
					<ChevronLeft className='size-6 stroke-3' />
				</span>
			</Button>
		)
	}
}
