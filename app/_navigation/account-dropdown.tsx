import { LucideLogOut } from "lucide-react";
import { signOut } from "@/features/auth/actions/sign-out";
import SubmitButton from "@/components/form/submit-button";
import { User as AuthUser } from "lucia";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import {
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { accountProfilePath, accountPasswordPath } from "@/paths";
import { LucideUser, LucideLock } from "lucide-react";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";

type AccountDropdownProps = {
  user: AuthUser;
};
export function AccountDropdown({ user }: AccountDropdownProps) {
  return (
    /*    <form action={signOut}>
      <SubmitButton label="Sign Out" icon={<LucideLogOut />} />
    </form> */

    <DropdownMenu>
      <DropdownMenuTrigger
        nativeButton={false}
        render={
          <Avatar>
            <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
          </Avatar>
        }
      />
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuItem
            render={
              <Link href={accountProfilePath()}>
                <LucideUser className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </Link>
            }
          >
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem
            render={
              <Link href={accountPasswordPath()}>
                <LucideLock className="mr-2 h-4 w-4" />
                <span>Password</span>
              </Link>
            }
          >
            Password
          </DropdownMenuItem>
          <DropdownMenuItem
            render={
              <form action={signOut}>
                <LucideLogOut className="mr-2 h-4 w-4" />
                <button type="submit">Sign Out</button>
              </form>
            }
          >
            Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
    /*  <DropdownMenu>
      <DropdownMenuTrigger
        nativeButton={false}
        render={
          <Avatar>
            <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
          </Avatar>
        }
      />
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          render={
            <Link href={accountProfilePath()}>
              <LucideUser className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </Link>
          }
        />
        <DropdownMenuItem
          render={
            <Link href={accountPasswordPath()}>
              <LucideLock className="mr-2 h-4 w-4" />
              <span>Password</span>
            </Link>
          }
        />
        <DropdownMenuSeparator />
        <DropdownMenuItem
          render={
            <form action={signOut}>
              <LucideLogOut className="mr-2 h-4 w-4" />
              <button type="submit">Sign Out</button>
            </form>
          }
        />
      </DropdownMenuContent>
    </DropdownMenu> */
  );
}
