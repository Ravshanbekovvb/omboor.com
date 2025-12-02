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
	nestedItems?: { name: string; href: string }[]
}[] = [
	{
		name: 'products',
		icon: FaCartShopping,
		nestedItems: [
			{ name: 'catalog', href: '/products/catalog' },
			{ name: 'import', href: '/products/import' },
			{ name: 'orders', href: '/products/orders' },
			{ name: 'inventory', href: '/products/inventory' }
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
		icon: TbCirclePercentageFilled
	},
	{
		name: 'reports',
		icon: MdReport
	},
	{
		name: 'management',
		icon: MdWorkHistory
	},
	{
		name: 'settings',
		icon: MdSettings
	}
]
