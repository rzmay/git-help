const bundleAnalyzer = require('@next/bundle-analyzer');
const withPlugins = require('lib/helpers/withPlugins');
// const transpileModules = require('next-transpile-modules');

module.exports = withPlugins([
  bundleAnalyzer({ enabled: process.env.ANALYZE === 'true' }),
], {
  // swcMinify: true,
  poweredByHeader: false,
  // outputFileTracing: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    // domains: ['*', 'www.gravatar.com', 'lh3.googleusercontent.com', 'i.seadn.io', 'i.imgur.com'],
    remotePatterns: [
      { hostname: 'www.gravatar.com' },
      { hostname: 'lh3.googleusercontent.com' },
      { hostname: 'i.seadn.io' },
      { hostname: 'i.imgur.com' },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.API_BASE_URL}/:path*`,
      },
      {
        source: '/ajax/auth/:path*',
        destination: `${process.env.API_BASE_URL}/auth/:path*`,
      },
      {
        source: '/ajax/:path*',
        destination: `${process.env.API_BASE_URL}/dashboard/:path*`,
      },
      {
        source: '/invites/:invite_code',
        destination: `${process.env.API_BASE_URL}/dashboard/invites/:invite_code`,
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/(.*\\/\\/.*)',
        destination: '/',
        permanent: false,
      },
    ];
  },
  async headers() {
    return [{
      source: '/(.*)',
      headers: [{
        key: 'Content-Security-Policy',
        value: "frame-ancestors 'none';",
      }],
    }];
  },
});
