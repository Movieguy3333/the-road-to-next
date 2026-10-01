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
  try {
    const data = upsertTicketSchema.parse({
      title: formData.get("title"),
      content: formData.get("content"),
      deadline: formData.get("deadline"),
      bounty: formData.get("bounty"),
    });

    const dbData = {
      ...data,
      bounty: toCent(data.bounty),
    };

    await prisma.ticket.upsert({
      where: {
        // Note: will update or create the ticket based on if id is a falsy value or not.
        id: id || "",
      },
      update: dbData,
      // Note: when can remove the as string casting becasue we are using zod.

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
    await setCookieByKey("toast", "Ticket updated");
    redirect(ticketPath(id));
  }

  return toActionState("SUCCESS", "Ticket created");
}
