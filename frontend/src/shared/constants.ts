import { DE, FR, KG, KZ, RU, TJ, TM, TR, US, UZ } from 'country-flag-icons/react/3x2'

import { TCountry } from './types'

export const countries: TCountry[] = [
	{ code: 'UZ', name: "O'zbekiston", dialCode: '+998', flag: UZ, phoneMask: '(__) ___-__-__' },
	{ code: 'RU', name: 'Россия', dialCode: '+7', flag: RU, phoneMask: '(___) ___-__-__' },
	{ code: 'KZ', name: 'Қазақстан', dialCode: '+7', flag: KZ, phoneMask: '(___) ___-__-__' },
	{ code: 'KG', name: 'Кыргызстан', dialCode: '+996', flag: KG, phoneMask: '(___) ___-___' },
	{ code: 'TJ', name: 'Тоҷикистон', dialCode: '+992', flag: TJ, phoneMask: '(___) ___-___' },
	{ code: 'TM', name: 'Türkmenistan', dialCode: '+993', flag: TM, phoneMask: '(___) ___-___' },
	{ code: 'US', name: 'United States', dialCode: '+1', flag: US, phoneMask: '(___) ___-____' },
	{ code: 'TR', name: 'Türkiye', dialCode: '+90', flag: TR, phoneMask: '(___) ___-____' },
	{ code: 'DE', name: 'Deutschland', dialCode: '+49', flag: DE, phoneMask: '____ ________' },
	{ code: 'FR', name: 'France', dialCode: '+33', flag: FR, phoneMask: '(__) __ __ __ __' }
]
