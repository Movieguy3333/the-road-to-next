import Link from "next/link";
import { usePathname } from "next/navigation";
import { cloneElement } from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { closedClassName } from "../constants";
import { NavItem } from "../types";
import { Separator } from "@/components/ui/separator";

type SidebarItemProps = {
  isOpen: boolean;
  navItem: NavItem;
  isActive: boolean;
};

const SidebarItem = ({ isOpen, navItem, isActive }: SidebarItemProps) => {
  return (
    <>
      {/*  Note: this is a seperator that will be rendered for all items that are
      associated with a signed in user. every item associated with a user will
      have a separator = true in the navItems */}
      {/*  <div className="flex-1 flex flex-col gap-y-8 items-center"> */}
      {navItem.separator && <Separator />}

      <Link
        href={navItem.href}
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "group relative flex h-12 justify-start",
          isActive && "bg-muted font-bold hover:bg-muted",
        )}
      >
        {cloneElement(navItem.icon, {
          // @ts-expect-error: Note: You may encounter a type error: No overload matches this call for cloneElement. This is related to React changing the React.ReactElement type from any to unknown.
          className: "h-5 w-5 ml-1.5 ",
        })}
        <span
          className={cn(
            "absolute left-12 text-base duration-200",
            isOpen ? "md:block hidden" : "w-[78px]",
            !isOpen && closedClassName,
          )}
        >
          {navItem.title}
        </span>
      </Link>
      {/*  </div> */}
    </>
  );
};

export { SidebarItem };
