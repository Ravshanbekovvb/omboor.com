import { ConfigService } from '@nestjs/config'

const isDev = (config: ConfigService) => config.getOrThrow<string>('NODE_ENV') === 'development'

const IS_DEV = process.env.NODE_ENV === 'development'

export { IS_DEV, isDev }
