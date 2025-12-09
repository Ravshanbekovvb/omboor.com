import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '../../generated/prisma/client'

import { adapter } from '../../prisma/prisma-adapter'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleDestroy, OnModuleInit {
	constructor() {
		super({ adapter })
	}

	async onModuleDestroy() {
		await this.$disconnect()
	}

	async onModuleInit() {
		await this.$connect()
	}
}
