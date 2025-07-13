/** @type {import('next').NextConfig} */
const nextConfig = {
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
    ];
  },
};

module.exports = nextConfig;
