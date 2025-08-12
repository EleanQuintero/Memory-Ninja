import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  redirects: async () => {
    return [
      {
        source: '/dashboard',
        destination: '/',
        permanent: false,
      },
      {
        source: '/dashboard/:path*',
        destination: '/',
        permanent: false,
      },
      {
        source: '/onboarding',
        destination: '/',
        permanent: false,
      },
      {
        source: '/onboarding/:path*',
        destination: '/',
        permanent: false,
      },
      {
        source: '/sign-in',
        destination: '/',
        permanent: false,
      },
      {
        source: '/sign-in/:path*',
        destination: '/',
        permanent: false,
      },
      {
        source: '/api/:path*',
        destination: '/',
        permanent: false,
        has: [
          {
            type: 'header',
            key: 'x-skip-middleware',
            value: '(?!1)',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
