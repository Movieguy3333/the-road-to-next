"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { TicketStatus } from "@prisma/client";
import { ticketsPath } from "@/paths";

import { toActionState } from "@/components/form/utils/to-action-state";
import fromErrorToActionState from "@/components/form/utils/to-action-state";

export default async function updateTicketStatus(
  id: string,
  status: TicketStatus,
) {
  try {
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
