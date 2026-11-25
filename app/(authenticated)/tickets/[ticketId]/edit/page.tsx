import CardCompact from "@/components/card-compact";

import { notFound } from "next/navigation";
import TicketUpsertForm from "@/features/ticket/components/ticket-upsert-form";

import getTicket from "@/features/ticket/queries/get-ticket";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { homePath } from "@/paths";
import { Separator } from "@/components/ui/separator";
import { ticketPath } from "@/paths";
type TicketEditPageProps = {
  params: Promise<{
    ticketId: string;
  }>;
};

async function TicketEditPage({ params }: TicketEditPageProps) {
  const { ticketId } = await params;
  const ticket = await getTicket(ticketId);

  /* Note: 
!!ticket converts ticket to a boolean using double negation:

!ticket — negates the value (true if ticket is falsy/null/undefined, false otherwise)
!!ticket — negates it again, flipping back to a clean true/false
So if ticket is null or undefined (not found), isTicketFound is false. If ticket is an actual object, isTicketFound is true.

It's a common JS/TS idiom to coerce any value into a strict boolean, which is nicer for conditionals, prop types, and readability than passing around a truthy/falsy object or null.
  */
  const isTicketFound = !!ticket;

  if (!isTicketFound || !ticket.isOwner) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-y-8">
      <Breadcrumbs
        breadcrumbs={[
          { title: "Tickets", href: homePath() },
          { title: ticket.title, href: ticketPath(ticket.id) },
          // Note: this is the edit page, therefore, we will add an additional breadcrumb and link to the ticket page. Each page has it's own breadcrumbs structure.
          { title: "Edit" },
        ]}
      />
      <Separator />
      <div className="flex-1 flex flex-col justify-center items-center ">
        <CardCompact
          className="w-full max-w-[420px] animate-fade-from-top "
          title="Edit ticket"
          description="Update the details of the ticket"
          content={<TicketUpsertForm ticket={ticket} />}
        />
      </div>
    </div>
  );
}

export default TicketEditPage;
