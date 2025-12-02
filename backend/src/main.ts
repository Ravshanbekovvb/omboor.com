import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

import cookieParser from 'cookie-parser'
import session from 'express-session'
import ms from 'ms'
import { parseBoolean } from './common/utils'

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { RedisStore } from 'connect-redis'
import { createClient } from 'redis'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	const configService = app.get(ConfigService)

	const redis = createClient({
		url: configService.getOrThrow<string>('REDIS_URI')
	})

	await redis.connect()

	app.setGlobalPrefix('api')

	app.use(cookieParser(configService.getOrThrow<string>('COOKIE_SECRET')))

	app.use(
		session({
			secret: configService.getOrThrow<string>('SESSION_SECRET'),
			name: configService.getOrThrow<string>('SESSION_NAME'),
			saveUninitialized: false,
			resave: false,
			cookie: {
				domain: configService.getOrThrow<string>('SESSION_DOMAIN'),
				maxAge: ms(configService.getOrThrow<ms.StringValue>('SESSION_MAX_AGE')),
				httpOnly: parseBoolean(configService.getOrThrow<string>('SESSION_HTTP_ONLY')),
				secure: parseBoolean(configService.getOrThrow<string>('SESSION_SECURE')),
				sameSite: 'lax'
			},
			store: new RedisStore({
				client: redis,
				prefix: configService.getOrThrow<string>('SESSION_FOLDER')
			})
		})
	)

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
			transform: true
		})
	)

	app.enableCors({
		origin: configService.getOrThrow<string[]>('ALLOWED_ORIGIN'),
		credentials: true,
		exposedHeaders: ['set-cookie']
	})

	const config = new DocumentBuilder()
		.setTitle('api.omboor.com')
		.setDescription('Api documentation for omboor.com')
		.setVersion('1.0.0')
		.build()

	const document = SwaggerModule.createDocument(app, config)

	SwaggerModule.setup('/docs', app, document)

	await app.listen(configService.getOrThrow<number>('APP_PORT'))
}
bootstrap()
