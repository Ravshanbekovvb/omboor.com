import { Loader2 } from 'lucide-react'

import { cn } from '../lib/utils'

interface LoaderProps {
	className?: string
	type?: 'spinner' | 'page-loader'
}

export const Spinner: React.FC<LoaderProps> = ({ className, type = 'spinner' }) => {
	if (type === 'page-loader') {
		return (
			<div className={cn('', className)}>
				<div className='clouds'>
					<div className='cloud cloud1'></div>
					<div className='cloud cloud2'></div>
					<div className='cloud cloud3'></div>
					<div className='cloud cloud4'></div>
					<div className='cloud cloud5'></div>
				</div>

				<div className='loader'>
					<span>
						<span></span>
						<span></span>
						<span></span>
						<span></span>
					</span>
					<div className='base'>
						<span></span>
						<div className='face'></div>
					</div>
				</div>

				<div className='longfazers'>
					<span></span>
					<span></span>
					<span></span>
					<span></span>
				</div>
			</div>
		)
	} else {
		return <Loader2 className={cn('animate-spin', className)} />
	}
}
