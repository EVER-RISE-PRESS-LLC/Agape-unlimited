import type { NextConfig } from 'next';
import { withPayload } from '@payloadcms/next/withPayload';
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';

initOpenNextCloudflareForDev({ remoteBindings: false });
const nextConfig: NextConfig = {
  images: { unoptimized: true },
  serverExternalPackages: ['jose'],
  async headers() {
    return [
      { source: '/admin/:path*', headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] },
      { source: '/api/:path*', headers: [{ key: 'X-Robots-Tag', value: 'noindex' }, { key: 'Cache-Control', value: 'no-store' }] },
      { source: '/preview/:path*', headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }, { key: 'Cache-Control', value: 'private, no-store' }] },
    ];
  },
};
export default withPayload(nextConfig, { devBundleServerPackages: false });
