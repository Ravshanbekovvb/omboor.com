export type TCountry = {
	code: string
	name: string
	dialCode: string
	flag: React.FC<React.SVGAttributes<SVGElement>>
	phoneMask: string
}
export type User = {
	id: string
	name: string
	imgUrl: string | null
	password: string
	phoneNumber: string
	role: 'ADMIN' | 'REGULAR'
	plan: 'START' | 'PRO' | 'ADVANCED'
	createdAt: Date
}
