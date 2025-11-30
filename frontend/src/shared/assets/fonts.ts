import { Manrope } from 'next/font/google'

export const fontManrope = Manrope({
	variable: '--font-variable-manrope',
	display: 'swap',
	preload: false,
	style: 'normal',
	weight: ['200', '300', '400', '500', '600', '700', '800'],
	subsets: ['latin', 'cyrillic']
})
