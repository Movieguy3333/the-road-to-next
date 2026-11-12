"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { navItems } from "../constants";
import { SidebarItem } from "./sidebar-item";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { usePathname } from "next/navigation";
import { getActivePath } from "@/utils/get-active-path";
import { signUpPath, signInPath } from "@/paths";

const Sidebar = () => {
  const { user, isFetched } = useAuth();
  const pathname = usePathname();
  const { activeIndex } = getActivePath(
    pathname,
    navItems.map((item) => item.href),
    /* Note: we are ignoring the paths that are not in the navItems array. This is because we don't want to highlight the the "cloest path" if the user is on a page that is not in the navItems array. fun fact: this actually unessecary because the sidebar will be hidden if the user is not authenticated. but this is just a good practice to keep in mind.
    The reason this works is because in getActivePath we concat paths like this:  
    
      const closestPath = closest(pathname, paths.concat(ignorePaths || []));

    if the we find the index of the closest path, we return the activeIndex. very important: for signUpPath and signInPath, the activeIndex will be 3 and 4 respectively, and because we check below "isActive={activeIndex === index}", index 3 and 4 don't match because the navItems array only has 3 items. index will never be activeIndex beacuse navItems isn't long enough.
    */
    [signUpPath(), signInPath()],
  );
  const [isTransition, setTransition] = useState(false);
  const [isOpen, setOpen] = useState(false);

  const handleToggle = (open: boolean) => {
    setTransition(true);
    setOpen(open);
    setTimeout(() => setTransition(false), 200);
  };

  // Note: we don;t want to render the sidebar if the user is not authenticated. Important to know once I migrate to shadcn/ui Sidebar.
  if (!user || !isFetched) {
    // Note: very neat trick to prevent layout shift when the sidebar loads in. those few moments when the sidebar is not there "pushes" the main page when it finally appears.
    return <div className="w-[78px] bg-secondary/20"></div>;
  }

  return (
    <nav
      className={cn(
        "animate-siderbar-from-left",
        "h-screen border-r pt-24",
        isTransition && "duration-200",
        isOpen ? "md:w-60 w-[78px]" : "w-[78px]",
      )}
      onMouseEnter={() => handleToggle(true)}
      onMouseLeave={() => handleToggle(false)}
    >
      <div className="px-3 py-2">
        <nav className="space-y-2">
          {navItems.map((navItem, index) => (
            <SidebarItem
              key={navItem.title}
              isOpen={isOpen}
              navItem={navItem}
              /* Note:
              We basically spent a five minutes lecture to solve a small UI issue. 
              The way it worked before is that the SidebarItem had an issue where the password tab was not being highlighted like the profile tab.
              This is because our navItems.href was  accountProfilePath().
              To solve this we used a utility function called getActivePath that uses a library called fastest-levenshtein. This function takes in the pathname and the navItems.href and returns the activeIndex. 
              activeIndex is the index of the navItem that is active. 
              So if the pathname is accountProfilePath(), then activeIndex will be 0. 
              If the pathname is accountPasswordPath(), then activeIndex will be 1.
              
              
              

              */
              isActive={activeIndex === index}
            />
          ))}
        </nav>
      </div>
    </nav>
  );
};

export { Sidebar };
