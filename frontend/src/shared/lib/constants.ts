export interface Country {
	code: string
	name: string
	dial_code: string
}

export const countries: Country[] = [
	{ code: 'UZ', name: "O'zbekiston", dial_code: '+998' },
	{ code: 'RU', name: 'Россия', dial_code: '+7' },
	{ code: 'KZ', name: 'Қазақстан', dial_code: '+7' },
	{ code: 'KG', name: 'Кыргызстан', dial_code: '+996' },
	{ code: 'TJ', name: 'Тоҷикистон', dial_code: '+992' },
	{ code: 'TM', name: 'Türkmenistan', dial_code: '+993' },
	{ code: 'US', name: 'United States', dial_code: '+1' },
	{ code: 'TR', name: 'Türkiye', dial_code: '+90' },
	{ code: 'DE', name: 'Deutschland', dial_code: '+49' },
	{ code: 'FR', name: 'France', dial_code: '+33' }
]
