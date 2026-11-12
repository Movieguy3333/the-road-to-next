import CardCompact from "@/components/card-compact";
import SignUpForm from "@/features/auth/components/sign-up-form";
import Link from "next/link";
import { signUpPath, passwordForgotPath } from "@/paths";
import SignInForm from "@/features/auth/components/sign-in-form";
function SignInPage() {
  return (
    <div className="flex-1 flex flex-col justify-center items-center ">
      <CardCompact
        className="w-full max-w-[420px] animate-fade-from-top "
        title="Sign In"
        description="Sign in to your account"
        content={<SignInForm />}
        footer={
          <>
            <Link className="text-sm text-muted-foreground" href={signUpPath()}>
              Don't have an account? Sign up
            </Link>

            <Link
              className="text-sm text-muted-foreground ml-auto"
              href={passwordForgotPath()}
            >
              Forgot your password?
            </Link>
          </>
        }
      />
    </div>
  );
}

// Note: page.tsx must be a default export, as next.js expects this
export default SignInPage;
