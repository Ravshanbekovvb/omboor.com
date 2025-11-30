import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as z from 'zod'

import { countries } from '@/shared/constants'
import { TCountry } from '@/shared/types'

const formSchema = z.object({
	phone: z.string().min(1, 'Telefon raqam kiritilishi shart'),
	password: z.string().min(8, 'Password must be at least 8 characters')
})
type TForm = z.infer<typeof formSchema>
export const useLogin = () => {
	const defaultValues = {
		phone: '',
		password: ''
	} as TForm
	const form = useForm<TForm>({
		mode: 'onSubmit',
		resolver: zodResolver(formSchema),
		defaultValues
	})
	const [selectedCountry, setSelectedCountry] = useState<TCountry>(countries[0])
	const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)
	const [isHashed, setIsHashed] = useState<boolean>(false)
	const onSubmit: SubmitHandler<TForm> = data => {
		data.phone = selectedCountry.dialCode + data.phone
		console.log(data)
	}

	return {
		selectedCountry,
		isDropdownOpen,
		isHashed,
		setSelectedCountry,
		setIsDropdownOpen,
		setIsHashed,
		onSubmit,
		form
	}
}
