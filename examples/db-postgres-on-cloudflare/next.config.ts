import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
}

export default nextConfig

if (process.env.NODE_ENV === 'development') {
  try {
    import('@opennextjs/cloudflare').then(({ initOpenNextCloudflareForDev }) => {
      initOpenNextCloudflareForDev();
    }).catch(err => {
      console.warn('Failed to initialize OpenNext Cloudflare for dev:', err);
    });
  } catch (error) {
    console.warn('Failed to import @opennextjs/cloudflare:', error);
  }
}
