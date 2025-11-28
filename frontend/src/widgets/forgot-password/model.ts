import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as z from 'zod'

import { countries } from '@/shared/constants'
import { TCountry } from '@/shared/types'

const formSchema = z.object({
	phone: z.string().min(1, 'Telefon raqam kiritilishi shart')
})
type TForm = z.infer<typeof formSchema>
export const useForgotPassword = () => {
	const defaultValues = {
		phone: ''
	} as TForm
	const form = useForm<TForm>({
		mode: 'onSubmit',
		resolver: zodResolver(formSchema),
		defaultValues
	})
	const [selectedCountry, setSelectedCountry] = useState<TCountry>(countries[0])
	const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)
	const onSubmit: SubmitHandler<TForm> = data => {
		data.phone = selectedCountry.dialCode + data.phone
		console.log(data)
	}

	return {
		selectedCountry,
		isDropdownOpen,
		setSelectedCountry,
		setIsDropdownOpen,
		onSubmit,
		form
	}
}
