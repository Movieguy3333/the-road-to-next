"use server";

import {
  ActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { isOwner } from "@/features/auth/utils/is-owner";

import type { CommentClient } from "../types";

import { ticketPath } from "@/paths";
import fromErrorToActionState from "@/components/form/utils/to-action-state";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const editCommentSchema = z.object({
  content: z.string().min(1).max(1024),
});
export async function editComment(
  comment: CommentClient,
  _actionState: ActionState,
  formData: FormData,
) {
  const { user } = await getAuthOrRedirect();
  const data = editCommentSchema.parse(Object.fromEntries(formData));

  try {
    if (comment.id) {
      if (!comment || !isOwner(user, comment)) {
        return toActionState(
          "ERROR",
          "Not authorized to edit a comment that is not yours",
        );
      }
    }

    await prisma.comment.update({
      where: {
        id: comment.id,
      },
      data: {
        content: data.content,
      },
    });
  } catch (error) {
    return fromErrorToActionState(error);
  }

  /* Note: client-side cache is "soft" cache, while server-side cache is "hard" cache.
 Soft cache = Router Cache (in-browser, RSC payload), driven by <Link prefetch> and next.config.js staleTimes.
 Hard cache = Data Cache / Full Route Cache (on the server), driven by `export const revalidate = 5` or `dynamic = "force-dynamic"`.
*/
  // Note: revalidatePath is used to invalidate the cache and fetch the latest data. This to prevent stale data from being served to the client.

  revalidatePath(ticketPath(comment?.ticketId ?? ""));
  return toActionState("SUCCESS", "Comment updated");
  /* 
  Note: I ran into a bug where the toast message was not showing because I forgot to await. remember the way await works. it pauses the execution of the function and waits for the promise to resolve. so if you forget to await, the function will continue to execute and the promise will not resolve, and the toast message will not show because you will be redirected before the promise resolves. Here is a golden rule: if a function is declared async, treat calling it without await as a red flag unless you deliberately want fire-and-forget behavior (e.g., logging that truly doesn't matter if it's delayed).

  */
}
