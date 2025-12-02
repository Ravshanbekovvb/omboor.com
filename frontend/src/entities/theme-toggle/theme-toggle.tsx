'use client'

import { useTheme } from 'next-themes'
import { BsFillSunFill } from 'react-icons/bs'
import { IoMoonSharp } from 'react-icons/io5'

import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuShortcut,
	DropdownMenuTrigger
} from '@/shared/ui'

export const ThemeToggle: React.FC<{ className?: string }> = ({ className }) => {
	const { setTheme } = useTheme()

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild className={className}>
				<Button variant='outline' size='icon'>
					<BsFillSunFill className='h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90' />
					<IoMoonSharp className='absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0' />
					<span className='sr-only'>Toggle theme</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				<DropdownMenuItem onClick={() => setTheme('light')}>
					Light
					<DropdownMenuShortcut>
						<BsFillSunFill />
					</DropdownMenuShortcut>
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme('dark')}>
					Dark
					<DropdownMenuShortcut>
						<IoMoonSharp />
					</DropdownMenuShortcut>
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme('system')}>System</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
