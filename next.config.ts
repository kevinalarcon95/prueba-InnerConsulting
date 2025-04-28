import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/inscripcion",
        permanent: true,
      },
    ];
  }
};

export default nextConfig;
