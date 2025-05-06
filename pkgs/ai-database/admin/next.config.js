/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['payload', '@payloadcms/db-mongodb', '@payloadcms/db-postgres', '@payloadcms/richtext-slate'],
}

export default nextConfig
