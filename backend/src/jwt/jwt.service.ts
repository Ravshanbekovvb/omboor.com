import { TJwtPayload } from '@/common/types'
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Request } from 'express'

import JWT from 'jsonwebtoken'

@Injectable()
export class JwtService {
	constructor(private readonly config: ConfigService) {}

	private getSecretKey(): string {
		return this.config.getOrThrow<string>('JWT_SECRET')
	}

	sign(payload: TJwtPayload, type: 'ACCESS_TOKEN' | 'REFRESH_TOKEN'): string {
		const expiresIn = type === 'ACCESS_TOKEN' ? '1h' : '30d'

		return JWT.sign(payload, this.getSecretKey(), { expiresIn })
	}

	verify(token: string): boolean {
		try {
			JWT.verify(token, this.getSecretKey())

			return true
		} catch (error) {
			if (error.name === 'TokenExpiredError') {
				return false
			}

			throw new BadRequestException('Please send a valid token')
		}
	}

	decode(token: string): TJwtPayload {
		return JWT.decode(token) as TJwtPayload
	}

	getTokenFromRequest(request: Request): string {
		const token = request.cookies['x-access-token'] as string

		if (!token) throw new UnauthorizedException('Please authorize')

		return token
	}
}
