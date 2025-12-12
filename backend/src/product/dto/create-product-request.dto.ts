import { Unit } from '@/generated/enums'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsEnum, IsInt, IsNumber, IsOptional, IsString, IsUrl, MinLength } from 'class-validator'

export class CreateProductRequestDTO {
	@ApiProperty({ example: 'Ковер аниме Наруто', description: 'Название продукта' })
	@IsString({ message: 'Name must be a string' })
	@MinLength(3, { message: 'Name must be at least 3 characters long' })
	name: string

	@ApiPropertyOptional({
		example:
			'Ковер с ярким рисунком Наруто. Идеален для детской или игровой зоны. Комфортный и износостойкий материал',
		description: 'Описание продукта'
	})
	@IsString({ message: 'Description must be a string' })
	@MinLength(3, { message: 'Description must be at least 3 characters long' })
	@IsOptional()
	description?: string

	@ApiPropertyOptional({
		example: 'https://img.joomcdn.net/237411c7f1cd0cff91a40c0b6913436f846850a2_original.jpeg',
		description: 'Картинка ковра'
	})
	@IsUrl({}, { message: 'ImgUrl must be a valid URL' })
	@IsOptional()
	imgUrl?: string

	@ApiPropertyOptional({
		example: '1234567890123',
		description: 'Штрих-код продукта'
	})
	@IsString({ message: 'Barcode must be a string' })
	@IsOptional()
	barcode?: string

	@ApiProperty({
		example: 'ART-00998',
		description: 'Артикул продукта'
	})
	@IsString({ message: 'Article must be a string' })
	article: string

	@ApiPropertyOptional({
		example: 'IKEA',
		description: 'Бренд продукта'
	})
	@IsString({ message: 'Brand must be a string' })
	@IsOptional()
	brand?: string

	@ApiPropertyOptional({
		example: 'Ковры',
		description: 'Категория продукта'
	})
	@IsString({ message: 'Category must be a string' })
	@IsOptional()
	category?: string

	@ApiPropertyOptional({
		example: 'Box',
		description: 'Тип контейнера'
	})
	@IsString({ message: 'Container must be a string' })
	@IsOptional()
	container?: string

	@ApiPropertyOptional({
		example: 12,
		description: 'Номер контейнера'
	})
	@IsInt({ message: 'Container number must be an integer' })
	@IsOptional()
	containerNumber?: number

	@ApiPropertyOptional({
		example: '{"size":"large","color":"black"}',
		description: 'Опции продукта (JSON строка)'
	})
	@IsString({ message: 'Options must be a string' })
	@IsOptional()
	options?: string

	@ApiPropertyOptional({
		example: 0,
		description: 'Количество товара (необязательно, по умолчанию 0)'
	})
	@IsInt({ message: 'Quantity must be an integer' })
	@IsOptional()
	quantity?: number

	@ApiProperty({
		example: Unit.PCS,
		enum: Unit,
		description: 'Единица измерения'
	})
	@IsEnum(Unit, { message: 'Unit must be a valid enum value' })
	unit: Unit

	@ApiProperty({
		example: 150.5,
		description: 'Цена продукта'
	})
	@IsNumber({}, { message: 'Price must be a number' })
	price: number

	@ApiPropertyOptional({
		example: 120,
		description: 'Цена со скидкой'
	})
	@IsInt({ message: 'Discount price must be an integer' })
	@IsOptional()
	discountPrice?: number
}
