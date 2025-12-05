import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'img.freepik.com',
				pathname: '/free-vector/blue-circle-with-white-user_78370-4707.jpg'
			}
		]
	},
	experimental: {
		serverActions: {
			allowedOrigins: ['http://localhost:3001'],
			bodySizeLimit: '1mb'
		}
	}
}

export default nextConfig
