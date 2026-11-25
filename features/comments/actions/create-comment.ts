"use server";

import fromErrorToActionState, {
  ActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

import { revalidatePath } from "next/cache";

import { ticketPath } from "@/paths";

const createCommentSchema = z.object({
  content: z.string().min(1).max(1024),
});
export async function createComment(
  ticketId: string,
  _actionState: ActionState,
  formData: FormData,
) {
  const { user } = await getAuthOrRedirect();

  try {
    const data = createCommentSchema.parse(Object.fromEntries(formData));
    await prisma.comment.create({
      data: {
        ticketId,
        userId: user.id,
        ...data,
      },
    });
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }

  revalidatePath(ticketPath(ticketId));

  return toActionState("SUCCESS", "Comment created successfully");
}
