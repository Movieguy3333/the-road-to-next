import { homePath, ticketsPath } from "@/paths";
import { LucideKanban } from "lucide-react";
import { buttonVariants } from "./ui/button";
import Link from "next/link";
import ThemeSwitcher from "./theme/theme-switcher";

function Header() {
  return (
    <nav className="flex justify-between py-2.5 px-5 border-b">
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
        <Link
          href={ticketsPath()}
          className={buttonVariants({
            variant: "outline",
            size: "default",
          })}
        >
          {/* Note:
                The "buttonVariants" function is used to apply the button styles to the Link component. This is a common pattern in React where you can use a function to generate class names based on props or state. In this case, we are using the "outline" variant of the button styles.
              */}
          Tickets
        </Link>
      </div>
    </nav>
  );
}

export default Header;
