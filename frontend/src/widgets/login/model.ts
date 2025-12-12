import { zodResolver } from '@hookform/resolvers/zod'
import { unformat } from '@react-input/mask'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

import { countries } from '@/shared/constants'
import { useAuth } from '@/shared/hooks/useAuth'
import { TCountry } from '@/shared/types'

const formSchema = z.object({
	phoneNumber: z.string().min(5, 'Telefon raqam kiritilishi shart'),
	password: z
		.string()
		.min(6, 'Password must be at least 6 characters')
		.regex(/[A-Z]/, 'Parolda kamida 1 ta katta harf bo‘lishi kerak')
		.regex(/\d/, 'Parolda kamida 1 ta son bo‘lishi kerak')
})
type TForm = z.infer<typeof formSchema>
export const useLogin = () => {
	const defaultValues = {
		phoneNumber: '',
		password: ''
	} as TForm
	const form = useForm<TForm>({
		mode: 'onSubmit',
		resolver: zodResolver(formSchema),
		defaultValues
	})
	const { login, logining } = useAuth()
	const [selectedCountry, setSelectedCountry] = useState<TCountry>(countries[0])
	const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)
	const [isHashed, setIsHashed] = useState<boolean>(false)
	const onSubmit: SubmitHandler<TForm> = data => {
		data.phoneNumber =
			selectedCountry.dialCode +
			unformat(data.phoneNumber, {
				mask: selectedCountry.phoneMask,
				replacement: { x: /\d/ }
			})

		if (
			data.phoneNumber.length < 7 ||
			!data.password ||
			selectedCountry.dialCode.length === 0 ||
			selectedCountry.phoneMask.length === 0 ||
			data.phoneNumber.length === 0
		) {
			toast.error("Iltimos, barcha maydonlarni to'ldiring va to'g'ri ma'lumot kiriting.")
			return
		}

		try {
			login(data)
		} catch (err) {
			console.log(err)
		}
	}

	return {
		selectedCountry,
		isDropdownOpen,
		isHashed,
		setSelectedCountry,
		setIsDropdownOpen,
		setIsHashed,
		onSubmit,
		form,
		logining
	}
}
