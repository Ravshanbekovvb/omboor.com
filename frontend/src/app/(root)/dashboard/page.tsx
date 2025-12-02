'use client'

import { Sidebar } from '@/widgets/sidebar'

import { ThemeToggle } from '@/entities/theme-toggle'

export default function Page() {
	return (
		<div className=''>
			<Sidebar />
			<ThemeToggle className='absolute top-4 right-4' />
		</div>
	)
}
