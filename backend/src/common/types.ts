import { JwtPayload } from 'jsonwebtoken'

export type TJwtPayload = { userId: string } & JwtPayload
