import { DE, FR, KG, KZ, RU, TJ, TM, TR, US, UZ } from 'country-flag-icons/react/3x2'
import { FaUsers } from 'react-icons/fa'
import { FaCartShopping } from 'react-icons/fa6'
import { MdReport, MdSettings, MdWorkHistory } from 'react-icons/md'
import { PiListChecksFill } from 'react-icons/pi'
import { TbCirclePercentageFilled } from 'react-icons/tb'

import { TCountry } from './types'

export const countries: TCountry[] = [
	{ code: 'UZ', name: "O'zbekiston", dialCode: '+998', flag: UZ, phoneMask: 'xx xxx xx xx' },
	{ code: 'RU', name: 'Россия', dialCode: '+7', flag: RU, phoneMask: 'xxx xxx xx xx' },
	{ code: 'KZ', name: 'Қазақстан', dialCode: '+7', flag: KZ, phoneMask: 'xxx xxx xx xx' },
	{ code: 'KG', name: 'Кыргызстан', dialCode: '+996', flag: KG, phoneMask: 'xxx xxx xxx' },
	{ code: 'TJ', name: 'Тоҷикистон', dialCode: '+992', flag: TJ, phoneMask: 'xxx xxx xxx' },
	{ code: 'TM', name: 'Türkmenistan', dialCode: '+993', flag: TM, phoneMask: 'xxx xxx xxx' },
	{ code: 'US', name: 'United States', dialCode: '+1', flag: US, phoneMask: 'xxx xxx xxxx' },
	{ code: 'TR', name: 'Türkiye', dialCode: '+90', flag: TR, phoneMask: 'xxx xxx xxxx' },
	{ code: 'DE', name: 'Deutschland', dialCode: '+49', flag: DE, phoneMask: 'xxxx xxxxxxx' },
	{ code: 'FR', name: 'France', dialCode: '+33', flag: FR, phoneMask: 'xx xx xx xx xx' }
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
		name: 'management',
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
			{ name: 'profile', href: '/products/profile' },
			{ name: 'company', href: '/products/company' },
			{ name: 'plan', href: '/products/plan' },
			{ name: 'cheque', href: '/products/cheque' },
			{ name: 'payment', href: '/products/payment' },
			{ name: 'product', href: '/products/product' },
			{ name: 'notification', href: '/products/notification' },
			{ name: 'applications', href: '/products/applications' }
		]
	}
]
