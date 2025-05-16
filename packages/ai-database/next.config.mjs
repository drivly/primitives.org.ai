import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // No special webpack configuration needed with Vercel Postgres adapter
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
