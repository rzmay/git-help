const bundleAnalyzer = require('@next/bundle-analyzer');
<<<<<<< HEAD:packages/dashboard/next.config.js
// const transpileModules = require('next-transpile-modules');
const withPlugins = require('./src/helpers/withPlugins');
=======
const withPlugins = require('lib/helpers/withPlugins');
const transpileModules = require('next-transpile-modules');
>>>>>>> 7b5eafb2550e155c5e635a1490206fcfea056e43:packages/embed/next.config.js

module.exports = withPlugins([
  // transpileModules(['shared']),
  bundleAnalyzer({ enabled: process.env.ANALYZE === 'true' }),
], {
  // swcMinify: true,
  poweredByHeader: false,
  // outputFileTracing: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['*', 'www.gravatar.com', 'lh3.googleusercontent.com', 'i.seadn.io'],
  },
// async rewrites() {
//     return [
//       {
//         source: '/api/:path*',
//         destination: `${process.env.API_BASE_URL}/:path*`,
//       },
//       {
//         source: '/ajax/auth/:path*',
//         destination: `${process.env.API_BASE_URL}/auth/:path*`,
//       },
//       {
//         source: '/ajax/:path*',
//         destination: `${process.env.API_BASE_URL}/dashboard/:path*`,
//       },
//       {
//         source: '/invites/:invite_code',
//         destination: `${process.env.API_BASE_URL}/dashboard/invites/:invite_code`,
//       },
//     ];
//   },
  // async redirects() {
  //   return [
  //     {
  //       source: '/(.*\\/\\/.*)',
  //       destination: '/',
  //       permanent: false,
  //     },
  //   ];
  // },
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
