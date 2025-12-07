import { Authorization, AuthorizedUser } from '@/common/decorators'
import { ChangePasswordRequestDTO, CreateUserRequestDTO, UserDto } from '@/common/dto'
import { Body, Controller, Get, HttpCode, HttpStatus, Patch, Post, Req, Res } from '@nestjs/common'
import {
	ApiBadRequestResponse,
	ApiConflictResponse,
	ApiInternalServerErrorResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation
} from '@nestjs/swagger'
import { type Response as ExpressResponse, type Request } from 'express'
import { AuthService } from './auth.service'
import { UpdateMeRequestDTO } from './dto'
import { LoginRequestDTO } from './dto/login-request.dto'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@ApiOperation({ summary: 'Register user' })
	@ApiOkResponse({ description: 'User created successfully', type: UserDto })
	@ApiConflictResponse({ description: 'User with this phone number is already exists' })
	@Post('register')
	async register(@Req() req: Request, @Body() payload: CreateUserRequestDTO) {
		return await this.authService.register(req, payload)
	}

	@ApiOperation({ summary: 'User logged successfully' })
	@ApiOkResponse({ description: 'User logged successfully', type: UserDto })
	@ApiBadRequestResponse({ description: 'Phone number or password is incorrect' })
	@Post('login')
	@HttpCode(HttpStatus.OK)
	async login(@Req() req: Request, @Body() payload: LoginRequestDTO) {
		return await this.authService.login(req, payload)
	}

	@ApiOperation({ summary: 'User logged out successfully' })
	@ApiOkResponse({ description: 'User logged out successfully' })
	@ApiInternalServerErrorResponse({
		description: 'Failed to destroy the session. Please try again later'
	})
	@Post('logout')
	async logout(@Req() req: Request, @Res({ passthrough: true }) res: ExpressResponse) {
		return await this.authService.logout(req, res)
	}

	@ApiOperation({ summary: 'User returned successfully' })
	@ApiOkResponse({ description: 'User returned successfully', type: UserDto })
	@ApiNotFoundResponse({ description: 'User with this ID is not found' })
	@Authorization()
	@Get('me')
	async me(@AuthorizedUser('id') userId: string) {
		return await this.authService.me(userId)
	}

	@ApiOperation({ summary: 'User updated successfully' })
	@ApiOkResponse({ description: 'User updated successfully', type: UserDto })
	@ApiNotFoundResponse({ description: 'User with this ID is not found' })
	@Authorization()
	@Patch('me')
	async update(@AuthorizedUser('id') userId: string, @Body() payload: UpdateMeRequestDTO) {
		return await this.authService.update(userId, payload)
	}

	@ApiOperation({ summary: 'Password updated successfully' })
	@ApiOkResponse({ description: 'Password updated successfully', type: UserDto })
	@ApiNotFoundResponse({ description: 'User with this ID is not found' })
	@ApiBadRequestResponse({
		description: 'The old password you provided does not match our records'
	})
	@Authorization()
	@Patch('me/change-password')
	async changePassword(
		@AuthorizedUser('id') userId: string,
		@Body() payload: ChangePasswordRequestDTO
	) {
		return await this.authService.changePassword(userId, payload)
	}
}
