"use server";

import fromErrorToActionState, {
  ActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { accountProfilePath } from "@/paths";

const changeUsernameSchema = z.object({
  username: z
    .string()
    .min(1)
    .max(191)
    .refine((val) => !val.includes(" "), "Username cannot contain spaces"),
});

export async function changeUsername(
  _actionState: ActionState,
  formData: FormData,
) {
  try {
    const { user } = await getAuthOrRedirect();
    const { username } = changeUsernameSchema.parse({
      username: formData.get("username"),
    });
    // Perform the username change logic here
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        username,
      },
    });
  } catch (error) {
    // Handle any errors that occur during the username change
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return toActionState(
        "ERROR",
        "Username already exists, Choose another one",
        formData,
      );
    }
    return fromErrorToActionState(error, formData);
  }

  revalidatePath(accountProfilePath());

  return toActionState("SUCCESS", "Username changed successfully");
}
