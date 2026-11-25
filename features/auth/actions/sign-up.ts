// Note: Interesting how he got a error and needed this file to have "use server" to fix it, stating that functions cannot be passed directly to client components unless you explicitly expose it by marking it with "use server". For whatever reason, we don't require this.
"use server";
import { z } from "zod";
import { hash } from "@node-rs/argon2";
import { toActionState } from "@/components/form/utils/to-action-state";
import fromErrorToActionState from "@/components/form/utils/to-action-state";
import { ActionState } from "@/components/form/utils/to-action-state";
import { prisma } from "@/lib/prisma";
import { lucia } from "@/lib/lucia";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ticketsPath } from "@/paths";
import { Prisma } from "@prisma/client";
const signUpSchema = z
  .object({
    username: z
      .string()
      .min(1)
      .max(191)
      .refine((val) => !val.includes(" "), "Username cannot contain spaces"),
    email: z.string().min(1, { message: "Is required" }).max(191).email(),
    password: z.string().min(6).max(191),
    confirmPassword: z.string().min(6).max(191),
  })
  // Note: superRefine is a Zod method that allows you to refine a schema based on the value of another field. It takes a function as an argument that receives the refined value and the context object. The function can then use the context object to add validation errors to the Zod schema. This is used to make sure that the password and confirmPassword fields match.
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

async function signUp(_actionState: ActionState, formData: FormData) {
  try {
    const { username, email, password } = signUpSchema.parse({
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    });

    const hashedPassword = await hash(password);

    const user = await prisma.user.create({
      data: {
        username: username,
        email: email,
        passwordHash: hashedPassword,
      },
    });

    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    /* Note: 
    this project is on Next.js 16.3.1, where cookies() is an async function (that changed back in Next 15) — it returns Promise<ReadonlyRequestCookies>, not the cookie store directly. The tutorial you're following predates that change, so cookies().set(...) fails type-checking because you're calling .set on the Promise itself.

Fix: await it first.

    */
    const cookieStore = await cookies();
    cookieStore.set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return toActionState("ERROR", "Username already exists", formData);
    }

    return fromErrorToActionState(error, formData);
  }
  redirect(ticketsPath());
}

export { signUp };
