"use client";

import { Button } from "@/components/ui/button";
import { Ticket, TicketStatus } from "@prisma/client";
import { LucideMoreVertical, LucideTrash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { TICKET_STATUS_LABELS } from "@/features/ticket/constants";
import updateTicketStatus from "@/features/ticket/actions/update-ticket-status";
import { toast } from "sonner";
import { ConfirmDialog } from "@/components/confirm-dialog";
import deleteTicket from "@/features/ticket/actions/delete-ticket";

type TicketMoreMenuProps = {
  ticket: Ticket;
  trigger: React.ReactElement;
};

function TicketMoreMenu({ ticket, trigger }: TicketMoreMenuProps) {
  const deleteButton = (
    <ConfirmDialog
      action={deleteTicket.bind(null, ticket.id)}
      trigger={
        <Button variant="outline" size="icon" type="submit" className="w-full">
          <LucideTrash className="  h-4 w-4" />
          <span className="ml-2">Delete</span>
        </Button>
      }
    />
  );

  async function handleUpdateTicketStatus(status: TicketStatus) {
    const promise = updateTicketStatus(ticket.id, status as TicketStatus);

    /* Note: 
    This code updates a ticket's status and shows a loading toast while it happens. Breaking it down:

const promise = updateTicketStatus(ticket.id, status as TicketStatus);
Calls the server action to update the ticket's status, but doesn't await it yet — just captures the returned Promise.

toast.promise(promise, { loading: "Updating..." });
Hands that Promise to the toast library (sonner), which shows a "Updating..." toast immediately. Sonner watches the Promise and automatically updates the toast when it resolves/rejects (this component likely also relies on toast.promise's default success/error messages, or handles that elsewhere).

const result = await promise;
The component itself also waits for the same Promise to finish, so it can use result (e.g. to check for a validation error and react to it in code — like closing a menu or showing a field error).

Purpose: it gives the user instant visual feedback via the toast (so the UI doesn't feel frozen) while letting the component's own logic continue once the update actually completes — both consumers (toast.promise and the await) share the exact same request instead of triggering updateTicketStatus twice.

    */
    toast.promise(promise, {
      loading: "Updating...",
    });

    const result = await promise;

    if (result.status === "ERROR") {
      toast.error(result.message);
    } else if (result.status === "SUCCESS") {
      toast.success(result.message);
    }
  }

  const ticketStatusRadioGroupItems = (
    <DropdownMenuRadioGroup
      value={ticket.status}
      onValueChange={handleUpdateTicketStatus}
    >
      {Object.keys(TICKET_STATUS_LABELS).map((key) => (
        <DropdownMenuRadioItem key={key} value={key}>
          {TICKET_STATUS_LABELS[key as TicketStatus]}
        </DropdownMenuRadioItem>
      ))}
    </DropdownMenuRadioGroup>
  );
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        suppressHydrationWarning
        render={trigger}
      ></DropdownMenuTrigger>
      <DropdownMenuContent side="right">
        {" "}
        {ticketStatusRadioGroupItems}
        <DropdownMenuSeparator />
        {deleteButton}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default TicketMoreMenu;
