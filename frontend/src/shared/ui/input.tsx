import * as React from 'react'

import { cn } from '@/shared/lib/utils'

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
	return (
		<input
			type={type}
			data-slot='input'
			className={cn(
				// ASOSIY BORDER BRAND PRIMARY
				'border-brand-primary focus-visible:border-brand-primary',

				// FOCUS HOLATIDA HALQA HAM BRAND PRIMARY BO‘LSIN
				'focus-visible:ring-brand-primary/50 focus-visible:ring-[3px]',

				// DEFAULT INPUT STYLE-LARI
				'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground md:text-md',
				'dark:bg-background bg-background-light hover:bg-input h-9 w-full min-w-0 rounded-md',
				'px-6 py-1 text-base font-semibold shadow-xs transition-[color,box-shadow] outline-none',
				'file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm',
				'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
				'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
				'dark:hover:bg-input border-input min-h-[60px] rounded-2xl border transition-all duration-200',

				className
			)}
			{...props}
		/>
	)
}

export { Input }
