import { hashSync } from 'bcrypt'
import { PrismaClient } from 'generated/prisma/client'
import { adapter } from './prisma-adapter'

export const prisma = new PrismaClient({ adapter })

export async function up() {
	await prisma.product.createMany({
		data: [
			{
				id: '1',
				name: 'Ковер аниме Сакура',
				price: 150.0,
				unit: 'PCS',
				article: 'WFT-12480',
				brand: 'SOFII',
				quantity: 42,
				description:
					'Мягкий ковер с дизайном Сакуры. Подходит для спальни, гостиной или игровой зоны. Яркий рисунок и плотный материал обеспечивают уют и долговечность.',
				options: JSON.stringify({ size: '3x5', color: 'pink' })
			},
			{
				id: '2',
				name: 'Ковер аниме Наруто',
				price: 180.0,
				unit: 'PCS',
				article: 'WFT-12481',
				brand: 'SOFII',
				quantity: 35,
				description:
					'Ковер с ярким рисунком Наруто. Идеален для детской или игровой зоны. Комфортный и износостойкий материал.',
				options: JSON.stringify({ size: '4x6', color: 'orange' })
			},
			{
				id: '3',
				name: 'Ковер аниме Луна',
				price: 200.0,
				unit: 'PCS',
				article: 'WFT-12482',
				brand: 'SOFII',
				quantity: 30,
				description:
					'Стильный ковер с аниме-персонажем Луна. Добавляет уюта и атмосферы в комнату, долговечен и приятен на ощупь.',
				options: JSON.stringify({ size: '5x7', color: 'blue' })
			},
			{
				id: '4',
				name: 'Ковер аниме Тоторо',
				price: 220.0,
				unit: 'PCS',
				article: 'WFT-12483',
				brand: 'SOFII',
				quantity: 25,
				description:
					'Ковер с изображением Тоторо. Идеальный выбор для детской комнаты или игровой зоны. Плотный материал и насыщенные цвета.',
				options: JSON.stringify({ size: '6x8', color: 'gray' })
			},
			{
				id: '5',
				name: 'Ковер аниме Миядзаки',
				price: 250.0,
				unit: 'PCS',
				article: 'WFT-12484',
				brand: 'SOFII',
				quantity: 20,
				description:
					'Большой ковер с аниме-дизайном в стиле Миядзаки. Добавляет атмосферу японской анимации и уюта, качественный и долговечный материал.',
				options: JSON.stringify({ size: '7x10', color: 'purple' })
			}
		]
	})

	await prisma.user.create({
		data: {
			id: '1',
			name: 'Bekzod',
			lastName: 'Ravshanbekov',
			password: hashSync('Bekzod2001', 10),
			phoneNumber: '+998977883355',
			avatarUrl:
				'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png',
			role: 'ADMIN',
			stores: {
				create: {
					id: '1',
					name: 'UZUM',
					products: {
						connect: [{ id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }, { id: '5' }]
					}
				}
			}
		}
	})

	await prisma.user.create({
		data: {
			id: '2',
			name: 'Behruz',
			lastName: 'Ravshanbekov',
			password: hashSync('Behruz2005', 10),
			phoneNumber: '+998944183810',
			role: 'REGULAR'
		}
	})
}

export async function down() {
	await prisma.$executeRaw`TRUNCATE TABLE "users" RESTART IDENTITY CASCADE;`
	await prisma.$executeRaw`TRUNCATE TABLE "stores" RESTART IDENTITY CASCADE;`
	await prisma.$executeRaw`TRUNCATE TABLE "products" RESTART IDENTITY CASCADE;`
}

export async function main() {
	try {
		await down()
		await up()

		console.log('First step with: SUCCESS🍃')
	} catch (error) {
		console.log('First step with: FAIL' + error)
	}
}

main()
	.then(() => {
		console.log('Finish with: SUCCESS🍃')
	})
	.catch(err => {
		console.log('Finish with: FAIL' + err)
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})
