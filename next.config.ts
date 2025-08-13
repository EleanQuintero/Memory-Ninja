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

  // Aplicar configuraciones específicas para producción
  ...(process.env.VERCEL_ENV === 'production' ? {
    // Optimizaciones para la landing
    images: {
      formats: ['image/avif', 'image/webp'],
      minimumCacheTTL: 86400, // Aumentado a 24 horas para mejor rendimiento
      deviceSizes: [640, 1080, 1920], // Reducido para optimizar costos
      imageSizes: [32, 96, 256], // Reducido para optimizar costos
    },
    compress: true,
    poweredByHeader: false,
    reactStrictMode: true,
    swcMinify: true,
    staticPageGenerationTimeout: 120, // Aumentado para evitar timeouts durante la generación
    i18n: {
      locales: ['es'],
      defaultLocale: 'es',
    },
  } : {}),
};

export default nextConfig;
