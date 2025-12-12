import { ApiExtraModels, ApiProperty, getSchemaPath } from '@nestjs/swagger'
import { ProductDto, UserDto } from '../dto'
import { ApiResponseDTO } from './api-responses'

export class ApiUsersWithTotalPagesResponseDTO {
	@ApiProperty({
		type: 'array',
		items: { $ref: getSchemaPath(UserDto) },
		description: 'Массив пользователей'
	})
	users: UserDto[]

	@ApiProperty({
		type: 'string',
		description: 'Длина всей страницы'
	})
	totalPages: string
}

export class ApiProductsWithTotalPagesResponseDTO {
	@ApiProperty({
		type: 'array',
		items: { $ref: getSchemaPath(ProductDto) },
		description: 'Массив продуктов'
	})
	users: ProductDto[]

	@ApiProperty({
		type: 'string',
		description: 'Длина всей страницы'
	})
	totalPages: string
}

@ApiExtraModels(UserDto)
export class ApiUsersResponseDTO extends ApiResponseDTO {
	@ApiProperty({
		type: ApiUsersWithTotalPagesResponseDTO,
		description: 'Ответ'
	})
	data: UserDto[]
}

@ApiExtraModels(UserDto)
export class ApiUserResponseDTO extends ApiResponseDTO {
	@ApiProperty({
		type: UserDto,
		description: 'Пользователь'
	})
	data: UserDto
}

export class ApiLoggedOutResponseDTO extends ApiResponseDTO {
	@ApiProperty({
		type: 'null',
		description: 'Вы вышли из системы'
	})
	data: null
}

@ApiExtraModels(ProductDto)
export class ApiProductsResponseDTO extends ApiResponseDTO {
	@ApiProperty({
		type: ApiProductsWithTotalPagesResponseDTO,
		description: 'Ответ'
	})
	data: ProductDto[]
}

@ApiExtraModels(ProductDto)
export class ApiProductResponseDTO extends ApiResponseDTO {
	@ApiProperty({
		type: ProductDto,
		description: 'Продукт'
	})
	data: ProductDto
}
