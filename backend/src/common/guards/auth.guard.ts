import { UserService } from '@/user/user.service'
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { Request } from 'express'

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private readonly userService: UserService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest() as Request

		const userId = request.session.userId

		if (!userId) throw new UnauthorizedException('User is not authenticated')

		const user = await this.userService.findById(userId)

		request.user = user

		return true
	}
}
