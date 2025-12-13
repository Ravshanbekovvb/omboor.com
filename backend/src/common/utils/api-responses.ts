import { HttpException } from '@nestjs/common'
import { ApiProperty } from '@nestjs/swagger'
import { TApiResponse } from '../types'

export function apiSuccessResponse<T extends unknown>(data: T, message: string): TApiResponse<T> {
	return {
		success: true,
		message,
		data
	}
}

export function apiErrorResponse(error: unknown, errorMessage?: string): TApiResponse<null> {
	if (error instanceof HttpException) {
		return { success: false, message: errorMessage || error.message, data: null }
	}

	return { success: false, message: 'Internal server error', data: null }
}

export class ApiResponseDTO {
	@ApiProperty({ example: true, description: 'Ответ успешный или нет' })
	success: boolean

	@ApiProperty({ description: 'Сообщение ответа' })
	message: string
}

export class ApiErrorResponseDTO {
	@ApiProperty({ example: false, description: 'Ответ успешный или нет' })
	success: boolean

	@ApiProperty({ description: 'Сообщение ответа' })
	message: string

	@ApiProperty({ description: 'Тело ответа', type: 'null' })
	data: null
}
