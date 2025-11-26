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
				<div className='space-y-10 rounded-[60px] bg-gray-200 p-20'>
					<h3 className='text-4xl font-bold'>Вход в аккаунт</h3>
					<div className='flex flex-col items-start gap-3'>
						<label className='text-lg font-semibold'>Введите номер телефона</label>
						<Input type='tel' placeholder={`xx xxx xx xx`} className='w-[380px]' />
					</div>
					<div className='space-y-3'>
						<div className='flex items-center justify-between text-lg'>
							<label>Пароль</label>
							<label className='cursor-pointer text-blue-500 hover:underline'>
								Забыли пароль?
							</label>
						</div>
						<Input type='text' placeholder='введите ваш пароль' />
					</div>
					<Button className='w-full'>Вход в аккаунт</Button>
					<p className='w-full text-center'>
						Еще нет аккаунта?{' '}
						<a href='#' className='cursor-pointer text-blue-500 hover:underline'>
							Создать аккаунт
						</a>
					</p>
				</div>
			</form>
		</div>
	)
}
