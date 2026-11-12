import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";

export default async function AuthenticatedLayout({
  children,
}: LayoutProps<"/">) {
  // Note: This folder (authenticated) is called a route group. all the pages that should be authenticated are in this directory and will be protected routes via this layout.tsx file.

  /* Note:
    Where to Authorize? (Discussion)
This may be the most important lesson about authorization in this book. It's a common saying that authorization should happen as close as possible to the data source. In our case, we are authorizing users in our layout component, which is a good place to start, but a coarse-grained authorization check compared to authorizing users in a data access layer (here: server actions and queries) which is a fine-grained authorization check.

There are two important facts about authorization in layout components: First, the layout component is a *convenient* place to authorize users for all pages that share the same layout. But it is *not* the most secure place, because as we have learned, and this is important, a layout component does not re-render upon navigation from page to page. This means that if a session becomes invalid and the user is already in the application, they can still navigate to protected pages that share the same layout that is supposed to protect all pages.

Second, it turns out that performing authorization checks only in the layout is insufficient and can be bypassed. By including the header RSC: 1, the server interprets the request as coming from a page attempting to load a server component. This causes the server to call the page function directly, bypassing the layout and its authorization check. By using this method, one would be able to successfully received the RSC payload response from the server, even if the user is not authenticated, where maybe all the sensitive data (e.g. tickets from another user) is encoded in the HTML.

We could avoid both problems by authorizing users on page level instead of a shared layout level. But this would lead to code duplication, because we would have to repeat the authorization check for all pages that require authorization. This is error-prone and not maintainable in the long run.

Another alternative is to use middleware functions to authorize users. Middleware functions are executed before the page function is called, and they are a good place to perform pre-flight checks on the cookie (e.g. if there is a session in a cookie at all). But they are not suitable for making database queries (see code below which we won't use in our application), because they would halt the server with *every* request made to it.

javascript
// src/middleware.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getAuth } from "./features/auth/queries/get-auth";
import { signInPath } from "./paths";

export async function middleware(request: NextRequest) {
  const auth = await getAuth();

  if (!auth.user) {
    return NextResponse.redirect(new URL(signInPath(), request.url));
  }
}

export const config = {
  matcher: "/tickets",
};

// above code is just an example for authorization in middleware
// but we will not use it
// because it would halt the server on every request
// causing a bad user experience
// one could use middleware for pre-flight checks on the cookie though
Also, middleware functions run in an edge environment, which is a limited Node environment where not everything is available, e.g. certain ORM to database drivers, which is only available via serverless adapters for specific databases:

text
// Command Line
PrismaClient is not configured to run in Vercel Edge Functions or Edge Middleware. In order to run Prisma Client on edge runtime ...
So, we are back to authorizing users in layout components, which is a convenient place to start, but not the most secure place as we have learned. As mentioned earlier as well, the most secure place to authorize users is close to the data source, which is in our case the server actions and queries. That's where we will authorize users in the next sections.

  */

  await getAuthOrRedirect();

  return <>{children}</>;
}
