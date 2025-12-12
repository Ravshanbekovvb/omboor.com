import { Slot } from '@radix-ui/react-slot'
import { type VariantProps, cva } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/shared/lib/utils'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/ui/index'

const buttonVariants = cva(
	"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-md font-semibold transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive min-h-[60px] rounded-2xl cursor-pointer",
	{
		variants: {
			variant: {
				default:
					'dark:bg-background bg-background-light hover:bg-input text-primary-foreground dark:hover:bg-background/90 dark:text-white',
				destructive:
					'bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
				outline:
					'border bg-background-light shadow-xs hover:text-accent-foreground dark:bg-background dark:border-input dark:hover:bg-input hover:bg-input dark:text-white',
				secondary:
					'bg-transparent border hover:bg-input dark:hover:bg-input text-primary-foreground dark:text-white text-md',
				ghost: '',
				link: 'text-primary underline-offset-4 hover:underline',
				primary: 'bg-brand-primary text-white hover:bg-brand-primary/90'
			},
			size: {
				default: 'h-9 px-4 py-2 has-[>svg]:px-3',
				sm: 'rounded-2xl gap-1.5 min-h-[50px] px-4 has-[>svg]:px-2.5',
				lg: 'h-10 rounded-2xl px-6 has-[>svg]:px-4',
				icon: 'size-9',
				'icon-sm': 'size-8',
				'icon-lg': 'size-10'
			}
		},
		defaultVariants: {
			variant: 'default',
			size: 'default'
		}
	}
)

function Button({
	className,
	variant,
	size,
	asChild = false,
	tooltip,
	...props
}: React.ComponentProps<'button'> &
	VariantProps<typeof buttonVariants> & {
		asChild?: boolean
		tooltip?: string
	}) {
	const Comp = asChild ? Slot : 'button'
	if (typeof tooltip === 'string') {
		return (
			<Tooltip>
				<TooltipTrigger asChild>
					<Comp
						data-slot='button'
						className={cn(buttonVariants({ variant, size, className }))}
						{...props}
					/>
				</TooltipTrigger>
				<TooltipContent>
					<p className='font-bold'>{tooltip}</p>
				</TooltipContent>
			</Tooltip>
		)
	}
	return (
		<Comp
			data-slot='button'
			className={cn(buttonVariants({ variant, size, className }))}
			{...props}
		/>
	)
}

export { Button, buttonVariants }
