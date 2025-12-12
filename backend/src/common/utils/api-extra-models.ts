import { ApiExtraModels, ApiProperty, getSchemaPath } from '@nestjs/swagger'
import { ProductDto, UserDto } from '../dto'
import { ApiResponseDTO } from './api-responses'

@ApiExtraModels(UserDto)
export class ApiUsersResponseDTO extends ApiResponseDTO {
	@ApiProperty({
		type: 'array',
		items: { $ref: getSchemaPath(UserDto) },
		description: 'Массив пользователей'
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
		type: 'array',
		items: { $ref: getSchemaPath(ProductDto) },
		description: 'Массив продуктов'
	})
	data: ProductDto[]
}

@ApiExtraModels(ProductDto)
export class ApiProductResponseDTO extends ApiResponseDTO {
	@ApiProperty({
		type: 'array',
		items: { $ref: getSchemaPath(ProductDto) },
		description: 'Продукт'
	})
	data: ProductDto
}
