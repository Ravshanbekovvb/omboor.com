import { Injectable } from '@nestjs/common'
import { put } from '@vercel/blob'
import sharp from 'sharp'

@Injectable()
export class UploadService {
	async uploadImage(file: Express.Multer.File) {
		const webpBuffer = await sharp(file.buffer)
			.resize(512, 512, { fit: 'cover' })
			.webp({ quality: 80 })
			.toBuffer()

		const cleanName = crypto.randomUUID()

		return await put(`custom-avatars/${cleanName}.webp`, webpBuffer, {
			access: 'public',
			contentType: 'image/webp',
			allowOverwrite: true
		})
	}
}
