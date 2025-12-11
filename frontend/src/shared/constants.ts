import { DE, FR, KG, KZ, RU, TJ, TM, TR, US, UZ } from 'country-flag-icons/react/3x2'
import { FaUsers } from 'react-icons/fa'
import { FaCartShopping } from 'react-icons/fa6'
import { HiUsers } from 'react-icons/hi2'
import { MdReport, MdSettings, MdWorkHistory } from 'react-icons/md'
import { PiListChecksFill } from 'react-icons/pi'
import { TbCirclePercentageFilled } from 'react-icons/tb'

import { TCountry } from './types'

export const avatars: string[] = [
	'/avatars/1.png',
	'/avatars/2.png',
	'/avatars/3.png',
	'/avatars/4.png',
	'/avatars/5.png',
	'/avatars/6.png',
	'/avatars/7.png',
	'/avatars/8.png',
	'/avatars/9.png'
]
export const themeOptions: {
	label: 'light' | 'dark' | 'system'
	img: string
}[] = [
	{ label: 'system', img: '/auto.png' },
	{ label: 'light', img: '/light.png' },
	{ label: 'dark', img: '/dark.png' }
]
export const countries: TCountry[] = [
	{
		code: 'UZ',
		name: "O'zbekiston",
		dialCode: '+998',
		flag: UZ,
		phoneMask: 'xx xxx xx xx',
		languageLabel: "O'zbekcha"
	},
	{
		code: 'RU',
		name: 'Россия',
		dialCode: '+7',
		flag: RU,
		phoneMask: 'xxx xxx xx xx',
		languageLabel: 'Русский'
	},
	{
		code: 'KZ',
		name: 'Қазақстан',
		dialCode: '+7',
		flag: KZ,
		phoneMask: 'xxx xxx xx xx',
		languageLabel: 'Қазақша'
	},
	{
		code: 'KG',
		name: 'Кыргызстан',
		dialCode: '+996',
		flag: KG,
		phoneMask: 'xxx xxx xxx',
		languageLabel: 'Кыргызча'
	},
	{
		code: 'TJ',
		name: 'Тоҷикистон',
		dialCode: '+992',
		flag: TJ,
		phoneMask: 'xxx xxx xxx',
		languageLabel: 'Тоҷикӣ'
	},
	{
		code: 'TM',
		name: 'Türkmenistan',
		dialCode: '+993',
		flag: TM,
		phoneMask: 'xxx xxx xxx',
		languageLabel: 'Türkmençe'
	},
	{
		code: 'US',
		name: 'United States',
		dialCode: '+1',
		flag: US,
		phoneMask: 'xxx xxx xxxx',
		languageLabel: 'English'
	},
	{
		code: 'TR',
		name: 'Türkiye',
		dialCode: '+90',
		flag: TR,
		phoneMask: 'xxx xxx xxxx',
		languageLabel: 'Türkçe'
	},
	{
		code: 'DE',
		name: 'Deutschland',
		dialCode: '+49',
		flag: DE,
		phoneMask: 'xxxx xxxxxxx',
		languageLabel: 'Deutsch'
	},
	{
		code: 'FR',
		name: 'France',
		dialCode: '+33',
		flag: FR,
		phoneMask: 'xx xx xx xx xx',
		languageLabel: 'Français'
	}
]
export const menuItems: {
	name: string
	icon: React.ElementType
	nestedItems: { name: string; href: string }[]
}[] = [
	{
		name: 'products',
		icon: FaCartShopping,
		nestedItems: [
			{ name: 'catalog', href: '/products/catalog' },
			{ name: 'import', href: '/products/import' },
			{ name: 'orders', href: '/products/orders' },
			{ name: 'inventory', href: '/products/inventory' },
			{ name: 'transfer', href: '/products/transfer' },
			{ name: 'revaluation', href: '/products/revaluation' },
			{ name: 'write-off', href: '/products/write-off' },
			{ name: 'suppliers', href: '/products/suppliers' }
		]
	},
	{
		name: 'orders',
		icon: PiListChecksFill,
		nestedItems: [
			{ name: 'new order', href: '/order/new-order' },
			{ name: 'all orders', href: '/order/all' }
		]
	},
	{
		name: 'clients',
		icon: FaUsers,
		nestedItems: [
			{ name: 'clients', href: '/clients' },
			{ name: 'clients groups', href: '/clients/clients-group' },
			{ name: 'programm loyalty', href: '/clients/loyalty-program' },
			{ name: 'clients debts', href: '/clients/debts' }
		]
	},
	{
		name: 'marketing',
		icon: TbCirclePercentageFilled,
		nestedItems: [
			{ name: 'promotions', href: '/marketing/promotions' },
			{ name: 'promo-codes', href: '/marketing/promo-codes' },
			{ name: 'sms-mailing', href: '/marketing/sms-mailing' },
			{ name: 'gift-cards', href: '/marketing/gift-cards' }
		]
	},
	{
		name: 'reports',
		icon: MdReport,
		nestedItems: [
			{ name: 'favorites', href: '/reports/favorites' },
			{ name: 'shop', href: '/reports/shop' },
			{ name: 'products', href: '/reports/products' },
			{ name: 'sellers', href: '/reports/sellers' },
			{ name: 'clients', href: '/reports/clients' }
		]
	},
	{
		name: 'managment',
		icon: MdWorkHistory,
		nestedItems: [
			{ name: 'employe', href: '/products/employe' },
			{ name: 'roles', href: '/products/roles' }
		]
	},
	{
		name: 'settings',
		icon: MdSettings,
		nestedItems: [
			{ name: 'profile', href: '/settings/profile' }
			// { name: 'company', href: '/settings/company' },
			// { name: 'plan', href: '/settings/plan' },
			// { name: 'cheque', href: '/settings/cheque' },
			// { name: 'payment', href: '/settings/payment' },
			// { name: 'product', href: '/settings/product' },
			// { name: 'notification', href: '/settings/notification' },
			// { name: 'applications', href: '/settings/applications' }
		]
	}
]
export const adminMenuItems: {
	name: string
	icon: React.ElementType
	nestedItems: { name: string; href: string; type: 'base' | 'dialog' }[]
}[] = [
	{
		name: 'users',
		icon: HiUsers,
		nestedItems: [
			{ name: 'users', href: '/users/list', type: 'base' },
			{ name: 'create User', href: '/users/list', type: 'dialog' }
			// { name: 'import', href: '/users/import' },
			// { name: 'orders', href: '/users/orders' },
			// { name: 'inventory', href: '/users/inventory' },
			// { name: 'transfer', href: '/users/transfer' },
			// { name: 'revaluation', href: '/users/revaluation' },
			// { name: 'write-off', href: '/users/write-off' },
			// { name: 'suppliers', href: '/users/suppliers' }
		]
	}
]
