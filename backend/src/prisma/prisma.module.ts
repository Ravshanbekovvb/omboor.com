import { Module } from '@nestjs/common'
import { PrismaClient } from 'generated/prisma/client'
import { adapter } from 'prisma/prisma-adapter'

@Module({
	providers: [
		{
			provide: PrismaClient,
			useFactory: () => {
				return new PrismaClient({
					adapter
				})
			}
		}
	],
	exports: [PrismaClient]
})
export class PrismaModule {}
