"use client";

import { useTheme } from "next-themes";
import { Button } from "../ui/button";
import { LucideMoon, LucideSun } from "lucide-react";

// Technically, these files could go in the features folder, since dark mode could be considered a feature. However, feature folder should contain domain-specific components, while the general components folder are less app specific. Think reusable components.
function ThemeSwitcher() {
  // Note: server compoments render on the server. Client components run on the server and then hydrate on the client.
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <LucideSun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <LucideMoon className="absolute h-4 w-4 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />

      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

export default ThemeSwitcher;
