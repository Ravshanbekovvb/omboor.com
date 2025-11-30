import { User } from '@/generated/client'
import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common'
import { Request } from 'express'

export const AuthorizedUser = () =>
	createParamDecorator((data: keyof User, ctx: ExecutionContext) => {
		const request = ctx.switchToHttp().getRequest() as Request

		const user = request.user

		if (!user) throw new UnauthorizedException('User is not authenticated')

		return data ? user[data] : user
	})
