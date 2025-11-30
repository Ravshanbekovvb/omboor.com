import { cn } from '@/shared/lib/utils'

export const Title: React.FC<{ className?: string; title: string }> = ({ className, title }) => {
	return <div className={cn('text-3xl font-black sm:text-4xl', className)}>{title}</div>
}
