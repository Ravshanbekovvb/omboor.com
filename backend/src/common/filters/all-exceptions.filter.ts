import { type ArgumentsHost, Catch, type ExceptionFilter, HttpException } from '@nestjs/common'
import { type Response } from 'express'
import { apiErrorResponse } from '../utils'

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
	catch(exception: unknown, host: ArgumentsHost) {
		const ctx = host.switchToHttp()
		const response = ctx.getResponse<Response & { message: string }>()
		// const request = ctx.getRequest<Request>()

		const payload = apiErrorResponse(exception, response.message)

		const status = exception instanceof HttpException ? exception.getStatus() : 500

		return response.status(status).json(payload)
	}
}
