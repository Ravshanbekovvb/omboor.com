import { LIMIT_OF_USERS } from '@/common/constants'
import { Authorization } from '@/common/decorators'
import { CreateUserRequestDTO } from '@/common/dto'
import {
	ApiErrorResponseDTO,
	apiSuccessResponse,
	ApiUserResponseDTO,
	ApiUsersResponseDTO
} from '@/common/utils'
import { UserRole } from '@/generated/client'
import {
	Body,
	Controller,
	Delete,
	FileTypeValidator,
	Get,
	MaxFileSizeValidator,
	Param,
	ParseFilePipe,
	Patch,
	Post,
	Query,
	UploadedFile,
	UseInterceptors
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import {
	ApiBadRequestResponse,
	ApiBody,
	ApiConflictResponse,
	ApiConsumes,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiQuery
} from '@nestjs/swagger'
import { UpdateUserRequestDTO } from './dto/'
import { UserService } from './user.service'

@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@ApiOperation({ summary: 'Get all users' })
	@ApiOkResponse({
		description: 'Users returned successfully',
		type: ApiUsersResponseDTO
	})
	@ApiBadRequestResponse({
		description: 'Query params page or limit must be a number',
		type: ApiErrorResponseDTO
	})
	@Authorization(UserRole.ADMIN)
	@ApiQuery({ name: 'page', required: false, description: 'Page number, default 1' })
	@ApiQuery({
		name: 'limit',
		required: false,
		description: 'Items per page, default 10'
	})
	@Get()
	async findAll(@Query('page') usersPage?: string, @Query('limit') usersLimit?: string) {
		const limit = usersLimit || LIMIT_OF_USERS
		const page = usersPage || '1'

		const res = await this.userService.findAll(page, limit)

		return apiSuccessResponse(res, 'Users returned successfully')
	}

	@ApiOperation({ summary: 'Get user by id' })
	@ApiOkResponse({ description: 'User returned successfully', type: ApiUserResponseDTO })
	@ApiNotFoundResponse({ description: 'User not found' })
	@Authorization(UserRole.ADMIN)
	@Get(':id')
	async findById(@Param('id') userId: string) {
		const user = await this.userService.findById(userId)

		return apiSuccessResponse(user, 'User returned successfully')
	}

	@ApiOperation({ summary: 'Create user' })
	@ApiOkResponse({ description: 'User created successfully', type: ApiUserResponseDTO })
	@ApiConflictResponse({
		description: 'User with this phone number is already exists'
	})
	@ApiConsumes('multipart/form-data')
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
	@Authorization(UserRole.ADMIN)
	@Post()
	async create(
		@Body() payload: CreateUserRequestDTO,
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
		const user = await this.userService.create(payload, file)

		return apiSuccessResponse(user, 'User created successfully')
	}

	@ApiOperation({ summary: 'Update user' })
	@ApiOkResponse({ description: 'User updated successfully', type: ApiUserResponseDTO })
	@ApiNotFoundResponse({ description: 'User not found' })
	@Authorization(UserRole.ADMIN)
	@Patch(':id')
	async update(@Param('id') userId: string, @Body() payload: UpdateUserRequestDTO) {
		const user = await this.userService.update(userId, payload)

		return apiSuccessResponse(user, 'User updated successfully')
	}

	@ApiOperation({ summary: 'Delete user' })
	@ApiOkResponse({ description: 'User deleted successfully', type: ApiUserResponseDTO })
	@ApiNotFoundResponse({ description: 'User not found' })
	@Authorization(UserRole.ADMIN)
	@Delete(':id')
	async delete(@Param('id') id: string) {
		const user = await this.userService.delete(id)

		return apiSuccessResponse(user, 'User deleted successfully')
	}
}
