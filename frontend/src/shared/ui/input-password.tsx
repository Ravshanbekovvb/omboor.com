'use client'
import { Eye, EyeClosed } from 'lucide-react'
import { useState } from 'react'

import { Input } from './input'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

const FormPasswordInput: React.FC<Props> = ({ ...props }) => {
	const [visible, setVisible] = useState(false)

	return (
		<div className='relative'>
			<Input {...props} type={visible ? 'text' : 'password'} className='pr-10' />
			<button
				type='button'
				onClick={() => setVisible(!visible)}
				className='absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer pr-2 transition-colors'
			>
				{visible ? (
					<Eye className='stroke-2.5 sm:size-6' />
				) : (
					<EyeClosed className='stroke-2.5 sm:size-6' />
				)}
			</button>
		</div>
	)
}

export { FormPasswordInput }
