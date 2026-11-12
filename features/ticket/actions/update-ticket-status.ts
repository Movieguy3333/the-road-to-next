"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { TicketStatus } from "@prisma/client";
import { ticketsPath } from "@/paths";

import { toActionState } from "@/components/form/utils/to-action-state";
import fromErrorToActionState from "@/components/form/utils/to-action-state";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { isOwner } from "@/features/auth/utils/is-owner";

export default async function updateTicketStatus(
  id: string,
  status: TicketStatus,
) {
  // Note: More checks and balances for authorization.
  const { user } = await getAuthOrRedirect();

  try {
    if (id) {
      const ticket = await prisma.ticket.findUnique({
        where: { id },
      });

      if (!ticket || !isOwner(user, ticket)) {
        return toActionState("ERROR", "Not authorized");
      }
    }
    await prisma.ticket.update({
      where: {
        id: id,
      },
      data: {
        status: status,
      },
    });
  } catch (error) {
    return fromErrorToActionState(error);
    // Note: must return message for actionState.message.
    // Note: this payload is to resest the form.
  }
  revalidatePath(ticketsPath());
  return toActionState("SUCCESS", "Ticket status updated");
}
