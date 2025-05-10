/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: {
    unoptimized: true,
  },
  webpack: (config, { isServer }) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      'cloudflare:sockets': false,
    }
    
    config.externals = [...(config.externals || []), 'pg', 'pg-cloudflare']
    
    return config
  },
}

module.exports = nextConfig
