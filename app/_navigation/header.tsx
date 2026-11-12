"use client";

import { homePath, signUpPath, signInPath } from "@/paths";
import { LucideKanban } from "lucide-react";
import { buttonVariants } from "../../components/ui/button";
import Link from "next/link";
import ThemeSwitcher from "../../components/theme/theme-switcher";

import { AccountDropdown } from "@/app/_navigation/account-dropdown";

import { useAuth } from "@/features/auth/hooks/use-auth";

function Header() {
  const { user, isFetched } = useAuth();

  if (!isFetched) {
    return null;
  }

  const navItems = user ? (
    <>
      {/*    

      Note: Don't need this link because we are using the sidebar
       <Link
        href={ticketsPath()}
        className={buttonVariants({
          variant: "default",
          size: "default",
        })}
      >
         Note:
                The "buttonVariants" function is used to apply the button styles to the Link component. This is a common pattern in React where you can use a function to generate class names based on props or state. In this case, we are using the "outline" variant of the button styles.
                
        Tickets
      </Link> */}

      {/*      <form action={signOut}>
        <SubmitButton label="Sign Out" icon={<LucideLogOut />} />
      </form> */}
      <AccountDropdown user={user} />
    </>
  ) : (
    <>
      <Link
        href={signUpPath()}
        className={buttonVariants({
          variant: "outline",
          size: "default",
        })}
      >
        Sign Up
      </Link>
      <Link
        href={signInPath()}
        className={buttonVariants({
          variant: "default",
        })}
      >
        Sign In
      </Link>
    </>
  );
  return (
    // Note: pretty proud of this. add "absolute w-screen h-[53px]" to the following className to prevent layoutshift.
    <nav className="flex justify-between py-2.5 px-5 border-b animate-header-from-top absolute w-screen h-[53px] ">
      <div className="flex align-items gap-x-2">
        <Link
          href={homePath()}
          className={buttonVariants({ variant: "ghost" })}
        >
          <LucideKanban />
          <h1 className=" ml-2 text-lg font-bold">TicketBounty</h1>
        </Link>
      </div>
      <div className="flex align-items gap-x-2">
        <ThemeSwitcher />
        {navItems}
      </div>
    </nav>
  );
}

export default Header;
