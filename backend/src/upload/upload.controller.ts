import {
	Controller,
	FileTypeValidator,
	MaxFileSizeValidator,
	ParseFilePipe,
	Post,
	UploadedFile,
	UseInterceptors
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiBody, ApiConsumes, ApiOperation } from '@nestjs/swagger'
import { UploadService } from './upload.service'

@Controller('upload')
export class UploadController {
	constructor(private readonly uploadService: UploadService) {}

	@Post()
	@ApiOperation({ summary: 'Upload image to storage' })
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
	async uploadImage(
		@UploadedFile(
			new ParseFilePipe({
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
		return this.uploadService.uploadImage(file)
	}
}
