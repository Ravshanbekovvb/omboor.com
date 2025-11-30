import { zodResolver } from '@hookform/resolvers/zod'
import { unformat } from '@react-input/mask'
import { redirect } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

import { countries } from '@/shared/constants'
import { TCountry } from '@/shared/types'

const formSchema = z.object({
	phone: z.string().min(5, 'Telefon raqam kiritilishi shart'),
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
		data.phone =
			selectedCountry.dialCode +
			unformat(data.phone, { mask: selectedCountry.phoneMask, replacement: { _: /\d/ } })
		if (
			data.phone.length < 10 ||
			!data.password ||
			selectedCountry.dialCode.length === 0 ||
			selectedCountry.phoneMask.length === 0 ||
			data.phone.length === 0
		) {
			toast.error("Iltimos, barcha maydonlarni to'ldiring va to'g'ri ma'lumot kiriting.")
			return
		}
		const index = toast.loading('Kirish amalga oshirilmoqda...')
		setTimeout(() => {
			if (data.password === 'adminadm' && data.phone === '+998944183810') {
				toast.success('Muvaffaqiyatli kirildi!', { id: index })
				redirect('/dashboard')
			} else {
				toast.error("Noto'g'ri telefon raqami yoki parol.", { id: index })
			}
		}, 2000)
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
