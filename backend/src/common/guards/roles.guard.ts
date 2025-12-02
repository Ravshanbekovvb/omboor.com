import { UserRole } from '@/generated/enums'
import {
	CanActivate,
	ExecutionContext,
	ForbiddenException,
	Injectable,
	UnauthorizedException
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Request } from 'express'
import { ROLES_KEY } from '../decorators/roles.decorator'

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private readonly reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean {
		const roles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
			context.getHandler(),
			context.getClass()
		])

		const request = context.switchToHttp().getRequest() as Request

		if (!roles) return true

		if (!request.user) throw new UnauthorizedException('User is not authenticated')

		if (!roles.includes(request.user.role))
			throw new ForbiddenException('You do not have permission to access this resource')

		return true
	}
}
