import { UserService } from '@/user/user.service'
import { CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common'
import { Request } from 'express'

export class AuthGuard implements CanActivate {
	constructor(private readonly userService: UserService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest() as Request

		if (!request.session.userId) throw new UnauthorizedException('User is not authenticated')

		const user = await this.userService.findById(request.session.userId)

		request.user = user

		return true
	}
}
