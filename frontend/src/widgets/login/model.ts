import { useState } from 'react'

import { countries } from '@/shared/constants'
import { TCountry } from '@/shared/types'

export const useLogin = () => {
	const [selectedCountry, setSelectedCountry] = useState<TCountry>(countries[0])
	const [phoneNumber, setPhoneNumber] = useState('')
	const [password, setPassword] = useState('')
	const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)
	const [isHashed, setIsHashed] = useState<boolean>(false)

	const getFlagComponent = (countryCode: string) => {
		// const FlagComponent = (flags as flags.FlagComponent)[countryCode.toUpperCase()]
		// return FlagComponent ? (
		// 	<FlagComponent className='h-4 w-2' />
		// ) : (
		// 	<div className='flex h-4 w-5 items-center justify-center rounded bg-blue-400 text-xs font-bold text-white'>
		// 		{countryCode}
		// 	</div>
		// )
	}

	return {
		selectedCountry,
		phoneNumber,
		password,
		isDropdownOpen,
		isHashed,
		getFlagComponent,
		setSelectedCountry,
		setPhoneNumber,
		setPassword,
		setIsDropdownOpen,
		setIsHashed
	}
}
