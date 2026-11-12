import { useEffect, useState } from "react";
import { getAuth } from "../queries/get-auth";
import { usePathname } from "next/navigation";
import { User as AuthUser } from "lucia";

function useAuth() {
  /* 
Note: const { user } = await getAuth(); makes all routes in the app dynamically rendered. you can check this via npm run build. we want to change this in the next lesson. we will use useState with useEffect such as in the following. This is a neat little trick where we fetch the user lazily in a client component to bypass the issue of having every route dynamically rendered.
There is no perfect solution. Either use the server side approach with the getAuth() that uses the cookie api but having the whole app dynamically rendered. Or this client side apporach where we need to jump through a bunch of hoops to get it working with no issues.
  */

  const [user, setUser] = useState<AuthUser | null>(null);
  const [isFetched, setIsFetched] = useState(false);

  /* Note: we use pathname so that anytime the user navigates to a different page, the user gets reauthenticated. Also remember, layout.tsx doesn't re-render like template.tsx  */
  const pathname = usePathname();

  useEffect(() => {
    async function fetchUser() {
      const { user } = await getAuth();
      setUser(user);
      setIsFetched(true);
    }

    fetchUser();
  }, [pathname]);

  return { user, isFetched };
}

export { useAuth };
