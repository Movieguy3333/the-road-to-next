/* Note:
After learning about the different caching mechanisms in Next.js, it is important to understand when to use which caching strategy. As you have noticed, caching is a spectrum from fully static rendering to fully dynamic rendering. In between you have static rendering with on-demand caching and time-based caching. Here are some examples when to use which caching strategy:


* **Static Rendering**: Use static rendering when you have a page that does not change often. This is useful for pages that contain static data like a blog post or a product page.

* **Dynamic Rendering**: Use dynamic rendering when you have a page that changes often. This is useful for pages that contain dynamic data like a dashboard or a real-time collaboration tool.

* **Prefetch Cache**: Use prefetch caching when you want to improve the performance of client-side navigations. This is useful for pages that contain data that is linked to other pages like a real-time collaboration tool or a public API.

* **Time-Based Caching (ISR)**: Use time-based caching when you have a page that needs to be updated at runtime. This is useful for pages that contain data that changes frequently like a news feed or a leaderboard but can be cached for a certain amount of time.

* **On-Demand Caching (ISR)**: Use on-demand caching when you want to forcibly purge the cache response. This is useful for pages that contain data that needs to be updated after a certain event has occurred like an e-commerce page or an admin panel.

* **Request Memoization**: Use request memoization when you want to cache the response from requests made with fetch. This is useful for components that make multiple requests to the server during a user's request.

* **Generate Static Params**: Use generateStaticParams when you want to cache the result of a dynamic page at build time. This is *may* useful for pages that contain data that is not frequently accessed like a detail page of a ticket.
*/
