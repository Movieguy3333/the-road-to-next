"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import { deleteCookieByKey, getCookieByKey } from "@/actions/cookie";
import { usePathname } from "next/navigation";

// Note: We could've made this a hook called useRedirectToast, but that means the file using it would have to be a client component.

const RedirectToast = () => {
  // Note: in an ideal world, we don't need the pathname as a dependency array but because of template, but because it is still being worked on, it doesn't work.
  const pathname = usePathname();
  useEffect(() => {
    const showCookieToast = async () => {
      const message = await getCookieByKey("toast");

      if (message) {
        toast.success(message);
        await deleteCookieByKey("toast");
      }
    };

    showCookieToast();
  }, [pathname]);

  return null;
};

export { RedirectToast };
