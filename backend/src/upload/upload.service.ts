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
		// const ext = file.mimetype === 'image/jpeg' ? 'jpg' : 'webp'

		//uooisba7ivmrzosb.public.blob.vercel-storage.com/default-avatars/default-avatar-1.webp?download=1
		//uooisba7ivmrzosb.public.blob.vercel-storage.com/default-avatars/default-avatar-2.webp

		return await put(`custom-avatars/${cleanName}.webp`, webpBuffer, {
			access: 'public',
			contentType: file.mimetype,
			allowOverwrite: true
		})
	}
}
