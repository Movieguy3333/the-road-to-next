import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Note: This configuration overrides Next.js's App Router client-side router cache, instructing the browser to keep dynamic page data fresh for 30 seconds after it is loaded. Basically, if the user navigates to a dynamic page, the data will be cached for 30 seconds. If the user navigates away from the page and then returns within 30 seconds, the data will be served from the cache instead of making a new request to the server. This can improve performance and reduce server load, but it also means that the user may see stale data if the underlying data changes within that 30-second window. This is a trade-off between performance and data freshness. Another way is to use the prefetch prop on the Link component, which will prefetch the page before rendering it. This can also improve performance, but it may result in a slower initial load time. we are going to use the prefetch method.
  /*  experimental: {
    staleTimes: {
      dynamic: 30, // 30 seconds
    },
  }, */
};

export default nextConfig;
