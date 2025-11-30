import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PrismaModule } from './prisma/prisma.module'
import { UserModule } from './user/user.module'
import { JwtModule } from './jwt/jwt.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true
		}),
		PrismaModule,
		UserModule,
		JwtModule
	]
})
export class AppModule {}
