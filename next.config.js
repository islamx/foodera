/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/store-types",
        destination: "http://41.38.56.140/Store.ApI/api/StoreTypes/GetAllTypes",
      },
    ];
  },
};

module.exports = nextConfig;
