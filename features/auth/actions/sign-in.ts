// Note: Interesting how he got a error and needed this file to have "use server" to fix it, stating that functions cannot be passed directly to client components unless you explicitly expose it by marking it with "use server". For whatever reason, we don't require this.
"use server";
import { z } from "zod";

import fromErrorToActionState, {
  toActionState,
} from "@/components/form/utils/to-action-state";
import { ActionState } from "@/components/form/utils/to-action-state";

import { redirect } from "next/navigation";
import { ticketsPath } from "@/paths";
import { prisma } from "@/lib/prisma";
import { verify } from "@node-rs/argon2";
import { lucia } from "@/lib/lucia";
import { cookies } from "next/headers";

const signInSchema = z.object({
  email: z.string().min(1, { message: "Is required" }).max(191).email(),
  password: z.string().min(6).max(191),
});

async function signIn(_actionState: ActionState, formData: FormData) {
  try {
    const { email, password } = signInSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
        email: true,
        passwordHash: true,
      },
    });

    if (!user) {
      return toActionState("ERROR", "Invalid email or password", formData);
    }

    // Note: it took me a while to understand that user.passwordHash should be the first argument lmao
    const isPasswordValid = await verify(user.passwordHash, password);

    // Note: Very interesting that the malicious user gets the same error message for both invalid email and invalid password. This is a security measure to prevent malicious users from knowing which part of the login is incorrect. If we were to give different error messages for invalid email and invalid password, a malicious user could use this information to determine if an email is registered in our system or not. This is known as a user enumeration attack. By giving the same error message for both cases, we prevent this type of attack.
    if (!isPasswordValid) {
      return toActionState("ERROR", "Invalid email or password", formData);
    }

    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    const cookieStore = await cookies();
    cookieStore.set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }

  redirect(ticketsPath());
}

export { signIn };
