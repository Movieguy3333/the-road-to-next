"use server";

import { prisma } from "@/lib/prisma";
import { ticketPath, ticketsPath } from "@/paths";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import fromErrorToActionState from "@/components/form/utils/to-action-state";
import { ActionState } from "@/components/form/utils/to-action-state";
import { toActionState } from "@/components/form/utils/to-action-state";
import { setCookieByKey } from "@/actions/cookie";
import { toCent } from "@/utils/currency";

import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { isOwner } from "@/features/auth/utils/is-owner";
// Note: zod is a library for type-safe data validation. It is a great way to validate data before it is saved to the database. It can be used to validate form data, API requests, and more. In this case, we are using it to validate the form data before it is saved to the database.
const upsertTicketSchema = z.object({
  title: z.string().min(1).max(100),
  // Note: max length is 1024 characters. this matches schema.prisma model perfectly. Good practice to use the same length as the databas model.
  content: z.string().min(1).max(1024),
  deadline: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Is required"),
  bounty: z.coerce.number().positive(),
});

export default async function upsertTicket(
  id: string | undefined,
  // Note: _actionState is the prevState just renamed.
  _actionState: ActionState,
  formData: FormData,
) {
  const { user } = await getAuthOrRedirect();

  try {
    // Note: Basically, if this is an update, get the ticket and make sure the user is the owner of the ticket. It is best practice to check authorization as close to the data access layer as possible.
    if (id) {
      const ticket = await prisma.ticket.findUnique({
        where: { id },
      });

      if (!ticket || !isOwner(user, ticket)) {
        return toActionState("ERROR", "Not authorized");
      }
    }

    const data = upsertTicketSchema.parse({
      title: formData.get("title"),
      content: formData.get("content"),
      deadline: formData.get("deadline"),
      bounty: formData.get("bounty"),
    });

    const dbData = {
      ...data,
      // Note: we need to add the userId to the ticket data. However, we now have a bug that any user can update a ticket, even if they didn't create it. we will solve this with protedted routes.
      userId: user.id,
      bounty: toCent(data.bounty),
    };

    await prisma.ticket.upsert({
      where: {
        // Note: will update or create the ticket based on if id is a falsy value or not.
        id: id || "",
      },
      update: dbData,
      // Note: when can remove the as string casting because we are using zod.

      /* Note: Robin did it like this. update: data, create: data
      I like my way better. I think it is more readable and easier to understand what is happening.

      */

      create: dbData,
    });
  } catch (error) {
    return fromErrorToActionState(error, formData);
    // Note: must return message for actionState.
    // Note: this payload is to resest the form.
  }

  /*   await prisma.ticket.update({
    where: {
      id: data.id as string,
    },
    data: {
      title: data.title as string,
      content: data.content as string,
    },
  }); */

  revalidatePath(ticketsPath());

  if (id) {
    /* Note: setCookieByKey is pretty interesting on its purpose. It is essentially there to store a toast message in a cookie, so when it redirects right after, RedirectToast gets that cookie and give the message. RedirectToast will default to doing nothing and returning null after displaying. However, it's behavior changes if there is a toast cookie. After displaying the message, RedirectToast will delete the cookies, and every subsequent render will not show the toast again until the the cookie is set again.

    */
    await setCookieByKey("toast", "Ticket updated");
    redirect(ticketPath(id));
  }

  return toActionState("SUCCESS", "Ticket created");
}
