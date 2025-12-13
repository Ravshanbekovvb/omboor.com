import { type ArgumentsHost, Catch, type ExceptionFilter, HttpException } from '@nestjs/common'
import { type Response } from 'express'
import { apiErrorResponse } from '../utils'

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
	catch(exception: any, host: ArgumentsHost) {
		const ctx = host.switchToHttp()
		const response = ctx.getResponse<Response>()

		const message = Array.isArray(exception.response.message)
			? exception.response.message.join(', ')
			: exception.response.message

		const payload = apiErrorResponse(exception, message)

		const status = exception instanceof HttpException ? exception.getStatus() : 500

		return response.status(status).json(payload)
	}
}
