import CardCompact from "@/components/card-compact";
import SignUpForm from "@/features/auth/components/sign-up-form";
import Link from "next/link";
import { signInPath } from "@/paths";
function SignUpPage() {
  return (
    <div className="flex-1 flex flex-col justify-center items-center ">
      <CardCompact
        className="w-full max-w-[420px] animate-fade-from-top "
        title="Sign Up"
        description="Create a new account"
        content={<SignUpForm />}
        footer={
          <Link className="text-sm text-muted-foreground" href={signInPath()}>
            Already have an account? Sign in
          </Link>
        }
      />
    </div>
  );
}

// Note: page.tsx must be a default export, as next.js expects this
export default SignUpPage;
