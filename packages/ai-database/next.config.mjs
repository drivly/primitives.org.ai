import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer, webpack }) => {
    // Handle cloudflare:sockets import
    config.resolve.fallback = {
      ...config.resolve.fallback,
      'cloudflare:sockets': false,
    }
    
    // Add a null loader for cloudflare:sockets
    config.module.rules.push({
      test: /cloudflare:sockets/,
      use: 'null-loader',
    })
    
    return config
  },
  serverExternalPackages: ['pg', 'pg-cloudflare'],
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
