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
        source: '/',
        destination: '/projects',
        permanent: true,
      },
      {
        source: '/builds',
        destination: '/alldeployments',
        permanent: true,
      },
      {
        source: '/projects/:projectSlug/:environmentSlug/facts',
        destination: '/projects/:projectSlug/:environmentSlug/insights',
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