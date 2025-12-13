import { Authorization, AuthorizedUser } from '@/common/decorators'
import { ChangePasswordRequestDTO, CreateUserRequestDTO } from '@/common/dto'
import { apiSuccessResponse, ApiUserResponseDTO } from '@/common/utils'
import { ApiLoggedOutResponseDTO } from '@/common/utils/api-extra-models'
import {
	Body,
	Controller,
	FileTypeValidator,
	Get,
	HttpCode,
	HttpStatus,
	MaxFileSizeValidator,
	ParseFilePipe,
	Patch,
	Post,
	Query,
	Req,
	Res,
	UploadedFile,
	UseInterceptors
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import {
	ApiBadRequestResponse,
	ApiBody,
	ApiConflictResponse,
	ApiConsumes,
	ApiInternalServerErrorResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiQuery
} from '@nestjs/swagger'
import { type Response as ExpressResponse, type Request } from 'express'
import { AuthService } from './auth.service'
import { UpdateMeRequestDTO } from './dto'
import { LoginRequestDTO } from './dto/login-request.dto'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@ApiOperation({ summary: 'Register user' })
	@ApiOkResponse({ description: 'User created successfully', type: ApiUserResponseDTO })
	@ApiConflictResponse({ description: 'User with this phone number is already exists' })
	@ApiConsumes('multipart/form-data')
	@ApiQuery({
		name: 'fileName',
		required: false,
		description: 'Uploaded file name'
	})
	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				file: {
					type: 'string',
					format: 'binary'
				}
			}
		}
	})
	@UseInterceptors(FileInterceptor('file'))
	@Post('register')
	async register(
		@Req() req: Request,
		@Body() payload: CreateUserRequestDTO,
		@Query('fileName') fileName: string,
		@UploadedFile(
			new ParseFilePipe({
				fileIsRequired: false,
				validators: [
					new MaxFileSizeValidator({
						maxSize: 4 * 1024 * 1024 // 4 MB
					}),
					new FileTypeValidator({
						fileType: /^(image\/jpeg|image\/png|image\/webp)$/
					})
				]
			})
		)
		file: Express.Multer.File
	) {
		const user = await this.authService.register(req, payload, fileName, file)

		return apiSuccessResponse(user, 'User registered successfully')
	}

	@ApiOperation({ summary: 'User logged successfully' })
	@ApiOkResponse({ description: 'User logged successfully', type: ApiUserResponseDTO })
	@ApiBadRequestResponse({ description: 'Phone number or password is incorrect' })
	@Post('login')
	@HttpCode(HttpStatus.OK)
	async login(@Req() req: Request, @Body() payload: LoginRequestDTO) {
		const user = await this.authService.login(req, payload)

		return apiSuccessResponse(user, 'User logged successfully')
	}

	@ApiOperation({ summary: 'User logged out successfully' })
	@ApiOkResponse({ description: 'User logged out successfully', type: ApiLoggedOutResponseDTO })
	@ApiInternalServerErrorResponse({
		description: 'Failed to destroy the session. Please try again later'
	})
	@Post('logout')
	@HttpCode(HttpStatus.OK)
	async logout(@Req() req: Request, @Res({ passthrough: true }) res: ExpressResponse) {
		const message = await this.authService.logout(req, res)

		return apiSuccessResponse(null, message)
	}

	@ApiOperation({ summary: 'User returned successfully' })
	@ApiOkResponse({ description: 'User returned successfully', type: ApiUserResponseDTO })
	@ApiNotFoundResponse({ description: 'User with this ID is not found' })
	@Authorization()
	@Get('me')
	async me(@AuthorizedUser('id') userId: string) {
		const user = await this.authService.me(userId)

		return apiSuccessResponse(user, 'User returned successfully')
	}

	@ApiOperation({ summary: 'User updated successfully' })
	@ApiOkResponse({ description: 'User updated successfully', type: ApiUserResponseDTO })
	@ApiNotFoundResponse({ description: 'User with this ID is not found' })
	@Authorization()
	@Patch('me')
	async update(@AuthorizedUser('id') userId: string, @Body() payload: UpdateMeRequestDTO) {
		const user = await this.authService.update(userId, payload)

		return apiSuccessResponse(user, 'User updated successfully')
	}

	@ApiOperation({ summary: 'Password updated successfully' })
	@ApiOkResponse({ description: 'Password updated successfully', type: ApiUserResponseDTO })
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
		const user = await this.authService.changePassword(userId, payload)

		return apiSuccessResponse(user, 'Password changed successfully')
	}
}
