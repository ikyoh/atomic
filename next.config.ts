import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true, // Ajoute des slashes finaux pour la compatibilité statique
  images: {
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    dangerouslyAllowSVG: true,
    unoptimized: true, // Requis pour l'export statique
    remotePatterns: [
      {
        protocol: `${process.env.WORDPRESS_PROTOCOL}` as "http" | "https",
        hostname: `${process.env.WORDPRESS_HOSTNAME}`,
        port: "",
        pathname: "/**",
      },
    ],
  },
  transpilePackages: ["three"],
  async redirects() {
    return [
      {
        source: "/admin",
        destination: `${process.env.WORDPRESS_URL}/wp-admin`,
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
