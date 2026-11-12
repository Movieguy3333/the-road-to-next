"use client";
import {
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarGroupLabel,
  Sidebar as SidebarUI,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { signInPath, signUpPath } from "@/paths";
import { getActivePath } from "@/utils/get-active-path";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AccountDropdown } from "../account-dropdown";
import { navItems } from "./constants";

export const AppSidebar = () => {
  const { user, isFetched } = useAuth();
  const pathname = usePathname();
  const { activeIndex } = getActivePath(
    pathname,
    navItems.map((navItem) => navItem.href),
    [signInPath(), signUpPath()],
  );

  if (!user || !isFetched) {
    <div className="h-screen w-[78px] absolute" />;
  }

  const accountNavItems = navItems.filter(
    (navItem) => navItem.sidebarGroup === "Account",
  );
  const ticketsNavItems = navItems.filter(
    (navItem) => navItem.sidebarGroup === "Tickets",
  );

  return (
    <SidebarUI collapsible="icon" className="animate-siderbar-from-left">
      <SidebarContent className="pt-16">
        <SidebarHeader className="font-bold">
          Welcome {user?.username}
        </SidebarHeader>
        <Collapsible defaultOpen className="group/tickets-collapsible">
          <SidebarGroup>
            <SidebarGroupLabel
              render={<CollapsibleTrigger className="cursor-pointer" />}
            >
              Tickets
              <ChevronDown className="ml-auto transition-transform group-data-open/tickets-collapsible:rotate-180" />
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {ticketsNavItems.map((item, index) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        render={
                          <Link href={item.href}>
                            {item.icon}
                            <span>{item.title}</span>
                          </Link>
                        }
                        isActive={activeIndex === index}
                      />
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
        <SidebarSeparator />

        <Collapsible defaultOpen className="group/account-collapsible">
          <SidebarGroup>
            <SidebarGroupLabel
              render={<CollapsibleTrigger className="cursor-pointer" />}
            >
              Account
              <ChevronDown className="ml-auto transition-transform group-data-open/account-collapsible:rotate-180" />
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {accountNavItems.map((item, index) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        render={
                          <Link href={item.href}>
                            {item.icon}
                            <span>{item.title}</span>
                          </Link>
                        }
                        isActive={activeIndex === index}
                      />
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>

        <SidebarFooter></SidebarFooter>
      </SidebarContent>
    </SidebarUI>
  );
};
