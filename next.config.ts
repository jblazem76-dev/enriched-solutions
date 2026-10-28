import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
];

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  // Pages the previous site had. Temporary (307) so they can be brought back without browsers remembering a redirect.
  async redirects() {
    return [
      // The cohorts live on the ES+ page now.
      { source: "/community", destination: "/es-plus#cohorts", permanent: false },
      // The old site removed its slide deck from the site (it is shared as a standalone file).
      { source: "/deck", destination: "/", permanent: false },
    ];
  },
};

export default nextConfig;
