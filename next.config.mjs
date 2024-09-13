/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/builds',
        destination: '/alldeployments',
        permanent: true,
      },
    ];
  },
  compiler: {
      styledComponents: true,
  },
  experimental: {
      // Available only with canary version of next
      // ppr: true,
  }
}

export default nextConfig