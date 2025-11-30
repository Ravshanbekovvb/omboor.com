import { DE, FR, KG, KZ, RU, TJ, TM, TR, US, UZ } from 'country-flag-icons/react/3x2'

import { TCountry } from './types'

export const countries: TCountry[] = [
	{ code: 'UZ', name: "O'zbekiston", dialCode: '+998', flag: UZ },
	{ code: 'RU', name: 'Россия', dialCode: '+7', flag: RU },
	{ code: 'KZ', name: 'Қазақстан', dialCode: '+7', flag: KZ },
	{ code: 'KG', name: 'Кыргызстан', dialCode: '+996', flag: TJ },
	{ code: 'TJ', name: 'Тоҷикистон', dialCode: '+992', flag: KG },
	{ code: 'TM', name: 'Türkmenistan', dialCode: '+993', flag: TM },
	{ code: 'US', name: 'United States', dialCode: '+1', flag: US },
	{ code: 'TR', name: 'Türkiye', dialCode: '+90', flag: TR },
	{ code: 'DE', name: 'Deutschland', dialCode: '+49', flag: DE },
	{ code: 'FR', name: 'France', dialCode: '+33', flag: FR }
]
