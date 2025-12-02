import { Authorization, AuthorizedUser } from '@/common/decorators'
import { CreateUserRequestDTO, UserDto } from '@/common/dto'
import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common'
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger'
import { type Request, type Response } from 'express'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@ApiOperation({ summary: 'Register user' })
	@ApiOkResponse({ description: 'User created successfully', type: UserDto })
	@Post('register')
	async register(@Req() req: Request, @Body() payload: CreateUserRequestDTO) {
		return await this.authService.register(req, payload)
	}

	@ApiOperation({ summary: 'User logged successfully' })
	@ApiOkResponse({ description: 'User logged successfully', type: UserDto })
	@Post('login')
	async login(
		@Req() req: Request,
		@Body() payload: Pick<CreateUserRequestDTO, 'email' | 'password'>
	) {
		return await this.authService.login(req, payload)
	}

	@ApiOperation({ summary: 'User logged out successfully' })
	@ApiOkResponse({ description: 'User logged out successfully' })
	@Post('logout')
	async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
		return await this.authService.logout(req, res)
	}

	@ApiOperation({ summary: 'User returned successfully' })
	@ApiOkResponse({ description: 'User returned successfully', type: UserDto })
	@Authorization()
	@Get('me')
	async me(@AuthorizedUser('id') id: string) {
		return await this.authService.me(id)
	}
}
