import { type ClassValue, clsx } from 'clsx'
import {
	BadgeDollarSign,
	FolderKanban,
	ListOrdered,
	LucideProps,
	MessageCircleWarning,
	Settings,
	ShoppingCart,
	Users
} from 'lucide-react'
import { ForwardRefExoticComponent, RefAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}
export const menuItems: {
	name: string
	icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>
	nestedItems?: { name: string; href: string }[]
}[] = [
	{
		name: 'products',
		icon: ShoppingCart, // Replace SomeIcon with the actual icon component from lucide-react
		// href: '/products',
		nestedItems: [
			{ name: 'catalog', href: '/products/catalog' },
			{ name: 'import', href: '/products/import' },
			{ name: 'orders', href: '/products/orders' },
			{ name: 'inventory', href: '/products/inventory' }
		]
	},
	{
		name: 'orders',
		icon: ListOrdered, // Replace SomeIcon with the actual icon component from lucide-react
		nestedItems: [
			{ name: 'new order', href: '/order/new-order' },
			{ name: 'all orders', href: '/order/all' }
		]
	},
	{
		name: 'clients',
		icon: Users, // Replace SomeIcon with the actual icon component from lucide-react
		nestedItems: [
			{ name: 'clients', href: '/clients' },
			{ name: 'clients groups', href: '/clients/clients-group' },
			{ name: 'programm loyalty', href: '/clients/loyalty-program' },
			{ name: 'clients debts', href: '/clients/debts' }
		]
	},
	{
		name: 'marketing',
		icon: BadgeDollarSign
	},
	{
		name: 'reports',
		icon: MessageCircleWarning
	},
	{
		name: 'management',
		icon: FolderKanban
	},
	{
		name: 'settings',
		icon: Settings
	}
]
