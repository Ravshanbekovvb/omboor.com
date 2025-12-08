import { Loader2 } from 'lucide-react'

import { cn } from '../lib/utils'

interface LoaderProps {
	className?: string
}

export const Spinner: React.FC<LoaderProps> = ({ className }) => {
	return <Loader2 className={cn('animate-spin', className)} />
}
