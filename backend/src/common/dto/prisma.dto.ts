import { Plan, Unit, UserRole } from '@/generated/enums'
import { ApiProperty } from '@nestjs/swagger'

export class UserDto {
	@ApiProperty({
		example: 'c1a2b3d4-e5f6-7890-abcd-1234567890ef',
		description: 'Уникальный идентификатор пользователя'
	})
	id: string

	@ApiProperty({
		example: 'Bekzod',
		description: 'Имя пользователя'
	})
	name: string

	@ApiProperty({
		example: 'Ravshanbekov',
		description: 'Фамилия пользователя'
	})
	lastName: string

	@ApiProperty({
		required: false,
		nullable: true,
		example: 'https://example.com/avatar.png',
		description: 'Ссылка на аватар пользователя'
	})
	avatarUrl?: string | null

	@ApiProperty({
		example: '+998901234567',
		description: 'Номер телефона пользователя'
	})
	phoneNumber: string

	@ApiProperty({
		enum: UserRole,
		example: UserRole.ADMIN,
		description: 'Роль пользователя в системе'
	})
	role: UserRole

	@ApiProperty({
		enum: Plan,
		example: Plan.START,
		description: 'Тарифный план пользователя'
	})
	plan: Plan

	@ApiProperty({
		example: '2024-12-01T12:30:00.000Z',
		description: 'Дата создания пользователя'
	})
	createdAt: Date
}

export class StoreDto {
	@ApiProperty({
		example: 'a2d4-f6c1-90ab-ef12-34567890abcd',
		description: 'Уникальный идентификатор магазина'
	})
	id: string

	@ApiProperty({
		example: 'Supermarket #1',
		description: 'Название магазина'
	})
	name: string

	@ApiProperty({
		example: 'c1a2b3d4-e5f6-7890-abcd-1234567890ef',
		description: 'Идентификатор владельца магазина'
	})
	userId: string
}

export class ProductDto {
	@ApiProperty({
		example: 'p1234567890abcdef',
		description: 'Уникальный идентификатор товара'
	})
	id: string

	@ApiProperty({
		example: 'Coca-Cola 1L',
		description: 'Название товара'
	})
	name: string

	@ApiProperty({
		required: false,
		nullable: true,
		example: 'Classic coke drink',
		description: 'Описание товара'
	})
	description?: string | null

	@ApiProperty({
		required: false,
		nullable: true,
		example: 'https://example.com/product.png',
		description: 'Изображение товара'
	})
	imgUrl?: string | null

	@ApiProperty({
		required: false,
		nullable: true,
		example: '4789654123567',
		description: 'Штрих-код товара'
	})
	barcode?: string | null

	@ApiProperty({
		required: false,
		nullable: true,
		example: 'CC-001L',
		description: 'Артикул товара'
	})
	article?: string | null

	@ApiProperty({
		required: false,
		nullable: true,
		example: 'Coca-Cola',
		description: 'Бренд товара'
	})
	brand?: string | null

	@ApiProperty({
		required: false,
		nullable: true,
		example: 'Drinks',
		description: 'Категория товара'
	})
	category?: string | null

	@ApiProperty({
		required: false,
		nullable: true,
		example: 'Bottle',
		description: 'Тип упаковки'
	})
	container?: string | null

	@ApiProperty({
		required: false,
		nullable: true,
		example: 1,
		description: 'Номер или количество единиц упаковки'
	})
	containerNumber?: number | null

	@ApiProperty({
		required: false,
		nullable: true,
		example: 'Zero Sugar',
		description: 'Дополнительные опции или свойства товара'
	})
	options?: string | null

	@ApiProperty({
		example: 24,
		description: 'Количество доступного товара'
	})
	quantity: number

	@ApiProperty({
		enum: Unit,
		example: Unit.PCS,
		description: 'Единица измерения товара'
	})
	unit: Unit

	@ApiProperty({
		example: 12000,
		description: 'Цена товара'
	})
	price: number

	@ApiProperty({
		required: false,
		nullable: true,
		example: 10,
		description: 'Размер скидки в процентах'
	})
	discount?: number | null

	@ApiProperty({
		example: '2024-12-01T12:30:00.000Z',
		description: 'Дата создания товара'
	})
	createdAt: Date
}
