import Image from 'next/image'

import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'

interface TitleProps {
	className: string
	title: string
}
export const Title: React.FC<TitleProps> = ({ className, title }) => {
	return <label className={`${className}`}>Title</label>
}

export default function Home() {
	return (
		<div className='flex min-h-screen items-center justify-center'>
			<form>
				<div className='rounded-[60px] bg-white p-20'>
					<div className='min-w-[380px] space-y-10'>
						<div className='flex items-center'>
							<Image src={'/main-logo.jpg'} width={60} height={20} alt='main logo' />
							<div className='text-4xl'>Omboor.com</div>
						</div>
						<h3 className='text-4xl font-bold'>Вход в аккаунт</h3>
						<div className='flex flex-col items-start gap-3'>
							<label className='text-lg font-semibold'>Введите номер телефона</label>
							<Input
								type='tel'
								placeholder={`xx xxx xx xx`}
								className='w-full'
								required
							/>
						</div>
						<div className='space-y-3'>
							<div className='flex items-center justify-between text-lg'>
								<label>Пароль</label>
								<label className='cursor-pointer text-blue-500 hover:underline'>
									Забыли пароль?
								</label>
							</div>
							<Input
								type='text'
								placeholder='введите ваш пароль'
								required
								className='w-full'
							/>
						</div>
						<Button className='w-full' type={'button'}>
							Вход в аккаунт
						</Button>
						<p className='w-full text-center'>
							Еще нет аккаунта?{' '}
							<a href='#' className='cursor-pointer text-blue-500 hover:underline'>
								Создать аккаунт
							</a>
						</p>
					</div>
				</div>
			</form>
		</div>
	)
}
