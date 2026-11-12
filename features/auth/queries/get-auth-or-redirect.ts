import { redirect } from "next/navigation";
import { signInPath } from "@/paths";
import { getAuth } from "@/features/auth/queries/get-auth";

export async function getAuthOrRedirect() {
  const auth = await getAuth();

  if (!auth.user) {
    redirect(signInPath());
  }
  return auth;
}
