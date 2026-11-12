"use server";

import { lucia } from "@/lib/lucia";
import { cookies } from "next/headers";
import { cache } from "react";

const getAuth = cache(async () => {
  const cookiesStore = await cookies();
  const sessionId = cookiesStore.get(lucia.sessionCookieName)?.value ?? null;

  if (!sessionId) {
    return {
      user: null,
      session: null,
    };
  }
  const result = await lucia.validateSession(sessionId);

  /*
  Note: There are two scenarios handled here:
  React server component: This try block is not allowed in Server Components and will silently fail. This is because write operations are not allowed in Server Components. 
  React server action: This try block is allowed in Server Actions and will set the session cookie if needed.
  */

  try {
    if (result.session && result.session.fresh) {
      const sessionCookie = lucia.createSessionCookie(result.session.id);

      cookiesStore.set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
    }

    if (!result.session) {
      const sessionCookie = lucia.createBlankSessionCookie();

      cookiesStore.set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
    }
  } catch {
    // Do nothing, silently fail if used in React Server Components
  }

  return result;
});

export { getAuth };
