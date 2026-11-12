import { LucideFile, LucideBook, LucideCircleUser } from "lucide-react";
import { homePath, ticketsPath } from "@/paths";
import { NavItem } from "./types";
import { accountProfilePath } from "@/paths";

export const navItems: NavItem[] = [
  {
    title: "All Tickets",
    href: homePath(),
    // Note: renaming this file from a ts file to a tsx file will cause the icon to not render. This is because the icon is a React component, and JSX is not allowed in a .ts file. To fix this, rename the file to a .tsx file.
    icon: <LucideFile />,
    sidebarGroup: "Tickets",
  },
  {
    title: "My Tickets",
    href: ticketsPath(),
    icon: <LucideBook />,
    sidebarGroup: "Tickets",
  },
  {
    separator: true,
    title: "Account",
    icon: <LucideCircleUser />,
    href: accountProfilePath(),
    sidebarGroup: "Account",
  },
];

export const closedClassName =
  "text-background opacity-0 trasition-all duration-300 group-hover:z-40 group-hover:ml-4 group-hover:rounded group-hover:bg-foreground group-hover:p-2 group-hover:opacity-100";
