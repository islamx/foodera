/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['41.38.56.140'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '41.38.56.140',
        port: '',
        pathname: '/Store.ApI/**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST, PUT, DELETE, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type' },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/api/store-types",
        destination: "http://41.38.56.140/Store.ApI/api/StoreTypes/GetAllTypes",
      },
      {
        source: "/api/store-types/create",
        destination: "http://41.38.56.140/Store.ApI/api/StoreTypes/CreateStoreType",
      },
      {
        source: "/api/store-types/update/:id",
        destination: "http://41.38.56.140/Store.ApI/api/StoreTypes/UpdateStoreType/:id",
      },
      {
        source: "/api/images/:path*",
        destination: "http://41.38.56.140/Store.ApI/Icons/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
