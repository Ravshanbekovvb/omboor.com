import { HttpException, InternalServerErrorException } from '@nestjs/common'

export const apiError = (error: unknown) => {
	if (error instanceof HttpException) return error

	return new InternalServerErrorException('Something went wrong')
}
