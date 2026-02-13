/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'placeholder.com'],
  },
  async redirects() {
    return [
      {
        source: '/signin',
        destination: '/become-vendor',
        permanent: false,
      },
      {
        source: '/signup',
        destination: '/become-vendor',
        permanent: false,
      },
      {
        source: '/reset',
        destination: '/become-vendor',
        permanent: false,
      },
    ]
  },
}

module.exports = nextConfig
