"use server";

// Note: When you add "use server" to a function (or at the top of a file containing functions), you are explicitly creating a Server Action. You are telling the Next.js compiler: "When a Client Component imports this function, do not give it the actual code. Instead, leave the code on the server, and give the client a hidden network request." It is essentially acts as a gateway to server world. You need it to use this action in a client component.

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { ticketsPath } from "@/paths";
import { revalidatePath } from "next/cache";
import { setCookieByKey } from "@/actions/cookie";
import fromErrorToActionState from "@/components/form/utils/to-action-state";

export default async function deleteTicket(ticketId: string) {
  try {
    await prisma.ticket.delete({
      where: {
        id: ticketId,
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

  revalidatePath(ticketsPath());
  /* 
  Note: I ran into a bug where the toast message was not showing because I forgot to await. remember the way await works. it pauses the execution of the function and waits for the promise to resolve. so if you forget to await, the function will continue to execute and the promise will not resolve, and the toast message will not show because you will be redirected before the promise resolves. Here is a golden rule: if a function is declared async, treat calling it without await as a red flag unless you deliberately want fire-and-forget behavior (e.g., logging that truly doesn't matter if it's delayed).

  */

  await setCookieByKey("toast", "Ticket deleted");
  redirect(ticketsPath());
}
