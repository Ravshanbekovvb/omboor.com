import { Injectable } from '@nestjs/common'
import { put } from '@vercel/blob'
import sharp from 'sharp'

@Injectable()
export class UploadService {
	async uploadImage(fileName: string, file: Express.Multer.File) {
		const webpBuffer = await sharp(file.buffer)
			.resize(512, 512, { fit: 'cover' })
			.webp({ quality: 80 })
			.toBuffer()

		const cleanName = fileName.replace(/[^a-zA-Z0-9-_]/g, '')

		return await put(`custom-avatars/${cleanName}.webp`, webpBuffer, {
			access: 'public',
			contentType: 'image/webp',
			allowOverwrite: true
		})
	}
}
