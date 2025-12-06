import { cn } from '@/shared/lib/utils'

type TitleSize = 'small' | 'medium' | 'large'

interface TitleProps {
	className?: string
	title: string
	size?: TitleSize
}

const sizeClasses: Record<TitleSize, string> = {
	small: 'text-xl font-black sm:text-2xl',
	medium: 'text-3xl font-black sm:text-4xl',
	large: 'text-4xl font-black sm:text-5xl'
}

export const Title: React.FC<TitleProps> = ({ className, title, size = 'medium' }) => {
	return <div className={cn(sizeClasses[size], className)}>{title}</div>
}
