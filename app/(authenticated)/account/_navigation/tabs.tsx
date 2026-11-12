"use client";

import Link from "next/link";
import { Tabs, TabsTrigger, TabsList } from "@/components/ui/tabs";
import { accountProfilePath, accountPasswordPath } from "@/paths";
import { usePathname } from "next/navigation";

function AccountTabs() {
  const pathname = usePathname();
  return (
    // Note: the _navigation folder is a private folder, noted with an underscore. components folder and features folder are for reusable components respectively. private folders are for non-reusable components.
    // Note: split the pathname by "/" and get the last item. this will return the last item in the array. if the pathname is "/account/profile", it will return "profile". if the pathname is "/account/password", it will return "password". This is really done for styling purposes.
    <Tabs value={pathname.split("/").at(-1)}>
      <TabsList>
        <TabsTrigger
          nativeButton={false}
          value="profile"
          render={<Link href={accountProfilePath()}>Profile</Link>}
        />
        <TabsTrigger
          nativeButton={false}
          value="password"
          render={<Link href={accountPasswordPath()}>Password</Link>}
        />
      </TabsList>
    </Tabs>
  );
}

export { AccountTabs };
