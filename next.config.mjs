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
      // facts and insights are combined under /insights route
      {
        source: '/projects/:projectSlug/:environmentSlug/facts',
        destination: '/projects/:projectSlug/:environmentSlug/insights',
        permanent: true,
      },
    ];
  },
  experimental: {
    // Available only with canary version of next
    // ppr: true,
  },
  typescript: {
    // temp - until UI lib is ready
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
