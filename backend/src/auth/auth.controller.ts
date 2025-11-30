import { CreateUserRequestDTO } from '@/common/dto'
import { Body, Controller, Post, Req, Res } from '@nestjs/common'
import { type Request, type Response } from 'express'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('register')
	async register(@Req() req: Request, @Body() payload: CreateUserRequestDTO) {
		return await this.authService.register(req, payload)
	}

	@Post('login')
	async login(
		@Req() req: Request,
		@Body() payload: Pick<CreateUserRequestDTO, 'email' | 'password'>
	) {
		return await this.authService.login(req, payload)
	}

	@Post('logout')
	async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
		return await this.authService.logout(req, res)
	}
}
